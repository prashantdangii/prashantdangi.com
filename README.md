# prashantdangi.com

Minimal black & white personal site + blog. Plain HTML/CSS/JS, no build step.
Light theme by default with a toggle (remembered per visitor).

```
.
├── index.html          # home: featured post → discord → about → newsletter
├── blog.html           # ordered list of all posts
├── post.html           # single post view (reads ?slug=)
├── assets/
│   ├── style.css       # all styling (b/w, system fonts, centered)
│   └── site.js         # theme toggle + markdown blog engine
├── blogs/
│   ├── posts.json      # THE ORDER + titles + dates (edit this to publish)
│   └── *.md            # one markdown file per post
├── CNAME · .nojekyll · robots.txt · sitemap.xml
```

---

## Writing a blog post (Jekyll-style)

1. Drop a markdown file in `blogs/`, e.g. `blogs/my-post.md`. Start it with frontmatter:

   ```markdown
   ---
   title: My post title
   date: 2026-08-01
   tags: red-team, recon
   reading: 5 min read
   summary: One-line description.
   ---

   Your **markdown** body here...
   ```

2. Add it to `blogs/posts.json` **at the position you want it shown** (top = first).
   The list order *is* the site order:

   ```json
   [
     { "slug": "my-post", "title": "My post title", "date": "2026-08-01" },
     { "slug": "idor-that-leaked-every-invoice", "title": "…", "date": "2026-07-28" }
   ]
   ```

   `slug` must match the filename without `.md`. The newest/top post is what shows
   in full on the homepage.

That's it — no rebuild. Push and it's live.

---

## Configure your links

Edit the `LINKS` object at the top of **`assets/site.js`**:

```js
var LINKS = {
  discord: "https://discord.gg/your-invite",
  x:       "https://x.com/your-handle",
  github:  "https://github.com/your-handle"
};
```

**Newsletter**: the form in `index.html` posts to [Buttondown](https://buttondown.email)
(free tier). Replace `your-username` in the form `action` with your Buttondown username.
Prefer something else (Mailchimp, ConvertKit, Substack)? Just swap the `<form action>`.

**Email**: search for `hello@prashantdangi.com` and replace with yours.

---

## Local preview

The blog loads files over `fetch`, so open it through a server (not `file://`):

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy (GitHub Pages + Hostinger)

1. `git init && git add . && git commit -m "site" && git branch -M main`
2. Create a public repo, `git remote add origin …`, `git push -u origin main`
3. Repo → Settings → Pages → Source: `main` / root. Add custom domain `prashantdangi.com`.
4. In Hostinger DNS add four `A` records for `@` → `185.199.108.153`,
   `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a `CNAME` for
   `www` → `YOUR-USERNAME.github.io`. Enable **Enforce HTTPS** once the cert issues.
