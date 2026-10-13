"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FOOTER, NAV } from "@/lib/cyberai";
import { useSessionState } from "@/components/cyberai/session";
import "@/app/cyberai/cyberai.css";

export function Mark() {
  return <img src="/cyberai-mark.svg" alt="" width="28" height="28" />;
}

export function SiteChrome({ active = "", notice = false, children }) {
  const [open, setOpen] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const { ready, account } = useSessionState();
  const signedIn = ready && Boolean(account);
  const footer = signedIn
    ? FOOTER.flatMap(([label, href]) => {
        if (href === "/login") return [["Console", "/console/chat"]];
        if (href === "/signup") return [];
        return [[label, href]];
      })
    : FOOTER;

  useEffect(() => {
    if (!notice) return;
    if (localStorage.getItem("cai.notice.dismissed") === "1") return;
    setShowNotice(true);
  }, [notice]);

  useEffect(() => {
    if (!open) return;
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function dismiss() {
    localStorage.setItem("cai.notice.dismissed", "1");
    setShowNotice(false);
  }

  return (
    <div className="cai">
      <div className="cai-mesh" aria-hidden="true" />
      <header className={`cai-nav${open ? " is-open" : ""}`}>
        <div className="cai-wrap cai-bar">
          <Link href="/" className="cai-brand" onClick={() => setOpen(false)}>
            <Mark />
            Cyber AI
          </Link>
          <nav className="cai-nav-links" aria-label="Primary">
            {NAV.map(([label, href]) => (
              <Link key={href} href={href} aria-current={active === href ? "page" : undefined}>{label}</Link>
            ))}
          </nav>
          <div className="cai-nav-cta">
            {signedIn ? (
              <Link className="cai-btn cai-btn-fill" href="/console/chat">Console</Link>
            ) : (
              <>
                <Link className="cai-quiet-link" href="/login">Log in</Link>
                <Link className="cai-btn cai-btn-fill" href="/signup">Sign up</Link>
              </>
            )}
          </div>
          <button
            type="button"
            className="cai-burger"
            aria-expanded={open}
            aria-controls="cai-menu"
            onClick={() => setOpen((value) => !value)}
          >
            Menu
          </button>
        </div>
        {open ? (
          <div id="cai-menu" className="cai-menu">
            {NAV.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
            ))}
            {signedIn ? (
              <Link href="/console/chat" onClick={() => setOpen(false)}>Console</Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)}>Log in</Link>
                <Link href="/signup" onClick={() => setOpen(false)}>Sign up</Link>
              </>
            )}
          </div>
        ) : null}
      </header>
      {showNotice ? (
        <div className="cai-banner">
          <div className="cai-wrap">
            <p>Early accounts are marked for launch credit. Payments are not connected, so nothing is charged.</p>
            <button type="button" onClick={dismiss}>Dismiss</button>
          </div>
        </div>
      ) : null}
      <div className="cai-main-flow">{children}</div>
      <footer className="cai-footer">
        <div className="cai-wrap">
          <ul>
            {footer.map(([label, href]) => (
              <li key={href}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
          <p className="cai-built">Built by <a href="https://prashantdangi.com">Prashant Dangi</a></p>
        </div>
      </footer>
    </div>
  );
}
