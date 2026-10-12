"use client";

import { useEffect, useRef, useState } from "react";
import { MODELS } from "@/lib/models";

export function CyberAI() {
  const [model, setModel] = useState(MODELS[0]);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
  }, [text]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);

  useEffect(() => {
    if (!open) return;
    function onPointer(event) {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    }
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function ask(raw) {
    const value = String(raw || "").trim();
    if (!value || busy) return;
    const name = model.name;
    setBusy(true);
    setText("");
    setOpen(false);
    setMessages((list) => [...list, { role: "user", text: value }]);
    const wait = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 40 : 480;
    window.setTimeout(() => {
      setMessages((list) => [...list, {
        role: "ai",
        name,
        text: `${name} is under construction. This chat is not fully functional yet.`
      }]);
      setBusy(false);
      inputRef.current?.focus();
    }, wait);
  }

  const started = messages.length > 0 || busy;

  return (
    <main className="chat" id="content">
      <div className="chat-bar">
        <div className="model-menu" ref={menuRef}>
          <button
            type="button"
            className="model-pick"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={`Model, ${model.name}`}
            onClick={() => setOpen((value) => !value)}
          >
            <strong>{model.name}</strong>
            <span>{model.note}</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {open ? (
            <ul className="model-listbox" role="listbox" aria-label="Models">
              {MODELS.map((item) => (
                <li key={item.name}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={item.name === model.name}
                    onClick={() => { setModel(item); setOpen(false); }}
                  >
                    <strong>{item.name}</strong>
                    <span>{item.note}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <span className="build-note">Under construction</span>
      </div>
      <div className="chat-scroll" id="chat-scroll" ref={scrollRef}>
        <div className="chat-empty" id="chat-empty" hidden={started}>
          <p className="label">// under construction</p>
          <h1>{model.name}</h1>
          <p>This chat is under construction. It is not fully functional yet.</p>
        </div>
        <div className="chat-log" id="chat-log" hidden={!started}>
          {messages.map((msg, i) => msg.role === "user" ? (
            <div className="msg msg-user" key={i}><p>{msg.text}</p></div>
          ) : (
            <div className="msg msg-ai" key={i}>
              <span className="msg-name">{msg.name}</span>
              <div className="msg-body"><p>{msg.text}</p></div>
            </div>
          ))}
          {busy ? (
            <div className="msg msg-ai">
              <span className="msg-name">{model.name}</span>
              <span className="dots" aria-hidden="true"><i /><i /><i /></span>
            </div>
          ) : null}
        </div>
      </div>
      <form className="composer" id="composer" onSubmit={(e) => { e.preventDefault(); ask(text); }}>
        <label className="skip" htmlFor="chat-input">Message</label>
        <textarea
          id="chat-input"
          ref={inputRef}
          rows={1}
          placeholder={`Message ${model.name}`}
          autoComplete="off"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              ask(text);
            }
          }}
        />
        <button type="submit" id="chat-send" aria-label="Send" disabled={busy || !text.trim()}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
        </button>
      </form>
    </main>
  );
}
