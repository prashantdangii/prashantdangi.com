/* prashantdangi.com */

var LINKS = {
  linkedin: "https://www.linkedin.com/in/prashant-dangii/",
  x: "https://x.com/prashantdangii",
  github: "https://github.com/prashantdangii",
  upwork: "https://www.upwork.com/freelancers/~01afc8350492e022fe",
  toptal: "https://www.toptal.com/developers/resume/prashant-dangi",
  skool: "https://www.skool.com/prashantdangi",
  discord: "https://discord.gg/prashantdangi",
  youtube: "https://www.youtube.com/@prashantdangii"
};

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

(function () {
  var els = document.querySelectorAll("[data-reveal]");
  if (!els.length) return;
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  els.forEach(function (el) { io.observe(el); });
})();

(function () {
  var map = {
    "foot-li": LINKS.linkedin,
    "foot-x": LINKS.x,
    "foot-gh": LINKS.github,
    "link-upwork": LINKS.upwork,
    "link-toptal": LINKS.toptal,
    "link-skool": LINKS.skool,
    "link-discord": LINKS.discord,
    "side-x": LINKS.x,
    "side-li": LINKS.linkedin,
    "side-discord": LINKS.discord,
    "side-yt": LINKS.youtube
  };
  Object.keys(map).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.href = map[id];
  });
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();

(function () {
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;
  function sync() {
    var dark = document.documentElement.dataset.theme === "dark";
    btn.setAttribute("aria-pressed", dark ? "true" : "false");
    btn.setAttribute("aria-label", dark ? "Switch to light appearance" : "Switch to dark appearance");
  }
  sync();
  btn.addEventListener("click", function () {
    var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    sync();
  });
})();

