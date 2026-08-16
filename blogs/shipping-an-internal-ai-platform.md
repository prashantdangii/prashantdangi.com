---
title: Shipping an internal AI platform that people actually used
date: 2026-08-08
tags: fde, llm, python
reading: 7 min read
summary: Model routing, caching, and a 20% cost cut. The part that mattered was getting it into daily production.
---

The interesting part of the internal AI lab platform was not that it called an LLM. Everyone can call an LLM. The interesting part was that curriculum stakeholders stopped using a $200/month general-purpose subscription and started using *ours*, every day.

That is a Forward Deployed problem: the users are in the building, the constraints are political as much as technical, and "it works in a notebook" is not a ship.

## The problem as it showed up

People needed labs and assignments generated at volume. The existing path was a commercial chatbot and a lot of copy-paste. Cost was predictable in the worst way: pay the same whether you generated one module or three hundred. Quality drifted. Nobody owned the prompt. Nobody owned the bill.

The ask was not "build an AI product." The ask was: make this cheaper, repeatable, and good enough that the team will not go back.

## What I actually built

Python service, owned end to end.

**Request routing / model tiering.** Not every generation needs the expensive model. Short, structured tasks go to a cheaper tier. Long, high-stakes labs go higher. The routing layer is the product, not the prompt file.

**Response caching.** Identical or near-identical requests were being paid for twice. A cache in front of the LLM is the most boring 20% cost win you will ever get, and it is the one that survives a model-vendor change.

**Async batch generation.** High-volume runs cannot sit in a request/response loop. Queue it, generate in batches, write results back. The user-facing path stays snappy. The expensive path runs when it should.

None of this is novel. All of it is the difference between a demo and a system.

## The FDE part

I did not throw an API over the wall. I sat with the people who write curriculum, watched where they waited, and iterated on the output format until they stopped editing it by hand.

Compressed timeline. No separate "ML team." The platform had to land in the same operational world as everything else: how it is deployed, who restarts it, what happens when a vendor 429s.

Daily production use is the metric. Cost down ~20% with no drop in content quality is how we knew the routing was doing work. If they had kept the $200 subscription on the side, we would have failed even with a pretty dashboard.

## What I would repeat

- Put a cache in before you fine-tune anything
- Make model choice a config, not a rewrite
- Measure per-unit cost, not "we use AI"
- Ship with the stakeholder in the loop, or you will polish the wrong artifact

LLM systems fail as products more often than they fail as models. Forward Deployed work is the product failure mode: you are in the room, so you do not get to blame "adoption."

---

*Built while embedded at Scaler. [What FDE actually is](/post.html?slug=what-forward-deployed-engineering-actually-is).*
