import { Check } from "lucide-react";
import type { Product } from "@/types";
import { getPriceTiers } from "@/lib/pricing";
import { formatNumber, formatPercent, toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

/** بازه تعداد یک پله به‌صورت متن فارسی. */
function rangeLabel(minQty: number, maxQty: number | null): string {
  if (maxQty === null) return `${toFaDigits(minQty)} عدد و بیشتر`;
  return `${toFaDigits(minQty)} تا ${toFaDigits(maxQty)} عدد`;
}

/**
 * جدول قیمت پلکانی محصول.
 * اگر `activeQty` داده شود، پله متناظر برجسته می‌شود (برای صفحه محصول با تعداد داینامیک).
 */
export function WholesalePriceTable({
  product,
  activeQty,
  className,
}: {
  product: Product;
  activeQty?: number;
  className?: string;
}) {
  const tiers = getPriceTiers(product);

  return (
    <div className={cn("overflow-hidden rounded-lg border border-line", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-canvas text-xs text-muted">
            <th className="p-3 text-start font-medium">تعداد</th>
            <th className="p-3 text-start font-medium">قیمت هر عدد</th>
            <th className="p-3 text-start font-medium">صرفه‌جویی</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {tiers.map((t) => {
            const active =
              activeQty !== undefined &&
              activeQty >= t.minQty &&
              (t.maxQty === null || activeQty <= t.maxQty);
            return (
              <tr
                key={t.minQty}
                className={cn(
                  "transition-colors",
                  active ? "bg-brand-50" : "bg-surface",
                )}
              >
                <td className="p-3">
                  <span className="flex items-center gap-1.5 font-medium text-ink">
                    {active ? (
                      <Check className="size-3.5 text-brand-700" />
                    ) : null}
                    {rangeLabel(t.minQty, t.maxQty)}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-muted">{t.label}</span>
                </td>
                <td className="p-3">
                  <span className="font-bold tabular-nums text-ink">
                    {formatNumber(t.unitPrice)}
                  </span>
                  <span className="text-[11px] text-muted"> تومان</span>
                </td>
                <td className="p-3">
                  {t.savingsPercent >= 1 ? (
                    <span className="text-xs font-medium text-emerald-600">
                      {formatPercent(t.savingsPercent)}
                    </span>
                  ) : (
                    <span className="text-xs text-muted">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
