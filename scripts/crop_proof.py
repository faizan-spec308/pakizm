import sys, os, cv2, numpy as np
page = sys.argv[1]
outdir = sys.argv[2]
os.makedirs(outdir, exist_ok=True)
img = cv2.imread(page)                 # BGR
H, W = img.shape[:2]
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# foreground = darker than paper/watermark
mask = (gray < 190).astype(np.uint8)*255
# kill header/footer bands
mask[:int(H*0.085), :] = 0
mask[int(H*0.915):, :] = 0

# merge instrument parts
k = max(9, int(W*0.011)) | 1
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k))
closed = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel, iterations=2)

n, lab, stats, cent = cv2.connectedComponentsWithStats(closed, 8)
base = os.path.splitext(os.path.basename(page))[0]
crops = []
for i in range(1, n):
    x,y,w,h,area = stats[i]
    if area < 0.0009*H*W: continue
    if h < 0.025*H or w < 0.03*W: continue
    # discriminate instrument (photographic midtones) vs text block (bimodal near-black)
    comp = (lab[y:y+h, x:x+w]==i)
    g = gray[y:y+h, x:x+w]
    fg = g[comp]
    midtone = np.mean((fg>70)&(fg<205))   # instruments have lots of mid gray shading
    if midtone < 0.25: continue           # likely text
    crops.append((x,y,w,h,midtone))

crops.sort(key=lambda c:(c[1]//int(H*0.08), c[0]))  # reading order-ish
saved=[]
for idx,(x,y,w,h,mt) in enumerate(crops,1):
    pad=14
    x0,y0=max(0,x-pad),max(0,y-pad); x1,y1=min(W,x+w+pad),min(H,y+h+pad)
    crop=img[y0:y1, x0:x1].copy()
    # whiten near-white background
    cg=cv2.cvtColor(crop,cv2.COLOR_BGR2GRAY)
    crop[cg>222]=(255,255,255)
    out=f"{outdir}/{base}_crop{idx:02d}.png"
    cv2.imwrite(out,crop); saved.append((out,w,h,round(mt,2)))
print(f"{base}: {len(saved)} instrument crops")
for s in saved: print("  ",s)

# contact sheet
if saved:
    cols=min(5,len(saved)); rows=(len(saved)+cols-1)//cols
    cell=460
    sheet=np.full((rows*cell, cols*cell,3),240,np.uint8)
    for i,(p,w,h,mt) in enumerate(saved):
        im=cv2.imread(p); ih,iw=im.shape[:2]
        sc=min((cell-24)/iw,(cell-24)/ih); nw,nh=int(iw*sc),int(ih*sc)
        im=cv2.resize(im,(nw,nh))
        r,c=divmod(i,cols); oy,ox=r*cell+(cell-nh)//2, c*cell+(cell-nw)//2
        sheet[oy:oy+nh, ox:ox+nw]=im
        cv2.putText(sheet,f"{i+1}",(c*cell+8,r*cell+28),cv2.FONT_HERSHEY_SIMPLEX,0.8,(0,0,200),2)
    cv2.imwrite(f"{outdir}/{base}_sheet.png",sheet)
    print("sheet:",f"{outdir}/{base}_sheet.png")
