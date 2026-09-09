"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/features/cart/CartContext";
import { toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

/** دکمه سبد خرید هدر با نشانگر تعداد اقلام. */
export function CartButton({ className }: { className?: string }) {
  const { totals, ready } = useCart();
  const count = totals.itemCount;

  return (
    <Link
      href="/cart"
      className={cn(
        "relative inline-flex h-10 items-center gap-2 rounded border border-line bg-surface px-3 text-sm font-medium text-ink transition-colors hover:border-brand-300 hover:bg-brand-50",
        className,
      )}
      aria-label={`سبد خرید${ready && count ? ` — ${count} قلم` : ""}`}
    >
      <ShoppingCart className="size-4 text-brand-700" aria-hidden="true" />
      <span className="hidden sm:inline">سبد خرید</span>
      {ready && count > 0 ? (
        <span className="absolute -end-1.5 -top-1.5 flex min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-[11px] font-bold leading-5 text-white">
          {toFaDigits(count)}
        </span>
      ) : null}
    </Link>
  );
}
