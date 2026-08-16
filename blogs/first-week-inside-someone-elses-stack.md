---
title: The first week inside someone else's production stack
date: 2026-08-12
tags: fde, onboarding
reading: 6 min read
summary: How I spend the first days embedded with a customer team before I write a line that matters.
---

The first week is where Forward Deployed work is won or wasted. Write code too early and you have built the wrong thing in the wrong place. Wait too long and you are a visitor taking notes.

This is the week I actually run when I embed with a customer team.

## Day 0: access is the product

Before architecture, I need to *be* in their system.

- Repo access, not a zip of last quarter's code
- Staging that resembles production, even if it is ugly
- A Slack or Teams channel where the people who own the system actually talk
- One named counterpart who can say yes to a small change

If any of that is missing, the first deliverable is not a feature. It is unblocking myself. FDE that waits two weeks for a VPN is not embedded. It is queued.

## Days 1-2: map the constraints, not the dream architecture

I do not start with a target architecture. I start with what cannot move.

Typical constraints from the last year of client work:

- Auth is Active Directory, or a session store nobody wants to touch
- Deploy is GitHub Actions with three jobs that already take 18 minutes
- The LLM bill is the reason you were invited
- Staging data is a sanitized subset, so your happy path will lie to you

I write these down in the same doc the team uses. Not a private notebook. If the constraint is not shared, I will invent around it and they will reject the PR.

I also ask who gets paged. The person who gets paged is the real product owner.

## Day 3: pick a slice you can revert

The first change has to be:

1. Visible to the counterpart
2. Reversible
3. In *their* repo, on *their* pipeline

A caching layer in front of a redundant LLM call. A missing ownership check on an API the team already suspected. A secrets scan job that fails the build they already run.

The point is not brilliance. The point is proving we can ship together. After that, scope can grow.

## What I refuse to do in week one

- A four-week discovery deck
- A rewrite of their auth "the right way" on a side branch they will never merge
- A demo that only runs on my machine
- Naming the project after myself

If it cannot merge, it is not a first-week win.

## What good looks like by Friday

The counterpart can point at a merged PR and say what it does. Staging reflects it. Someone besides me knows how to roll it back.

That is the whole first week. After that you have earned the right to work on the harder thing they actually hired you for.

---

*This is the onboarding loop I used across 20+ client teams and inside Scaler's DevOps org. [More notes](/blog.html).*
