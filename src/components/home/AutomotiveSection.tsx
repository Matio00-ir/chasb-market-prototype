import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { productsByCategory } from "@/data/products";

/** بخش مجزای محصولات نظافت و مراقبت خودرو در صفحه اصلی. */
export function AutomotiveSection() {
  const items = productsByCategory("car-care").slice(0, 4);

  return (
    <section className="py-14 lg:py-20">
      <Container>
        <div className="overflow-hidden rounded-xl border border-line">
          <div className="relative bg-gradient-to-br from-[#173a3a] to-[#0e2626] p-8 text-white lg:p-10">
            <div className="bg-grid absolute inset-0 opacity-30" aria-hidden="true" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <p className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium">
                  <Sparkles className="size-3.5 text-emerald-300" />
                  دیتیلینگ و مراقبت خودرو
                </p>
                <h2 className="mt-4 text-2xl font-extrabold">
                  خودرو را حرفه‌ای تمیز و محافظت کنید
                </h2>
                <p className="mt-3 text-sm leading-8 text-white/80">
                  شامپو کنسانتره، واکس نانو، تمیزکننده کابین و محصولات پرداخت؛ همه با
                  فرمول ایمن برای رنگ و پوشش بدنه.
                </p>
              </div>
              <Link
                href="/shop?category=car-care"
                className="inline-flex h-11 shrink-0 items-center gap-2 rounded bg-white px-5 text-sm font-semibold text-[#123] transition-colors hover:bg-white/90"
              >
                محصولات مراقبت خودرو
                <ArrowLeft className="size-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 bg-surface p-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
