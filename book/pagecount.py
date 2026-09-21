import zipfile, re, sys
f = sys.argv[1] if len(sys.argv) > 1 else 'Muslimah-Faceless-Business-Blueprint.docx'
x = zipfile.ZipFile(f).read('word/document.xml').decode('utf8')

PAGE_PT   = (12960 - 2160) / 20.0     # usable height, points
WIDTH_PT  = (8640 - 2160) / 20.0      # usable width, points

blocks = re.findall(r'<w:(p|tbl)[ >].*?</w:\1>', x, re.S)
pages, y = 1, 0.0

for kind, b in [(m.group(1), m.group(0)) for m in re.finditer(r'<w:(p|tbl)[ >].*?</w:\1>', x, re.S)]:
    if kind == 'tbl':
        h = 26.0 * len(re.findall(r'<w:tr>', b))
    else:
        if 'w:type="page"' in b:
            pages += 1; y = 0.0; continue
        txt = ''.join(re.findall(r'<w:t[^>]*>(.*?)</w:t>', b, re.S))
        sz  = re.search(r'<w:sz w:val="(\d+)"', b)
        pt  = (int(sz.group(1)) / 2.0) if sz else 10.5
        ln  = re.search(r'w:line="(\d+)"', b)
        lh  = (int(ln.group(1)) / 20.0) if ln else pt * 1.25
        bf  = re.search(r'w:before="(\d+)"', b); af = re.search(r'w:after="(\d+)"', b)
        pad = ((int(bf.group(1)) if bf else 0) + (int(af.group(1)) if af else 0)) / 20.0
        cpl = max(1, int(WIDTH_PT / (pt * 0.47)))
        rows = max(1, -(-len(txt) // cpl))
        h = rows * lh + pad
    if y + h > PAGE_PT:
        pages += 1; y = h
    else:
        y += h

words = sum(len(''.join(re.findall(r'<w:t[^>]*>(.*?)</w:t>', b, re.S)).split())
            for b in re.findall(r'<w:p[ >].*?</w:p>', x, re.S))
print(f"{f}")
print(f"  words          {words:,}")
print(f"  writing lines  {sum(1 for b in re.findall(r'<w:p[ >].*?</w:p>', x, re.S) if 'C9C2B8' in b)}")
print(f"  ESTIMATED PAGES  ~{pages}   (6x9in, {'even' if pages % 2 == 0 else 'ODD - needs one more'})")
