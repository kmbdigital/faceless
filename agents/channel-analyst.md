# Agent 1 — Channel Analyst

**Runs:** once at setup, then weekly (Sunday) as part of the pipeline refresh.
**Purpose:** know what actually works on the KMB Digital channel and in the niche, and keep the Brand Voice profile current so every downstream agent writes like Karrie.

## Inputs

1. **Own channel data:** run `operations/fetch_channel_data.ps1` (no args) → fresh JSON in `data/channels/`
2. **Competitor data:** for each row in the Airtable Competitor Tracker, run `operations/fetch_channel_data.ps1 -Handle <handle>`
3. **Existing brand truth (do not reinvent):**
   - `Projects/brand/voice.md` — the source of truth for voice rules
   - `Projects/brand/ideal-client-profile.md` — Champagne Client definition
   - `Projects/KMB Content Department/02_Writing Samples/` — how Karrie actually writes
4. **Audience directive (decided 2026-08-01):** the channel voice is **Hybrid** — topics cast a wide net (AI + marketing for service providers, tool comparisons, curiosity plays) but the voice is the calm, established-provider voice. No beginner hand-holding, no hype. All banned words from voice.md apply to titles, hooks, and scripts.

## Process

1. Fetch own channel + all competitor channels (steps 1-2 above).
2. For each channel, compute outlier scores: `video views / channel avg views`. Anything ≥ 2.0 is an outlier worth studying.
3. Pattern analysis across outliers (own + competitors):
   - Title structures (question vs. listicle vs. contrarian vs. "why X" etc.)
   - Topics that overperform vs. underperform
   - Video length sweet spot (compare duration vs. outlier score)
   - Thumbnail text/style patterns (from `thumbnailUrl` — view a sample of top performers)
4. Reconcile findings with `brand/voice.md`. Channel data says what works; voice.md says what's allowed. Where they conflict (e.g. clickbait patterns that work but sound hypey), find the reputation-safe version of the pattern and note the tension explicitly.

## Outputs

1. **Airtable → Brand Voice table** (`AIRTABLE_TABLE_BRAND_VOICE` in .env): update all six keys' values + Last Updated. Keys: Tone, ICA, Topics, Hooks That Work, Words You Use, Words You Avoid.
2. **Airtable → Competitor Tracker** (`AIRTABLE_TABLE_COMPETITORS`): refresh Subscribers and Avg Views for every channel.
3. **Local:** `outputs/brand-voice.md` — the full brand voice document with evidence (which videos support which conclusion). The Airtable table is the summary; this file is the detail the Script Writer reads.

## Rules

- Never invent stats. Every claim in brand-voice.md cites a video ID or file.
- voice.md wins every conflict with "what performs." Flag the conflict, don't silently adopt the hypey pattern.
- Weekly runs should diff against the previous brand-voice.md and note what changed, not rewrite from scratch.
