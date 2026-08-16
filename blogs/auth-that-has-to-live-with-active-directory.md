---
title: Auth that has to live with Active Directory
date: 2026-07-22
tags: fde, backend
reading: 6 min read
summary: Re-architecting login and session in a stack you did not choose, without a greenfield rewrite.
---

The cleanest auth system I have ever designed was never deployed. It lived in a side repo, used a nice identity provider, and assumed we could cut over on a weekend.

The ones that shipped were uglier. They had to live next to Active Directory, an existing session cookie, and a team that would not freeze logins for a rewrite.

That is the Forward Deployed constraint. You do not get to pick the identity store. You get to make the one they have less wrong, then leave them able to operate it.

## The actual problem

On client engagements the request was rarely "build OIDC." It was:

- Users can reach records they should not
- Sessions do not expire the way the policy says
- Service accounts and human users share a path
- AD is the source of truth and the app invented a second one

You cannot fix that from a threat model slide. You fix it in their codebase: middleware, session store, authorization checks on the object, not just on the route.

## How I work it without a rewrite

**Map what already issues a credential.** Cookie, bearer token, AD group, API key in a header. Write it down with the counterpart. If two of those exist, that is the bug.

**Change authorization where the data is loaded.** Route-level "is logged in" is not ownership. The query has to be scoped to the caller. This is boring and it is where the real holes were.

**Keep AD as the source of truth if that is the political reality.** Sync groups. Do not invent a parallel user table that drifts. If we need app-level roles, derive them from what AD already has, with an explicit mapping someone can audit.

**Ship in slices.** Session timeout first. Then object-level checks on the two endpoints that handle money or patient data. Then the rest. A big-bang auth rewrite is how you get a rollback at 11pm.

## What I will not do

I will not drop in a new identity product because it is on a vendor slide. If the customer is an AD shop, I am an AD shop for the duration of the embed.

I will not leave them with "we should move to OIDC" as the only artifact. If OIDC is the path, there is a PR that starts the migration and a counterpart who can finish it.

## Why this is FDE, not AppSec theatre

AppSec can tell you the session flag is wrong. FDE is sitting with the backend engineer, changing the session code, watching staging, and making sure the AD-joined laptops still sign in on Monday.

The stack was not mine. The production users were not a test account. The measure of done was logins still working *and* the broken authorization path closed.

That is the work I want to keep doing: inside the customer's constraints, in their repo, until the change is live.

---

*From client-embedded backend work across web and API systems. [How I spend week one](/post.html?slug=first-week-inside-someone-elses-stack).*
