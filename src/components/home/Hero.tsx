import Link from "next/link";
import { ArrowLeft, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";

/** بخش Hero صفحه اصلی. */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-brand-950 text-white">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div
        className="absolute -start-24 -top-24 size-72 rounded-full bg-brand-700/40 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-4 inline-flex items-center gap-2 rounded border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-brand-100">
              <span className="size-1.5 rounded-full bg-accent-400" />
              فروش تکی و عمده با قیمت همکاری
            </p>
            <h1 className="text-balance text-3xl font-extrabold leading-[1.35] sm:text-4xl lg:text-[42px]">
              فروش تخصصی انواع چسب و
              <br className="hidden sm:block" /> محصولات مراقبت خودرو
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-8 text-brand-100 sm:text-base">
              از چسب‌های صنعتی و ساختمانی تا محصولات دیتیلینگ خودرو؛ همه در یک فروشگاه
              با تضمین اصالت، مشاوره فنی و امکان خرید در تیراژ بالا.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex h-12 items-center justify-center gap-2 rounded bg-white px-6 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-50"
              >
                مشاهده محصولات
                <ArrowLeft className="size-4" />
              </Link>
              <Link
                href="/wholesale"
                className="inline-flex h-12 items-center justify-center gap-2 rounded border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                خرید عمده
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-center sm:text-start">
              {[
                { n: "+۱٬۲۰۰", t: "کد کالای فعال" },
                { n: "۴ پلکان", t: "قیمت‌گذاری عمده" },
                { n: "۲۴ ساعت", t: "پردازش سفارش" },
              ].map((s) => (
                <div key={s.t}>
                  <dt className="text-lg font-extrabold text-white sm:text-xl">{s.n}</dt>
                  <dd className="mt-1 text-[11px] text-brand-100 sm:text-xs">{s.t}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* پنل تزئینی سمت چپ */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <div className="space-y-3">
                {[
                  { Icon: ShieldCheck, title: "تضمین اصالت کالا", desc: "تأمین مستقیم از برند و واردکننده" },
                  { Icon: Truck, title: "ارسال سریع سراسری", desc: "هزینه ارسال بر اساس وزن سفارش" },
                  { Icon: PackageCheck, title: "قیمت پلکانی شفاف", desc: "هرچه بیشتر، ارزان‌تر — تا قیمت همکاری" },
                ].map(({ Icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex items-start gap-3 rounded-lg border border-white/10 bg-brand-900/40 p-4"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded bg-white/10 text-white">
                      <Icon className="size-5" strokeWidth={1.7} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="mt-0.5 text-xs text-brand-100">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
