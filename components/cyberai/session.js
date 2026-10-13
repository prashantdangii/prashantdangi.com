"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { PLANS, referralCode } from "@/lib/cyberai";

const ACCOUNTS = "cai.accounts.v1";
const SESSION = "cai.session.v1";
const KEYS = "cai.keys.v1";
const SPACES = "cai.spaces.v1";
const EVENTS = "cai.events.v1";

const SessionContext = createContext(null);

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("cai-store"));
}

export async function hashPassword(email, password) {
  if (!globalThis.crypto?.subtle) {
    throw new Error("This page needs HTTPS or localhost before it can keep a password.");
  }
  const data = new TextEncoder().encode(`cyberai.local.v1|${email}|${password}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function readSession() {
  const session = read(SESSION, null);
  if (!session?.email) return null;
  const account = read(ACCOUNTS, []).find((item) => item.email === session.email);
  return account || null;
}

export function useSessionState() {
  const [ready, setReady] = useState(false);
  const [account, setAccount] = useState(null);
  useEffect(() => {
    setAccount(readSession());
    setReady(true);
    function onStore() {
      setAccount(readSession());
    }
    window.addEventListener("cai-store", onStore);
    window.addEventListener("storage", onStore);
    return () => {
      window.removeEventListener("cai-store", onStore);
      window.removeEventListener("storage", onStore);
    };
  }, []);
  return { ready, account };
}

export function SessionProvider({ value, children }) {
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useAccount() {
  return useContext(SessionContext);
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function logEvent(email, type, detail) {
  const all = read(EVENTS, []);
  all.unshift({
    id: crypto.randomUUID(),
    email,
    type,
    detail,
    at: new Date().toISOString()
  });
  write(EVENTS, all.slice(0, 80));
}

export async function createAccount({ email, password, plan, ref }) {
  const normalized = normalizeEmail(email);
  if (!validEmail(normalized)) return { ok: false, error: "Enter an email address." };
  if (String(password || "").length < 8) return { ok: false, error: "Use at least 8 characters." };
  const accounts = read(ACCOUNTS, []);
  if (accounts.some((item) => item.email === normalized)) {
    return { ok: false, error: "That email already has an account in this browser. Log in." };
  }
  let passwordHash;
  try {
    passwordHash = await hashPassword(normalized, password);
  } catch (error) {
    return { ok: false, error: error.message };
  }
  const chosen = PLANS[plan] ? plan : "explore";
  const cleanRef = /^cai[a-z0-9]{1,16}$/.test(ref || "") ? ref : "";
  const account = {
    email: normalized,
    passwordHash,
    plan: chosen,
    ref: cleanRef,
    created: new Date().toISOString()
  };
  accounts.push(account);
  write(ACCOUNTS, accounts);
  write(SESSION, { email: normalized });
  const spaces = read(SPACES, []);
  spaces.push({
    id: crypto.randomUUID(),
    email: normalized,
    name: "Personal",
    created: account.created,
    selected: true
  });
  write(SPACES, spaces);
  logEvent(normalized, "account.created", "Account created in this browser");
  return { ok: true };
}

export async function login(email, password) {
  const normalized = normalizeEmail(email);
  const account = read(ACCOUNTS, []).find((item) => item.email === normalized);
  if (!account) return { ok: false, error: "Email or password does not match an account in this browser." };
  let passwordHash;
  try {
    passwordHash = await hashPassword(normalized, password);
  } catch (error) {
    return { ok: false, error: error.message };
  }
  if (passwordHash !== account.passwordHash) {
    return { ok: false, error: "Email or password does not match an account in this browser." };
  }
  write(SESSION, { email: normalized });
  logEvent(normalized, "session.started", "Logged in on this browser");
  return { ok: true };
}

export function logout() {
  localStorage.removeItem(SESSION);
  window.dispatchEvent(new Event("cai-store"));
}

export function deleteAccount(email) {
  write(ACCOUNTS, read(ACCOUNTS, []).filter((item) => item.email !== email));
  write(KEYS, read(KEYS, []).filter((item) => item.email !== email));
  write(SPACES, read(SPACES, []).filter((item) => item.email !== email));
  write(EVENTS, read(EVENTS, []).filter((item) => item.email !== email));
  localStorage.removeItem(SESSION);
  window.dispatchEvent(new Event("cai-store"));
}

export function listKeys(email) {
  return read(KEYS, []).filter((item) => item.email === email);
}

export function createKey(email, name, plan) {
  const limit = PLANS[plan]?.keys || PLANS.explore.keys;
  const mine = listKeys(email).filter((item) => !item.revoked);
  if (mine.length >= limit) {
    return { ok: false, error: `${PLANS[plan]?.name || "Explore"} includes ${limit} active keys. Revoke one before creating another.` };
  }
  const label = String(name || "").trim().slice(0, 40) || "Default";
  const secret = `cai_live_${crypto.randomUUID().replace(/-/g, "")}`;
  const row = {
    id: crypto.randomUUID(),
    email,
    name: label,
    secret,
    prefix: `${secret.slice(0, 16)}…`,
    created: new Date().toISOString(),
    revoked: false
  };
  write(KEYS, [row, ...read(KEYS, [])]);
  logEvent(email, "key.created", `Created key ${label}`);
  return { ok: true, key: row };
}

export function revokeKey(email, id) {
  const next = read(KEYS, []).map((item) => (
    item.email === email && item.id === id ? { ...item, revoked: true } : item
  ));
  write(KEYS, next);
  logEvent(email, "key.revoked", "Revoked an API key");
}

export function listSpaces(email) {
  return read(SPACES, []).filter((item) => item.email === email);
}

export function createSpace(email, name) {
  const label = String(name || "").trim().slice(0, 40);
  if (!label) return { ok: false, error: "Name the workspace." };
  const all = read(SPACES, []);
  all.push({
    id: crypto.randomUUID(),
    email,
    name: label,
    created: new Date().toISOString(),
    selected: false
  });
  write(SPACES, all);
  logEvent(email, "workspace.created", `Created workspace ${label}`);
  return { ok: true };
}

export function selectSpace(email, id) {
  write(SPACES, read(SPACES, []).map((item) => (
    item.email === email ? { ...item, selected: item.id === id } : item
  )));
}

export function listEvents(email) {
  return read(EVENTS, []).filter((item) => item.email === email);
}

export function referralStats(email) {
  const code = referralCode(email);
  const referred = read(ACCOUNTS, []).filter((item) => item.ref === code && item.email !== email).length;
  return { code, referred };
}

export function accountByEmail(email) {
  return read(ACCOUNTS, []).find((item) => item.email === email) || null;
}
