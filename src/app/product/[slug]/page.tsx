import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Truck, Undo2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ProductGallery } from "@/components/product-detail/ProductGallery";
import { PurchasePanel } from "@/components/product-detail/PurchasePanel";
import { SpecsTable } from "@/components/product-detail/SpecsTable";
import { ProductCard } from "@/components/product/ProductCard";
import { products, productBySlug } from "@/data/products";
import { categoryTitle, categoryBySlug } from "@/data/categories";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return { title: "محصول یافت نشد" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const category = categoryBySlug(product.category);
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <Container className="py-8 lg:py-10">
      <Breadcrumbs
        items={[
          { label: "خانه", href: "/" },
          { label: "فروشگاه", href: "/shop" },
          {
            label: categoryTitle(product.category),
            href: `/shop?category=${product.category}`,
          },
          { label: product.name },
        ]}
      />

      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr]">
        <div>
          <ProductGallery product={product} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Badge tone="brand">{product.brand}</Badge>
            <Badge tone="neutral">{categoryTitle(product.category)}</Badge>
            {product.featured ? <Badge tone="accent">منتخب</Badge> : null}
          </div>
          <h1 className="mt-3 text-2xl font-extrabold leading-relaxed text-ink">
            {product.name}
          </h1>
          <p className="mt-2 max-w-prose text-sm leading-7 text-muted">
            {product.shortDescription}
          </p>

          <div className="mt-6">
            <PurchasePanel product={product} />
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-2 text-xs text-muted sm:grid-cols-3">
            <li className="flex items-center gap-2 rounded border border-line bg-surface p-3">
              <ShieldCheck className="size-4 text-brand-700" /> تضمین اصالت و فاکتور رسمی
            </li>
            <li className="flex items-center gap-2 rounded border border-line bg-surface p-3">
              <Truck className="size-4 text-brand-700" /> ارسال بر اساس وزن سفارش
            </li>
            <li className="flex items-center gap-2 rounded border border-line bg-surface p-3">
              <Undo2 className="size-4 text-brand-700" /> ۷ روز ضمانت بازگشت
            </li>
          </ul>
        </div>
      </div>

      {/* توضیحات و مشخصات */}
      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_minmax(0,420px)]">
        <section>
          <h2 className="text-lg font-bold text-ink">معرفی محصول</h2>
          <p className="mt-3 max-w-prose text-sm leading-8 text-muted">
            {product.description}
          </p>

          <h3 className="mt-6 text-sm font-bold text-ink">کاربردها</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.usage.map((u) => (
              <span
                key={u}
                className="rounded border border-line bg-surface px-2.5 py-1 text-xs text-muted"
              >
                {u}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">مشخصات فنی</h2>
          <div className="mt-3">
            <SpecsTable specs={product.specs} />
          </div>
          <p className="mt-2 text-xs text-muted">
            حجم/وزن بسته‌بندی: {product.volume}
          </p>
        </section>
      </div>

      {/* محصولات مرتبط */}
      {related.length > 0 ? (
        <section className="mt-14">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink">محصولات مرتبط</h2>
            <Link
              href={`/shop?category=${product.category}`}
              className="link-quiet inline-flex items-center gap-1 text-sm"
            >
              همه {category?.title}
              <ArrowLeft className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}
