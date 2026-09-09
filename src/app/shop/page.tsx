import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ShopClient } from "@/components/shop/ShopClient";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { products, allUsageTags, priceRange } from "@/data/products";
import { brands } from "@/data/brands";

export const metadata: Metadata = {
  title: "فروشگاه محصولات",
  description:
    "فهرست کامل چسب‌های صنعتی، ساختمانی، عمومی و محصولات مراقبت خودرو با امکان فیلتر بر اساس دسته، برند، قیمت، موجودی و کاربرد.",
};

function ShopFallback() {
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="hidden lg:block">
        <div className="surface-card h-[520px]" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Container className="py-8 lg:py-10">
      <Breadcrumbs items={[{ label: "خانه", href: "/" }, { label: "فروشگاه" }]} />
      <div className="mb-6 mt-3">
        <h1 className="text-2xl font-bold text-ink">فروشگاه محصولات</h1>
        <p className="mt-1.5 text-sm text-muted">
          {`${products.length} کالای تخصصی در پنج دسته — فیلترها را برای یافتن سریع‌تر محصول به کار ببرید.`}
        </p>
      </div>

      <Suspense fallback={<ShopFallback />}>
        <ShopClient
          allProducts={products}
          brands={brands}
          usageTags={allUsageTags()}
          priceBounds={priceRange()}
        />
      </Suspense>
    </Container>
  );
}
