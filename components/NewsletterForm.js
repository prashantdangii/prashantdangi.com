"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") || "").trim();
    setSent(true);
    location.href = "mailto:prxshantdangi@gmail.com?subject=" + encodeURIComponent("Newsletter") + "&body=" + encodeURIComponent(email);
  }

  return (
    <form className="card news" id="news" onSubmit={onSubmit}>
      <p className="label">// newsletter</p>
      <h2>Subscribe to my newsletter.</h2>
      <p>Notes on offensive security, red teaming, and GRC.</p>
      {sent ? (
        <p className="news-done">Sent. That address is in a note to me.</p>
      ) : (
        <div className="news-row">
          <label className="sr" htmlFor="news-email">Email</label>
          <input id="news-email" name="email" type="email" required placeholder="you@email" autoComplete="email" />
          <button className="btn btn-fill" type="submit">Subscribe</button>
        </div>
      )}
    </form>
  );
}
