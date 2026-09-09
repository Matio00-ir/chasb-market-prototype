/**
 * ابزارهای کوچک عمومی.
 */

/** ترکیب کلاس‌های شرطی بدون وابستگی خارجی (جایگزین سبک clsx). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** ساخت شناسه یکتا برای آیتم‌های UI و سفارش Mock. */
export function makeId(prefix = "id"): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now()
    .toString(36)
    .slice(-4)}`;
}

/** محدودکردن عدد در بازه. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** تأخیر Promise‌محور برای شبیه‌سازی درخواست شبکه. */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
