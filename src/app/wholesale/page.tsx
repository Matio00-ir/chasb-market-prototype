import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BadgePercent,
  Boxes,
  FileText,
  PackageCheck,
  Truck,
  Wallet,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WholesaleRequestForm } from "@/components/wholesale/WholesaleRequestForm";
import { TIER_BREAKS } from "@/lib/pricing";
import { SHIPPING_BRACKETS } from "@/lib/shipping";
import { formatNumber, toFaDigits, formatPercent } from "@/lib/format";

export const metadata: Metadata = {
  title: "خرید عمده و قیمت همکاری",
  description:
    "شرایط فروش عمده چسب و محصولات مراقبت خودرو: پلکان قیمت، حداقل سفارش، شرایط ارسال و ثبت درخواست خرید عمده.",
};

const benefits = [
  { Icon: BadgePercent, title: "قیمت همکاری پلکانی", desc: "تا ۴ پله تخفیف بر اساس تعداد؛ بدون نیاز به چانه‌زنی." },
  { Icon: Wallet, title: "تسویه انعطاف‌پذیر", desc: "امکان تعریف شرایط پرداخت برای مشتریان ثابت." },
  { Icon: PackageCheck, title: "تأمین پایدار", desc: "رزرو موجودی و اولویت ارسال برای سفارش‌های دوره‌ای." },
  { Icon: FileText, title: "فاکتور رسمی", desc: "صدور فاکتور رسمی و امکان خرید سازمانی." },
];

export default function WholesalePage() {
  return (
    <>
      {/* هدر */}
      <section className="border-b border-line bg-brand-950 text-white">
        <Container className="py-12 lg:py-16">
          <Breadcrumbs
            items={[{ label: "خانه", href: "/" }, { label: "خرید عمده" }]}
          />
          <div className="mt-4 grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-brand-100">
                <Boxes className="size-3.5 text-accent-400" />
                ویژه فروشگاه‌ها، پیمانکاران و کارگاه‌ها
              </p>
              <h1 className="mt-4 text-3xl font-extrabold leading-relaxed">
                خرید عمده با قیمت همکاری
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-8 text-brand-100">
                اگر به‌صورت مستمر یا در تیراژ بالا خرید می‌کنید، با ثبت درخواست عمده از
                پلکان قیمت همکاری، تأمین پایدار و اولویت ارسال بهره‌مند شوید.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#request"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded bg-accent-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
                >
                  ثبت درخواست خرید عمده
                  <ArrowLeft className="size-4" />
                </a>
                <Link
                  href="/shop"
                  className="inline-flex h-12 items-center justify-center rounded border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  مشاهده محصولات
                </Link>
              </div>
            </div>

            {/* حداقل سفارش */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-sm font-bold text-white">حداقل سفارش عمده</h2>
              <ul className="mt-3 space-y-2.5 text-sm text-brand-100">
                <li className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span>حداقل مبلغ سفارش</span>
                  <span className="font-bold text-white">{formatNumber(5000000)} تومان</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span>حداقل تعداد هر کالا</span>
                  <span className="font-bold text-white">{toFaDigits(10)} عدد</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>شروع قیمت همکاری</span>
                  <span className="font-bold text-white">{toFaDigits(100)} عدد به بالا</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-14 lg:py-20">
        {/* مزایا */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ Icon, title, desc }) => (
            <div key={title} className="rounded-lg border border-line bg-surface p-5">
              <span className="grid size-11 place-items-center rounded bg-brand-700 text-white">
                <Icon className="size-5" strokeWidth={1.7} />
              </span>
              <h3 className="mt-3 text-sm font-bold text-ink">{title}</h3>
              <p className="mt-1.5 text-xs leading-6 text-muted">{desc}</p>
            </div>
          ))}
        </div>

        {/* پلکان قیمت */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-lg font-bold text-ink">پلکان قیمت‌گذاری</h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              درصد تخفیف زیر نسبت به قیمت خرید تکی، روی همه محصولات فروشگاه اعمال می‌شود.
              قیمت دقیق هر کالا در صفحه همان محصول و در سبد خرید نمایش داده می‌شود.
            </p>
            <div className="mt-4 overflow-hidden rounded-lg border border-line">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-canvas text-xs text-muted">
                    <th className="p-3 text-start font-medium">تعداد</th>
                    <th className="p-3 text-start font-medium">عنوان پله</th>
                    <th className="p-3 text-start font-medium">تخفیف تقریبی</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {TIER_BREAKS.map((t) => (
                    <tr key={t.minQty} className="bg-surface">
                      <td className="p-3 font-medium text-ink">
                        {t.maxQty === null
                          ? `${toFaDigits(t.minQty)} عدد و بیشتر`
                          : `${toFaDigits(t.minQty)} تا ${toFaDigits(t.maxQty)} عدد`}
                      </td>
                      <td className="p-3 text-muted">{t.label}</td>
                      <td className="p-3">
                        {t.factor === 0 ? (
                          <span className="text-xs text-muted">قیمت پایه</span>
                        ) : (
                          <span className="text-xs font-medium text-emerald-600">
                            تا {formatPercent(t.factor * 30)}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* شرایط ارسال */}
          <div>
            <h2 className="text-lg font-bold text-ink">شرایط ارسال سفارش عمده</h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              هزینه ارسال بر اساس وزن کل سفارش محاسبه می‌شود. برای سفارش‌های سنگین،
              هماهنگی حمل با باربری انجام می‌شود.
            </p>
            <div className="mt-4 overflow-hidden rounded-lg border border-line">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-canvas text-xs text-muted">
                    <th className="p-3 text-start font-medium">وزن سفارش</th>
                    <th className="p-3 text-start font-medium">هزینه پایه</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {SHIPPING_BRACKETS.map((b) => (
                    <tr key={b.label} className="bg-surface">
                      <td className="p-3 text-ink">{b.label}</td>
                      <td className="p-3 tabular-nums text-ink">
                        {b.cost === null ? "استعلامی" : `${formatNumber(b.cost)} تومان`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 flex items-center gap-2 text-xs text-muted">
              <Truck className="size-4 text-brand-700" />
              ارسال رایگان برای سفارش‌های عمده بالای {formatNumber(20000000)} تومان در مراکز استان.
            </p>
          </div>
        </div>

        {/* فرم درخواست */}
        <div id="request" className="mt-14 scroll-mt-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-xl font-bold text-ink">
              درخواست خرید عمده ثبت کنید
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-center text-sm text-muted">
              پس از ثبت فرم، لیست قیمت همکاری و شرایط سفارش برای شما ارسال می‌شود.
            </p>
            <div className="mt-6">
              <WholesaleRequestForm />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
