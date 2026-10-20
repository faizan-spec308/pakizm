import glob, os, cv2, numpy as np, io, base64, json
from PIL import Image
def enhance(img):
    up = cv2.resize(img, None, fx=3, fy=3, interpolation=cv2.INTER_LANCZOS4)
    den = cv2.fastNlMeansDenoisingColored(up, None, 3, 3, 7, 21)
    blur = cv2.GaussianBlur(den, (0,0), 2.0)
    sharp = cv2.addWeighted(den, 1.5, blur, -0.5, 0)
    g = cv2.cvtColor(sharp, cv2.COLOR_BGR2GRAY); sharp[g>235] = (255,255,255)
    return sharp
tiles=[]
for c in sorted(glob.glob("work/products/proof/*_crop*.png")):
    orig=cv2.imread(c); enh=enhance(orig)
    base=os.path.basename(c).replace(".png","")
    cv2.imwrite(f"work/products/proof/{base}_ENH.png", enh)
    def uri(im_bgr, maxw=420, maxh=560):
        im=Image.fromarray(cv2.cvtColor(im_bgr,cv2.COLOR_BGR2RGB))
        im.thumbnail((maxw,maxh), Image.LANCZOS)
        b=io.BytesIO(); im.save(b,"PNG",optimize=True)
        return "data:image/png;base64,"+base64.b64encode(b.getvalue()).decode()
    tiles.append({"label":base,"orig":uri(orig),"enh":uri(enh)})
open("scripts/_cmp.json","w").write(json.dumps(tiles).replace("</","<\\/"))
print("pairs:",len(tiles),"json KB:",round(os.path.getsize('scripts/_cmp.json')/1024))
