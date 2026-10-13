"use client";

import { useEffect, useState } from "react";
import { createKey, listKeys, revokeKey, useAccount } from "@/components/cyberai/session";

function when(iso) {
  return iso.slice(0, 16).replace("T", " ") + " UTC";
}

export function KeysPanel() {
  const account = useAccount();
  const [name, setName] = useState("");
  const [rows, setRows] = useState([]);
  const [fresh, setFresh] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function refresh() {
    setRows(listKeys(account.email));
  }

  useEffect(() => {
    refresh();
  }, [account.email]);

  function onCreate(event) {
    event.preventDefault();
    setError("");
    const result = createKey(account.email, name, account.plan);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setName("");
    setFresh(result.key);
    setCopied(false);
    refresh();
  }

  async function copy(secret) {
    try {
      await navigator.clipboard.writeText(secret);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const active = rows.filter((row) => !row.revoked);
  const revoked = rows.filter((row) => row.revoked);

  return (
    <>
      <h1>API keys</h1>
      <p className="cai-sub">Keys are stored in this browser. Send one as a bearer token when the host is connected. The plan cap is enforced here.</p>
      <form className="cai-inline-form" onSubmit={onCreate}>
        <label className="skip" htmlFor="key-name">Key name</label>
        <input id="key-name" value={name} maxLength={40} placeholder="Key name" onChange={(event) => setName(event.target.value)} />
        <button className="cai-btn cai-btn-fill" type="submit">Create API key</button>
      </form>
      {error ? <p className="cai-error" role="alert">{error}</p> : null}
      {fresh ? (
        <div className="cai-secret">
          <strong>Copy this key now.</strong>
          <p className="cai-note">It stays in this browser so you can copy it again. It is not on a server.</p>
          <code>{fresh.secret}</code>
          <button className="cai-btn" type="button" onClick={() => copy(fresh.secret)}>{copied ? "Copied" : "Copy key"}</button>
        </div>
      ) : null}
      {active.length === 0 ? <p className="cai-note">No active keys.</p> : (
        <table className="cai-table">
          <thead><tr><th>Name</th><th>Prefix</th><th>Created</th><th></th></tr></thead>
          <tbody>
            {active.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td><code>{row.prefix}</code></td>
                <td>{when(row.created)}</td>
                <td><button type="button" onClick={() => { revokeKey(account.email, row.id); refresh(); }}>Revoke</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {revoked.length ? (
        <>
          <h2>Revoked</h2>
          <ul className="cai-stack">
            {revoked.map((row) => <li key={row.id} className="cai-note">{row.name} · {row.prefix}</li>)}
          </ul>
        </>
      ) : null}
    </>
  );
}
