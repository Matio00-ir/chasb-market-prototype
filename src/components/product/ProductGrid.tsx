import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

/** شبکه محصولات — واکنش‌گرا: ۱ ستون موبایل، ۲ تبلت، ۳ لپ‌تاپ، ۴ دسکتاپ. */
export function ProductGrid({
  products,
  className,
  priorityCount = 0,
}: {
  products: Product[];
  className?: string;
  priorityCount?: number;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < priorityCount} />
      ))}
    </div>
  );
}
