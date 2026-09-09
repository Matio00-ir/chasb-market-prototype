"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Layers,
  Menu,
  Phone,
  ShieldCheck,
  Truck,
  User,
  X,
} from "lucide-react";
import { categories } from "@/data/categories";
import { artIcon } from "@/components/media/artMaps";
import { cn } from "@/lib/utils";
import { SearchBar } from "./SearchBar";
import { CartButton } from "./CartButton";

const primaryNav = [
  { href: "/", label: "خانه" },
  { href: "/shop", label: "فروشگاه" },
  { href: "/wholesale", label: "خرید عمده" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  // بستن منوها هنگام تغییر مسیر
  useEffect(() => {
    setMobileOpen(false);
    setCatOpen(false);
  }, [pathname]);

  // بستن دراپ‌داون دسته‌ها با کلیک بیرون
  useEffect(() => {
    if (!catOpen) return;
    const onClick = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [catOpen]);

  // قفل اسکرول هنگام باز بودن دراور موبایل
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      {/* نوار اعلان */}
      <div className="hidden border-b border-line bg-brand-950 text-brand-100 md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <Truck className="size-3.5" /> ارسال سریع به سراسر کشور
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5" /> تضمین اصالت کالا
            </span>
          </div>
          <a href="tel:02191000000" className="inline-flex items-center gap-1.5 hover:text-white">
            <Phone className="size-3.5" /> ۰۲۱-۹۱۰۰۰۰۰۰
          </a>
        </div>
      </div>

      {/* نوار اصلی */}
      <div className="container-page flex h-16 items-center gap-3 lg:h-[72px]">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="grid size-10 shrink-0 place-items-center rounded border border-line text-ink lg:hidden"
          aria-label="باز کردن منو"
        >
          <Menu className="size-5" />
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded bg-brand-700 text-white">
            <Layers className="size-5" strokeWidth={2} />
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-extrabold text-ink">چسب‌مارکت</span>
            <span className="block text-[11px] text-muted">چسب صنعتی و مراقبت خودرو</span>
          </span>
        </Link>

        <div className="mx-2 hidden flex-1 md:block">
          <SearchBar />
        </div>

        <div className="ms-auto flex items-center gap-2">
          <Link
            href="/wholesale"
            className="hidden h-10 items-center gap-2 rounded bg-accent-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-600 sm:inline-flex"
          >
            خرید عمده
          </Link>
          <Link
            href="/account"
            className="hidden h-10 items-center gap-2 rounded border border-line bg-surface px-3 text-sm font-medium text-ink transition-colors hover:border-brand-300 hover:bg-brand-50 lg:inline-flex"
          >
            <User className="size-4 text-brand-700" />
            ورود / حساب کاربری
          </Link>
          <CartButton />
        </div>
      </div>

      {/* نوار ناوبری دسکتاپ */}
      <nav className="hidden border-t border-line bg-surface lg:block">
        <div className="container-page flex h-11 items-center gap-1 text-sm">
          <div className="relative" ref={catRef}>
            <button
              type="button"
              onClick={() => setCatOpen((v) => !v)}
              aria-expanded={catOpen}
              className={cn(
                "inline-flex h-11 items-center gap-1.5 rounded-t px-3 font-medium transition-colors",
                catOpen ? "bg-brand-50 text-brand-700" : "text-ink hover:bg-canvas",
              )}
            >
              <Layers className="size-4" />
              دسته‌بندی محصولات
              <ChevronDown
                className={cn("size-4 transition-transform", catOpen && "rotate-180")}
              />
            </button>

            {catOpen ? (
              <div className="absolute start-0 top-full z-50 w-[560px] rounded-b-lg border border-line bg-surface p-2 shadow-pop animate-fade-in">
                <ul className="grid grid-cols-2 gap-1">
                  {categories.map((c) => {
                    const Icon = artIcon[c.art];
                    return (
                      <li key={c.slug}>
                        <Link
                          href={`/shop?category=${c.slug}`}
                          className="flex items-start gap-3 rounded p-2.5 transition-colors hover:bg-canvas"
                        >
                          <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded bg-brand-50 text-brand-700">
                            <Icon className="size-5" />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-ink">
                              {c.title}
                            </span>
                            <span className="mt-0.5 block text-xs text-muted">
                              {c.tagline}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href="/shop"
                  className="mt-1 block rounded bg-canvas px-3 py-2 text-center text-xs font-medium text-brand-700 hover:bg-brand-50"
                >
                  مشاهده همه محصولات
                </Link>
              </div>
            ) : null}
          </div>

          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex h-11 items-center rounded-t px-3 font-medium transition-colors",
                isActive(item.href)
                  ? "text-brand-700"
                  : "text-ink hover:bg-canvas",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* دراور موبایل */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 end-0 flex w-[86%] max-w-sm flex-col bg-surface shadow-pop animate-fade-in">
            <div className="flex items-center justify-between border-b border-line p-4">
              <span className="font-bold text-ink">منو</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="grid size-9 place-items-center rounded border border-line"
                aria-label="بستن منو"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="border-b border-line p-4">
              <SearchBar onSubmitted={() => setMobileOpen(false)} />
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-1">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded px-3 py-2.5 text-sm font-medium",
                        isActive(item.href)
                          ? "bg-brand-50 text-brand-700"
                          : "text-ink hover:bg-canvas",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mb-2 mt-5 px-3 text-xs font-semibold text-muted">
                دسته‌بندی‌ها
              </p>
              <ul className="space-y-1">
                {categories.map((c) => {
                  const Icon = artIcon[c.art];
                  return (
                    <li key={c.slug}>
                      <Link
                        href={`/shop?category=${c.slug}`}
                        className="flex items-center gap-3 rounded px-3 py-2.5 text-sm text-ink hover:bg-canvas"
                      >
                        <span className="grid size-8 place-items-center rounded bg-brand-50 text-brand-700">
                          <Icon className="size-4" />
                        </span>
                        {c.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-line p-4">
              <Link
                href="/account"
                className="inline-flex h-11 items-center justify-center gap-2 rounded border border-line text-sm font-medium text-ink"
              >
                <User className="size-4 text-brand-700" />
                حساب کاربری
              </Link>
              <Link
                href="/wholesale"
                className="inline-flex h-11 items-center justify-center rounded bg-accent-500 text-sm font-semibold text-white"
              >
                خرید عمده
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
