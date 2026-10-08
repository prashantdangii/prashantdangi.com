# prashantdangi.com

Personal site of **Prashant Dangi**, cybersecurity professional
(CEH v12, ISO/IEC 27001:2022 Lead Auditor).
Next.js App Router. Deploy on Vercel.

```
.
├── app/                # pages, layout, sitemap, robots
├── components/         # sidebar, library, CyberAI, newsletter, Toptal badge
├── lib/                # posts, links, CyberAI replies
├── public/             # images and resume.pdf
├── blogs/
│   ├── posts.json      # THE ORDER + titles + dates (edit this to publish)
│   └── *.md
└── CNAME
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

```bash
npm install
npm run dev
# visit http://localhost:3000
```

`npm run build` then `npm start` is the production server.

## Links

Edit `LINKS` in `lib/links.js` for LinkedIn, X, GitHub, Upwork, Toptal, Skool, Discord, and YouTube.
Email on the site is `prxshantdangi@gmail.com`.
