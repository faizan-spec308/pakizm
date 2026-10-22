Pakizm full cutout set (reference-named)
========================================
cutouts-reference-named/ : 601 instrument cutouts on white, named <reference>.png
                           (66% of the 902 products; see cutouts_qa.json for coverage).
cutouts_qa.json          : per-product status - "ok" / "no_crop_match" / "no_ocr_anchor".
pakizm-products.csv      : all 902 products with name, category, description + suggested pose.

WORKFLOW:
 1. Enhance each PNG image-to-image in Nano Banana with the studio prompt.
 2. Keep the SAME filename (the reference number), export as .webp (or .png).
 3. Drop into web/public/products/ to replace the low-res version on the site.

NOTE: association is best-effort. A few images may be matched to the wrong product
on dense pages - verify against the live site / catalogue and flag any to re-crop.
