/**
 * محاسبه هزینه ارسال بر اساس وزن سفارش (سیستم Mock).
 *
 * مانند pricing.ts، این فایل تنها مرجع محاسبه ارسال است و برای نسخه Production
 * می‌توان آن را با فراخوانی API نرخ‌گذاری پست/باربری جایگزین کرد بدون تغییر UI.
 */

import type { ShippingBracket, ShippingMethod, ShippingMethodId, ShippingResult } from "@/types";

/** پلکان وزن → هزینه پایه (تومان). ترتیب از سبک به سنگین. */
export const SHIPPING_BRACKETS: ShippingBracket[] = [
  {
    maxWeightKg: 2,
    cost: 45000,
    label: "تا ۲ کیلوگرم",
    note: "بسته سبک — ارسال با پیک یا پست پیشتاز",
  },
  {
    maxWeightKg: 5,
    cost: 68000,
    label: "۲ تا ۵ کیلوگرم",
    note: "بسته متوسط",
  },
  {
    maxWeightKg: 10,
    cost: 98000,
    label: "۵ تا ۱۰ کیلوگرم",
    note: "بسته سنگین",
  },
  {
    maxWeightKg: 20,
    cost: 145000,
    label: "۱۰ تا ۲۰ کیلوگرم",
    note: "ارسال با باربری سبک",
  },
  {
    maxWeightKg: null,
    cost: null,
    label: "بیش از ۲۰ کیلوگرم",
    note: "سفارش سنگین — هزینه ارسال پس از تماس کارشناس اعلام می‌شود",
  },
];

/** روش‌های ارسال قابل انتخاب در Checkout. ضریب روی هزینه پایه پله وزنی اعمال می‌شود. */
export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "courier",
    title: "پیک سریع (درون‌شهری)",
    description: "تحویل ۱ تا ۲ روز کاری در مراکز استان",
    multiplier: 1,
  },
  {
    id: "post",
    title: "پست پیشتاز",
    description: "تحویل ۳ تا ۵ روز کاری در سراسر کشور",
    multiplier: 0.8,
  },
  {
    id: "freight",
    title: "باربری (سفارش حجیم/عمده)",
    description: "مناسب سفارش‌های سنگین؛ هماهنگی زمان تحویل تلفنی",
    multiplier: 1.15,
  },
];

/** گرم → کیلوگرم با گِردکردن رو به بالا به ۰٫۱ کیلو (رویه رایج نرخ‌گذاری). */
export function gramsToBillableKg(grams: number): number {
  return Math.ceil(grams / 100) / 10;
}

/** یافتن پله وزنی متناظر با وزن سفارش. */
export function findBracket(totalWeightKg: number): ShippingBracket {
  return (
    SHIPPING_BRACKETS.find(
      (b) => b.maxWeightKg !== null && totalWeightKg <= b.maxWeightKg,
    ) ?? SHIPPING_BRACKETS[SHIPPING_BRACKETS.length - 1]
  );
}

/**
 * محاسبه ارسال از روی وزن کل سفارش (گرم) و روش ارسال انتخابی.
 * اگر سبد خالی باشد هزینه صفر است.
 */
export function calcShipping(
  totalWeightGrams: number,
  methodId: ShippingMethodId = "courier",
): ShippingResult {
  const totalWeightKg = gramsToBillableKg(totalWeightGrams);
  const bracket = findBracket(totalWeightKg);
  const method = SHIPPING_METHODS.find((m) => m.id === methodId) ?? SHIPPING_METHODS[0];

  if (totalWeightGrams <= 0) {
    return { totalWeightKg: 0, bracket: SHIPPING_BRACKETS[0], cost: 0, requiresQuote: false };
  }

  if (bracket.cost === null) {
    return { totalWeightKg, bracket, cost: null, requiresQuote: true };
  }

  return {
    totalWeightKg,
    bracket,
    cost: Math.round((bracket.cost * method.multiplier) / 1000) * 1000,
    requiresQuote: false,
  };
}
