---
title: The IDOR that leaked every invoice in a fintech app
date: 2026-07-28
tags: web, idor, fintech
reading: 5 min read
summary: A single predictable ID exposed every customer's invoices. Here's how I found it and how they fixed it.
---

Most of the "critical" bugs I report aren't clever. They're boring — and boring is
exactly what gets shipped to production because nobody thinks to test for it.

Here's one from a recent fintech engagement. Names and numbers changed; the lesson isn't.

## The setup

The app let logged-in users download their invoices from an endpoint like this:

```http
GET /api/v2/invoices/48213/pdf
Authorization: Bearer <token>
```

The `48213` is an invoice ID. My own account had a handful of these, all sequential-ish.
Whenever I see a raw integer in a URL that maps to a record, the first question is always
the same: **does the server check that this record belongs to me?**

## The test

I grabbed a fresh, low-privilege account and requested an invoice ID that clearly
wasn't mine:

```http
GET /api/v2/invoices/1/pdf
Authorization: Bearer <my-token>
```

The server happily returned a PDF — for a completely different customer. No 403, no
ownership check. This is a textbook **Insecure Direct Object Reference (IDOR)**.

Because the IDs were roughly sequential, a trivial loop would walk the entire range:

```bash
for id in $(seq 1 60000); do
  curl -s -H "Authorization: Bearer $TOKEN" \
    "https://target/api/v2/invoices/$id/pdf" \
    -o "out/$id.pdf"
done
```

Every invoice in the system — customer names, amounts, bank references — readable by
any authenticated user. I stopped after proving three records I didn't own and wrote it up.

## Why it happened

The controller authenticated the request (valid token) but never **authorized** it
(is this resource yours?). Authentication and authorization get conflated constantly.
A valid login is not permission to read arbitrary data.

## The fix

Two layers, both cheap:

1. **Scope every query to the caller.** Don't fetch by ID then check ownership — fetch
   by ID *and* owner in the same query, so a mismatch returns "not found":

   ```sql
   SELECT * FROM invoices WHERE id = ? AND user_id = ?;
   ```

2. **Stop leaking enumeration hints.** Swap sequential integers for UUIDs so IDs can't
   be walked. This is defense in depth, not a fix on its own — the query scope above is
   what actually closes the hole.

They shipped both within a week. I retested for free and confirmed it was dead.

## Takeaway

If your app exposes record IDs, assume someone will change them. Test every
object-fetching endpoint with a second account and ask one question: *can user A read
user B's data?* You'll find more of these than you'd like.

---

*Want this kind of testing on your app? [Get in touch](mailto:hello@prashantdangi.com).*
