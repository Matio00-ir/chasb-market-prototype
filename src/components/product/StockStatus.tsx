import { CircleCheck, CircleAlert, CircleX } from "lucide-react";
import { toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

export type StockLevel = "in" | "low" | "out";

export function stockLevel(stock: number): StockLevel {
  if (stock <= 0) return "out";
  if (stock <= 8) return "low";
  return "in";
}

/** نشانگر وضعیت موجودی. */
export function StockStatus({
  stock,
  showCount = false,
  className,
}: {
  stock: number;
  showCount?: boolean;
  className?: string;
}) {
  const level = stockLevel(stock);
  const map = {
    in: { Icon: CircleCheck, text: "موجود در انبار", cls: "text-emerald-600" },
    low: {
      Icon: CircleAlert,
      text: showCount ? `تنها ${toFaDigits(stock)} عدد باقی مانده` : "موجودی محدود",
      cls: "text-amber-600",
    },
    out: { Icon: CircleX, text: "ناموجود", cls: "text-rose-600" },
  }[level];

  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", map.cls, className)}>
      <map.Icon className="size-3.5" />
      {map.text}
    </span>
  );
}
