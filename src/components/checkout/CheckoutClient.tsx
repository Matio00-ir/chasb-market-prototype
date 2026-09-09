"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, ShoppingCart } from "lucide-react";
import type { ShippingMethodId } from "@/types";
import { useCart } from "@/features/cart/CartContext";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { SHIPPING_METHODS } from "@/lib/shipping";
import { provinceNames, citiesOf } from "@/data/provinces";
import { formatNumber, toFaDigits } from "@/lib/format";
import { cn, makeId, sleep } from "@/lib/utils";

interface FormState {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  method: ShippingMethodId;
}

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  fullName: "",
  phone: "",
  province: "",
  city: "",
  address: "",
  postalCode: "",
  method: "courier",
};

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (f.fullName.trim().length < 3) e.fullName = "نام و نام خانوادگی را کامل وارد کنید.";
  if (!/^09\d{9}$/.test(f.phone.trim())) e.phone = "شماره موبایل معتبر ۱۱ رقمی وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹).";
  if (!f.province) e.province = "استان را انتخاب کنید.";
  if (!f.city) e.city = "شهر را انتخاب کنید.";
  if (f.address.trim().length < 10) e.address = "نشانی کامل پستی را وارد کنید.";
  if (!/^\d{10}$/.test(f.postalCode.trim())) e.postalCode = "کد پستی ۱۰ رقمی وارد کنید.";
  return e;
}

