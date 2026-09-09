import Image from "next/image";
import { cn } from "@/lib/utils";
import { artGradient, artIcon } from "./artMaps";
import { categoryBySlug } from "@/data/categories";
import type { Product } from "@/types";

/**
 * تصویر محصول.
 * اگر `product.image` مقدار داشته باشد از next/image استفاده می‌شود؛ در غیر این صورت
 * یک Placeholder اختصاصی صنعتی (گرادیان + شبکه نقشه‌کشی + آیکون دسته) رندر می‌شود.
 * ظاهر Placeholder برای هر محصول بر اساس شناسه‌اش کمی متفاوت است تا یکنواخت نباشد.
 */
export function ProductThumb({
  product,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
}: {
  product: Product;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const category = categoryBySlug(product.category);
  const art = category?.art ?? "general";
  const Icon = artIcon[art];
  const g = artGradient[art];

  // عدد شبه‌تصادفی پایدار از شناسه محصول
  const seed = Array.from(product.id).reduce((a, c) => a + c.charCodeAt(0), 0);
  const rotate = (seed % 7) - 3; // -3..3 درجه
  const offsetX = (seed % 5) - 2;

  if (product.image) {
    return (
      <div className={cn("relative overflow-hidden bg-canvas", className)}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background: `linear-gradient(140deg, ${g.from}, ${g.to})` }}
      role="img"
      aria-label={product.name}
    >
      {/* شبکه نقشه‌کشی */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(22,32,43,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(22,32,43,.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      {/* خط برش مورب ظریف */}
      <div
        className="absolute inset-x-0 top-1/2 h-px"
        style={{ background: g.ink, opacity: 0.14 }}
      />
      {/* آیکون بزرگ کم‌رنگ گوشه */}
      <Icon
        className="absolute -bottom-6 -start-6 size-40"
        style={{ color: g.ink, opacity: 0.08 }}
        strokeWidth={1}
        aria-hidden="true"
      />
      {/* آیکون اصلی */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="flex size-16 items-center justify-center rounded-xl border bg-white/70 backdrop-blur-sm sm:size-20"
          style={{
            borderColor: `${g.ink}22`,
            transform: `rotate(${rotate}deg) translateX(${offsetX}px)`,
          }}
        >
          <Icon
            className="size-8 sm:size-10"
            style={{ color: g.ink }}
            strokeWidth={1.4}
            aria-hidden="true"
          />
        </span>
      </div>
      {/* برچسب برند پایین */}
      <span
        className="absolute bottom-2 start-2 rounded bg-white/75 px-2 py-0.5 text-[11px] font-medium"
        style={{ color: g.ink }}
      >
        {product.brand}
      </span>
    </div>
  );
}
