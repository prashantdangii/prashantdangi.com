---
title: My first 30 minutes on any engagement
date: 2026-07-10
tags: recon, methodology
reading: 4 min read
summary: Before I touch a single exploit, I spend half an hour just looking. Here's the checklist.
---

The most useful part of an engagement is the part with no exploits in it. Before I try
to break anything, I spend the first 30 minutes just **mapping**. Attackers who skip this
step miss the easy wins and trip every alarm on the hard ones.

Here's roughly what those 30 minutes look like.

## 1. Understand the scope like a defender wrote it

Read the rules of engagement twice. What's in scope, what's explicitly out, what's the
blast radius if something goes wrong. If a target isn't listed, it doesn't exist to me.
This isn't bureaucracy — it's what separates a professional from a liability.

## 2. Passive first, always

Nothing that touches the target yet. I want to know what the internet already knows:

- Certificate transparency logs for subdomains (`crt.sh`)
- Public code and secrets (GitHub, old commits, `.env` leaks)
- What the company's own docs and job posts reveal about their stack

You'd be surprised how often a job listing tells you the exact framework, cloud, and
auth provider you're about to test.

## 3. Map the attack surface

Now light-touch enumeration:

```bash
# subdomains -> live hosts -> what's actually running
subfinder -d target.com | httpx -title -tech-detect -status-code
```

I'm not attacking. I'm building a list of *things that exist* and *what they are*.
Every login page, API, admin panel, and forgotten staging box goes in the notes.

## 4. Pick the soft targets

By now a picture forms. The interesting stuff is almost never the polished main app —
it's:

- the **staging** subdomain nobody hardened
- the **API** the mobile app talks to
- the **admin** panel on a non-standard port
- the third-party integration with too much trust

## 5. Write the plan before the exploit

I jot down 3–5 concrete hypotheses to test, ranked by likely impact. Only then do I
start actually poking things. Testing without a hypothesis is just noise.

## The point

Recon isn't the boring bit before the "real" hacking. It *is* the hacking — the exploit
is just the last 5% that the first 95% made obvious. Slow down at the start and the rest
gets a lot faster.

---

*I break into systems before the bad guys do. [Work with me](mailto:hello@prashantdangi.com)
or [join the Discord](/#community) if you want to learn this stuff.*
