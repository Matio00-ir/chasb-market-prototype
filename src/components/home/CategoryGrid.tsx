import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryArt } from "@/components/media/CategoryArt";
import { categories } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import { toFaDigits } from "@/lib/format";

/** بخش دسته‌بندی‌ها در صفحه اصلی. */
export function CategoryGrid() {
  return (
    <section className="py-14 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="دسته‌بندی"
          title="بر اساس کاربرد خرید کنید"
          description="پنج خانواده اصلی محصولات؛ از خط تولید صنعتی تا مراقبت روزمره خودرو."
          action={{ href: "/shop", label: "همه محصولات" }}
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => {
            const count = productsByCategory(c.slug).length;
            const wide = i === 0;
            return (
              <Link
                key={c.slug}
                href={`/shop?category=${c.slug}`}
                className={`group relative flex min-h-[190px] flex-col justify-end overflow-hidden rounded-lg border border-line p-5 text-white ${
                  wide ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <CategoryArt art={c.art} className="absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/30 to-transparent" />
                <div className="relative">
                  <span className="text-[11px] text-brand-100">
                    {toFaDigits(count)} کالا
                  </span>
                  <h3 className="mt-1 text-lg font-bold">{c.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-brand-100">
                    {c.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-white">
                    مشاهده محصولات
                    <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
