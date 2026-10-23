import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <div className="container-c">
      <div className="flex flex-col items-center gap-6 py-28 text-center sm:py-36">
        <span className="price-lg text-[5rem] leading-none sm:text-[7rem]">404</span>
        <h1 className="heading-upper text-[1.8rem] sm:text-[2.4rem]">Page not found</h1>
        <p className="max-w-[46ch] leading-relaxed text-ink-2">
          The page you're looking for doesn't exist or may have moved. Browse the
          catalog or head back to the homepage.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link href="/products" className="btn btn-dark btn-lg">
            Browse the catalog
            <ArrowRight size={15} weight="bold" />
          </Link>
          <Link href="/" className="btn btn-ghost btn-lg">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
