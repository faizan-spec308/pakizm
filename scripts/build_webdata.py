import json, re, unicodedata, collections
d = json.load(open("catalog-data/catalog.json"))
def slug(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii','ignore').decode()
    s = re.sub(r'[^a-zA-Z0-9]+','-',s).strip('-').lower()
    return s or 'item'
def clean_ref(r):
    return r.strip()
# category slugs + subcategory map
cat_order = [c["name"] for c in d["categories"]]
cat_subs = collections.OrderedDict((c["name"], []) for c in d["categories"])
prods=[]
seen=set()
for p in d["products"]:
    cat=p["category"] or "Uncategorized"
    sub=p["subcategory"] or cat
    refs=[clean_ref(v["ref"]) for v in p["variants"] if v.get("ref")]
    primary = refs[0] if refs else slug(p["name"])
    base = slug(f'{p["name"]}-{primary}')
    s=base; i=2
    while s in seen: s=f"{base}-{i}"; i+=1
    seen.add(s)
    if sub not in cat_subs.setdefault(cat, []):
        cat_subs[cat].append(sub)
    prods.append({
        "id": s,
        "name": p["name"],
        "description": p.get("description",""),
        "category": cat, "categorySlug": slug(cat),
        "subcategory": sub, "subcategorySlug": slug(sub),
        "primaryRef": primary,
        "refs": refs,
        "variants": [{"ref": clean_ref(v.get("ref","")), "spec": v.get("spec","")} for v in p["variants"]],
        "image": f"/products/{primary}.webp",
        "printedPage": p.get("printed_page"),
    })
categories=[{
    "name": c, "slug": slug(c),
    "subcategories":[{"name":s,"slug":slug(s)} for s in cat_subs.get(c,[])],
    "count": sum(1 for pr in prods if pr["category"]==c),
} for c in cat_order]
out={"brand":"Pakizm","tagline":"Orthopedic Surgical Instruments",
     "categories":categories,"products":prods,
     "stats":{"products":len(prods),"variants":sum(len(p["variants"]) for p in prods),"categories":len(categories)}}
json.dump(out, open("catalog-data/catalog.web.json","w"), indent=2, ensure_ascii=False)
print("web data:",len(prods),"products,",out["stats"]["variants"],"variants,",len(categories),"categories")
print("sample:", json.dumps(prods[100], ensure_ascii=False)[:240])
