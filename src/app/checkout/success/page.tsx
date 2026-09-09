import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Home, Package, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { toFaDigits } from "@/lib/format";

export const metadata: Metadata = {
  title: "ثبت سفارش با موفقیت انجام شد",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  const orderId = order ?? "ORD-NMONE";

  const steps = [
    { Icon: CheckCircle2, title: "سفارش ثبت شد", desc: "درخواست شما در سامانه ثبت شد.", done: true },
    { Icon: Phone, title: "تماس تأیید", desc: "کارشناس فروش برای تأیید نهایی تماس می‌گیرد." },
    { Icon: Package, title: "آماده‌سازی و ارسال", desc: "پس از تأیید، سفارش بسته‌بندی و ارسال می‌شود." },
  ];

  return (
    <Container className="py-14 lg:py-20">
      <div className="mx-auto max-w-xl text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="size-9" strokeWidth={1.6} />
        </span>
        <h1 className="mt-5 text-2xl font-extrabold text-ink">
          سفارش شما با موفقیت ثبت شد
        </h1>
        <p className="mt-2 text-sm leading-7 text-muted">
          از خرید شما سپاسگزاریم. جزئیات سفارش برای پیگیری در اختیار شماست.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5">
          <span className="text-xs text-muted">شماره سفارش:</span>
          <span className="font-mono text-sm font-bold tracking-wider text-ink" dir="ltr">
            {orderId}
          </span>
        </div>
      </div>

      <ol className="mx-auto mt-10 max-w-xl space-y-3">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="flex items-start gap-3 rounded-lg border border-line bg-surface p-4"
          >
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-full ${
                s.done ? "bg-emerald-50 text-emerald-600" : "bg-canvas text-muted"
              }`}
            >
              {s.done ? <s.Icon className="size-4" /> : toFaDigits(i + 1)}
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{s.title}</p>
              <p className="mt-0.5 text-xs text-muted">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
        <Link
          href="/shop"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded bg-brand-700 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
        >
          <Package className="size-4" />
          ادامه خرید
        </Link>
        <Link
          href="/"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded border border-line text-sm font-semibold text-ink transition-colors hover:bg-canvas"
        >
          <Home className="size-4" />
          بازگشت به خانه
        </Link>
      </div>

      <p className="mx-auto mt-6 max-w-xl text-center text-xs text-muted">
        این یک نسخه نمونه (Prototype) است؛ سفارش واقعی ثبت نشده و پرداختی انجام نشده است.
      </p>
    </Container>
  );
}
