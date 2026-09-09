/**
 * منطق قیمت‌گذاری پلکانی (عمده).
 *
 * این فایل تنها نقطه‌ی محاسبه قیمت در پروژه است. کامپوننت‌ها هرگز قیمت را
 * دستی حساب نمی‌کنند؛ فقط این توابع را صدا می‌زنند. برای اتصال به بک‌اند واقعی
 * کافی است پیاده‌سازی این توابع با فراخوانی API جایگزین شود و امضای آن‌ها ثابت بماند.
 */

import type { CartLine, PriceTier, Product, ResolvedCartLine, CartTotals } from "@/types";
import { productBySlug } from "@/data/products";

/** مرزهای پلکان تعداد. با تغییر همین آرایه، کل UI هماهنگ می‌شود. */
export const TIER_BREAKS: Array<{ minQty: number; maxQty: number | null; label: string; factor: number }> = [
  { minQty: 1, maxQty: 9, label: "خرید تکی", factor: 0 },
  { minQty: 10, maxQty: 49, label: "عمده — پلکان ۱", factor: 0.45 },
  { minQty: 50, maxQty: 99, label: "عمده — پلکان ۲", factor: 0.78 },
  { minQty: 100, maxQty: null, label: "قیمت همکاری", factor: 1 },
];

/** گِردکردن قیمت به نزدیک‌ترین ۱۰۰۰ تومان. */
function roundPrice(value: number): number {
  return Math.round(value / 1000) * 1000;
}

/**
 * ساخت جدول قیمت پلکانی یک محصول.
 * قیمت هر پله با درون‌یابی خطی بین `price` (تکی) و `wholesalePrice` (کف همکاری) به‌دست می‌آید.
 */
export function getPriceTiers(product: Product): PriceTier[] {
  const spread = product.price - product.wholesalePrice;
  return TIER_BREAKS.map((brk) => {
    const unitPrice = roundPrice(product.price - spread * brk.factor);
    const savingsPercent =
      product.price > 0 ? ((product.price - unitPrice) / product.price) * 100 : 0;
    return {
      minQty: brk.minQty,
      maxQty: brk.maxQty,
      label: brk.label,
      unitPrice,
      savingsPercent,
    };
  });
}

/** پله فعال برای یک تعداد مشخص. */
export function getActiveTier(product: Product, qty: number): PriceTier {
  const tiers = getPriceTiers(product);
  const safeQty = Math.max(1, Math.floor(qty || 1));
  return (
    tiers.find(
      (t) => safeQty >= t.minQty && (t.maxQty === null || safeQty <= t.maxQty),
    ) ?? tiers[0]
  );
}

/** قیمت واحد محصول برای تعداد داده‌شده. */
export function getUnitPrice(product: Product, qty: number): number {
  return getActiveTier(product, qty).unitPrice;
}

/** جمع کل یک ردیف. */
export function getLineTotal(product: Product, qty: number): number {
  return getUnitPrice(product, qty) * Math.max(1, Math.floor(qty || 1));
}

/** میزان صرفه‌جویی ناشی از قیمت عمده نسبت به قیمت تکی برای یک ردیف. */
export function getWholesaleSaving(product: Product, qty: number): number {
  const safeQty = Math.max(1, Math.floor(qty || 1));
  return (product.price - getUnitPrice(product, safeQty)) * safeQty;
}

/** تعداد لازم تا رسیدن به پله بعدی (برای پیام تشویقی UI). null یعنی در آخرین پله هستیم. */
export function qtyToNextTier(product: Product, qty: number): { needed: number; tier: PriceTier } | null {
  const tiers = getPriceTiers(product);
  const active = getActiveTier(product, qty);
  const idx = tiers.findIndex((t) => t.minQty === active.minQty);
  const next = tiers[idx + 1];
  if (!next) return null;
  return { needed: next.minQty - Math.max(1, Math.floor(qty || 1)), tier: next };
}

/** تبدیل یک ردیف خام سبد به ردیف محاسبه‌شده. */
export function resolveCartLine(line: CartLine): ResolvedCartLine | null {
  const product = productBySlug(line.slug);
  if (!product) return null;
  const qty = Math.max(1, Math.floor(line.qty || 1));
  const activeTier = getActiveTier(product, qty);
  return {
    product,
    qty,
    unitPrice: activeTier.unitPrice,
    listUnitPrice: product.price,
    lineTotal: activeTier.unitPrice * qty,
    lineWeightGrams: product.weightGrams * qty,
    wholesaleSaving: (product.price - activeTier.unitPrice) * qty,
    activeTier,
  };
}

/** جمع‌بندی کامل سبد خرید. */
export function getCartTotals(lines: CartLine[]): CartTotals {
  const resolved = lines
    .map(resolveCartLine)
    .filter((l): l is ResolvedCartLine => l !== null);

  const listSubtotal = resolved.reduce((s, l) => s + l.listUnitPrice * l.qty, 0);
  const subtotal = resolved.reduce((s, l) => s + l.lineTotal, 0);
  const totalWeightGrams = resolved.reduce((s, l) => s + l.lineWeightGrams, 0);
  const itemCount = resolved.reduce((s, l) => s + l.qty, 0);

  return {
    lines: resolved,
    itemCount,
    listSubtotal,
    subtotal,
    wholesaleDiscount: listSubtotal - subtotal,
    totalWeightGrams,
  };
}