export function CheckoutClient() {
  const router = useRouter();
  const { totals, ready, clear } = useCart();

  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const cities = useMemo(() => citiesOf(form.province), [form.province]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "province") next.city = "";
      return next;
    });
  };

  useEffect(() => {
    if (touched) setErrors(validate(form));
  }, [form, touched]);

  if (!ready) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Skeleton className="h-[520px] w-full" />
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  if (totals.lines.length === 0) {
    return (
      <EmptyState
        icon={ShoppingCart}
        title="برای تکمیل سفارش، ابتدا محصولی به سبد اضافه کنید"
        action={
          <Button href="/shop">
            رفتن به فروشگاه
            <ArrowLeft className="size-4" />
          </Button>
        }
      />
    );
  }

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setTouched(true);
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.querySelector<HTMLElement>("[data-invalid='true']")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }
    setSubmitting(true);
    // شبیه‌سازی ثبت سفارش در بک‌اند
    await sleep(900);
    const orderId = makeId("ORD").toUpperCase();
    clear();
    router.push(`/checkout/success?order=${encodeURIComponent(orderId)}`);
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1fr_360px]" noValidate>
      <div className="space-y-6">
        <fieldset className="surface-card p-5">
          <legend className="px-1 text-sm font-bold text-ink">اطلاعات گیرنده</legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Field
              label="نام و نام خانوادگی"
              value={form.fullName}
              onChange={(v) => set("fullName", v)}
              error={errors.fullName}
              autoComplete="name"
            />
            <Field
              label="شماره تماس (موبایل)"
              value={form.phone}
              onChange={(v) => set("phone", v)}
              error={errors.phone}
              inputMode="numeric"
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              autoComplete="tel"
            />
          </div>
        </fieldset>

        <fieldset className="surface-card p-5">
          <legend className="px-1 text-sm font-bold text-ink">نشانی تحویل</legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <SelectField
              label="استان"
              value={form.province}
              onChange={(v) => set("province", v)}
              error={errors.province}
              options={provinceNames()}
              placeholder="انتخاب استان"
            />
            <SelectField
              label="شهر"
              value={form.city}
              onChange={(v) => set("city", v)}
              error={errors.city}
              options={cities}
              placeholder={form.province ? "انتخاب شهر" : "ابتدا استان را انتخاب کنید"}
              disabled={!form.province}
            />
          </div>
          <div className="mt-4">
            <Field
              label="نشانی کامل پستی"
              value={form.address}
              onChange={(v) => set("address", v)}
              error={errors.address}
              textarea
              placeholder="خیابان، کوچه، پلاک، واحد"
              autoComplete="street-address"
            />
          </div>
          <div className="mt-4 sm:w-1/2">
            <Field
              label="کد پستی"
              value={form.postalCode}
              onChange={(v) => set("postalCode", v)}
              error={errors.postalCode}
              inputMode="numeric"
              placeholder="۱۰ رقم بدون خط تیره"
              autoComplete="postal-code"
            />
          </div>
        </fieldset>

        <fieldset className="surface-card p-5">
          <legend className="px-1 text-sm font-bold text-ink">روش ارسال</legend>
          <div className="mt-3 space-y-2">
            {SHIPPING_METHODS.map((m) => (
              <label
                key={m.id}
                className={cn(
                  "flex cursor-pointer items-start gap-2.5 rounded-lg border p-3 text-sm transition-colors",
                  form.method === m.id
                    ? "border-brand-500 bg-brand-50"
                    : "border-line hover:border-brand-300",
                )}
              >
                <input
                  type="radio"
                  name="method"
                  checked={form.method === m.id}
                  onChange={() => set("method", m.id)}
                  className="mt-0.5 size-4 accent-brand-700"
                />
                <span>
                  <span className="block font-medium text-ink">{m.title}</span>
                  <span className="mt-0.5 block text-xs text-muted">{m.description}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* خلاصه سفارش */}
      <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
        <div className="surface-card p-4">
          <h3 className="text-sm font-bold text-ink">اقلام سفارش</h3>
          <ul className="mt-3 space-y-2 text-xs">
            {totals.lines.map((l) => (
              <li key={l.product.slug} className="flex items-start justify-between gap-2">
                <span className="min-w-0 text-muted">
                  <span className="line-clamp-1 text-ink">{l.product.name}</span>
                  {toFaDigits(l.qty)} عدد × {formatNumber(l.unitPrice)}
                </span>
                <span className="shrink-0 font-medium tabular-nums text-ink">
                  {formatNumber(l.lineTotal)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <CartSummary totals={totals} methodId={form.method} />

        <Button type="submit" fullWidth size="lg" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              در حال ثبت سفارش…
            </>
          ) : (
            "ثبت سفارش"
          )}
        </Button>
        <p className="text-center text-xs text-muted">
          با ثبت سفارش،{" "}
          <Link href="/legal/terms" className="link-quiet">
            قوانین فروشگاه
          </Link>{" "}
          را می‌پذیرید. (این نسخه نمونه است و پرداخت واقعی انجام نمی‌شود.)
        </p>
      </div>
    </form>
  );
}

/* ---------- فیلدهای فرم ---------- */

function Field({
  label,
  value,
  onChange,
  error,
  textarea,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  textarea?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  const cls = cn(
    "w-full rounded border bg-canvas px-3 text-sm outline-none transition-colors focus:bg-surface",
    error ? "border-rose-300 focus:border-rose-400" : "border-line focus:border-brand-400",
  );
  return (
    <label className="block" data-invalid={Boolean(error)}>
      <span className="mb-1.5 block text-xs font-semibold text-ink">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={cn(cls, "resize-none py-2 leading-6")}
          placeholder={rest.placeholder}
        />
      ) : (
        <input
          {...rest}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(cls, "h-11")}
        />
      )}
      {error ? <span className="mt-1 block text-xs text-rose-600">{error}</span> : null}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  error,
  options,
  placeholder,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  options: string[];
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <label className="block" data-invalid={Boolean(error)}>
      <span className="mb-1.5 block text-xs font-semibold text-ink">{label}</span>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-11 w-full rounded border bg-canvas px-2 text-sm outline-none transition-colors focus:bg-surface disabled:opacity-60",
          error ? "border-rose-300" : "border-line focus:border-brand-400",
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error ? <span className="mt-1 block text-xs text-rose-600">{error}</span> : null}
    </label>
  );
}
