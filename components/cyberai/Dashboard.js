"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, listKeys } from "@/components/cyberai/session";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function rangeDays(count) {
  const now = new Date();
  return Array.from({ length: count }, (_, index) => {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - (count - 1 - index));
  });
}

function label(date) {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

export function Dashboard() {
  const account = useAccount();
  const [metric, setMetric] = useState("requests");
  const [span, setSpan] = useState(30);
  const [keys, setKeys] = useState(null);

  useEffect(() => {
    setKeys(listKeys(account.email).filter((item) => !item.revoked).length);
  }, [account.email]);

  const days = keys === null ? [] : rangeDays(span);
  const caption = metric === "spend" ? "Spend per day, all zero" : "Requests per day, all zero";

  return (
    <>
      <div className="cai-headrow">
        <div>
          <h1>Home</h1>
          <p className="cai-sub">Usage and balance for this browser. Requests stay at zero until the inference host is connected.</p>
        </div>
        <Link className="cai-btn cai-btn-fill" href="/console/keys">Create API key</Link>
      </div>
      <div className="cai-alert">
        <p>
          <strong>Billing needs a connection</strong>
          <span>Balance is empty. Add credits before a request can run. Payments are not open yet.</span>
        </p>
        <Link className="cai-btn" href="/console/billing">Open billing</Link>
      </div>
      <div className="cai-stats">
        <div className="cai-stat"><span>Available balance</span><strong>$0.00</strong></div>
        <div className="cai-stat"><span>Active keys</span><strong>{keys === null ? "—" : keys}</strong></div>
        <div className="cai-stat"><span>Requests</span><strong>0</strong></div>
      </div>
      <section className="cai-panel" aria-label="Usage">
        <div className="cai-toolbar">
          <strong>Usage over time</strong>
          <div className="cai-seg" role="group" aria-label="Range">
            {[7, 30, 90].map((value) => (
              <button key={value} type="button" aria-pressed={span === value} onClick={() => setSpan(value)}>{value}d</button>
            ))}
          </div>
          <div className="cai-seg" role="group" aria-label="Metric">
            <button type="button" aria-pressed={metric === "requests"} onClick={() => setMetric("requests")}>Requests</button>
            <button type="button" aria-pressed={metric === "spend"} onClick={() => setMetric("spend")}>Spend</button>
          </div>
        </div>
        <svg className="cai-chart-svg" viewBox="0 0 600 160" role="img" aria-label={caption}>
          <line x1="0" y1="40" x2="600" y2="40" />
          <line x1="0" y1="90" x2="600" y2="90" />
          <polyline points="0,140 600,140" />
        </svg>
        <div className="cai-chart-labels">
          <span>{days[0] ? label(days[0]) : ""}</span>
          <span>{days.length ? label(days[Math.floor(days.length / 2)]) : ""}</span>
          <span>{days.length ? label(days[days.length - 1]) : ""}</span>
        </div>
      </section>
      <div className="cai-empty">
        <h2>No requests yet</h2>
        <p>Call /v1/chat/completions with an API key, or open chat. The host answers once inference is connected.</p>
        <div className="cai-cta">
          <Link className="cai-btn cai-btn-fill" href="/console/chat">Open chat</Link>
          <Link className="cai-btn" href="/console/keys">API keys</Link>
        </div>
      </div>
    </>
  );
}
