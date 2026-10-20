import glob, os, io, base64, json
from PIL import Image
crops = sorted(glob.glob("work/products/proof/*_crop*.png"))
tiles = []
for c in crops:
    im = Image.open(c).convert("RGB")
    w = 360; h = int(im.height*w/im.width)
    if h > 520: h = 520; w = int(im.width*h/im.height)
    im = im.resize((w, h), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, "PNG", optimize=True)
    uri = "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()
    page = os.path.basename(c).split("_crop")[0]
    tiles.append({"uri": uri, "label": os.path.basename(c).replace(".png",""), "page": page})
data = json.dumps(tiles).replace("</","<\\/")
print("PROOF_TILES", len(tiles))
open("scripts/_tiles.json","w").write(data)
