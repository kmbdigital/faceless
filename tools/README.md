# tools/

Standalone HTML tools. Not part of the video pipeline.

## flood-your-funnel.html

An interactive version of the *Flood Your Funnel With Traffic!* PDF
(KMB Digital Inc.). One self-contained file — no build step, no
dependencies beyond Google Fonts. Open it, or upload it anywhere that
serves static HTML.

- The full guide text is reproduced **word for word** from the PDF,
  including every affiliate link.
- A 10-question diagnostic scores all 57 strategies against the reader's
  budget, hours, visibility, strengths, audience, buyers, tech comfort
  and network, then names **one** channel to start with, two backups,
  and the strategies she can rule out (with the reason for each).
- Answers, the 3-field plan and per-strategy notes save to the visitor's
  own browser (`localStorage`, key `fyf-traffic-quiz-v1`). Nothing is
  sent anywhere.
- "Download my answers" writes a plain-text plan.

The questions, the scoring weights and the recommendations are **not**
from the PDF — the PDF contains no questions. They are an editorial
layer on top of it. Scoring lives in the `ATTRS` and `QUESTIONS` objects
in the inline `<script>`; adjust the weights there.

Note: this is a KMB Digital Consulting asset, not a faceless-channel
asset. See `CLAUDE.md` — the two brands are kept separate.
