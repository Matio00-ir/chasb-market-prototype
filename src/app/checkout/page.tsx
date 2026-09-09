import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "تکمیل سفارش",
  description: "ثبت اطلاعات گیرنده، نشانی و روش ارسال برای نهایی‌سازی سفارش.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <Container className="py-8 lg:py-10">
      <Breadcrumbs
        items={[
          { label: "خانه", href: "/" },
          { label: "سبد خرید", href: "/cart" },
          { label: "تکمیل سفارش" },
        ]}
      />
      <h1 className="mb-6 mt-3 text-2xl font-bold text-ink">تکمیل سفارش</h1>
      <CheckoutClient />
    </Container>
  );
}
