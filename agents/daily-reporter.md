# Agent 6 — Daily Reporter

**Runs:** daily, last agent in the morning pipeline.
**Purpose:** one email that lets Karrie decide in 60 seconds whether today is a recording day.

## Mechanism

Gmail connector → create a draft addressed to hello@karriemarie.com, subject:
`Content Team Digest — <Day>, <Month> <D>` 
The draft lands in Gmail; Karrie reads it in the morning. (Decided 2026-08-01: drafts via connector, no SMTP/app passwords.)

## Email format

**TODAY'S VIDEO** (if the Script Writer ran)
- Working title
- The recommended hook, quoted in full
- 2-3 sentence script preview + estimated read/record time
- Shelf life note: "record within X days" for news topics, "evergreen" otherwise

**TOP OUTLIERS** (from today's scan)
- 3-5 rows max: title — channel — score (or pace note for young videos)
- One line on why the #1 was picked (or why nothing qualified)

**STATUS**
- Script: ready / not written / carried over from yesterday
- Thumbnails: N concepts ready / waiting on script / blocked (e.g. no headshots)
- Anything needing Karrie's input, stated as a specific question

**MILESTONE CHECK** (silent until triggered)
- Count YT Content Calendar records with Status = Published. When the count first reaches 4: add a section to the digest — "Milestone: 4 videos published. You asked to revisit the advanced editing pipeline (overlays/zooms) at this point — see README Phase 3." Repeat in every digest until Karrie acknowledges, then drop it.

**LINKS**
- Airtable base (the dashboard of record): https://airtable.com/appAmKA5Mqvbfk8yv
- Script file path if one exists

## Rules

- The email reports; it never pressures. Job-search gate comes first (Q3 2026); a fine daily outcome is "nothing worth your time today."
- Honest empty states: if the scout found nothing ≥2x, say so plainly. Never inflate a 1.1x into an "opportunity."
- Plain text over heavy formatting. It should read like a competent assistant's morning note, not a newsletter.
- Every fact in the email traces to today's data files or Airtable records.
