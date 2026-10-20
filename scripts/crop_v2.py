import sys, os, cv2, numpy as np
from rapidocr_onnxruntime import RapidOCR
_eng = RapidOCR()

def crop_page(page, outdir):
    os.makedirs(outdir, exist_ok=True)
    img = cv2.imread(page); H, W = img.shape[:2]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    mask = (gray < 190).astype(np.uint8)*255
    # drop colored pixels (red/blue header swoosh + footer bar); instruments are greyscale metal
    sat = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)[:,:,1]
    mask[sat > 55] = 0
    mask[:int(H*0.085), :] = 0; mask[int(H*0.915):, :] = 0
    # erase OCR text regions
    res,_ = _eng(page)
    if res:
        padx, pady = int(W*0.008), int(H*0.004)
        for box, text, score in res:
            xs=[p[0] for p in box]; ys=[p[1] for p in box]
            x0=max(0,int(min(xs))-padx); x1=min(W,int(max(xs))+padx)
            y0=max(0,int(min(ys))-pady); y1=min(H,int(max(ys))+pady)
            mask[y0:y1, x0:x1] = 0
    k = max(7, int(W*0.008)) | 1
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(k,k))
    closed = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel, iterations=1)
    n,lab,stats,cent = cv2.connectedComponentsWithStats(closed,8)
    base=os.path.splitext(os.path.basename(page))[0]
    cand=[]
    for i in range(1,n):
        x,y,w,h,area=stats[i]
        if area < 0.0012*H*W: continue
        if h < 0.03*H or w < 0.025*W: continue
        if w > 0.80*W or h > 0.85*H: continue          # reject merged/whole-page blobs
        comp=(lab[y:y+h,x:x+w]==i); g=gray[y:y+h,x:x+w]; fg=g[comp]
        midtone=float(np.mean((fg>70)&(fg<205)))
        if midtone < 0.18: continue
        cand.append((x,y,w,h,area,midtone))
    cand.sort(key=lambda c:(c[1]//int(H*0.08), c[0]))
    saved=[]
    for idx,(x,y,w,h,area,mt) in enumerate(cand,1):
        pad=16; x0,y0=max(0,x-pad),max(0,y-pad); x1,y1=min(W,x+w+pad),min(H,y+h+pad)
        crop=img[y0:y1,x0:x1].copy()
        cg=cv2.cvtColor(crop,cv2.COLOR_BGR2GRAY); crop[cg>222]=(255,255,255)
        out=f"{outdir}/{base}_crop{idx:02d}.png"; cv2.imwrite(out,crop)
        saved.append((out,int(w),int(h)))
    if saved:
        cols=min(5,len(saved)); rows=(len(saved)+cols-1)//cols; cell=460
        sheet=np.full((rows*cell,cols*cell,3),240,np.uint8)
        for i,(p,w,h) in enumerate(saved):
            im=cv2.imread(p); ih,iw=im.shape[:2]; sc=min((cell-24)/iw,(cell-24)/ih)
            nw,nh=int(iw*sc),int(ih*sc); im=cv2.resize(im,(nw,nh))
            r,c=divmod(i,cols); oy,ox=r*cell+(cell-nh)//2,c*cell+(cell-nw)//2
            sheet[oy:oy+nh,ox:ox+nw]=im
            cv2.putText(sheet,f"{i+1}",(c*cell+8,r*cell+28),cv2.FONT_HERSHEY_SIMPLEX,0.8,(0,0,200),2)
        cv2.imwrite(f"{outdir}/{base}_sheet.png",sheet)
    print(f"{base}: {len(saved)} crops")
    return saved

if __name__=="__main__":
    for pg in sys.argv[1:]:
        crop_page(pg, "work/products/proof")
