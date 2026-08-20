# prashantdangi.com

Personal site of **Prashant Dangi**, cybersecurity professional
(CEH v12, ISO/IEC 27001:2022 Lead Auditor).
Plain HTML/CSS/JS, no build step. GitHub Pages + custom domain.

```
.
├── index.html          # cybersecurity homepage: work, experience, method, writing, about
├── blog.html           # ordered list of all posts
├── post.html           # single post view (reads ?slug=)
├── resume.pdf          # current resume
├── assets/
│   ├── style.css
│   └── site.js
├── blogs/
│   ├── posts.json      # THE ORDER + titles + dates (edit this to publish)
│   └── *.md
├── CNAME · .nojekyll · robots.txt · sitemap.xml
```

## Writing a post

1. Drop a markdown file in `blogs/`, e.g. `blogs/my-post.md`, with frontmatter:

   ```markdown
   ---
   title: My post title
   date: 2026-08-16
   tags: vapt, recon
   reading: 5 min read
   summary: One-line description.
   ---

   Body here.
   ```

2. Add it to `blogs/posts.json` **at the position you want it shown** (top = first).
   `slug` must match the filename without `.md`.

## Local preview

The blog loads files over `fetch`, so open it through a server (not `file://`):

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Links

Edit `LINKS` in `assets/site.js` for LinkedIn, X, and GitHub.
Email on the site is `prxshantdangi@gmail.com`.
