import Link from "next/link";
import ProductImage from "./product-image";
import type { Product } from "@/lib/catalog";

type SlimProduct = Pick<
  Product,
  "id" | "name" | "primaryRef" | "categorySlug" | "subcategory"
> & { refs: string[] };

export default function ProductCard({ product }: { product: SlimProduct }) {
  const variantCount = product.refs.length;
  return (
    <Link
      href={`/products/${product.categorySlug}/${product.id}`}
      className="focus-ring group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-accent"
    >
      <div className="aspect-[4/3] w-full border-b border-line bg-surface-2">
        <ProductImage
          ref_={product.primaryRef}
          alt={product.name}
          className="h-full w-full object-contain p-4"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="text-[0.72rem] uppercase tracking-wide text-muted">
          {product.subcategory}
        </div>
        <h3 className="text-[0.98rem] font-semibold leading-snug tracking-[-0.01em] group-hover:text-accent">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="ref text-[0.8rem] text-muted">{product.primaryRef}</span>
          <span className="text-[0.72rem] text-muted">
            {variantCount} {variantCount === 1 ? "size" : "sizes"}
          </span>
        </div>
      </div>
    </Link>
  );
}
