"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/Button";
import { sleep, cn } from "@/lib/utils";

interface FormState {
  business: string;
  contact: string;
  phone: string;
  category: string;
  qty: string;
  note: string;
}

const EMPTY: FormState = {
  business: "",
  contact: "",
  phone: "",
  category: "",
  qty: "",
  note: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (f.business.trim().length < 2) e.business = "نام کسب‌وکار را وارد کنید.";
  if (f.contact.trim().length < 3) e.contact = "نام شخص رابط را وارد کنید.";
  if (!/^09\d{9}$/.test(f.phone.trim())) e.phone = "شماره موبایل ۱۱ رقمی معتبر وارد کنید.";
  if (!f.category) e.category = "دسته موردنیاز را انتخاب کنید.";
  if (!f.qty.trim()) e.qty = "تعداد یا تیراژ تقریبی را وارد کنید.";
  return e;
}

export function WholesaleRequestForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((prev) => ({ ...prev, [k]: v }));
  };

  useEffect(() => {
    if (touched) setErrors(validate(form));
  }, [form, touched]);

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setTouched(true);
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    await sleep(900);
    setStatus("done");
  };

  if (status === "done") {
    return (
      <div className="surface-card flex flex-col items-center p-8 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="size-8" strokeWidth={1.6} />
        </span>
        <h3 className="mt-4 text-lg font-bold text-ink">درخواست شما ثبت شد</h3>
        <p className="mt-2 max-w-sm text-sm leading-7 text-muted">
          کارشناس فروش عمده طی یک روز کاری برای ارسال لیست قیمت همکاری و هماهنگی سفارش
          با شما تماس می‌گیرد.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-5"
          onClick={() => {
            setForm(EMPTY);
            setStatus("idle");
            setTouched(false);
          }}
        >
          ثبت درخواست جدید
        </Button>
      </div>
    );
  }

  const inputCls = (err?: string) =>
    cn(
      "h-11 w-full rounded border bg-canvas px-3 text-sm outline-none transition-colors focus:bg-surface",
      err ? "border-rose-300" : "border-line focus:border-brand-400",
    );

  return (
    <form onSubmit={onSubmit} className="surface-card p-5 lg:p-6" noValidate>
      <h3 className="text-sm font-bold text-ink">فرم درخواست خرید عمده</h3>
      <p className="mt-1 text-xs text-muted">
        فرم را تکمیل کنید تا لیست قیمت همکاری برای شما ارسال شود.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-ink">نام کسب‌وکار</span>
          <input
            value={form.business}
            onChange={(e) => set("business", e.target.value)}
            className={inputCls(errors.business)}
          />
          {errors.business ? (
            <span className="mt-1 block text-xs text-rose-600">{errors.business}</span>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-ink">نام شخص رابط</span>
          <input
            value={form.contact}
            onChange={(e) => set("contact", e.target.value)}
            className={inputCls(errors.contact)}
          />
          {errors.contact ? (
            <span className="mt-1 block text-xs text-rose-600">{errors.contact}</span>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-ink">شماره تماس</span>
          <input
            value={form.phone}
            inputMode="numeric"
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            onChange={(e) => set("phone", e.target.value)}
            className={inputCls(errors.phone)}
          />
          {errors.phone ? (
            <span className="mt-1 block text-xs text-rose-600">{errors.phone}</span>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-ink">دسته موردنیاز</span>
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className={cn(inputCls(errors.category), "px-2")}
          >
            <option value="">انتخاب دسته</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
          {errors.category ? (
            <span className="mt-1 block text-xs text-rose-600">{errors.category}</span>
          ) : null}
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-semibold text-ink">
            تعداد / تیراژ تقریبی
          </span>
          <input
            value={form.qty}
            onChange={(e) => set("qty", e.target.value)}
            placeholder="مثال: ۲۰۰ عدد در ماه"
            className={inputCls(errors.qty)}
          />
          {errors.qty ? (
            <span className="mt-1 block text-xs text-rose-600">{errors.qty}</span>
          ) : null}
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-semibold text-ink">توضیحات (اختیاری)</span>
          <textarea
            value={form.note}
            onChange={(e) => set("note", e.target.value)}
            rows={3}
            className="w-full resize-none rounded border border-line bg-canvas px-3 py-2 text-sm leading-6 outline-none focus:border-brand-400 focus:bg-surface"
            placeholder="محصولات موردنظر، برند ترجیحی، شرایط پرداخت…"
          />
        </label>
      </div>

      <Button type="submit" size="lg" className="mt-5" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            در حال ارسال…
          </>
        ) : (
          <>
            <Send className="size-4" />
            درخواست خرید عمده
          </>
        )}
      </Button>
    </form>
  );
}
