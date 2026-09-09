"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import type { ResolvedCartLine } from "@/types";
import { ProductThumb } from "@/components/media/ProductThumb";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/features/cart/CartContext";
import { formatNumber, formatWeight, toFaDigits } from "@/lib/format";

/** یک ردیف از سبد خرید. */
export function CartLineItem({ line }: { line: ResolvedCartLine }) {
  const { setQty, remove } = useCart();
  const { product, qty } = line;
  const discounted = line.unitPrice < line.listUnitPrice;

  return (
    <div className="flex gap-4 py-4">
      <Link
        href={`/product/${product.slug}`}
        className="surface-card size-24 shrink-0 overflow-hidden sm:size-28"
      >
        <ProductThumb product={product} className="size-full" sizes="112px" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/product/${product.slug}`}
              className="line-clamp-2 text-sm font-semibold text-ink hover:text-brand-700"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-xs text-muted">
              {product.brand} · {product.volume} · وزن واحد {formatWeight(product.weightGrams)}
            </p>
            {discounted ? (
              <Badge tone="accent" className="mt-1.5">
                {line.activeTier.label}
              </Badge>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => remove(product.slug)}
            className="grid size-8 shrink-0 place-items-center rounded border border-line text-muted transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
            aria-label={`حذف ${product.name} از سبد`}
          >
            <Trash2 className="size-4" />
          </button>
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
          <div className="flex items-center gap-3">
            <QuantitySelector
              value={qty}
              onChange={(n) => setQty(product.slug, n)}
              min={1}
              max={Math.max(1, product.stock)}
              size="sm"
            />
            <span className="text-xs text-muted">
              هر عدد{" "}
              <span className="font-medium text-ink">{formatNumber(line.unitPrice)}</span>{" "}
              تومان
            </span>
          </div>

          <div className="text-start">
            {line.wholesaleSaving > 0 ? (
              <p className="text-[11px] text-emerald-600">
                {`${formatNumber(line.wholesaleSaving)} تومان تخفیف عمده`}
              </p>
            ) : null}
            <p className="text-sm font-bold tabular-nums text-ink">
              {formatNumber(line.lineTotal)}
              <span className="ms-1 text-xs font-normal text-muted">تومان</span>
            </p>
            <p className="text-[11px] text-muted">
              وزن ردیف: {formatWeight(line.lineWeightGrams)} ({toFaDigits(qty)} عدد)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
