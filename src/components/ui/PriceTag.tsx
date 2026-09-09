import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";

/** نمایش استاندارد قیمت با واحد «تومان» و امکان نمایش قیمت خط‌خورده. */
export function PriceTag({
  value,
  compareAt,
  size = "md",
  className,
}: {
  value: number;
  compareAt?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  } as const;

  return (
    <span className={cn("inline-flex items-baseline gap-1.5", className)}>
      {compareAt && compareAt > value ? (
        <s className="text-xs text-muted/80">{formatNumber(compareAt)}</s>
      ) : null}
      <span className={cn("font-bold tabular-nums text-ink", sizes[size])}>
        {formatNumber(value)}
      </span>
      <span className="text-xs font-medium text-muted">تومان</span>
    </span>
  );
}
