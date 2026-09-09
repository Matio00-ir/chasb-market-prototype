"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toFaDigits } from "@/lib/format";
import { clamp } from "@/lib/utils";

/** انتخابگر تعداد با دکمه‌های +/− و ورودی مستقیم. */
export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 999,
  size = "md",
  ariaLabel = "تعداد",
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  ariaLabel?: string;
  className?: string;
}) {
  const set = (n: number) => onChange(clamp(Math.floor(n || min), min, max));
  const btn =
    size === "sm"
      ? "size-8 text-muted"
      : "size-10 text-muted";
  const field = size === "sm" ? "h-8 w-10 text-sm" : "h-10 w-14 text-[15px]";

  return (
    <div
      className={cn(
        "inline-flex items-stretch overflow-hidden rounded border border-line bg-surface",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => set(value - 1)}
        disabled={value <= min}
        aria-label="کاهش تعداد"
        className={cn(
          "flex items-center justify-center transition-colors hover:bg-canvas hover:text-ink disabled:opacity-40",
          btn,
        )}
      >
        <Minus className="size-4" />
      </button>
      <input
        type="text"
        inputMode="numeric"
        aria-label={ariaLabel}
        value={toFaDigits(value)}
        onChange={(e) => {
          const digits = e.target.value.replace(/[^\d۰-۹]/g, "");
          const latin = digits.replace(/[۰-۹]/g, (d) =>
            String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)),
          );
          set(Number(latin || min));
        }}
        className={cn(
          "border-x border-line text-center font-semibold tabular-nums outline-none focus:bg-brand-50/40",
          field,
        )}
      />
      <button
        type="button"
        onClick={() => set(value + 1)}
        disabled={value >= max}
        aria-label="افزایش تعداد"
        className={cn(
          "flex items-center justify-center transition-colors hover:bg-canvas hover:text-ink disabled:opacity-40",
          btn,
        )}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
