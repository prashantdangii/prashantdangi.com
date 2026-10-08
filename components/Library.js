"use client";

import { useMemo, useState } from "react";
import { fmtDate, tagList } from "@/lib/format";

const NAMES = { blogs: "Blogs", writeups: "Write ups", archive: "Archive" };
const MARKS = { blogs: "// blogs", writeups: "// write ups", archive: "// archive" };

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

  let body;
  if (!posts.length) {
    const empty = view === "writeups" ? "No write ups yet." : view === "blogs" ? "No blogs yet." : "No notes yet.";
    body = <p className="empty">{empty}</p>;
  } else if (view === "archive") {
    const sorted = visible.slice().sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
    const blocks = [];
    let year = "";
    sorted.forEach((p) => {
      const y = String(p.date || "").slice(0, 4) || "Undated";
      if (y !== year) {
        year = y;
        blocks.push(<p className="year" key={`y-${y}`}>{y}</p>);
      }
      blocks.push(<Card post={p} key={p.slug} />);
    });
    body = blocks;
  } else {
    body = visible.map((p) => <Card post={p} key={p.slug} />);
  }

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
