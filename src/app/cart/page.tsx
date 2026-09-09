import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CartClient } from "@/components/cart/CartClient";

export const metadata: Metadata = {
  title: "سبد خرید",
  description: "بازبینی اقلام سبد خرید، تخفیف عمده و تخمین هزینه ارسال بر اساس وزن سفارش.",
};

export default function CartPage() {
  return (
    <Container className="py-8 lg:py-10">
      <Breadcrumbs items={[{ label: "خانه", href: "/" }, { label: "سبد خرید" }]} />
      <h1 className="mb-6 mt-3 text-2xl font-bold text-ink">سبد خرید</h1>
      <CartClient />
    </Container>
  );
}
