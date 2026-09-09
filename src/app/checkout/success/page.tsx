import type { Metadata } from "next";
import { Suspense } from "react";
import { SuccessContent } from "@/components/checkout/SuccessContent";

export const metadata: Metadata = {
  title: "ثبت سفارش با موفقیت انجام شد",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
