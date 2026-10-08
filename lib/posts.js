import fs from "fs";
import path from "path";
import { marked } from "marked";
import { fmtDate, tagList } from "./format";

export { fmtDate, tagList };

const root = process.cwd();

export function getPosts() {
  const raw = fs.readFileSync(path.join(root, "blogs/posts.json"), "utf8");
  return JSON.parse(raw);
}

export function filterLibrary(posts, view) {
  if (view === "writeups") return posts.filter((p) => p.kind === "writeup");
  if (view === "blogs") return posts.filter((p) => p.kind !== "writeup");
  return posts;
}

function parseFrontmatter(raw) {
  const meta = {};
  let body = raw;
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (m) {
    body = raw.slice(m[0].length);
    m[1].split("\n").forEach((line) => {
      const i = line.indexOf(":");
      if (i === -1) return;
      const key = line.slice(0, i).trim();
      const val = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
      meta[key] = val;
    });
  }
  return { meta, body };
}

export function getPost(slug) {
  if (!slug || !/^[a-z0-9-]+$/i.test(slug)) return null;
  const file = path.join(root, "blogs", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const parsed = parseFrontmatter(fs.readFileSync(file, "utf8"));
  const listed = getPosts().find((p) => p.slug === slug);
  return {
    slug,
    meta: parsed.meta,
    html: marked.parse(parsed.body),
    kind: listed?.kind || "blog"
  };
}

export function libraryView(raw) {
  if (raw === "writeups" || raw === "archive" || raw === "blogs") return raw;
  return "blogs";
}
