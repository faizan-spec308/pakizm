import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import ProductImage from "./product-image";

type SlimProduct = {
  id: string;
  name: string;
  primaryRef: string;
  categorySlug: string;
  subcategory: string;
  refs: string[];
};

export default function ProductCard({ product }: { product: SlimProduct }) {
  const n = product.refs.length;
  return (
    <Link
      href={`/products/${product.categorySlug}/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-line-2 hover:shadow-lift"
    >
      <div className="relative aspect-square overflow-hidden bg-surface-2">
        <ProductImage
          ref_={product.primaryRef}
          alt={product.name}
          className="h-full w-full object-contain p-6 transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
        />
        <span className="absolute right-3 top-3 flex h-7 w-7 translate-y-1 items-center justify-center rounded-full bg-ink text-bg opacity-0 transition-all duration-500 ease-premium group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={13} weight="bold" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 border-t border-line p-4">
        <div className="text-[0.68rem] uppercase tracking-[0.12em] text-muted">
          {product.subcategory}
        </div>
        <h3 className="text-[0.98rem] font-semibold leading-snug tracking-tight text-ink">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="ref text-[0.78rem] text-ink-2">{product.primaryRef}</span>
          <span className="text-[0.7rem] text-muted">
            {n} {n === 1 ? "size" : "sizes"}
          </span>
        </div>
      </div>
    </Link>
  );
}
