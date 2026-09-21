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
