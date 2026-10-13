"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SiteChrome } from "@/components/cyberai/SiteChrome";
import { PLANS } from "@/lib/cyberai";
import { createAccount, login } from "@/components/cyberai/session";

function PasswordField({ id, label, value, onChange, autoComplete, hint }) {
  const [show, setShow] = useState(false);
  return (
    <div className="cai-field">
      <label htmlFor={id}>{label}</label>
      <span className="cai-pass">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required
          minLength={8}
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
        <button
          type="button"
          aria-pressed={show}
          aria-label={show ? "Hide password" : "Show password"}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => setShow((current) => !current)}
        >
          {show ? "Hide" : "Show"}
        </button>
      </span>
      {hint ? <small id={`${id}-hint`}>{hint}</small> : null}
    </div>
  );
}

function GoogleButton() {
  const [note, setNote] = useState("");
  return (
    <>
      <button type="button" className="cai-btn cai-btn-block" onClick={() => setNote("Google sign-in is added with Firebase Auth.")}>
        Continue with Google
      </button>
      {note ? <p className="cai-note">{note}</p> : null}
    </>
  );
}

export function SignupForm() {
  const router = useRouter();
  const params = useSearchParams();
  const plan = PLANS[params.get("plan")] ? params.get("plan") : "explore";
  const ref = params.get("ref") || "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Those passwords do not match.");
      return;
    }
    setBusy(true);
    const result = await createAccount({ email, password, plan, ref });
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/console");
  }

  return (
    <SiteChrome active="/signup">
      <main id="content" className="cai-wrap cai-auth">
        <div className="cai-auth-copy">
          <p className="cai-kicker">Account</p>
          <h1>Create an account</h1>
          <p>The account opens the console. Firebase Auth will replace this browser session. Passwords are hashed locally and are not sent to a server.</p>
        </div>
        <div className="cai-auth-card">
          <h2>Sign up</h2>
          <p className="cai-note">Use at least 8 characters. {plan !== "explore" ? `Plan saved with the account: ${PLANS[plan].name}.` : "Explore is the plan until billing can charge another one."}</p>
          <form className="cai-form" onSubmit={onSubmit}>
            <label className="cai-field" htmlFor="email">
              <span>Email</span>
              <input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <PasswordField id="password" label="Password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" hint="At least 8 characters." />
            <PasswordField id="confirm" label="Confirm password" value={confirm} onChange={(event) => setConfirm(event.target.value)} autoComplete="new-password" />
            {error ? <p className="cai-error" role="alert">{error}</p> : null}
            <button className="cai-btn cai-btn-fill cai-btn-block" type="submit" disabled={busy}>{busy ? "Creating…" : "Create account"}</button>
            <div className="cai-or">or</div>
            <GoogleButton />
            <p className="cai-switch">Already have an account? <Link href="/login">Log in</Link></p>
          </form>
        </div>
      </main>
    </SiteChrome>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    const result = await login(email, password);
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/console");
  }

  return (
    <SiteChrome active="/login">
      <main id="content" className="cai-wrap cai-auth">
        <div className="cai-auth-copy">
          <p className="cai-kicker">Account</p>
          <h1>Log in</h1>
          <p>Use the email you signed up with in this browser. A different browser will not have the account until Firebase Auth is connected.</p>
        </div>
        <div className="cai-auth-card">
          <h2>Welcome back</h2>
          <form className="cai-form" onSubmit={onSubmit}>
            <label className="cai-field" htmlFor="email">
              <span>Email</span>
              <input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <PasswordField id="password" label="Password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
            <p className="cai-switch"><Link href="/forgot">Forgot password?</Link></p>
            {error ? <p className="cai-error" role="alert">{error}</p> : null}
            <button className="cai-btn cai-btn-fill cai-btn-block" type="submit" disabled={busy}>{busy ? "Checking…" : "Log in"}</button>
            <div className="cai-or">or</div>
            <GoogleButton />
            <p className="cai-switch">No account yet? <Link href="/signup">Create one</Link></p>
          </form>
        </div>
      </main>
    </SiteChrome>
  );
}

export function ForgotForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <SiteChrome active="/forgot">
      <main id="content" className="cai-wrap cai-auth">
        <div className="cai-auth-copy">
          <p className="cai-kicker">Account</p>
          <h1>Reset password</h1>
          <p>Mail is not connected. The form records the request on this page and does not send a message.</p>
        </div>
        <div className="cai-auth-card">
          <h2>Email</h2>
          {sent ? (
            <p className="cai-note" role="status">If this browser has that account, a reset link will be sent when mail is connected. Nothing was sent.</p>
          ) : (
            <form className="cai-form" onSubmit={onSubmit}>
              <label className="cai-field" htmlFor="email">
                <span>Email</span>
                <input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
              </label>
              <button className="cai-btn cai-btn-fill cai-btn-block" type="submit">Send reset link</button>
            </form>
          )}
          <p className="cai-switch"><Link href="/login">Back to log in</Link></p>
        </div>
      </main>
    </SiteChrome>
  );
}
