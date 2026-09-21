const d = require('docx');
const {Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle,
       PageBreak, Table, TableRow, TableCell, WidthType, ShadingType, LevelFormat} = d;
const fs = require('fs');

const NAVY = "102A43", AMBER = "D6A23E", CHAR = "2B2B2B", GREY = "6B6B6B";
const SERIF = "Libre Baskerville", SANS = "Lato";

const out = [];
const P = (o) => out.push(new Paragraph(o));

// a workbook writing line
const wline = () => new Paragraph({
  spacing: {before: 170, after: 0},
  border: {bottom: {style: BorderStyle.SINGLE, size: 4, color: "C9C2B8", space: 4}},
  children: [new TextRun({text: " ", font: SANS})]
});

function body(text, opts = {}) {
  P({spacing: {after: 150, line: 300},
     children: [new TextRun({text, font: SANS, size: 21, color: CHAR, italics: !!opts.i})]});
}

for (const item of [].concat(require('./content.js'), require('./content2.js'))) {

  if (item.front) {
    P({spacing: {before: 2200, after: 0}, alignment: AlignmentType.CENTER,
       children: [new TextRun({text: "THE MUSLIMAH", font: SERIF, size: 44, color: NAVY})]});
    P({spacing: {after: 0}, alignment: AlignmentType.CENTER,
       children: [new TextRun({text: "FACELESS BUSINESS", font: SERIF, size: 44, color: NAVY})]});
    P({spacing: {after: 260}, alignment: AlignmentType.CENTER,
       children: [new TextRun({text: "BLUEPRINT", font: SERIF, size: 44, color: NAVY})]});
    P({spacing: {after: 420}, alignment: AlignmentType.CENTER,
       children: [new TextRun({text: "f o r   b e g i n n e r s", font: SANS, size: 22, color: AMBER, bold: true})]});
    P({spacing: {after: 80}, alignment: AlignmentType.CENTER,
       children: [new TextRun({text: "Karrie Noor Chariton", font: SANS, size: 24, color: CHAR})]});
    P({spacing: {after: 1400}, alignment: AlignmentType.CENTER,
       children: [new TextRun({text: "KMB Digital Consulting", font: SANS, size: 19, color: GREY})]});
    P({spacing: {after: 100}, alignment: AlignmentType.CENTER,
       children: [new TextRun({text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", font: SERIF, size: 30, color: NAVY})]});
    P({spacing: {after: 60}, alignment: AlignmentType.CENTER,
       children: [new TextRun({text: "Bismillah ir-Rahman ir-Raheem", font: SANS, size: 20, color: CHAR, italics: true})]});
    P({spacing: {after: 0}, alignment: AlignmentType.CENTER,
       children: [new TextRun({text: "In the name of Allah, the Most Merciful, the Most Kind.", font: SANS, size: 18, color: GREY, italics: true})]});
    P({children: [new PageBreak()]});
    continue;
  }

  if (item.pb) { P({children: [new PageBreak()]}); continue; }

  if (item.h1) {
    P({spacing: {before: 120, after: 0},
       children: [new TextRun({text: item.h1.toUpperCase(), font: SANS, size: 19, bold: true, color: AMBER, characterSpacing: 60})]});
    if (item.sub) {
      P({spacing: {before: 90, after: 0}, heading: HeadingLevel.HEADING_1,
         children: [new TextRun({text: item.sub, font: SERIF, size: 36, color: NAVY})]});
      P({spacing: {before: 120, after: 320},
         border: {bottom: {style: BorderStyle.SINGLE, size: 12, color: AMBER, space: 1}},
         children: [new TextRun({text: "", font: SANS})]});
    }
    continue;
  }

  if (item.h2) {
    P({spacing: {before: 330, after: 140}, heading: HeadingLevel.HEADING_2,
       children: [new TextRun({text: item.h2, font: SERIF, size: 24, color: NAVY})]});
    continue;
  }

  if (item.p) { body(item.p); continue; }

  if (item.b) {
    for (const t of item.b)
      P({numbering: {reference: "bul", level: 0}, spacing: {after: 90, line: 290},
         children: [new TextRun({text: t, font: SANS, size: 21, color: CHAR})]});
    continue;
  }

  if (item.hooks || item.ideas) {
    for (const t of (item.hooks || item.ideas))
      P({numbering: {reference: "bul", level: 0}, spacing: {after: 40, line: 270},
         children: [new TextRun({text: t, font: SANS, size: 20, color: CHAR})]});
    continue;
  }

  if (item.check) {
    for (const t of item.check)
      P({spacing: {after: 60, line: 280}, indent: {left: 200},
         children: [new TextRun({text: "▢   ", font: SANS, size: 22, color: AMBER}),
                    new TextRun({text: t, font: SANS, size: 21, color: CHAR})]});
    continue;
  }

  if (item.ws) {
    P({spacing: {before: 60, after: 50}, indent: {left: 260},
       children: [new TextRun({text: "Weak.  ", font: SANS, size: 20, bold: true, color: GREY}),
                  new TextRun({text: item.ws[0], font: SANS, size: 20, color: GREY, italics: true})]});
    P({spacing: {after: 170}, indent: {left: 260},
       children: [new TextRun({text: "Strong.  ", font: SANS, size: 20, bold: true, color: NAVY}),
                  new TextRun({text: item.ws[1], font: SANS, size: 20, color: CHAR, italics: true})]});
    continue;
  }

  if (item.quote) {
    P({spacing: {before: 200, after: 200}, alignment: AlignmentType.CENTER,
       children: [new TextRun({text: "“" + item.quote + "”", font: SERIF, size: 23, color: NAVY, italics: true})]});
    continue;
  }

  if (item.note || item.tip || item.warn || item.example) {
    const label = item.note ? "A note" : item.tip ? "Tip" : item.warn ? "Before you move on" : "For example";
    const text = item.note || item.tip || item.warn || item.example;
    P({spacing: {before: 190, after: 40}, indent: {left: 230},
       border: {left: {style: BorderStyle.SINGLE, size: 18, color: AMBER, space: 14}},
       children: [new TextRun({text: label.toUpperCase(), font: SANS, size: 16, bold: true, color: AMBER, characterSpacing: 50})]});
    P({spacing: {after: 200}, indent: {left: 230},
       border: {left: {style: BorderStyle.SINGLE, size: 18, color: AMBER, space: 14}},
       children: [new TextRun({text, font: SANS, size: 20, color: CHAR})]});
    continue;
  }

  if (item.audit) {
    const W = [4600, 1500, 2900];
    const cell = (t, w, opts={}) => new TableCell({
      width: {size: w, type: WidthType.DXA},
      shading: opts.head ? {type: ShadingType.CLEAR, fill: NAVY} : undefined,
      margins: {top: 90, bottom: 90, left: 130, right: 130},
      children: [new Paragraph({children: [new TextRun({
        text: t, font: SANS, size: 19, bold: !!opts.head,
        color: opts.head ? "FAF7F2" : CHAR})]})]
    });
    const rows = [new TableRow({children: [cell("Signal", W[0], {head:1}), cell("Score 1–5", W[1], {head:1}), cell("One thing I'll try", W[2], {head:1})]})];
    for (const s of item.audit) rows.push(new TableRow({children: [cell(s, W[0]), cell(" ", W[1]), cell(" ", W[2])]}));
    out.push(new Table({columnWidths: W, width: {size: 9000, type: WidthType.DXA}, rows}));
    P({spacing: {after: 200}, children: [new TextRun({text: "", font: SANS})]});
    continue;
  }

  if (item.link) {
    P({spacing: {before: 120, after: 120}, indent: {left: 200},
       border: {left: {style: BorderStyle.SINGLE, size: 18, color: "D6A23E", space: 14}},
       children: [new TextRun({text: "[ LINK: " + item.link + " ]", font: "Lato", size: 20, bold: true, color: "D6A23E"}),
                  new TextRun({text: item.n ? "   " + item.n : "", font: "Lato", size: 19, color: "6B6B6B", italics: true})]});
    continue;
  }

  if (item.copyright) {
    P({spacing: {before: 600, after: 260}, children: [new TextRun({text: "The Muslimah Faceless Business Blueprint for Beginners", font: "Libre Baskerville", size: 22, color: "102A43"})]});
    for (const l of item.copyright)
      P({spacing: {after: 130, line: 280}, children: [new TextRun({text: l, font: "Lato", size: 17, color: "2B2B2B"})]});
    P({children: [new PageBreak()]});
    continue;
  }

  if (item.toc) {
    P({spacing: {before: 400, after: 40}, children: [new TextRun({text: "CONTENTS", font: "Lato", size: 19, bold: true, color: "D6A23E", characterSpacing: 80})]});
    P({spacing: {after: 300}, border: {bottom: {style: BorderStyle.SINGLE, size: 12, color: "D6A23E", space: 1}}, children: [new TextRun({text: "", font: "Lato"})]});
    for (const [n, t] of item.toc) {
      P({spacing: {after: 130},
         children: [new TextRun({text: n, font: "Lato", size: 17, bold: true, color: "D6A23E"}),
                    new TextRun({text: "   " + t, font: "Libre Baskerville", size: 20, color: "102A43"})]});
    }
    P({children: [new PageBreak()]});
    continue;
  }

  if (item.blank) { P({children: [new PageBreak()]}); continue; }

  if (item.tpl) {
    const [head, subj, ...lines] = item.tpl;
    P({spacing: {before: 250, after: 0}, indent: {left: 200},
       children: [new TextRun({text: head.toUpperCase(), font: "Lato", size: 16, bold: true, color: "D6A23E", characterSpacing: 50})]});
    P({spacing: {before: 70, after: 110}, indent: {left: 200},
       children: [new TextRun({text: subj, font: "Lato", size: 20, bold: true, color: "102A43"})]});
    for (const l of lines)
      P({spacing: {after: 90, line: 280}, indent: {left: 200},
         children: [new TextRun({text: l, font: "Lato", size: 20, color: "2B2B2B"})]});
    P({spacing: {after: 130}, indent: {left: 200},
       border: {bottom: {style: BorderStyle.SINGLE, size: 4, color: "E5DFD6", space: 6}},
       children: [new TextRun({text: "", font: "Lato"})]});
    continue;
  }

  if (item.prompt) {
    P({spacing: {before: 260, after: 40},
       children: [new TextRun({text: item.prompt, font: SANS, size: 20, bold: true, color: NAVY})]});
    for (let i = 0; i < item.lines; i++) out.push(wline());
    P({spacing: {after: 210}, children: [new TextRun({text: "", font: SANS})]});
    continue;
  }
}

const doc = new Document({
  creator: "Karrie Noor Chariton",
  title: "The Muslimah Faceless Business Blueprint for Beginners",
  numbering: {config: [{reference: "bul", levels: [{level: 0, format: LevelFormat.BULLET, text: "•",
    style: {paragraph: {indent: {left: 420, hanging: 220}}, run: {color: AMBER}}}]}]},
  sections: [{
    properties: {page: {size: {width: 8640, height: 12960},
                        margin: {top: 1080, bottom: 1080, left: 1080, right: 1080}}},
    children: out
  }]
});

Packer.toBuffer(doc).then(b => {
  fs.writeFileSync("Muslimah-Faceless-Business-Blueprint.docx", b);
  console.log("written:", b.length, "bytes");
});
