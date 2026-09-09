"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Info, TrendingDown } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/types";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { WholesalePriceTable } from "@/components/product/WholesalePriceTable";
import { StockStatus, stockLevel } from "@/components/product/StockStatus";
import {
  getActiveTier,
  getLineTotal,
  getUnitPrice,
  getWholesaleSaving,
  qtyToNextTier,
  getPriceTiers,
} from "@/lib/pricing";
import { formatNumber, formatWeight, toFaDigits } from "@/lib/format";

/** پنل خرید صفحه محصول — تعداد، قیمت داینامیک و افزودن به سبد. */
export function PurchasePanel({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const out = stockLevel(product.stock) === "out";
  const maxQty = out ? 1 : Math.max(1, product.stock);

  const view = useMemo(() => {
    const tiers = getPriceTiers(product);
    return {
      unitPrice: getUnitPrice(product, qty),
      lineTotal: getLineTotal(product, qty),
      saving: getWholesaleSaving(product, qty),
      activeTier: getActiveTier(product, qty),
      next: qtyToNextTier(product, qty),
      wholesaleFloor: tiers[tiers.length - 1].unitPrice,
    };
  }, [product, qty]);

  return (
    <div className="space-y-5">
      {/* قیمت پایه */}
      <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
        <div>
          <span className="text-xs text-muted">قیمت خرید تکی</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold tabular-nums text-ink">
              {formatNumber(product.price)}
            </span>
            <span className="text-sm text-muted">تومان</span>
          </div>
        </div>
        <div className="rounded-lg border border-accent-100 bg-accent-50 px-3 py-1.5">
          <span className="text-xs text-accent-700">قیمت همکاری از</span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold tabular-nums text-accent-700">
              {formatNumber(view.wholesaleFloor)}
            </span>
            <span className="text-xs text-accent-700">تومان</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 border-y border-line py-3 text-sm">
        <span className="text-muted">
          وزن واحد: <span className="font-medium text-ink">{formatWeight(product.weightGrams)}</span>
        </span>
        <span className="text-line">|</span>
        <StockStatus stock={product.stock} showCount />
      </div>

      {/* انتخاب تعداد + قیمت داینامیک */}
      <div className="surface-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="mb-1.5 block text-xs font-semibold text-ink">تعداد</span>
            <QuantitySelector value={qty} onChange={setQty} min={1} max={maxQty} />
          </div>
          <div className="text-start">
            <span className="text-xs text-muted">
              قیمت هر عدد در این تعداد ({view.activeTier.label})
            </span>
            <div className="flex items-baseline gap-1">
              {view.unitPrice < product.price ? (
                <s className="text-xs text-muted/70">{formatNumber(product.price)}</s>
              ) : null}
              <span className="text-xl font-extrabold tabular-nums text-brand-700">
                {formatNumber(view.unitPrice)}
              </span>
              <span className="text-xs text-muted">تومان</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-canvas px-3 py-2.5 text-sm">
          <span className="text-muted">مبلغ قابل پرداخت</span>
          <span className="text-lg font-extrabold tabular-nums text-ink">
            {formatNumber(view.lineTotal)}
            <span className="ms-1 text-xs font-normal text-muted">تومان</span>
          </span>
        </div>

        {view.saving > 0 ? (
          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
            <TrendingDown className="size-3.5" />
            {`${formatNumber(view.saving)} تومان صرفه‌جویی نسبت به قیمت تکی`}
          </p>
        ) : null}

        {view.next ? (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
            <Info className="size-3.5 shrink-0" />
            {`با افزودن ${toFaDigits(view.next.needed)} عدد دیگر، قیمت هر واحد به ${formatNumber(
              view.next.tier.unitPrice,
            )} تومان می‌رسد (${view.next.tier.label}).`}
          </p>
        ) : null}

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <AddToCartButton
            slug={product.slug}
            qty={qty}
            disabled={out}
            className="flex-1"
            label={out ? "ناموجود" : "افزودن به سبد خرید"}
          />
          <Link
            href="/wholesale"
            className="inline-flex h-12 items-center justify-center gap-2 rounded border border-brand-700 px-5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            درخواست خرید عمده
            <ArrowLeft className="size-4" />
          </Link>
        </div>
      </div>

      {/* جدول پلکان قیمت */}
      <div>
        <h3 className="mb-2 text-sm font-bold text-ink">جدول قیمت پلکانی</h3>
        <WholesalePriceTable product={product} activeQty={qty} />
        <p className="mt-2 text-xs text-muted">
          قیمت‌ها با تغییر تعداد به‌صورت خودکار به‌روز می‌شوند. پلکان فعال با رنگ مشخص شده است.
        </p>
      </div>
    </div>
  );
}
