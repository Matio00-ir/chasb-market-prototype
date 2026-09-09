import Link from "next/link";
import { Package } from "lucide-react";
import type { Product } from "@/types";
import { ProductThumb } from "@/components/media/ProductThumb";
import { AddToCartButton } from "./AddToCartButton";
import { StockStatus, stockLevel } from "./StockStatus";
import { Badge } from "@/components/ui/Badge";
import { formatNumber } from "@/lib/format";
import { getPriceTiers } from "@/lib/pricing";
import { categoryTitle } from "@/data/categories";

/** کارت محصول — استفاده در صفحه اصلی، فروشگاه و «محصولات مرتبط». */
export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const tiers = getPriceTiers(product);
  const wholesale = tiers[tiers.length - 1].unitPrice;
  const out = stockLevel(product.stock) === "out";

  return (
    <article className="surface-card group flex flex-col overflow-hidden transition-shadow hover:shadow-pop">
      <Link href={`/product/${product.slug}`} className="relative block">
        <ProductThumb
          product={product}
          priority={priority}
          className="aspect-[4/3] w-full transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute end-2 top-2 flex flex-col items-end gap-1">
          {product.featured ? <Badge tone="brand">منتخب</Badge> : null}
          {out ? <Badge tone="danger">ناموجود</Badge> : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between text-xs text-muted">
          <span>{product.brand}</span>
          <span>{categoryTitle(product.category)}</span>
        </div>

        <h3 className="mt-1.5 text-sm font-semibold leading-6 text-ink">
          <Link href={`/product/${product.slug}`} className="hover:text-brand-700">
            {product.name}
          </Link>
        </h3>

        <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">
          {product.shortDescription}
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
          <Package className="size-3.5" />
          {product.volume}
        </div>

        <div className="mt-3 border-t border-line pt-3">
          <StockStatus stock={product.stock} />
          <div className="mt-2 flex items-end justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-bold tabular-nums text-ink">
                  {formatNumber(product.price)}
                </span>
                <span className="text-[11px] text-muted">تومان</span>
              </div>
              <p className="mt-0.5 text-[11px] text-accent-600">
                عمده از {formatNumber(wholesale)} تومان
              </p>
            </div>
            <AddToCartButton slug={product.slug} variant="icon" disabled={out} />
          </div>
        </div>
      </div>
    </article>
  );
}
