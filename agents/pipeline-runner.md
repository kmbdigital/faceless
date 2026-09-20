# Agent 8 — Pipeline Runner

**Trigger:** Karrie says "run the daily pipeline" (or a scheduled session starts with that instruction).
**Purpose:** execute the whole morning sequence in order, with skip logic, and log the run.

## Order

1. **(Sundays only) Channel Analyst refresh** — `agents/channel-analyst.md`: re-fetch all channels, refresh Competitor Tracker stats, diff and update brand voice.
2. **Trend Scout** — `agents/trend-scout.md`
3. **Script Writer** — `agents/script-writer.md`
4. **Thumbnail Designer** — `agents/thumbnail-designer.md`
5. **Daily Reporter** — `agents/daily-reporter.md`
6. **Dashboard** — regenerate the four files in `dashboard/` with today's data (replace the marked DATA/SCRIPT blocks only; never touch the rest of the file).

Agent 5 (Video Editor / Descript) is NOT in the morning pipeline — it runs on demand after Karrie records, via the Descript connector (`agents/video-editor.md`).

## Skip rules

- **No qualifying outlier** (nothing ≥2x and nothing pacing hard) → skip Script Writer. An unrecorded script from a previous day carries over instead; note it.
- **No script today and no carryover** → skip Thumbnail Designer.
- **No headshots in assets/headshots/ yet** → Thumbnail Designer produces concept specs only, no face mockups.
- **Daily Reporter ALWAYS runs** — honest empty states included.
- **Dashboard ALWAYS runs** — stale recording tools are worse than empty ones.
- Any agent erroring does not stop the pipeline: note the failure, continue, and the Reporter includes it in STATUS.

## Partial runs

"Run trend scout only" / "run pipeline from script writer" are valid — execute the named slice, same skip rules, Reporter + Dashboard still close it out if the run reaches them.

## Logging

Append one line per run to `logs/pipeline-log.md`:
`YYYY-MM-DD HH:mm | full/partial | outliers found: N | script: yes/no/carryover | thumbs: N concepts | digest: drafted/failed | notes`

## Standing rules

- Every fact traces to data files, Airtable, or verified sources. No inventions, anywhere in the chain.
- Voice rules (`outputs/brand-voice.md` + `Projects/brand/voice.md`) bind every word the pipeline produces.
- The pipeline informs; Karrie decides. Job-search gate (Q3 2026) outranks everything here.