function bindMenu() {
  var nav = document.querySelector(".nav");
  var burger = document.querySelector(".nav-burger");
  if (!nav || !burger || nav.dataset.bound) return;
  nav.dataset.bound = "1";
  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  }
  burger.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });
  nav.querySelectorAll(".nav-links a").forEach(function (a) {
    a.addEventListener("click", function () { setOpen(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });
}

(function () {
  var input = document.getElementById("note-search");
  if (!input) return;
  input.addEventListener("input", function () {
    var q = input.value.trim().toLowerCase();
    var shown = 0;
    document.querySelectorAll("#index .post-card").forEach(function (card) {
      var hit = !q || card.textContent.toLowerCase().indexOf(q) !== -1;
      card.hidden = !hit;
      if (hit) shown += 1;
    });
    document.querySelectorAll("#index .year").forEach(function (year) {
      var n = year.nextElementSibling;
      var any = false;
      while (n && !n.classList.contains("year")) {
        if (n.classList.contains("post-card") && !n.hidden) any = true;
        n = n.nextElementSibling;
      }
      year.hidden = !any;
    });
    var empty = document.getElementById("search-empty");
    if (!empty) return;
    empty.hidden = shown !== 0 || !q;
  });
})();

(function () {
  var nav = document.querySelector(".nav");
  if (!nav) return;
  var onScroll = function () {
    nav.classList.toggle("is-scrolled", window.scrollY > 6);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

(function () {
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduce) return;
  document.addEventListener("pointermove", function (e) {
    var el = e.target.closest && e.target.closest(".glass");
    if (!el) return;
    var r = el.getBoundingClientRect();
    el.style.setProperty("--mx", (e.clientX - r.left) + "px");
    el.style.setProperty("--my", (e.clientY - r.top) + "px");
  }, { passive: true });
})();

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
  var p = String(s).slice(0, 10).split("-");
  if (p.length !== 3) return s;
  var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function getManifest() {
  return fetch("/blogs/posts.json", { cache: "no-cache" }).then(function (r) {
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

function tagsHtml(tags) {
  if (!tags) return "";
  return tags.split(/[·,]/).map(function (t) {
    t = t.trim();
    return t ? '<span class="tag">' + esc(t) + "</span>" : "";
  }).join("");
}

function noteRow(p) {
  return (
    '<a class="card post-card" href="/post.html?slug=' + encodeURIComponent(p.slug) + '">' +
      "<h3>" + esc(p.title || p.slug) + "</h3>" +
      (p.summary ? "<p>" + esc(p.summary) + "</p>" : "") +
      '<div class="meta"><time>' + esc(fmtDate(p.date)) + "</time><span class=\"tags\">" + tagsHtml(p.tags) + "</span></div>" +
    "</a>"
  );
}

function filterLibrary(posts, view) {
  if (view === "writeups") return posts.filter(function (p) { return p.kind === "writeup"; });
  if (view === "blogs") return posts.filter(function (p) { return p.kind !== "writeup"; });
  return posts;
}

function archiveHtml(posts) {
  var sorted = posts.slice().sort(function (a, b) {
    return String(b.date || "").localeCompare(String(a.date || ""));
  });
  var html = "";
  var year = "";
  sorted.forEach(function (p) {
    var y = String(p.date || "").slice(0, 4) || "Undated";
    if (y !== year) {
      year = y;
      html += '<p class="year">' + esc(y) + "</p>";
    }
    html += noteRow(p);
  });
  return html;
}

function loadIndex(sel) {
  var el = document.querySelector(sel);
  if (!el) return;
  var limit = Number(el.getAttribute("data-limit")) || 0;
  var view = el.getAttribute("data-view") || "notes";
  getManifest()
    .then(function (posts) {
      el.setAttribute("aria-busy", "false");
      var list = filterLibrary(posts, view);
      if (limit) list = list.slice(0, limit);
      if (!list.length) {
        var empty = view === "writeups" ? "No write ups yet." : view === "blogs" ? "No blogs yet." : "No notes yet.";
        el.innerHTML = '<p class="empty">' + empty + "</p>";
        return;
      }
      el.innerHTML = view === "archive" ? archiveHtml(list) : list.map(noteRow).join("");
    })
    .catch(function () {
      el.setAttribute("aria-busy", "false");
      el.innerHTML = '<p class="empty">Couldn\u2019t load notes.</p>';
    });
}

function loadPost(sel) {
  var el = document.querySelector(sel);
  if (!el) return;
  var slug = new URLSearchParams(location.search).get("slug");
  if (!slug || !/^[a-z0-9\-]+$/i.test(slug)) {
    el.innerHTML = '<p class="empty">This note could not be found. <a href="/blog.html">All notes</a></p>';
    return;
  }
  getPost(slug)
    .then(function (p) {
      var title = p.meta.title || slug;
      document.title = title + " — Prashant Dangi";
      var html = typeof marked !== "undefined" ? marked.parse(p.body) : "<pre>" + esc(p.body) + "</pre>";
      var metaLine = [p.meta.date ? fmtDate(p.meta.date) : "", p.meta.reading || ""].filter(Boolean).join(" · ");
      el.innerHTML =
        '<header class="post-head">' +
          "<h1>" + esc(title) + "</h1>" +
          (p.meta.summary ? '<p class="dek">' + esc(p.meta.summary) + "</p>" : "") +
          '<div class="meta">' +
            (metaLine ? "<time>" + esc(metaLine) + "</time>" : "") +
            (p.meta.tags ? '<span class="tags">' + tagsHtml(p.meta.tags) + "</span>" : "") +
          "</div>" +
        "</header>" +
        '<div class="prose">' + html + "</div>";
    })
    .catch(function () {
      el.innerHTML = '<p class="empty">This note could not be found. <a href="/blog.html">All notes</a></p>';
    });
}

function aiLink(href, label) {
  return '<a href="' + esc(href) + '" target="_blank" rel="noopener">' + esc(label) + "</a>";
}

function aiReply(raw) {
  var s = String(raw || "").toLowerCase().replace(/\s+/g, " ").trim();
  var mail = '<a href="mailto:prxshantdangi@gmail.com?subject=Fractional%20cybersecurity">email</a>';
  var upwork = aiLink(LINKS.upwork, "Upwork");
  var toptal = aiLink(LINKS.toptal, "Toptal");
  var skool = aiLink(LINKS.skool, "Skool");
  var discord = aiLink(LINKS.discord, "Discord");

  if (/(payload|reverse shell|metasploit|0-?day|zero-?day|proof of concept|\bpoc\b|ransomware|\bmalware\b|shellcode|write (me )?(an )?exploit|how (do|can|to) i (hack|exploit|pwn|break)|give me (a |the )?(exploit|payload|shell)|step[- ]by[- ]step)/.test(s)) {
    return "<p>I don't give exploit steps, payloads, or attack procedures.</p><p>If the system is yours, or you have written authorization to test it, send the surface, the timeline, and what done looks like. That can be a scoped engagement. " + mail + ".</p>";
  }
  if (/(price|pricing|cost|rate|how much|budget|fee)/.test(s)) {
    return "<p>There isn't a public rate card. An engagement is scoped to the surface and the time.</p><p>Send the surface, the timeline, and what done looks like by " + mail + ", or start from the " + upwork + " or " + toptal + " profile.</p>";
  }
  if (/(course|skool|discord|curriculum|learn|training|lab)/.test(s)) {
    return "<p>Courses live on " + skool + ". Labs and curriculum follow the same loop as the client work: recon, exploit, report, harden.</p><p>The free " + discord + " group is for lab drops, field notes, and what is changing in offensive security and GRC.</p>";
  }
  if (/(note|blog|writing|article|writeup|write-up)/.test(s)) {
    return '<p>Field notes are on the <a href="/blog.html">notes</a> page. Assessments, identity, pipelines, and what has to happen after a finding.</p>';
  }
  if (/(upwork|toptal|portfolio|profile|linkedin|github)/.test(s)) {
    return "<p>Client work is on " + upwork + " and " + toptal + " (Top 3%). " + aiLink(LINKS.linkedin, "LinkedIn") + " and " + aiLink(LINKS.github, "GitHub") + " are there too.</p>";
  }
  if (/(who are you|what are you|your name)/.test(s)) {
    return "<p>I'm CyberAI for Prashant Dangi's practice. I can walk through offensive security, red teaming, GRC, and how a fractional engagement is scoped.</p><p>For a specific system, " + mail + " is the direct line.</p>";
  }
  if (/(cert|ceh|bennett|background|experience|resume|who is|about you|about prashant|iit|gpcs)/.test(s)) {
    return "<p>Prashant Dangi is a fractional cybersecurity engineer. CEH v12, ISO/IEC 27001:2022 Lead Auditor. Finalist, IIT Madras hardware CTF 2026. Top 10, GPCSSI 2024. B.Tech CSE, Bennett University.</p><p>Independent practice on Upwork and Toptal from 2025. Before that, cybersecurity SME at Scaler Academy and analyst at Ascella Infosec. The <a href=\"/resume.pdf\">resume</a> has the sheet.</p>";
  }
  if (/(start|engag|hire|contact|email|reach|book|kick ?off|scope)/.test(s)) {
    return "<p>An engagement starts with a surface, a timeline, and what done looks like. Not a slide deck.</p><p>Write by " + mail + ", or start from the " + upwork + " and " + toptal + " profiles.</p>";
  }
  if (/(grc|iso|nist|cmmc|audit|annex|compliance|governance|risk)/.test(s)) {
    return "<p>GRC here is ISO 27001, NIST, and CMMC. Risk, policy, and Annex A evidence that survives the audit, grounded in how the systems actually fail.</p><p>The useful version sits next to the test: findings mapped to controls, not a policy pack written in the abstract.</p>";
  }
  if (/(red team|redteam|adversary|att&ck|attack path|assume breach)/.test(s)) {
    return "<p>Red teaming is the path a capable adversary would take with the access you already have. Attack paths, Active Directory, and MITRE ATT&CK.</p><p>A VAPT is the broader assessment: web, API, network, mobile, and cloud, written so engineering can fix it. Red team is narrower and deeper. Both can be scoped. Say which outcome you need.</p>";
  }
  if (/(offensive|vapt|pentest|pen test|assessment|web app|api |mobile)/.test(s)) {
    return "<p>Offensive security covers web, API, network, mobile, and cloud. Twenty-plus assessments. Findings are written so engineering can fix them and an auditor can follow the evidence.</p><p>When the surface is an AI application, that includes prompt injection and the controls around the model. It is in scope when it is the thing being tested.</p>";
  }
  if (/(cloud|aws|azure|gcp)/.test(s)) {
    return "<p>Cloud is part of the assessment work, across AWS, Azure, and GCP. Identity, exposed services, and the path from a finding to a control that holds.</p>";
  }
  if (/(fractional|what do you|services|offer|practice|do you do)/.test(s)) {
    return "<p>Fractional cybersecurity. A senior engineer in the work: offensive security, red teaming, and GRC for teams that need the person, not a slide deck.</p><p>Embedded reviews and security engineering, assessments, and the control work that has to match what the test found.</p>";
  }
  if (/^(hi|hello|hey|yo|sup)[!. ]*$/.test(s)) {
    return "<p>Hello. Ask about the practice, a scoped engagement, or the courses.</p>";
  }
  return "<p>I can talk through the practice: offensive security, red teaming, GRC, courses, and how an engagement starts.</p><p>For a specific system, " + mail + " with the surface and the timeline.</p>";
}

function initLibrary() {
  var view = new URLSearchParams(location.search).get("view") || "blogs";
  if (view !== "blogs" && view !== "writeups" && view !== "archive") view = "blogs";
  var names = { blogs: "Blogs", writeups: "Write ups", archive: "Archive" };
  var marks = { blogs: "// blogs", writeups: "// write ups", archive: "// archive" };
  document.title = names[view] + " — Prashant Dangi";
  var label = document.getElementById("library-label");
  if (label) label.textContent = marks[view];
  var input = document.getElementById("note-search");
  if (input) input.placeholder = "Search " + names[view].toLowerCase();
  document.querySelectorAll("[data-rail]").forEach(function (el) {
    el.hidden = el.getAttribute("data-rail") !== view;
  });
  var index = document.getElementById("index");
  if (index) index.setAttribute("data-view", view);
  loadIndex("#index");
}

function initCyberAI() {
  var form = document.getElementById("composer");
  var input = document.getElementById("chat-input");
  var send = document.getElementById("chat-send");
  var log = document.getElementById("chat-log");
  var empty = document.getElementById("chat-empty");
  var scroll = document.getElementById("chat-scroll");
  if (!form || !input || !log) return;

  var busy = false;

  function fit() {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 140) + "px";
  }
  function syncSend() {
    send.disabled = busy || !input.value.trim();
  }
  function toBottom() {
    scroll.scrollTop = scroll.scrollHeight;
  }
  function userMsg(text) {
    var row = document.createElement("div");
    row.className = "msg msg-user";
    var p = document.createElement("p");
    p.textContent = text;
    row.appendChild(p);
    log.appendChild(row);
  }
  function aiMsg(html) {
    var row = document.createElement("div");
    row.className = "msg msg-ai";
    row.innerHTML = '<span class="msg-name">CyberAI</span><div class="msg-body">' + html + "</div>";
    log.appendChild(row);
  }
  function ask(text) {
    text = String(text || "").trim();
    if (!text || busy) return;
    busy = true;
    empty.hidden = true;
    log.hidden = false;
    userMsg(text);
    input.value = "";
    fit();
    syncSend();
    var typing = document.createElement("div");
    typing.className = "msg msg-ai";
    typing.innerHTML = '<span class="msg-name">CyberAI</span><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>';
    log.appendChild(typing);
    toBottom();
    var wait = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 40 : 480;
    window.setTimeout(function () {
      typing.remove();
      aiMsg(aiReply(text));
      busy = false;
      syncSend();
      toBottom();
      input.focus();
    }, wait);
  }

  input.addEventListener("input", function () { fit(); syncSend(); });
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ask(input.value);
    }
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    ask(input.value);
  });
  document.querySelectorAll("[data-prompt]").forEach(function (btn) {
    btn.addEventListener("click", function () { ask(btn.getAttribute("data-prompt")); });
  });
  syncSend();
}

function pageId() {
  var file = location.pathname.split("/").pop() || "";
  if (!file || file === "index.html") return "home";
  if (file === "blog.html") {
    var view = new URLSearchParams(location.search).get("view");
    if (view === "writeups" || view === "archive") return view;
    return "blogs";
  }
  if (file === "post.html") return "";
  return file.replace(/\.html$/, "");
}

function renderSide() {
  var host = document.getElementById("site-side");
  if (!host) return;
  var current = pageId();
  var ico = {
    home: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/></svg>',
    cyberai: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3.2 13.4 8.6 18.8 10 13.4 11.4 12 16.8 10.6 11.4 5.2 10 10.6 8.6Z"/></svg>',
    services: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
    practice: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/></svg>',
    courses: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z"/></svg>',
    blogs: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6 3.5h9l3.5 3.5V20.5H6zM15 3.5V7h3.5M8.5 12h7M8.5 16h4.5"/></svg>',
    writeups: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M7 3.5h8l4 4V20.5H7zM15 3.5V7.5h4M9.2 13.2l1.8 1.8 3.8-3.8"/></svg>',
    archive: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 7.5h16v2.5H4zM6 10v9.5h12V10"/></svg>',
    contact: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 6h16v12H4zM4 7l8 6 8-6"/></svg>'
  };
  var items = [
    ["home", "/", "Home"],
    ["cyberai", "/cyberai.html", "CyberAI"],
    ["services", "/services.html", "Services"],
    ["practice", "/practice.html", "Practice"],
    ["courses", "/courses.html", "Courses"],
    ["blogs", "/blog.html?view=blogs", "Blogs"],
    ["writeups", "/blog.html?view=writeups", "Write ups"],
    ["archive", "/blog.html?view=archive", "Archive"],
    ["contact", "/contact.html", "Contact"]
  ];
  var links = items.map(function (item) {
    var currentAttr = item[0] === current ? ' aria-current="page"' : "";
    return '<a href="' + item[1] + '"' + currentAttr + ">" + ico[item[0]] + item[2] + "</a>";
  }).join("");
  var mark = current === "home"
    ? '<div class="mark"><img src="/assets/profile.jpg" alt="" width="64" height="64"></div>'
    : '<a class="mark" href="/" aria-label="Home"><img src="/assets/profile.jpg" alt="" width="64" height="64"></a>';
  host.innerHTML =
    '<div class="who">' + mark +
      "<div><strong>Prashant Dangi</strong><span>Security Researcher</span></div>" +
      '<button class="nav-burger" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Menu">' +
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 8h16M4 16h16"/></svg>' +
      "</button></div>" +
    '<nav class="side-nav nav-links" id="nav-links" aria-label="Primary">' + links + "</nav>" +
    '<div class="side-social">' +
      '<a href="mailto:prxshantdangi@gmail.com" aria-label="Email"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 6h16v12H4zM4 7l8 6 8-6"/></svg></a>' +
      '<a id="side-x" href="' + esc(LINKS.x) + '" target="_blank" rel="noopener" aria-label="X"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M14.7 10.3 22.4 2h-1.8l-6.7 7.2L8.6 2H2l8.1 11.2L2 22h1.8l7.1-7.6L15.4 22H22l-7.3-11.7Zm-2.5 2.7-.8-1.1L4.6 3.3h2.8l5.2 7 .8 1.1 6.8 9.3h-2.8l-5.2-7.1Z"/></svg></a>' +
      '<a id="side-li" href="' + esc(LINKS.linkedin) + '" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M4.7 3.3a2.2 2.2 0 1 0 .1 4.4 2.2 2.2 0 0 0-.1-4.4ZM3 9h3.4v12H3V9Zm6.3 0h3.2v1.6h.1c.4-.8 1.5-1.7 3.2-1.7 3.4 0 4 2.2 4 5.1V21H16.4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9.3V9Z"/></svg></a>' +
      '<a id="side-discord" href="' + esc(LINKS.discord) + '" target="_blank" rel="noopener" aria-label="Discord"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.3 5.3A17 17 0 0 0 15 4l-.4.8a16 16 0 0 0-5.2 0L9 4a17 17 0 0 0-4.3 1.3C2.2 9.4 1.5 13.3 1.8 17.2A17 17 0 0 0 7 19.8l.6-1a11 11 0 0 1-1.6-.8l.4-.3a16 16 0 0 0 10.2 0l.4.3c-.5.3-1.1.6-1.6.8l.6 1a17 17 0 0 0 5.2-2.6c.4-4.5-.7-8.3-3.1-11.9zM8.7 14.7c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"/></svg></a>' +
      '<a id="side-yt" href="' + esc(LINKS.youtube) + '" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6 3.3-6 3.3z"/></svg></a>' +
    "</div>";
  bindMenu();
}

renderSide();
