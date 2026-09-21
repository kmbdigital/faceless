# The Muslimah Faceless Business Blueprint for Beginners

Source for the KDP workbook. The `.docx` is generated — edit the content
files and rebuild rather than editing the Word file by hand, or the next
build will overwrite your changes.

## Build

```
npm install docx      # first time only
node build.js
```

Outputs `Muslimah-Faceless-Business-Blueprint.docx` at 6x9in (KDP trim),
Libre Baskerville headings over Lato body, navy `#102A43` and amber `#D6A23E`.

## Files

| File | What it holds |
|---|---|
| `content.js` | Front matter and chapters 1-6 |
| `content2.js` | Chapters 7-15 |
| `build.js` | Renderer and page setup |

Content is a list of typed blocks: `h1`/`h2` headings, `p` paragraphs,
`b` bullets, `prompt` + `lines` for the fill-in rules, `ws` for weak/strong
pairs, `tpl` for email templates, `check` for checkboxes, `audit` for the
Five Signals table, `hooks`/`ideas` for the swipe lists, and `tip`/`note`/
`warn`/`example` for the sidebars.

## Provenance

Rewritten from a PLR source Karrie holds reseller rights to
(*KMB The Faceless Beginners Blueprint*, Canva `DAGGQLZZXuE`, 13,569 words).

Removed on purpose, and worth not reintroducing:

- Every income claim ("$3-5k months", "$97 sales every day", "44k followers")
- All resell-rights and PLR-sourcing instructions — buyers of this book get
  no resale rights
- The original author's handle, and the platforms she named (Stan Store,
  four paid stock-video vendors)
- The "2-3 Reels and 6-8 Stories a day" cadence, replaced with a realistic
  one for a reader with a full-time job

Chapter 6 uses Karrie's own five signals, not the source's, and not the
earlier framework that overlapped another author's toolkit.

## Still thinner than the source

Community (1,012 -> ~650 words) and What You'll Offer (1,138 -> ~700).

## Structure (v4)

17 chapters. content.js holds front matter, copyright, TOC and chapters 1-8;
content2.js holds chapters 9-17 plus the bonus page and back matter.

1 Set Your Intention · 2 Create Your Vision · 3 Build Your Brand · 4 Pick a Platform ·
5 Staying Faceless · 6 Optimising Your Profile · 7 The Five Signals · 8 Is This Halal? ·
9 What You'll Offer · 10 Pricing & Income Goals · 11 Your Freebie · 12 Setting Up Your Shop ·
13 Automate With Email · 14 Building Community · 15 Faceless Marketing - Instagram ·
16 Business Basics · 17 It's Go Time

Chapters 5 and 8 are original, not from the source. Chapter 8 is written as questions
to settle plus space to record answers, with an explicit instruction to take contested
points to someone qualified. It is not, and must not become, a set of rulings.

## Affiliate slots

Marked with {link: ...} blocks rendering as [ LINK: ... ]. Currently open:
Skool, Systeme.io, keyword research tool, templates source, images/stock video source.
Fill these before publishing or remove the block.

## Page count

`python3 pagecount.py` estimates pages by walking word/document.xml. It is an estimate,
not a render - LibreOffice cannot open docx-js output in this environment. Confirm the
real count, and that the total is even, in Word before uploading to KDP.
