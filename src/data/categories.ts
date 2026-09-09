import type { Category, CategorySlug } from "@/types";

/**
 * دسته‌بندی محصولات فروشگاه.
 * `icon` نام کامپوننت از lucide-react است و در <CategoryArt /> نگاشت می‌شود.
 */
export const categories: Category[] = [
  {
    slug: "industrial",
    title: "چسب صنعتی",
    tagline: "برای خط تولید و کارگاه",
    description:
      "چسب‌های مقاوم حرارتی و شیمیایی مخصوص مونتاژ صنعتی، فلز، لاستیک و کامپوزیت با استحکام کششی بالا.",
    icon: "Factory",
    art: "industrial",
  },
  {
    slug: "construction",
    title: "چسب ساختمانی",
    tagline: "نصب، درزگیری و آب‌بندی",
    description:
      "چسب کاشی و سنگ، فوم و ماستیک‌های ساختمانی برای اجرای نما، کف و سرویس بهداشتی.",
    icon: "Building2",
    art: "construction",
  },
  {
    slug: "general",
    title: "چسب عمومی",
    tagline: "تعمیرات روزمره خانه و دفتر",
    description:
      "چسب‌های همه‌کاره، قطره‌ای، چوب و چسب‌های شفاف برای کارهای سریع و دقیق.",
    icon: "Wrench",
    art: "general",
  },
  {
    slug: "automotive-adhesive",
    title: "چسب خودرو",
    tagline: "تعمیر و مونتاژ قطعات خودرو",
    description:
      "چسب‌های مقاوم در برابر روغن، حرارت و لرزش برای واشرسازی، تریم و قطعات پلیمری خودرو.",
    icon: "Car",
    art: "automotive-adhesive",
  },
  {
    slug: "car-care",
    title: "نظافت و مراقبت خودرو",
    tagline: "برق، تمیزی و ماندگاری",
    description:
      "شامپو، واکس، تمیزکننده داخل کابین و محصولات دیتیلینگ برای نگهداری حرفه‌ای خودرو.",
    icon: "SprayCan",
    art: "car-care",
  },
];

export const categoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);

export const categoryTitle = (slug: CategorySlug): string =>
  categoryBySlug(slug)?.title ?? slug;
