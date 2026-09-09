import Link from "next/link";
import { ArrowLeft, TrendingDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { productBySlug } from "@/data/products";
import { getPriceTiers } from "@/lib/pricing";
import { formatNumber, formatPercent, toFaDigits } from "@/lib/format";

/** بنر معرفی خرید عمده با نمایش پلکان قیمت یک محصول نمونه. */
export function WholesaleBanner() {
  const sample = productBySlug("chasb-123-ghatrei-hamekare");
  const tiers = sample ? getPriceTiers(sample) : [];
  const qtyMarks = [1, 10, 50, 100];

  return (
    <section className="py-14 lg:py-20">
      <Container>
        <div className="overflow-hidden rounded-xl border border-line bg-brand-950 text-white">
          <div className="grid lg:grid-cols-2">
            {/* متن */}
            <div className="bg-grid p-8 lg:p-10">
              <p className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-brand-100">
                <TrendingDown className="size-3.5 text-accent-400" />
                خرید عمده با قیمت همکاری
              </p>
              <h2 className="mt-4 text-2xl font-extrabold leading-relaxed">
                هرچه بیشتر بخرید، هر واحد ارزان‌تر می‌شود
              </h2>
              <p className="mt-3 max-w-md text-sm leading-8 text-brand-100">
                قیمت‌گذاری در چهار پله تعریف شده است؛ از خرید تکی تا قیمت همکاری برای
                خرید ۱۰۰ عدد و بیشتر. پلکان قیمت روی همه محصولات فروشگاه اعمال می‌شود.
              </p>
              <Link
                href="/wholesale"
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded bg-accent-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
              >
                جزئیات خرید عمده
                <ArrowLeft className="size-4" />
              </Link>
            </div>

            {/* پلکان قیمت */}
            <div className="border-t border-white/10 bg-brand-900/40 p-8 lg:border-s lg:border-t-0 lg:p-10">
              <p className="text-xs text-brand-100">
                نمونه: {sample?.name}
              </p>
              <ul className="mt-4 space-y-2.5">
                {tiers.map((t, i) => (
                  <li
                    key={t.minQty}
                    className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-3.5"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded bg-white/10 text-xs font-bold text-white">
                        {toFaDigits(qtyMarks[i])}
                      </span>
                      <span className="text-xs text-brand-100">{t.label}</span>
                    </span>
                    <span className="text-start">
                      <span className="block text-sm font-bold tabular-nums text-white">
                        {formatNumber(t.unitPrice)}
                        <span className="text-[10px] font-normal text-brand-100"> تومان</span>
                      </span>
                      {t.savingsPercent >= 1 ? (
                        <span className="block text-[10px] text-accent-300">
                          {formatPercent(t.savingsPercent)} ارزان‌تر
                        </span>
                      ) : (
                        <span className="block text-[10px] text-brand-100">قیمت پایه</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
