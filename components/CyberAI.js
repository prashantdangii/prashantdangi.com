"use client";

import { useEffect, useRef, useState } from "react";
import { aiReply } from "@/lib/ai";

const PROMPTS = [
  "What do you actually do?",
  "How does an engagement start?",
  "Red team or a VAPT?",
  "Where are the courses?"
];

export function CyberAI() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

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

  function ask(raw) {
    const value = String(raw || "").trim();
    if (!value || busy) return;
    setBusy(true);
    setText("");
    setMessages((list) => [...list, { role: "user", text: value }]);
    const wait = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 40 : 480;
    window.setTimeout(() => {
      setMessages((list) => [...list, { role: "ai", html: aiReply(value) }]);
      setBusy(false);
      inputRef.current?.focus();
    }, wait);
  }

  const started = messages.length > 0 || busy;

  return (
    <main className="chat" id="content">
      <div className="chat-bar">
        <strong>CyberAI</strong>
        <span>practice</span>
      </div>
      <div className="chat-scroll" id="chat-scroll" ref={scrollRef}>
        <div className="chat-empty" id="chat-empty" hidden={started}>
          <p className="label">// cyberai</p>
          <h1>CyberAI</h1>
          <p>Ask about offensive security, red teaming, GRC, or how an engagement is scoped.</p>
          <div className="chat-prompts">
            {PROMPTS.map((prompt) => (
              <button type="button" key={prompt} onClick={() => ask(prompt)}>{prompt}</button>
            ))}
          </div>
        </div>
        <div className="chat-log" id="chat-log" hidden={!started}>
          {messages.map((msg, i) => msg.role === "user" ? (
            <div className="msg msg-user" key={i}><p>{msg.text}</p></div>
          ) : (
            <div className="msg msg-ai" key={i}>
              <span className="msg-name">CyberAI</span>
              <div className="msg-body" dangerouslySetInnerHTML={{ __html: msg.html }} />
            </div>
          ))}
          {busy ? (
            <div className="msg msg-ai">
              <span className="msg-name">CyberAI</span>
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
          placeholder="Message CyberAI"
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
