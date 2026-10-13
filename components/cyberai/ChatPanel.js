"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "@/components/cyberai/session";
import { API_BASE, MODELS } from "@/lib/cyberai";

const STORE = "cai.chat.v1";
const PAUSE = "Balance is $0.00. Add credits before this request can run.";

function load() {
  try {
    const raw = sessionStorage.getItem(STORE);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function ChatPanel() {
  const account = useAccount();
  const params = useSearchParams();
  const initial = MODELS.some((model) => model.id === params.get("model")) ? params.get("model") : MODELS[0].id;
  const [modelId, setModelId] = useState(initial);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [ready, setReady] = useState(false);
  const model = MODELS.find((item) => item.id === modelId) || MODELS[0];

  useEffect(() => {
    setMessages(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    sessionStorage.setItem(STORE, JSON.stringify(messages.slice(-40)));
  }, [messages, ready]);

  function send(event) {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;
    setText("");
    setMessages((list) => [...list, { role: "user", text: value }, { role: "ai", name: model.name, text: PAUSE }].slice(-40));
  }

  const curl = `curl ${API_BASE}/chat/completions \\\n  -H "Authorization: Bearer $CYBERAI_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify({ model: model.id, messages: [{ role: "user", content: text.trim() || "Summarize the first checks." }] })}'`;

  return (
    <div className="cai-chat">
      <div className="cai-chat-banner">
        <span>Balance is $0.00. Add credits to keep sending requests.</span>
        <Link className="cai-btn cai-btn-fill" href="/console/billing">Add credits</Link>
      </div>
      <div className="cai-chat-log">
        {messages.length === 0 ? (
          <div className="cai-chat-empty">
            <div>
              <h2>{model.name}</h2>
            </div>
          </div>
        ) : messages.map((message, index) => message.role === "user" ? (
          <div className="cai-msg cai-msg-user" key={index}><p>{message.text}</p></div>
        ) : (
          <div className="cai-msg cai-msg-ai" key={index}>
            <span>{message.name}</span>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <form className="cai-composer" onSubmit={send}>
        <label className="skip" htmlFor="cai-chat-input">Message</label>
        <textarea
          id="cai-chat-input"
          rows={2}
          maxLength={4000}
          placeholder={`Message ${model.name}`}
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
        />
        <div className="cai-composer-row">
          <label>
            <span className="skip">Model</span>
            <select value={modelId} onChange={(event) => setModelId(event.target.value)} aria-label="Model">
              {MODELS.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </label>
          <button className="cai-btn cai-btn-fill" type="submit" disabled={!text.trim()}>Send</button>
        </div>
      </form>
      <p className="cai-chat-note">This chat stays in the browser. Refreshing clears it.</p>
      <div className="cai-chat-note" style={{ display: "flex", justifyContent: "center", gap: 16 }}>
        <details className="cai-details">
          <summary>View code</summary>
          <pre style={{ textAlign: "left", whiteSpace: "pre-wrap" }}><code>{curl}</code></pre>
        </details>
        <button type="button" className="cai-quiet-link" onClick={() => setMessages([])}>Clear</button>
      </div>
    </div>
  );
}
