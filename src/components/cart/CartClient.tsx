"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import type { ShippingMethodId } from "@/types";
import { useCart } from "@/features/cart/CartContext";
import { CartLineItem } from "./CartLineItem";
import { ShippingCalculator } from "./ShippingCalculator";
import { CartSummary } from "./CartSummary";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { toFaDigits } from "@/lib/format";

export function CartClient() {
  const { totals, ready, clear } = useCart();
  const [methodId, setMethodId] = useState<ShippingMethodId>("courier");

  if (!ready) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  if (totals.lines.length === 0) {
    return (
      <EmptyState
        icon={ShoppingCart}
        title="سبد خرید شما خالی است"
        description="از فروشگاه محصول موردنظر را انتخاب و به سبد اضافه کنید."
        action={
          <Button href="/shop">
            رفتن به فروشگاه
            <ArrowLeft className="size-4" />
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div>
        <div className="surface-card">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="text-sm font-semibold text-ink">
              {toFaDigits(totals.itemCount)} قلم در سبد
            </span>
            <button
              onClick={clear}
              className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-rose-600"
            >
              <Trash2 className="size-3.5" />
              خالی کردن سبد
            </button>
          </div>
          <div className="divide-y divide-line px-4">
            {totals.lines.map((line) => (
              <CartLineItem key={line.product.slug} line={line} />
            ))}
          </div>
        </div>

        <Link
          href="/shop"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-brand-700 hover:text-brand-600"
        >
          <ArrowLeft className="size-4 rotate-180" />
          ادامه خرید
        </Link>
      </div>

      <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
        <ShippingCalculator
          totalWeightGrams={totals.totalWeightGrams}
          methodId={methodId}
          onMethodChange={setMethodId}
        />
        <CartSummary
          totals={totals}
          methodId={methodId}
          cta={{ href: "/checkout", label: "ادامه و تکمیل سفارش" }}
        />
      </div>
    </div>
  );
}
