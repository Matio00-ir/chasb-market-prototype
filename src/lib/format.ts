/**
 * توابع نمایش عدد و قیمت.
 * واحد پول در این پروتوتایپ «تومان» است.
 */

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** تبدیل ارقام لاتین یک رشته به فارسی. */
export function toFaDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

/** جداکننده هزارگان + ارقام فارسی. */
export function formatNumber(value: number): string {
  return toFaDigits(Math.round(value).toLocaleString("en-US"));
}

/** قیمت با واحد تومان، مثال: «۲۶۸٬۰۰۰ تومان». */
export function formatToman(value: number): string {
  return `${formatNumber(value)} تومان`;
}

/** نمایش فشرده قیمت برای فضاهای کوچک، مثال: «۲۶۸ هزار تومان». */
export function formatTomanShort(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `${toFaDigits(m.toFixed(m % 1 === 0 ? 0 : 1))} میلیون تومان`;
  }
  if (value >= 1000) {
    return `${formatNumber(Math.round(value / 1000))} هزار تومان`;
  }
  return formatToman(value);
}

/** نمایش وزن: زیر ۱ کیلو به گرم، از ۱ کیلو به بالا به کیلوگرم. */
export function formatWeight(grams: number): string {
  if (grams >= 1000) {
    const kg = grams / 1000;
    return `${toFaDigits(kg.toFixed(kg % 1 === 0 ? 0 : 2))} کیلوگرم`;
  }
  return `${formatNumber(grams)} گرم`;
}

/** نمایش درصد. */
export function formatPercent(value: number): string {
  return `${toFaDigits(Math.round(value))}٪`;
}
