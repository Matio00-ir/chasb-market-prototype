import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Info,
  MapPin,
  Receipt,
  ShieldCheck,
  User,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "حساب کاربری",
  description: "ورود و مدیریت حساب کاربری، سفارش‌ها و نشانی‌ها.",
  robots: { index: false, follow: false },
};

const areas = [
  { Icon: Receipt, title: "سفارش‌های من", desc: "پیگیری وضعیت و تاریخچه سفارش‌ها" },
  { Icon: MapPin, title: "نشانی‌ها", desc: "مدیریت نشانی‌های تحویل" },
  { Icon: Heart, title: "علاقه‌مندی‌ها", desc: "محصولات ذخیره‌شده برای خرید بعدی" },
  { Icon: ShieldCheck, title: "خرید سازمانی", desc: "درخواست فاکتور رسمی و قیمت همکاری" },
];

export default function AccountPage() {
  return (
    <Container className="py-8 lg:py-10">
      <Breadcrumbs items={[{ label: "خانه", href: "/" }, { label: "حساب کاربری" }]} />
      <h1 className="mb-6 mt-3 text-2xl font-bold text-ink">حساب کاربری</h1>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* فرم ورود (نمونه) */}
        <div className="surface-card p-5 lg:p-6">
          <span className="grid size-11 place-items-center rounded bg-brand-700 text-white">
            <User className="size-5" />
          </span>
          <h2 className="mt-3 text-sm font-bold text-ink">ورود / ثبت‌نام</h2>
          <p className="mt-1 text-xs text-muted">
            با شماره موبایل وارد شوید تا کد تأیید برایتان ارسال شود.
          </p>

          <div className="mt-4 space-y-3">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-ink">شماره موبایل</span>
              <input
                inputMode="numeric"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                className="h-11 w-full rounded border border-line bg-canvas px-3 text-sm outline-none focus:border-brand-400 focus:bg-surface"
              />
            </label>
            <button
              type="button"
              disabled
              className="inline-flex h-11 w-full cursor-not-allowed items-center justify-center rounded bg-canvas text-sm font-semibold text-muted"
            >
              دریافت کد تأیید
            </button>
          </div>

          <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-canvas p-3 text-xs leading-6 text-muted">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            در این نسخه نمونه، ورود واقعی فعال نیست. این صفحه صرفاً رابط کاربری بخش حساب
            را نشان می‌دهد.
          </p>
        </div>

        {/* پیش‌نمایش بخش‌های حساب */}
        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            {areas.map(({ Icon, title, desc }) => (
              <div key={title} className="rounded-lg border border-line bg-surface p-5">
                <span className="grid size-10 place-items-center rounded bg-brand-50 text-brand-700">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-3 text-sm font-bold text-ink">{title}</h3>
                <p className="mt-1 text-xs leading-6 text-muted">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-lg border border-line bg-canvas p-4">
            <p className="text-sm text-muted">
              برای خرید عمده نیازی به حساب کاربری نیست.
            </p>
            <Link
              href="/wholesale"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-600"
            >
              درخواست خرید عمده
              <ArrowLeft className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
