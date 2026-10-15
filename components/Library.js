"use client";

import { useMemo, useState } from "react";
import { fmtDate, tagList } from "@/lib/format";

const NAMES = { blogs: "Archives", writeups: "Archives", archive: "Archives" };
const MARKS = { blogs: "// archives", writeups: "// archives", archive: "// archives" };

function archiveDate(s) {
  const p = String(s || "").slice(0, 10).split("-");
  if (p.length !== 3) return "";
  const d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  if (Number.isNaN(d.getTime())) return "";
  const day = String(d.getDate()).padStart(2, "0");
  const mon = d.toLocaleDateString("en-US", { month: "short" });
  return `${day} ${mon}`;
}

function Card({ post }) {
  return (
    <a className="card post-card" href={`/post/${post.slug}`}>
      <h3>{post.title || post.slug}</h3>
      {post.summary ? <p>{post.summary}</p> : null}
      <div className="meta">
        <time>{fmtDate(post.date)}</time>
        <span className="tags">{tagList(post.tags).map((t) => <span className="tag" key={t}>{t}</span>)}</span>
      </div>
    </a>
  );
}

export function Library({ posts, view }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const visible = useMemo(() => {
    return posts.filter((p) => {
      if (!query) return true;
      const blob = `${p.title || ""} ${p.summary || ""} ${p.tags || ""} ${p.date || ""}`.toLowerCase();
      return blob.includes(query);
    });
  }, [posts, query]);

  if (view === "archive") {
    const sorted = visible.slice().sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
    const groups = [];
    let year = "";
    let items = [];
    function flush() {
      if (!year) return;
      groups.push(
        <section className="tl-year" key={year}>
          <h2>{year}</h2>
          <ol>{items}</ol>
        </section>
      );
      items = [];
    }
    sorted.forEach((p) => {
      const y = String(p.date || "").slice(0, 4) || "Undated";
      if (y !== year) {
        flush();
        year = y;
      }
      items.push(
        <li key={p.slug}>
          <a href={`/post/${p.slug}`}>
            <time dateTime={p.date || undefined}>{archiveDate(p.date)}</time>
            <span>{p.title || p.slug}</span>
          </a>
        </li>
      );
    });
    flush();

    return (
      <div className="archive">
        <div className="archive-top">
          <p className="archive-crumb"><a href="/">Home</a><span>/</span>Archives</p>
          <label className="search">
            <span className="skip">Search archives</span>
            <input
              id="note-search"
              type="search"
              placeholder="Search..."
              autoComplete="off"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
        </div>
        <h1 className="archive-title">Archives</h1>
        {!posts.length ? <p className="empty">No notes yet.</p> : null}
        <p className="empty" id="search-empty" hidden={visible.length !== 0 || !query}>No notes match that search.</p>
        {groups.length ? <div className="archive-timeline">{groups}</div> : null}
      </div>
    );
  }

  const body = !posts.length
    ? <p className="empty">No notes yet.</p>
    : visible.map((p) => <Card post={p} key={p.slug} />);

  return (
    <>
      <label className="search">
        <span className="label" id="library-label" style={{ display: "block", margin: "0 0 8px" }}>{MARKS[view]}</span>
        <input
          id="note-search"
          type="search"
          placeholder={`Search ${NAMES[view].toLowerCase()}`}
          autoComplete="off"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </label>
      <p className="empty" id="search-empty" hidden={visible.length !== 0 || !query}>No notes match that search.</p>
      <div id="index" className="feed" role="list">{body}</div>
    </>
  );
}
