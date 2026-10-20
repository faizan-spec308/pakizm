import sys, pypdfium2 as pdfium, os
src, outdir, scale = sys.argv[1], sys.argv[2], float(sys.argv[3])
pages = [int(x) for x in sys.argv[4].split(",")] if len(sys.argv)>4 else None
pdf = pdfium.PdfDocument(src)
os.makedirs(outdir, exist_ok=True)
idxs = [p-1 for p in pages] if pages else range(len(pdf))
for i in idxs:
    img = pdf[i].render(scale=scale).to_pil()
    out = os.path.join(outdir, f"page_{i+1:03d}.png")
    img.save(out); print("saved", out, img.size)
