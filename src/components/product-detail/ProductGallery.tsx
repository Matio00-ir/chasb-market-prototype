"use client";

import { useState } from "react";
import { Box, Layers, Ruler, ScanLine } from "lucide-react";
import type { Product } from "@/types";
import { ProductThumb } from "@/components/media/ProductThumb";
import { artGradient } from "@/components/media/artMaps";
import { categoryBySlug } from "@/data/categories";
import { cn } from "@/lib/utils";

const ANGLE_ICONS = [Box, Layers, Ruler, ScanLine];

/**
 * گالری تصویر محصول.
 * در این پروتوتایپ تصویر اصلی از Placeholder اختصاصی می‌آید و نماهای فرعی
 * به‌صورت تزئینی نمایش داده می‌شوند (جای عکس‌های واقعی محصول در نسخه نهایی).
 */
export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const art = categoryBySlug(product.category)?.art ?? "general";
  const g = artGradient[art];

  return (
    <div className="space-y-3">
      <div className="surface-card overflow-hidden">
        {active === 0 ? (
          <ProductThumb
            product={product}
            priority
            className="aspect-square w-full"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        ) : (
          <div
            className="flex aspect-square w-full items-center justify-center"
            style={{ background: `linear-gradient(140deg, ${g.from}, ${g.to})` }}
          >
            {(() => {
              const Icon = ANGLE_ICONS[active];
              return (
                <Icon
                  className="size-24"
                  style={{ color: g.ink, opacity: 0.35 }}
                  strokeWidth={1}
                />
              );
            })()}
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[0, 1, 2, 3].map((i) => {
          const Icon = ANGLE_ICONS[i];
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`نمای ${i + 1}`}
              className={cn(
                "surface-card grid aspect-square place-items-center overflow-hidden transition-colors",
                active === i ? "ring-2 ring-brand-500" : "hover:border-brand-300",
              )}
            >
              {i === 0 ? (
                <ProductThumb product={product} className="size-full" sizes="120px" />
              ) : (
                <Icon
                  className="size-7"
                  style={{ color: g.ink, opacity: 0.4 }}
                  strokeWidth={1.2}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
