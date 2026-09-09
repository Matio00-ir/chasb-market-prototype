"use client";

import { Info, Scale } from "lucide-react";
import type { ShippingMethodId } from "@/types";
import { SHIPPING_BRACKETS, SHIPPING_METHODS, calcShipping } from "@/lib/shipping";
import { formatNumber, toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * محاسبه‌گر هزینه ارسال بر اساس وزن سفارش.
 * روش ارسال انتخابی به بالادست (CartClient) گزارش می‌شود تا در جمع کل هم اعمال شود.
 */
export function ShippingCalculator({
  totalWeightGrams,
  methodId,
  onMethodChange,
}: {
  totalWeightGrams: number;
  methodId: ShippingMethodId;
  onMethodChange: (id: ShippingMethodId) => void;
}) {
  const result = calcShipping(totalWeightGrams, methodId);

  return (
    <div className="surface-card p-4">
      <div className="flex items-center gap-2">
        <Scale className="size-4 text-brand-700" />
        <h3 className="text-sm font-bold text-ink">تخمین هزینه ارسال</h3>
      </div>
      <p className="mt-1.5 flex items-start gap-1.5 text-xs text-muted">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        هزینه ارسال بر اساس <span className="font-medium text-ink">وزن کل سفارش</span> محاسبه
        می‌شود، نه تعداد اقلام.
      </p>

      <div className="mt-3 flex items-center justify-between rounded-lg bg-canvas px-3 py-2 text-sm">
        <span className="text-muted">وزن کل سفارش</span>
        <span className="font-bold tabular-nums text-ink">
          {toFaDigits(result.totalWeightKg.toFixed(1))} کیلوگرم
        </span>
      </div>

      {/* روش ارسال */}
      <fieldset className="mt-3">
        <legend className="mb-2 text-xs font-semibold text-ink">روش ارسال</legend>
        <div className="space-y-2">
          {SHIPPING_METHODS.map((m) => (
            <label
              key={m.id}
              className={cn(
                "flex cursor-pointer items-start gap-2.5 rounded-lg border p-2.5 text-sm transition-colors",
                methodId === m.id
                  ? "border-brand-500 bg-brand-50"
                  : "border-line hover:border-brand-300",
              )}
            >
              <input
                type="radio"
                name="ship-method"
                checked={methodId === m.id}
                onChange={() => onMethodChange(m.id)}
                className="mt-0.5 size-4 accent-brand-700"
              />
              <span>
                <span className="block font-medium text-ink">{m.title}</span>
                <span className="mt-0.5 block text-xs text-muted">{m.description}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* جدول پله‌های وزن */}
      <div className="mt-3 overflow-hidden rounded-lg border border-line">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-canvas text-muted">
              <th className="p-2 text-start font-medium">وزن سفارش</th>
              <th className="p-2 text-start font-medium">هزینه پایه</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {SHIPPING_BRACKETS.map((b) => {
              const active = b.label === result.bracket.label;
              return (
                <tr key={b.label} className={active ? "bg-brand-50" : "bg-surface"}>
                  <td className="p-2 text-ink">{b.label}</td>
                  <td className="p-2 tabular-nums text-ink">
                    {b.cost === null ? "استعلامی" : `${formatNumber(b.cost)} تومان`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg bg-brand-50 px-3 py-2.5 text-sm">
        <span className="font-medium text-brand-800">هزینه ارسال این سفارش</span>
        <span className="font-bold tabular-nums text-brand-800">
          {result.requiresQuote
            ? "پس از تماس اعلام می‌شود"
            : `${formatNumber(result.cost ?? 0)} تومان`}
        </span>
      </div>
    </div>
  );
}
