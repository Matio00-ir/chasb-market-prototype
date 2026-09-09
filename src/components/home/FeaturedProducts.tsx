import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { featuredProducts } from "@/data/products";

/** محصولات منتخب صفحه اصلی. */
export function FeaturedProducts() {
  const items = featuredProducts().slice(0, 8);
  return (
    <section className="border-y border-line bg-surface py-14 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="پرفروش‌ها"
          title="محصولات منتخب"
          description="پرتقاضاترین کالاهای فروشگاه در دسته‌های صنعتی، ساختمانی و مراقبت خودرو."
          action={{ href: "/shop", label: "مشاهده فروشگاه" }}
        />
        <ProductGrid className="mt-8" products={items} priorityCount={4} />
      </Container>
    </section>
  );
}
