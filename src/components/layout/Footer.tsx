import Link from "next/link";
import {
  Layers,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Send,
  Linkedin,
  ShieldCheck,
} from "lucide-react";
import { categories } from "@/data/categories";

const shopLinks = [
  { href: "/shop", label: "همه محصولات" },
  { href: "/wholesale", label: "خرید عمده و همکاری" },
  { href: "/cart", label: "سبد خرید" },
  { href: "/account", label: "حساب کاربری" },
];

const infoLinks = [
  { href: "/wholesale", label: "شرایط فروش عمده" },
  { href: "/legal/terms", label: "قوانین و مقررات" },
  { href: "/legal/privacy", label: "حریم خصوصی" },
  { href: "/legal/shipping", label: "شیوه ارسال و مرجوعی" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        {/* درباره */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded bg-brand-700 text-white">
              <Layers className="size-5" strokeWidth={2} />
            </span>
            <span className="text-[15px] font-extrabold text-ink">چسب‌مارکت</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-7 text-muted">
            عرضه تخصصی انواع چسب صنعتی، ساختمانی و عمومی و محصولات نظافت و مراقبت
            خودرو، با امکان خرید تکی و عمده و قیمت همکاری.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {[
              { Icon: Instagram, label: "اینستاگرام" },
              { Icon: Send, label: "تلگرام" },
              { Icon: Linkedin, label: "لینکدین" },
            ].map(({ Icon, label }) => (
              <span
                key={label}
                className="grid size-9 place-items-center rounded border border-line text-muted"
                aria-label={label}
                title={label}
              >
                <Icon className="size-4" />
              </span>
            ))}
          </div>
        </div>

        {/* دسته‌بندی‌ها */}
        <nav aria-label="دسته‌بندی‌ها">
          <h3 className="text-sm font-bold text-ink">دسته‌بندی محصولات</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop?category=${c.slug}`} className="hover:text-ink">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* لینک‌های مفید */}
        <nav aria-label="خرید و راهنما">
          <h3 className="text-sm font-bold text-ink">خرید و راهنما</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            {shopLinks.concat(infoLinks).map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href} className="hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* تماس */}
        <div>
          <h3 className="text-sm font-bold text-ink">اطلاعات فروشگاه</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-700" />
              تهران، خیابان نمونه، پلاک ۱۲۸، طبقه ۳
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-brand-700" />
              ۰۲۱-۹۱۰۰۰۰۰۰
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-brand-700" />
              info@chasbmarket.example
            </li>
          </ul>

          <div className="mt-5 flex items-center gap-3 rounded-lg border border-line bg-canvas p-3">
            <ShieldCheck className="size-8 shrink-0 text-emerald-600" strokeWidth={1.5} />
            <div className="text-xs leading-5 text-muted">
              <span className="block font-semibold text-ink">نماد اعتماد الکترونیکی</span>
              نمونه — در نسخه نهایی جایگزین می‌شود
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-4 text-xs text-muted sm:flex-row">
          <p>© ۱۴۰۴ چسب‌مارکت — کلیه حقوق محفوظ است.</p>
          <p>این یک نسخه نمونه (Prototype) است و امکان خرید واقعی ندارد.</p>
        </div>
      </div>
    </footer>
  );
}
