---
title: What Forward Deployed Engineering actually is
date: 2026-08-15
tags: fde, delivery
reading: 6 min read
summary: Not consulting. Not a pentest. Sit with the team, ship in their repo, leave working software.
---

People hear "Forward Deployed Engineer" and map it onto whatever they already know. Consultant. Solutions engineer. Pentester who stays for the remediation. Trainer who embeds with DevOps.

None of those are the job.

The job is: sit with a customer team that has a messy production problem, turn it into a shippable slice, and leave working software in *their* environment. You are measured by whether the thing is live, not by whether the deck was clear.

## What it is not

It is not a greenfield rewrite. If you need a clean repo, a new cloud account, and six weeks of "alignment," you are doing product engineering somewhere else.

It is not a report. I have written plenty of those. A report is a handoff. FDE is the opposite: you stay until the change is in their pipeline, their auth, their data, their on-call.

It is not theatre. Demo on a laptop, screenshot in Notion, everyone nods. Then nobody can run it on Monday. If it does not run in their CI, it is not done.

## What the week actually looks like

You join their Slack. You clone their repo. You get a broken staging URL and a stakeholder who can only meet after 6pm. The problem statement is three sentences and two of them contradict.

Day one is mapping: who owns the system, what is actually in production, where the constraints are (Active Directory, an old Jenkins box, an LLM bill that shocked finance). You do not propose a platform. You find the smallest slice that would make next week better.

Then you prototype in their stack. Python if that is what they run. Their API conventions, their auth, their deploy path. You pair with whoever will inherit it. You argue about names. You ship a pull request they can revert.

That loop -- scope, prototype, integrate, handover -- is the whole job.

## Why I write about this

I spent the first half of 2026 embedded with DevOps at Scaler, shipping backend features and LLM-integrated services on an AI learning platform used by thousands of learners. In parallel I owned an internal AI lab platform: routing, caching, batch generation, cost down ~20%, now in daily production.

Before that I sat inside 20+ client engineering teams and shipped in their codebases: auth, APIs, CI/CD gates that run in *their* GitHub Actions, not in a PDF.

I also productized a Forward Deployed Engineer playbook so other engineers could do the same thing: show up, embed, ship on-site.

This site is field notes from that work. Not a course. Not a threat-intel blog. Notes from being in the repo.

## The test I use

If a hiring manager asks what I do, I do not start with tools. I start with this:

> Last time I embedded with a team, what did they have on Friday that they did not have on Monday -- and can they still run it without me?

If I cannot answer that, I was visiting. I was not deployed.

---

*This is the same loop I use on fractional engagements. [Write to me](mailto:prxshantdangi@gmail.com?subject=Fractional%20cybersecurity).*
