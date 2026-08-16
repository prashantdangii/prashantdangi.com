---
title: CI/CD as a product, not a slide deck
date: 2026-08-04
tags: fde, devops
reading: 6 min read
summary: Security gates that run in the customer's pipeline, handed off as working services.
---

I used to leave customers with a list of tools they should add to CI. SAST. DAST. SCA. Secrets scanning. Everyone agreed. Nobody merged it.

The Forward Deployed version of that work is different. You sit with their DevOps engineer, you open *their* GitHub Actions or GitLab CI file, and you leave a pipeline that already fails on the things you said mattered.

A PDF that says "add Trivy" is advice. A job that runs Trivy on their images is a product.

## Why slideware dies

CI is where good ideas go to wait for a sprint that never comes.

- The platform team is scared of breaking the build
- The security team does not have write access to the workflow
- The first scan returns 4,000 findings and everyone turns it off
- Nobody owns the false positives

If you are not in the repo, you cannot solve any of those. You can only describe them.

## How I ship it inside their pipeline

I pick the gates they can live with on week one. Not the full framework.

Typical first merge, from work with client teams and with Scaler DevOps:

- Secrets scanning on every PR (fails closed, obvious)
- SCA / image scan (Trivy) on the build they already have
- IaC scan (Checkov) if they already commit Terraform
- SAST (SonarQube or equivalent) once the noise is tuned, not on day one at "blocker" for everything

The art is the policy, not the binary. A gate that fails the build on a critical secret is useful. A gate that fails on a rumble of low-severity style findings is how you get the job deleted on Friday.

I pair on the YAML. I make sure a counterpart can explain the job. I do not leave a "security pipeline" only I understand.

## Handover is the feature

When I leave, they should be able to:

- See the job in the same PR checks they already watch
- Know who to ping when it flakes
- Change a severity threshold without a meeting with me

That is the same standard I use for backend work. CI is just another service. Treat it like one.

## What this is not

This is not a pentest. I am not dropping a scanner on a URL and mailing a CSV. This is production engineering with a security bias: the control lives where the code already moves.

If your FDE motion still ends in a slide titled "Recommended tooling," you stopped one step short of the job.

---

*Same loop I used embedding with client engineers and with Scaler's DevOps team. [Get in touch](mailto:prxshantdangi@gmail.com).*
