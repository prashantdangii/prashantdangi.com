/* prashantdangi.com — theme + tiny markdown blog engine */

/* ---------- config: edit these ---------- */
var LINKS = {
  discord: "https://discord.gg/your-invite",
  x:       "https://x.com/your-handle",
  github:  "https://github.com/your-handle"
};

/* ---------- theme toggle ---------- */
(function () {
  var root = document.documentElement;
  if (!root.dataset.theme) root.dataset.theme = "light";
  var btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.addEventListener("click", function () {
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }
})();

/* ---------- scroll reveal ---------- */
(function () {
  var els = document.querySelectorAll("[data-reveal]");
  if (!els.length) return;
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) { io.observe(el); });
})();

/* ---------- wire up links + year ---------- */
(function () {
  var map = {
    "discord-cta": LINKS.discord,
    "foot-discord": LINKS.discord,
    "foot-x": LINKS.x,
    "foot-gh": LINKS.github
  };
  Object.keys(map).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.href = map[id];
  });
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();

/* ---------- markdown frontmatter parser ---------- */
// posts start with a YAML-ish block:
// ---
// title: ...
// date: 2026-07-30
// tags: red-team, recon
// summary: one line
// ---
function parseFrontmatter(raw) {
  var meta = {};
  var body = raw;
  var m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (m) {
    body = raw.slice(m[0].length);
    m[1].split("\n").forEach(function (line) {
      var i = line.indexOf(":");
      if (i === -1) return;
      var key = line.slice(0, i).trim();
      var val = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
      meta[key] = val;
    });
  }
  return { meta: meta, body: body };
}

function fmtDate(s) {
  if (!s) return "";
  var d = new Date(s);
  if (isNaN(d)) return s;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function getManifest() {
  return fetch("/blogs/posts.json", { cache: "no-cache" })
    .then(function (r) {
      if (!r.ok) throw new Error("no manifest");
      return r.json();
    });
}

function getPost(slug) {
  return fetch("/blogs/" + slug + ".md", { cache: "no-cache" })
    .then(function (r) {
      if (!r.ok) throw new Error("missing post: " + slug);
      return r.text();
    })
    .then(parseFrontmatter);
}

function renderMeta(meta) {
  var bits = [];
  if (meta.date) bits.push(fmtDate(meta.date));
  if (meta.reading) bits.push(meta.reading);
  var tags = (meta.tags || "")
    .split(",")
    .map(function (t) { return t.trim(); })
    .filter(Boolean)
    .map(function (t) { return '<span class="tag">' + t + "</span>"; })
    .join("");
  return '<p class="meta">' + bits.join(" · ") + tags + "</p>";
}

/* ---------- homepage: blog blocks (cards, not full posts) ---------- */
function loadBlocks(sel, limit) {
  var el = document.querySelector(sel);
  if (!el) return;
  getManifest()
    .then(function (posts) {
      if (!posts.length) { el.innerHTML = '<p class="muted">No posts yet. Add your first markdown file in <code>/blogs</code>.</p>'; return; }
      var list = posts.slice(0, limit || posts.length);
      el.innerHTML = list
        .map(function (p, i) {
          var num = String(i + 1).padStart(2, "0");
          var tags = p.tags ? '<span class="bc-tags">' + p.tags + "</span>" : "";
          return (
            '<a class="blog-card" href="/post.html?slug=' + p.slug + '">' +
            '<div class="bc-top"><span class="bc-num">' + num + "</span>" +
            '<span class="bc-date">' + fmtDate(p.date) + "</span></div>" +
            '<h3 class="bc-title">' + (p.title || p.slug) + "</h3>" +
            (p.summary ? '<p class="bc-sum">' + p.summary + "</p>" : "") +
            '<span class="bc-read">Read writeup <b>→</b></span>' +
            tags +
            "</a>"
          );
        })
        .join("");
    })
    .catch(function () {
      el.innerHTML = '<p class="muted">Couldn\'t load posts.</p>';
    });
}

/* ---------- blog index ---------- */
function loadIndex(sel) {
  var el = document.querySelector(sel);
  if (!el) return;
  getManifest()
    .then(function (posts) {
      if (!posts.length) { el.innerHTML = '<li class="muted">No posts yet.</li>'; return; }
      el.innerHTML = posts
        .map(function (p, i) {
          var num = String(i + 1).padStart(2, "0");
          return (
            "<li><a href=\"/post.html?slug=" + p.slug + "\">" +
            '<span class="idx-num">' + num + "</span>" +
            '<span class="idx-title">' + (p.title || p.slug) + '<span class="idx-arrow"> →</span></span>' +
            '<span class="idx-date">' + fmtDate(p.date) + "</span>" +
            "</a></li>"
          );
        })
        .join("");
    })
    .catch(function () {
      el.innerHTML = '<li class="muted">Couldn\'t load posts.</li>';
    });
}

/* ---------- single post ---------- */
function loadPost(sel) {
  var el = document.querySelector(sel);
  if (!el) return;
  var slug = new URLSearchParams(location.search).get("slug");
  if (!slug || !/^[a-z0-9\-]+$/i.test(slug)) {
    el.innerHTML = '<p class="muted">Post not found. <a href="/blog.html">Back to blog</a>.</p>';
    return;
  }
  getPost(slug)
    .then(function (p) {
      var title = p.meta.title || slug;
      document.title = title + " — Prashant Dangi";
      el.innerHTML = "<h1>" + title + "</h1>" + renderMeta(p.meta) + marked.parse(p.body);
    })
    .catch(function () {
      el.innerHTML = '<p class="muted">Post not found. <a href="/blog.html">Back to blog</a>.</p>';
    });
}
