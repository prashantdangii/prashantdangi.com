/* prashantdangi.com — links + reveal (blog engine kept for later) */

var LINKS = {
  linkedin: "https://www.linkedin.com/in/prashant-dangii/",
  x:        "https://x.com/prashantdangii",
  github:   "https://github.com/prashantdangii"
};

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

(function () {
  var map = {
    "foot-li": LINKS.linkedin,
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

/* ---------- markdown blog helpers (for when blogs go live) ---------- */
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

function loadBlocks(sel, limit) {
  var el = document.querySelector(sel);
  if (!el) return;
  getManifest()
    .then(function (posts) {
      if (!posts.length) {
        el.innerHTML = '<p class="coming"><span class="cursor-block"></span> no posts yet</p>';
        return;
      }
      var list = posts.slice(0, limit || posts.length);
      el.innerHTML = list
        .map(function (p, i) {
          var num = String(i + 1).padStart(2, "0");
          return (
            '<a class="blog-row" href="/post.html?slug=' + p.slug + '">' +
            '<span class="bc-num">' + num + "</span>" +
            '<span class="bc-title">' + (p.title || p.slug) + "</span>" +
            '<span class="bc-date">' + fmtDate(p.date) + "</span>" +
            "</a>"
          );
        })
        .join("");
    })
    .catch(function () {
      el.innerHTML = '<p class="coming">couldn\'t load posts</p>';
    });
}

function loadIndex(sel) {
  var el = document.querySelector(sel);
  if (!el) return;
  getManifest()
    .then(function (posts) {
      if (!posts.length) { el.innerHTML = '<li>no posts yet</li>'; return; }
      el.innerHTML = posts
        .map(function (p, i) {
          var num = String(i + 1).padStart(2, "0");
          return (
            "<li><a href=\"/post.html?slug=" + p.slug + "\">" +
            '<span class="idx-num">' + num + "</span> " +
            (p.title || p.slug) +
            " <span class=\"idx-date\">" + fmtDate(p.date) + "</span></a></li>"
          );
        })
        .join("");
    })
    .catch(function () {
      el.innerHTML = "<li>couldn't load posts</li>";
    });
}

function loadPost(sel) {
  var el = document.querySelector(sel);
  if (!el) return;
  var slug = new URLSearchParams(location.search).get("slug");
  if (!slug || !/^[a-z0-9\-]+$/i.test(slug)) {
    el.innerHTML = '<p>post not found. <a href="/">home</a></p>';
    return;
  }
  getPost(slug)
    .then(function (p) {
      var title = p.meta.title || slug;
      document.title = title + " — Prashant Dangi";
      el.innerHTML = "<h1>" + title + "</h1><p class=\"meta-line\">" +
        (p.meta.date ? fmtDate(p.meta.date) : "") + "</p>" +
        (typeof marked !== "undefined" ? marked.parse(p.body) : "<pre>" + p.body + "</pre>");
    })
    .catch(function () {
      el.innerHTML = '<p>post not found. <a href="/">home</a></p>';
    });
}
