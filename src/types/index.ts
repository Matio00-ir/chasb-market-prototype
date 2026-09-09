/**
 * تعریف تایپ‌های دامنه.
 * این فایل قرارداد داده‌ها بین لایه UI و لایه داده/بک‌اند است.
 */

export type CategorySlug =
  | "industrial"
  | "construction"
  | "general"
  | "automotive-adhesive"
  | "car-care";

export interface Category {
  slug: CategorySlug;
  title: string;
  tagline: string;
  description: string;
  /** نام آیکون از lucide-react */
  icon: string;
  /** کلید طرح رنگی برای Placeholder تصویر */
  art: ArtKey;
}

export type ArtKey =
  | "industrial"
  | "construction"
  | "general"
  | "automotive-adhesive"
  | "car-care";

export interface SpecRow {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  brand: string;
  /** قیمت خرید تکی (تومان) */
  price: number;
  /** کف قیمت همکاری در بیشترین تیراژ (تومان) */
  wholesalePrice: number;
  /** وزن واحد محصول به گرم — مبنای محاسبه هزینه ارسال */
  weightGrams: number;
  /** حجم/وزن نمایشی روی بسته‌بندی */
  volume: string;
  /** موجودی انبار (تعداد) */
  stock: number;
  /** آدرس تصویر واقعی؛ در پروتوتایپ null و از Placeholder اختصاصی استفاده می‌شود */
  image: string | null;
  shortDescription: string;
  description: string;
  specs: SpecRow[];
  /** کاربردهای محصول — برای فیلتر «کاربرد» در فروشگاه */
  usage: string[];
  featured: boolean;
}

/** یک پله از جدول قیمت‌گذاری پلکانی */
export interface PriceTier {
  minQty: number;
  maxQty: number | null;
  unitPrice: number;
  label: string;
  /** درصد صرفه‌جویی نسبت به قیمت تکی */
  savingsPercent: number;
}

/** آیتم ذخیره‌شده در سبد خرید (مرجع سبک به محصول) */
export interface CartLine {
  slug: string;
  qty: number;
}

/** آیتم سبد پس از اتصال به داده محصول و محاسبه قیمت */
export interface ResolvedCartLine {
  product: Product;
  qty: number;
  unitPrice: number;
  listUnitPrice: number;
  lineTotal: number;
  lineWeightGrams: number;
  wholesaleSaving: number;
  activeTier: PriceTier;
}

/** یک پله هزینه ارسال بر اساس وزن سفارش */
export interface ShippingBracket {
  /** سقف وزن این پله به کیلوگرم؛ null یعنی پله آخر (بدون سقف) */
  maxWeightKg: number | null;
  /** هزینه ارسال (تومان)؛ null یعنی نیازمند استعلام */
  cost: number | null;
  label: string;
  note: string;
}

export interface ShippingResult {
  totalWeightKg: number;
  bracket: ShippingBracket;
  cost: number | null;
  /** آیا هزینه نیازمند تماس/استعلام است */
  requiresQuote: boolean;
}

export interface CartTotals {
  lines: ResolvedCartLine[];
  itemCount: number;
  /** جمع بر اساس قیمت تکی (قبل از تخفیف عمده) */
  listSubtotal: number;
  /** جمع پس از اعمال قیمت پلکانی */
  subtotal: number;
  wholesaleDiscount: number;
  totalWeightGrams: number;
}

export type ShippingMethodId = "courier" | "post" | "freight";

export interface ShippingMethod {
  id: ShippingMethodId;
  title: string;
  description: string;
  /** ضریب اعمال‌شده روی هزینه پایه پله وزنی */
  multiplier: number;
}
