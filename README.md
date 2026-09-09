# چسب‌مارکت — پروتوتایپ فروشگاه تخصصی چسب و مراقبت خودرو

پروتوتایپ حرفه‌ای یک فروشگاه اینترنتی **B2C + B2B** برای فروش چسب‌های صنعتی،
ساختمانی، عمومی و محصولات نظافت و مراقبت خودرو.

> این نسخه فقط یک **اتود قابل ارائه** است: بک‌اند، درگاه پرداخت، احراز هویت و
> دیتابیس واقعی ندارد و از داده‌های Mock استفاده می‌کند. ساختار کد اما
> Production-oriented است تا انتقال به نسخه واقعی ساده باشد.

---

## راه‌اندازی

پیش‌نیاز: **Node.js 18.18+** (توسعه با Node 20/22 انجام شده) و **npm**.

```bash
npm install
npm run dev
```

سپس مرورگر را روی [http://localhost:3000](http://localhost:3000) باز کنید.

### دستورهای دیگر

| دستور | توضیح |
| --- | --- |
| `npm run dev` | اجرای محیط توسعه با Hot Reload |
| `npm run build` | ساخت نسخه Production |
| `npm run start` | اجرای نسخه ساخته‌شده (بعد از `build`) |

---

## تکنولوژی

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (حالت strict)
- **Tailwind CSS 3.4**
- **lucide-react** برای آیکون‌ها
- فونت **Vazirmatn** از Google Fonts
- بدون UI-kit و بدون state-manager اضافی (سبد خرید با React Context + `localStorage`)

سایت کاملاً **فارسی و RTL** است و ساختار آن برای افزودن نسخه انگلیسی (i18n) آماده
نگه داشته شده (پارامتری‌بودن `lang`/`dir` در `layout` و تمرکز رشته‌های UI).

---

## صفحات و مسیر تجربه

مسیر کامل خرید که کارفرما می‌تواند تجربه کند:

```
/               صفحه اصلی
  → /shop            فروشگاه با فیلتر/جستجو/مرتب‌سازی
  → /product/[slug]  جزئیات محصول + انتخاب تعداد + قیمت پلکانی داینامیک
  → /cart            سبد خرید + محاسبه‌گر ارسال بر اساس وزن
  → /checkout        فرم اطلاعات گیرنده و روش ارسال
  → /checkout/success صفحه موفقیت با شماره سفارش

مسیر عمده:  Header → «خرید عمده» → /wholesale → فرم «درخواست خرید عمده»
```

صفحات کمکی: `/account` (رابط حساب کاربری، نمونه)، `/legal/[terms|privacy|shipping]`،
و صفحه‌ی `404` اختصاصی.

همه‌ی لینک‌ها و CTAها واقعی هستند؛ دکمه‌ی بی‌اثر یا صفحه‌ی خالی وجود ندارد.

---

## ساختار پروژه

```
src/
├─ app/                     مسیرها (App Router)
│  ├─ layout.tsx            RTL، فونت، Header/Footer، CartProvider
│  ├─ page.tsx              صفحه اصلی
│  ├─ shop/                 فروشگاه (+ loading.tsx)
│  ├─ product/[slug]/       جزئیات محصول (SSG + generateMetadata)
│  ├─ cart/ · checkout/ · checkout/success/
│  ├─ wholesale/ · account/ · legal/[slug]/
│  └─ not-found.tsx
│
├─ components/
│  ├─ ui/                   اجزای پایه (Button, Badge, QuantitySelector, …)
│  ├─ layout/               Header, Footer, SearchBar, CartButton
│  ├─ media/                ProductThumb / CategoryArt (سیستم Placeholder اختصاصی)
│  ├─ product/              ProductCard, ProductGrid, WholesalePriceTable, …
│  ├─ product-detail/       Gallery, PurchasePanel, SpecsTable
│  ├─ shop/                 ShopClient (فیلتر/جستجو + Drawer موبایل)
│  ├─ cart/                 CartClient, CartLineItem, ShippingCalculator, CartSummary
│  ├─ checkout/             CheckoutClient
│  ├─ wholesale/            WholesaleRequestForm
│  └─ home/                 Hero, CategoryGrid, FeaturedProducts, WholesaleBanner, …
│
├─ features/cart/           CartContext (وضعیت سبد + persist)
│
├─ data/                    داده Mock — جدا از منطق و UI
│  ├─ products.ts           ۱۵ محصول واقعی‌نما، پوشش همه دسته‌ها
│  ├─ categories.ts · brands.ts · provinces.ts
│
├─ lib/                     ← منطق دامنه؛ نقطه اتصال به Backend
│  ├─ pricing.ts            پلکان قیمت‌گذاری عمده
│  ├─ shipping.ts           محاسبه هزینه ارسال بر اساس وزن
│  ├─ format.ts             فرمت تومان + ارقام فارسی
│  └─ utils.ts
│
├─ hooks/                   useMediaQuery, useDebouncedValue
└─ types/                   قرارداد تایپ‌ها (Product, CartItem, PriceTier, …)
```

---

## منطق قیمت‌گذاری عمده — `src/lib/pricing.ts`

قیمت هر محصول در **چهار پله‌ی تعداد** محاسبه می‌شود:

| تعداد | پله |
| --- | --- |
| ۱ تا ۹ | خرید تکی (`product.price`) |
| ۱۰ تا ۴۹ | عمده — پلکان ۱ |
| ۵۰ تا ۹۹ | عمده — پلکان ۲ |
| ۱۰۰ و بیشتر | قیمت همکاری (`product.wholesalePrice`) |

قیمت پله‌های میانی با **درون‌یابی خطی** بین `price` و `wholesalePrice` به‌دست می‌آید
(گِرد به ۱۰۰۰ تومان). با تغییر تعداد در صفحه‌ی محصول، قیمت واحد و مبلغ نهایی
به‌صورت **داینامیک** به‌روز می‌شوند.

برای اتصال به بک‌اند واقعی کافی است پیاده‌سازی توابع `getPriceTiers` /
`getUnitPrice` / `getCartTotals` با فراخوانی API جایگزین شود؛ امضای توابع ثابت
می‌ماند.

## محاسبه‌ی هزینه‌ی ارسال — `src/lib/shipping.ts`

هزینه بر اساس **وزن کل سفارش** (نه تعداد اقلام) در پنج پله محاسبه می‌شود:

| وزن سفارش | هزینه پایه |
| --- | --- |
| تا ۲ کیلوگرم | ۴۵٬۰۰۰ تومان |
| ۲ تا ۵ کیلوگرم | ۶۸٬۰۰۰ تومان |
| ۵ تا ۱۰ کیلوگرم | ۹۸٬۰۰۰ تومان |
| ۱۰ تا ۲۰ کیلوگرم | ۱۴۵٬۰۰۰ تومان |
| بیش از ۲۰ کیلوگرم | استعلامی (تماس کارشناس) |

روش ارسال (پیک/پست/باربری) ضریبی روی هزینه‌ی پایه اعمال می‌کند.

---

## داده Mock

همه‌ی داده‌ها در `src/data/` و جدا از UI نگه‌داری می‌شوند. برای تغییر محصولات کافی
است `src/data/products.ts` ویرایش شود. فیلد `image` هر محصول اکنون `null` است و از
Placeholder اختصاصی استفاده می‌شود؛ با قراردادن URL در این فیلد، تصویر واقعی
(از طریق `next/image`) نمایش داده می‌شود (دامنه‌ی تصویر باید در `next.config.mjs`
اضافه شود).

---

## نکات کارایی (Performance)

- Server Component پیش‌فرض؛ `"use client"` فقط جایی که تعامل لازم است (سبد،
  فیلترها، فرم‌ها، پنل خرید).
- صفحات محصول و اسناد با `generateStaticParams` به‌صورت **استاتیک** پیش‌ساخته می‌شوند.
- بدون وابستگی سنگین؛ First Load JS حدود ۱۰۵–۱۳۱ کیلوبایت.
- HTML معنایی، متادیتای SEO و `sitemap`-محورِ ساده، حالت‌های Loading/Empty/Error.

---

## نقشه راه تبدیل به Production

1. جایگزینی `src/data/*` با لایه‌ی API و مدل دیتابیس.
2. پیاده‌سازی واقعی `lib/pricing.ts` و `lib/shipping.ts` (یا انتقال به سرویس).
3. افزودن احراز هویت واقعی به `/account` و ذخیره‌ی سبد سمت سرور.
4. اتصال درگاه پرداخت در `/checkout` و ثبت واقعی سفارش.
5. افزودن i18n (مثلاً `next-intl`) و نسخه‌ی انگلیسی.
6. جایگزینی Placeholderها با عکس واقعی محصولات.
