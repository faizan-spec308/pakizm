import catalogData from "@/data/catalog.json";

export type Variant = { ref: string; spec: string; price: number };

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  subcategorySlug: string;
  primaryRef: string;
  refs: string[];
  variants: Variant[];
  image: string;
  price: number;
  printedPage: number | null;
};

export type Subcategory = { name: string; slug: string };
export type Category = {
  name: string;
  slug: string;
  subcategories: Subcategory[];
  count: number;
};

export type Catalog = {
  brand: string;
  tagline: string;
  categories: Category[];
  products: Product[];
  stats: { products: number; variants: number; categories: number };
};

const catalog = catalogData as unknown as Catalog;

export function getCatalog(): Catalog {
  return catalog;
}

export function getCategories(): Category[] {
  return catalog.categories;
}

export function getCategory(slug: string): Category | undefined {
  return catalog.categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return catalog.products.filter((p) => p.categorySlug === slug);
}

export function getProduct(id: string): Product | undefined {
  return catalog.products.find((p) => p.id === id);
}

let _variants: Map<string, { price: number; name: string; spec: string }> | null = null;
/** Trusted server-side lookup of a variant by reference (for checkout pricing). */
export function variantInfo(ref: string) {
  if (!_variants) {
    _variants = new Map();
    for (const p of catalog.products)
      for (const v of p.variants)
        _variants.set(v.ref, { price: v.price, name: p.name, spec: v.spec });
  }
  return _variants.get(ref);
}

export function getRelated(product: Product, limit = 4): Product[] {
  return catalog.products
    .filter(
      (p) =>
        p.subcategorySlug === product.subcategorySlug && p.id !== product.id,
    )
    .slice(0, limit);
}

/** group a category's products by subcategory, preserving catalog order */
export function groupBySubcategory(
  products: Product[],
): { subcategory: string; subcategorySlug: string; items: Product[] }[] {
  const order: string[] = [];
  const map = new Map<string, Product[]>();
  for (const p of products) {
    if (!map.has(p.subcategorySlug)) {
      map.set(p.subcategorySlug, []);
      order.push(p.subcategorySlug);
    }
    map.get(p.subcategorySlug)!.push(p);
  }
  return order.map((slug) => {
    const items = map.get(slug)!;
    return { subcategory: items[0].subcategory, subcategorySlug: slug, items };
  });
}
