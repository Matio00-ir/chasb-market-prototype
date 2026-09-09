import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { CartTotals, ShippingMethodId } from "@/types";
import { calcShipping } from "@/lib/shipping";
import { formatNumber } from "@/lib/format";

/** خلاصه مبالغ سبد/سفارش. با `href` دکمه اقدام نمایش داده می‌شود. */
export function CartSummary({
  totals,
  methodId,
  cta,
}: {
  totals: CartTotals;
  methodId: ShippingMethodId;
  cta?: { href: string; label: string };
}) {
  const shipping = calcShipping(totals.totalWeightGrams, methodId);
  const shippingCost = shipping.requiresQuote ? 0 : shipping.cost ?? 0;
  const grandTotal = totals.subtotal + shippingCost;

  const rows: { label: string; value: string; tone?: "muted" | "discount" }[] = [
    { label: "جمع کالاها (قیمت تکی)", value: `${formatNumber(totals.listSubtotal)} تومان`, tone: "muted" },
  ];
  if (totals.wholesaleDiscount > 0) {
    rows.push({
      label: "تخفیف خرید عمده",
      value: `−${formatNumber(totals.wholesaleDiscount)} تومان`,
      tone: "discount",
    });
  }
  rows.push({
    label: "هزینه ارسال",
    value: shipping.requiresQuote
      ? "استعلامی"
      : shippingCost === 0
        ? "—"
        : `${formatNumber(shippingCost)} تومان`,
  });

  return (
    <div className="surface-card p-4">
      <h3 className="text-sm font-bold text-ink">خلاصه سفارش</h3>

      <dl className="mt-3 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted">جمع پس از تخفیف عمده</dt>
          <dd className="font-medium tabular-nums text-ink">
            {formatNumber(totals.subtotal)} تومان
          </dd>
        </div>
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between">
            <dt className="text-muted">{r.label}</dt>
            <dd
              className={
                r.tone === "discount"
                  ? "font-medium tabular-nums text-emerald-600"
                  : "tabular-nums text-muted"
              }
            >
              {r.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
        <span className="text-sm font-bold text-ink">مبلغ نهایی</span>
        <span className="text-lg font-extrabold tabular-nums text-ink">
          {formatNumber(grandTotal)}
          <span className="ms-1 text-xs font-normal text-muted">تومان</span>
        </span>
      </div>

      {shipping.requiresQuote ? (
        <p className="mt-2 text-xs text-amber-600">
          سفارش سنگین است؛ هزینه ارسال جداگانه محاسبه و پیش از ارسال اعلام می‌شود.
        </p>
      ) : null}

      {cta ? (
        <Link
          href={cta.href}
          className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded bg-brand-700 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
        >
          {cta.label}
          <ArrowLeft className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}
