"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Mark } from "@/components/cyberai/SiteChrome";
import { SessionProvider, useSessionState } from "@/components/cyberai/session";
import { CONSOLE_LINKS, barePath } from "@/lib/cyberai";

const WORK = new Set(["/console", "/console/models", "/console/chat", "/console/keys", "/console/activity"]);

function Icon({ name }) {
  const paths = {
    home: "M4 11.2 12 4l8 7.2V20H4z",
    models: "M12 3.2 13.6 8.8 19.2 10.2 13.6 11.6 12 17.2 10.4 11.6 4.8 10.2 10.4 8.8Z",
    chat: "M5 6h14v9H8l-3 3z",
    keys: "M8 14a4 4 0 1 1 3.5-6H20v3h-2v2h-2v2h-4.1A4 4 0 0 1 8 14z",
    activity: "M3 12h4l2-5 4 10 2-5h6",
    billing: "M3 7h18v10H3zM3 11h18",
    workspaces: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
    referrals: "M12 4v16M4 12h16",
    settings: "M4 7h16M4 12h10M4 17h16"
  };
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

function Jump() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const items = CONSOLE_LINKS.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <div className="cai-jump">
      <label>
        <span className="skip">Jump to</span>
        <input
          value={query}
          placeholder="Jump to…"
          autoComplete="off"
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onChange={(event) => { setQuery(event.target.value); setOpen(true); }}
        />
      </label>
      {open ? (
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onMouseDown={(event) => event.preventDefault()}>{item.label}</Link>
            </li>
          ))}
          {items.length === 0 ? <li><span className="cai-note">No matching page.</span></li> : null}
        </ul>
      ) : null}
    </div>
  );
}

export function ConsoleGate({ children }) {
  const pathname = barePath(usePathname());
  const router = useRouter();
  const { ready, account } = useSessionState();
  const bleed = pathname === "/console/chat";

  useEffect(() => {
    if (ready && !account) router.replace("/login");
  }, [ready, account, router]);

  if (!ready || !account) {
    return (
      <div className="cai">
        <div className="cai-mesh" aria-hidden="true" />
        <div className="cai-boot">{ready ? "Redirecting to log in…" : "Opening the console…"}</div>
      </div>
    );
  }

  const work = CONSOLE_LINKS.filter((item) => WORK.has(item.href));
  const accountLinks = CONSOLE_LINKS.filter((item) => !WORK.has(item.href));
  const publicAccount = {
    email: account.email,
    plan: account.plan,
    ref: account.ref,
    created: account.created
  };

  return (
    <SessionProvider value={publicAccount}>
      <div className="cai">
        <div className="cai-console">
          <aside className="cai-side" aria-label="Console">
            <Link href="/" className="cai-brand" style={{ margin: "4px 8px 14px" }}>
              <Mark />
              Cyber AI
            </Link>
            <div className="cai-side-scroll">
              <div className="cai-side-group">
                <p>Work</p>
                {work.map((item) => (
                  <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                    <Icon name={item.icon} />
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="cai-side-group">
                <p>Account</p>
                {accountLinks.map((item) => (
                  <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                    <Icon name={item.icon} />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="cai-side-foot">
              <p className="cai-balance">Balance $0.00</p>
              <p className="cai-email">{account.email}</p>
              <Link href="/docs">Docs</Link>
            </div>
          </aside>
          <div className="cai-main">
            <div className="cai-top">
              <Jump />
              <div className="cai-top-links">
                <Link href="/docs">Docs</Link>
                <a href="mailto:prxshantdangi@gmail.com?subject=Cyber%20AI%20support">Support</a>
              </div>
            </div>
            <div className={bleed ? "cai-canvas cai-canvas-bleed" : "cai-canvas"}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
