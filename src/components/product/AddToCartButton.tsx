"use client";

import { Check, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/features/cart/CartContext";
import { cn } from "@/lib/utils";

/**
 * دکمه افزودن به سبد.
 * - variant="icon": فقط آیکون (کارت محصول)
 * - variant="full": دکمه کامل با متن (صفحه محصول)
 */
export function AddToCartButton({
  slug,
  qty = 1,
  disabled = false,
  variant = "full",
  className,
  label = "افزودن به سبد خرید",
}: {
  slug: string;
  qty?: number;
  disabled?: boolean;
  variant?: "icon" | "full";
  className?: string;
  label?: string;
}) {
  const { add } = useCart();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setDone(false), 1600);
    return () => clearTimeout(t);
  }, [done]);

  const onClick = () => {
    if (disabled) return;
    add(slug, qty);
    setDone(true);
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded border transition-colors",
          disabled
            ? "cursor-not-allowed border-line bg-canvas text-muted/50"
            : done
              ? "border-emerald-200 bg-emerald-50 text-emerald-600"
              : "border-brand-700 bg-brand-700 text-white hover:bg-brand-600",
          className,
        )}
      >
        {done ? <Check className="size-4" /> : <Plus className="size-4" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded px-6 text-sm font-semibold transition-colors",
        disabled
          ? "cursor-not-allowed bg-canvas text-muted"
          : done
            ? "bg-emerald-600 text-white"
            : "bg-brand-700 text-white hover:bg-brand-600",
        className,
      )}
    >
      {done ? (
        <>
          <Check className="size-4" /> به سبد اضافه شد
        </>
      ) : (
        <>
          <ShoppingCart className="size-4" /> {label}
        </>
      )}
    </button>
  );
}
