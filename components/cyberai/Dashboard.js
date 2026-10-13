"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, listKeys } from "@/components/cyberai/session";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const Y_TICKS = [1, 0.8, 0.5, 0.3, 0];

function rangeDays(count) {
  const now = new Date();
  return Array.from({ length: count }, (_, index) => {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - (count - 1 - index));
  });
}

function label(date) {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

function axisLabels(days) {
  if (days.length <= 7) return days.map((date, index) => ({ date, index }));
  const marks = 6;
  const step = (days.length - 1) / (marks - 1);
  return Array.from({ length: marks }, (_, mark) => {
    const index = Math.round(mark * step);
    return { date: days[index], index };
  });
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
  const ticks = axisLabels(days);
  const caption = metric === "spend" ? "Spend per day, all zero" : "Requests per day, all zero";
  const plotTop = 18;
  const plotBottom = 132;

  return (
    <>
      <div className="cai-pagehead">
        <div>
          <h1>Home</h1>
          <p className="cai-sub">Your API usage and balance.</p>
        </div>
        <Link className="cai-btn cai-btn-fill" href="/console/keys">Create API key</Link>
      </div>
      <div className="cai-alert">
        <p>
          <strong>Billing needs attention</strong>
          <span>Balance is empty. Add credits before requests can run.</span>
        </p>
        <Link className="cai-btn cai-btn-fill" href="/console/billing">Open billing</Link>
      </div>
      <div className="cai-home-grid">
        <section className="cai-panel" aria-label="Usage">
          <div className="cai-toolbar">
            <div className="cai-toolbar-title">
              <strong>Usage over time</strong>
              <span>Last {span} days</span>
            </div>
            <div className="cai-toolbar-actions">
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
          </div>
          <svg className="cai-chart-svg" viewBox="0 0 640 168" role="img" aria-label={caption}>
            {Y_TICKS.map((tick) => {
              const y = plotBottom - ((plotBottom - plotTop) * tick);
              return (
                <g key={tick}>
                  <line x1="36" y1={y} x2="628" y2={y} />
                  <text x="4" y={y + 3}>{tick === 0 ? "0" : tick.toFixed(1).replace(/\.0$/, "")}</text>
                </g>
              );
            })}
            <text className="cai-chart-mid" x="332" y="86" textAnchor="middle">{metric === "spend" ? "Spend per day" : "Requests per day"}</text>
            <polyline points="36,132 628,132" />
          </svg>
          <div className="cai-chart-labels">
            {ticks.map((tick) => <span key={tick.index}>{label(tick.date)}</span>)}
          </div>
        </section>
        <aside className="cai-panel cai-balance-card">
          <div className="cai-balance-top">
            <span>Available balance</span>
            <Link href="/console/billing">Billing</Link>
          </div>
          <p className="cai-money">$0.00 <small>USD</small></p>
          <dl>
            <dt>Top-ups</dt><dd>$0.00</dd>
            <dt>Spent</dt><dd>$0.00</dd>
            <dt>Active keys</dt><dd>{keys === null ? "—" : keys}</dd>
          </dl>
          <Link className="cai-btn cai-btn-fill" href="/console/billing">Add credits</Link>
        </aside>
      </div>
      <div className="cai-panel cai-empty">
        <h2>No requests yet</h2>
        <p>Call /v1/chat/completions with an API key, or talk to a model in chat.</p>
        <div className="cai-cta">
          <Link className="cai-btn cai-btn-fill" href="/console/chat">Open chat</Link>
          <Link className="cai-btn" href="/console/keys">API keys</Link>
        </div>
      </div>
    </>
  );
}
