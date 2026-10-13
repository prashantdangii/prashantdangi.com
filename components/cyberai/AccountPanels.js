"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  createSpace,
  deleteAccount,
  listEvents,
  listSpaces,
  logout,
  referralStats,
  selectSpace,
  useAccount
} from "@/components/cyberai/session";
import { MODELS, PLANS, SITE } from "@/lib/cyberai";

function when(iso) {
  return iso.slice(0, 16).replace("T", " ") + " UTC";
}

export function ModelsPanel() {
  return (
    <>
      <h1>Models</h1>
      <p className="cai-sub">The id is the model field on a completion request.</p>
      <div className="cai-stack">
        {MODELS.map((model) => (
          <article className="cai-model" key={model.id}>
            <div className="cai-model-top">
              <h3>{model.name}</h3>
              <span>{model.id}</span>
            </div>
            <p>{model.blurb}</p>
            <div className="cai-fits">
              {model.fits.map((fit) => <span key={fit}>{fit}</span>)}
              <Link href={`/console/chat?model=${model.id}`}>Open in chat</Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export function ActivityPanel() {
  const account = useAccount();
  const [events, setEvents] = useState(null);
  useEffect(() => {
    setEvents(listEvents(account.email));
  }, [account.email]);
  return (
    <>
      <h1>Activity</h1>
      <p className="cai-sub">Account events from this browser. Requests show up here once the API is connected.</p>
      {events === null ? <p className="cai-note">Loading…</p> : events.length === 0 ? (
        <div className="cai-empty"><h2>No activity yet</h2><p>Creating a key or a workspace writes a line here.</p></div>
      ) : (
        <table className="cai-table">
          <thead><tr><th>When</th><th>Event</th><th>Detail</th></tr></thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{when(event.at)}</td>
                <td>{event.type}</td>
                <td>{event.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export function BillingPanel() {
  return (
    <>
      <h1>Billing</h1>
      <p className="cai-sub">No card on file. Credits can be added when payments are connected.</p>
      <div className="cai-stats">
        <div className="cai-stat"><span>Available balance</span><strong>$0.00</strong></div>
        <div className="cai-stat"><span>Top-ups</span><strong>$0.00</strong></div>
        <div className="cai-stat"><span>Spent</span><strong>$0.00</strong></div>
      </div>
      <div className="cai-panel">
        <h2>Add credits</h2>
        <p>The button stays off until a payment provider is wired. Nothing is charged from this page.</p>
        <button className="cai-btn cai-btn-fill" type="button" disabled>Add credits</button>
      </div>
    </>
  );
}

export function WorkspacesPanel() {
  const account = useAccount();
  const [rows, setRows] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function refresh() {
    setRows(listSpaces(account.email));
  }

  useEffect(() => {
    refresh();
  }, [account.email]);

  function onCreate(event) {
    event.preventDefault();
    const result = createSpace(account.email, name);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setName("");
    setError("");
    refresh();
  }

  return (
    <>
      <h1>Workspaces</h1>
      <p className="cai-sub">Group keys and usage. Shared seats wait until billing can attach them.</p>
      <form className="cai-inline-form" onSubmit={onCreate}>
        <label className="skip" htmlFor="space-name">Workspace name</label>
        <input id="space-name" value={name} maxLength={40} placeholder="Workspace name" onChange={(event) => setName(event.target.value)} />
        <button className="cai-btn cai-btn-fill" type="submit">Create workspace</button>
      </form>
      {error ? <p className="cai-error" role="alert">{error}</p> : null}
      <div className="cai-stack" style={{ marginTop: 16 }}>
        {rows.map((row) => (
          <article className="cai-card" key={row.id}>
            <h3>{row.name}</h3>
            <p>{row.selected ? "Selected" : "Not selected"} · {when(row.created)}</p>
            {row.selected ? null : (
              <button className="cai-btn" type="button" style={{ marginTop: 12 }} onClick={() => { selectSpace(account.email, row.id); refresh(); }}>Use this workspace</button>
            )}
          </article>
        ))}
      </div>
    </>
  );
}

export function ReferralsPanel() {
  const account = useAccount();
  const [stats, setStats] = useState(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    setStats(referralStats(account.email));
  }, [account.email]);
  if (!stats) return <p className="cai-note">Loading…</p>;
  const link = `${SITE}/signup?ref=${stats.code}`;
  return (
    <>
      <h1>Referrals</h1>
      <p className="cai-sub">Share this link. Referred signups in this browser are counted below.</p>
      <div className="cai-secret">
        <span>Your link</span>
        <code>{link}</code>
        <button
          className="cai-btn"
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(link);
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
        >
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
      <p className="cai-sub">Referred accounts in this browser: {stats.referred}. {account.ref ? `You joined with code ${account.ref}.` : "You did not use a referral code."}</p>
    </>
  );
}

export function SettingsPanel() {
  const account = useAccount();
  const router = useRouter();
  const [armed, setArmed] = useState(false);
  const plan = PLANS[account.plan] || PLANS.explore;
  return (
    <>
      <h1>Settings</h1>
      <p className="cai-sub">This account lives in the browser until Firebase Auth replaces it.</p>
      <div className="cai-stats">
        <div className="cai-stat"><span>Email</span><strong style={{ fontSize: 16 }}>{account.email}</strong></div>
        <div className="cai-stat"><span>Plan</span><strong>{plan.name}</strong></div>
        <div className="cai-stat"><span>Key cap</span><strong>{plan.keys}</strong></div>
      </div>
      <div className="cai-cta">
        <button className="cai-btn" type="button" onClick={() => { logout(); router.replace("/login"); }}>Sign out</button>
        {armed ? (
          <button className="cai-btn" type="button" onClick={() => { deleteAccount(account.email); router.replace("/"); }}>Delete permanently</button>
        ) : (
          <button className="cai-btn" type="button" onClick={() => setArmed(true)}>Delete this browser account</button>
        )}
      </div>
      {armed ? <p className="cai-note">This removes the account, keys, and workspaces stored in this browser.</p> : null}
    </>
  );
}
