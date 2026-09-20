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
- "Download my plan" writes a plain-text plan, gated behind an email
  opt-in (see below).

### The email gate

The result panel, the ranking and the guide are all free. Only the
downloadable plan asks for an email. The flow:

1. Visitor answers all ten questions and sees their channel.
2. They click **Download my plan** → a dialog explains the plan comes
   by email.
3. **Send it to me** sends them to the Systeme.io opt-in page, which
   already tags them, emails the PDF and subscribes them to a campaign
   (automation rule on funnel step *Flood Your Funnel With Traffic
   Guide Lead Magnet*).
4. The Systeme.io thank-you page needs a button pointing back at this
   page with `?unlocked=1` on the end. That flips the gate open, stores
   it in the browser and starts the download automatically.

**Setup still needed in Systeme.io:** add that return button to the
thank-you page at `/fyf-ty`, pointing at
`https://<wherever-this-page-lives>/?unlocked=1`.

Anyone already on the list can click *Already on Karrie's list? Unlock
it here* to skip the round trip. The gate is deliberately soft — it is
a lead magnet, not a paywall.

To change the opt-in URL or switch the gate off, edit the `GATE` object
near the top of the inline `<script>`. Nothing else needs touching.

There is no inline email field because a static page cannot POST to
Systeme.io without exposing an API key in the page source. An inline
form would need a small serverless proxy holding the key.

The questions, the scoring weights and the recommendations are **not**
from the PDF — the PDF contains no questions. They are an editorial
layer on top of it. Scoring lives in the `ATTRS` and `QUESTIONS` objects
in the inline `<script>`; adjust the weights there.

Note: this is a KMB Digital Consulting asset, not a faceless-channel
asset. See `CLAUDE.md` — the two brands are kept separate.
