import Link from "next/link";
import ProductImage from "./product-image";

type SlimProduct = {
  id: string;
  name: string;
  primaryRef: string;
  categorySlug: string;
  subcategory: string;
  refs: string[];
  price?: number;
};

export default function ProductCard({ product }: { product: SlimProduct }) {
  const n = product.refs.length;
  return (
    <Link
      href={`/products/${product.categorySlug}/${product.id}`}
      className="group flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden rounded-card border border-line product-surface transition-colors duration-300 group-hover:border-line-2">
        <ProductImage
          ref_={product.primaryRef}
          alt={product.name}
          className="h-full w-full object-contain p-7 transition-transform duration-500 ease-premium group-hover:scale-[1.05]"
        />
        <span className="absolute left-3 top-3 rounded bg-surface-2/90 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wide text-muted backdrop-blur">
          {product.subcategory}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-0.5 pt-3">
        <h3 className="text-[0.95rem] font-semibold leading-snug tracking-tight text-ink group-hover:text-accent">
          {product.name}
        </h3>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="ref text-[0.78rem] text-muted">{product.primaryRef}</span>
          <span className="text-[0.72rem] text-muted">
            {n} {n === 1 ? "size" : "sizes"}
          </span>
        </div>
        {typeof product.price === "number" && (
          <span className="ref mt-2 text-[0.9rem] font-semibold text-ink">
            From ${product.price.toFixed(2)}
          </span>
        )}
      </div>
    </Link>
  );
}
