import type { Product } from "@/types";

/**
 * داده Mock محصولات (۱۵ قلم، پوشش کامل دسته‌بندی‌ها).
 * در نسخه Production این آرایه با پاسخ API جایگزین می‌شود؛ شکل داده ثابت می‌ماند.
 * `image: null` یعنی از Placeholder اختصاصی (<ProductThumb />) استفاده شود.
 */
export const products: Product[] = [
  {
    id: "adh-ind-epoxy",
    name: "چسب اپوکسی صنعتی مقاوم حرارت",
    slug: "chasb-epoxy-sanati-moghavem-hararat",
    category: "industrial",
    brand: "ترموفیکس",
    price: 385000,
    wholesalePrice: 268000,
    weightGrams: 1000,
    volume: "۱ کیلوگرم (دوجزئی)",
    stock: 120,
    image: null,
    shortDescription:
      "چسب دوجزئی اپوکسی با مقاومت حرارتی تا ۱۸۰ درجه برای اتصال فلز، سرامیک و کامپوزیت.",
    description:
      "چسب اپوکسی صنعتی ترموفیکس یک سامانه دوجزئی رزین/هاردنر با گیرایی کنترل‌شده است که برای مونتاژ قطعات تحت بار در خطوط تولید طراحی شده. پس از پخت کامل، اتصالی سخت و مقاوم در برابر روغن، حلال و ضربه ایجاد می‌کند و برای پرکردن شکاف تا ۵ میلی‌متر مناسب است.",
    specs: [
      { label: "نوع", value: "اپوکسی دوجزئی" },
      { label: "نسبت اختلاط", value: "۱:۱ حجمی" },
      { label: "زمان کارپذیری", value: "۲۵ دقیقه" },
      { label: "گیرایی اولیه", value: "۹۰ دقیقه" },
      { label: "پخت کامل", value: "۲۴ ساعت" },
      { label: "مقاومت حرارتی", value: "−۴۰ تا ۱۸۰ °C" },
      { label: "مقاومت برشی", value: "۲۲ مگاپاسکال روی فولاد" },
    ],
    usage: ["اتصال فلز", "صنعتی و تولیدی", "پرکردن شکاف", "مقاوم حرارت"],
    featured: true,
  },
  {
    id: "adh-ind-ca-metal",
    name: "چسب سیانوآکریلات فلز صنعتی",
    slug: "chasb-cyanoacrylate-felez-sanati",
    category: "industrial",
    brand: "رازی‌کم",
    price: 142000,
    wholesalePrice: 96000,
    weightGrams: 50,
    volume: "۵۰ گرم",
    stock: 240,
    image: null,
    shortDescription:
      "چسب لحظه‌ای گران‌روی متوسط مخصوص فلز و لاستیک با گیرایی زیر ۳۰ ثانیه.",
    description:
      "فرمول ویژه اتصالات فلزی با سطوح صیقلی؛ گران‌روی متوسط آن از ریزش روی سطوح عمودی جلوگیری می‌کند و برای تعمیرات سریع در ایستگاه‌های مونتاژ کاربرد دارد.",
    specs: [
      { label: "پایه", value: "اتیل سیانوآکریلات" },
      { label: "گران‌روی", value: "۱۲۰ سانتی‌پواز" },
      { label: "زمان گیرایی", value: "۱۵ تا ۳۰ ثانیه" },
      { label: "حداکثر فاصله اتصال", value: "۰٫۱۵ میلی‌متر" },
      { label: "دمای کاری", value: "−۳۰ تا ۸۰ °C" },
    ],
    usage: ["اتصال فلز", "اتصال لاستیک", "تعمیر سریع", "صنعتی و تولیدی"],
    featured: false,
  },
  {
    id: "adh-ind-pu-panel",
    name: "چسب پلی‌یورتان صنعتی پنل و ساندویچ‌پانل",
    slug: "chasb-polyurethane-sanati-panel",
    category: "industrial",
    brand: "میکاچسب",
    price: 296000,
    wholesalePrice: 205000,
    weightGrams: 900,
    volume: "۹۰۰ گرم",
    stock: 5,
    image: null,
    shortDescription:
      "چسب تک‌جزئی پلی‌یورتان با پوشش‌دهی بالا برای اتصال پنل‌های عایق و فلزی.",
    description:
      "چسب پلی‌یورتان رطوبت‌گیر با قدرت پرکنندگی مناسب برای چسباندن ورق فلزی به فوم، چوب و بتن. انعطاف نهایی بالا و مقاومت خوب در برابر رطوبت.",
    specs: [
      { label: "نوع", value: "پلی‌یورتان تک‌جزئی" },
      { label: "روش پخت", value: "رطوبت هوا" },
      { label: "زمان بازکاری", value: "۴۰ دقیقه" },
      { label: "پوشش‌دهی", value: "۳ تا ۴ متر مربع" },
      { label: "دمای کاری", value: "۵ تا ۳۵ °C" },
    ],
    usage: ["اتصال فلز", "صنعتی و تولیدی", "اتصال چوب", "ساختمانی"],
    featured: false,
  },
  {
    id: "adh-gen-wood-d3",
    name: "چسب چوب فوری D3 ضدآب",
    slug: "chasb-chub-fori-d3-zedeab",
    category: "general",
    brand: "پارس‌چسب",
    price: 96000,
    wholesalePrice: 64000,
    weightGrams: 500,
    volume: "۵۰۰ گرم",
    stock: 300,
    image: null,
    shortDescription:
      "چسب PVAc گروه D3 مقاوم در برابر رطوبت برای اتصال چوب و MDF.",
    description:
      "چسب چوب سفید با گیرایی سریع و خط چسب شفاف؛ مناسب درزگیری و پرس اتصالات نجاری و کابینت. رده مقاومت رطوبتی D3 امکان استفاده در محیط‌های با رطوبت متناوب را می‌دهد.",
    specs: [
      { label: "پایه", value: "امولسیون پلی‌وینیل‌استات" },
      { label: "رده مقاومت", value: "D3 (EN 204)" },
      { label: "زمان پرس", value: "۱۵ تا ۲۰ دقیقه" },
      { label: "مصرف", value: "۱۵۰ گرم بر متر مربع" },
      { label: "دمای کاربرد", value: "بالای ۱۰ °C" },
    ],
    usage: ["اتصال چوب", "تعمیر سریع", "ساختمانی"],
    featured: false,
  },
  {
    id: "adh-gen-123",
    name: "چسب ۱۲۳ قطره‌ای همه‌کاره",
    slug: "chasb-123-ghatrei-hamekare",
    category: "general",
    brand: "آسان‌بوند",
    price: 28000,
    wholesalePrice: 17000,
    weightGrams: 20,
    volume: "۲۰ گرم",
    stock: 500,
    image: null,
    shortDescription:
      "چسب لحظه‌ای شفاف برای پلاستیک، چینی، چرم و اتصالات کوچک خانگی.",
    description:
      "چسب سیانوآکریلات با گران‌روی پایین و نفوذ سریع در درزهای مویین؛ گزینه اقتصادی برای تعمیرات روزمره. درپوش ضدنشتی و نازل باریک برای مصرف دقیق.",
    specs: [
      { label: "پایه", value: "اتیل سیانوآکریلات" },
      { label: "گران‌روی", value: "۳۰ سانتی‌پواز" },
      { label: "زمان گیرایی", value: "۵ تا ۱۵ ثانیه" },
      { label: "دمای کاری", value: "−۲۰ تا ۷۰ °C" },
    ],
    usage: ["تعمیر سریع", "اتصال پلاستیک", "مصارف خانگی"],
    featured: true,
  },
  {
    id: "adh-gen-aquarium",
    name: "چسب سیلیکون آکواریوم خنثی",
    slug: "chasb-silicone-aquarium-khonsa",
    category: "general",
    brand: "میکاچسب",
    price: 118000,
    wholesalePrice: 82000,
    weightGrams: 300,
    volume: "۳۰۰ میلی‌لیتر",
    stock: 6,
    image: null,
    shortDescription:
      "سیلیکون استیک خنثی بدون اسید، مناسب تماس دائم با آب و آب‌بندی شیشه.",
    description:
      "چسب سیلیکونی تک‌جزئی با سامانه پخت خنثی (بدون بوی زننده اسیدی) که برای ساخت و تعمیر آکواریوم، آب‌نما و درزگیری شیشه به شیشه طراحی شده. پس از پخت کاملاً بی‌اثر و انعطاف‌پذیر است.",
    specs: [
      { label: "نوع", value: "سیلیکون خنثی (اکسیم)" },
      { label: "پوست‌بندی", value: "۱۰ دقیقه" },
      { label: "سرعت پخت", value: "۲ میلی‌متر در روز" },
      { label: "ازدیاد طول", value: "٪۴۰۰" },
      { label: "دمای کاری", value: "−۵۰ تا ۱۵۰ °C" },
    ],
    usage: ["آب‌بندی", "اتصال شیشه", "مقاوم آب", "مصارف خانگی"],
    featured: false,
  },
  {
    id: "adh-con-tile",
    name: "چسب کاشی پودری پایه سیمانی",
    slug: "chasb-kashi-pudri-paye-simani",
    category: "construction",
    brand: "کاواک",
    price: 165000,
    wholesalePrice: 119000,
    weightGrams: 20000,
    volume: "۲۰ کیلوگرم",
    stock: 60,
    image: null,
    shortDescription:
      "پودر چسب کاشی C1 برای نصب سرامیک کف و دیوار روی بستر سیمانی.",
    description:
      "ملات چسب کاشی پایه سیمانی با چسبندگی و کارایی مناسب برای نصب کاشی و سرامیک با ابعاد متوسط. زمان بازکاری کافی برای تنظیم و اجرای یکنواخت.",
    specs: [
      { label: "رده", value: "C1T (EN 12004)" },
      { label: "نسبت آب", value: "۵٫۵ لیتر در هر کیسه" },
      { label: "زمان بازکاری", value: "۲۰ دقیقه" },
      { label: "قابلیت تردد", value: "پس از ۲۴ ساعت" },
      { label: "مصرف", value: "۴ تا ۶ کیلوگرم بر متر مربع" },
    ],
    usage: ["نصب کاشی و سرامیک", "ساختمانی", "کف و دیوار"],
    featured: true,
  },
  {
    id: "adh-con-stone",
    name: "چسب سنگ نما گرانیت و مرمریت",
    slug: "chasb-sang-nama-granit-marmarit",
    category: "construction",
    brand: "کاواک",
    price: 210000,
    wholesalePrice: 152000,
    weightGrams: 5000,
    volume: "۵ کیلوگرم",
    stock: 45,
    image: null,
    shortDescription:
      "چسب پایه پلیمری اصلاح‌شده برای نصب سنگ سنگین نما با چسبندگی بالا.",
    description:
      "ملات چسب رده C2 با افزودنی پلیمری برای نصب سنگ‌های سنگین و کم‌تخلخل روی نما و کف. مقاومت لغزش پایین و دوام مناسب در برابر یخ‌زدگی و ذوب.",
    specs: [
      { label: "رده", value: "C2TE (EN 12004)" },
      { label: "چسبندگی کششی", value: "≥ ۱ مگاپاسکال" },
      { label: "مقاومت لغزش", value: "≤ ۰٫۵ میلی‌متر" },
      { label: "زمان بازکاری", value: "۳۰ دقیقه" },
      { label: "مصرف", value: "۵ تا ۸ کیلوگرم بر متر مربع" },
    ],
    usage: ["نصب سنگ", "نما", "ساختمانی", "کف و دیوار"],
    featured: false,
  },
  {
    id: "adh-con-pvc",
    name: "چسب PVC لوله و اتصالات",
    slug: "chasb-pvc-lule-va-etesalat",
    category: "construction",
    brand: "پارس‌چسب",
    price: 78000,
    wholesalePrice: 52000,
    weightGrams: 250,
    volume: "۲۵۰ گرم",
    stock: 180,
    image: null,
    shortDescription:
      "چسب حلالی مخصوص جوش سرد لوله و اتصالات U-PVC آب و فاضلاب.",
    description:
      "چسب تیکسوتروپ با قدرت حل‌کنندگی مناسب برای اتصال دائمی لوله و اتصالات PVC؛ درپوش دارای برس اپلیکاتور برای اجرای یکنواخت داخل سوکت.",
    specs: [
      { label: "نوع", value: "چسب حلالی PVC" },
      { label: "گیرایی اولیه", value: "۵ دقیقه" },
      { label: "فشارگیری", value: "پس از ۲۴ ساعت" },
      { label: "قطر مجاز لوله", value: "تا ۱۶۰ میلی‌متر" },
    ],
    usage: ["اتصال لوله", "آب‌بندی", "ساختمانی", "تأسیسات"],
    featured: false,
  },
  {
    id: "adh-auto-gasket",
    name: "چسب واشر و آب‌بندی موتور خودرو",
    slug: "chasb-washer-abbandi-motor-khodro",
    category: "automotive-adhesive",
    brand: "ترموفیکس",
    price: 132000,
    wholesalePrice: 91000,
    weightGrams: 100,
    volume: "۱۰۰ گرم",
    stock: 150,
    image: null,
    shortDescription:
      "سیلیکون واشرساز مقاوم روغن و حرارت تا ۳۰۰ درجه برای درزبندی موتور.",
    description:
      "چسب واشرساز RTV با مقاومت عالی در برابر روغن موتور، ضدیخ و نوسان دما؛ برای ساخت واشر درجا روی کارتر، اویل‌پان و درپوش سوپاپ. پس از پخت انعطاف‌پذیر و بدون ترک.",
    specs: [
      { label: "نوع", value: "سیلیکون RTV" },
      { label: "مقاومت حرارتی", value: "−۵۰ تا ۳۰۰ °C" },
      { label: "پوست‌بندی", value: "۸ دقیقه" },
      { label: "آماده کار", value: "۲۴ ساعت" },
      { label: "مقاومت شیمیایی", value: "روغن، ضدیخ، بنزین" },
    ],
    usage: ["واشرسازی خودرو", "آب‌بندی", "مقاوم حرارت", "تعمیر خودرو"],
    featured: true,
  },
  {
    id: "adh-auto-trim-tape",
    name: "چسب دوطرفه نواری تریم خودرو",
    slug: "chasb-dotarafe-navari-trim-khodro",
    category: "automotive-adhesive",
    brand: "میکاچسب",
    price: 89000,
    wholesalePrice: 58000,
    weightGrams: 200,
    volume: "۹ متر × ۱۲ میلی‌متر",
    stock: 210,
    image: null,
    shortDescription:
      "نوار چسب آکریلیک فومی برای نصب قاب، آرم و تریم بدنه بدون سوراخ‌کاری.",
    description:
      "نوار دوطرفه با هسته فوم آکریلیک و چسبندگی اولیه بالا؛ مقاوم در برابر UV، شست‌وشوی خودرو و نوسان دما. جایگزین مناسب پیچ و پرچ برای قطعات تزئینی بدنه.",
    specs: [
      { label: "نوع", value: "فوم آکریلیک دوطرفه" },
      { label: "ضخامت", value: "۰٫۸ میلی‌متر" },
      { label: "چسبندگی", value: "۱۵ نیوتن بر ۲۵ میلی‌متر" },
      { label: "مقاومت دما", value: "−۴۰ تا ۹۰ °C" },
    ],
    usage: ["نصب تریم خودرو", "بدون سوراخ‌کاری", "مقاوم UV", "تعمیر خودرو"],
    featured: false,
  },
  {
    id: "care-shampoo",
    name: "شامپو کنسانتره کف‌زا خودرو",
    slug: "shampoo-konsantre-kafza-khodro",
    category: "car-care",
    brand: "دیاموند کِر",
    price: 154000,
    wholesalePrice: 108000,
    weightGrams: 1000,
    volume: "۱ لیتر",
    stock: 260,
    image: null,
    shortDescription:
      "شامپو pH خنثی با کف فراوان که لایه واکس بدنه را حفظ می‌کند.",
    description:
      "فرمول کنسانتره با قدرت روان‌کنندگی بالا برای شست‌وشوی ایمن رنگ خودرو؛ نسبت رقت ۱ به ۲۰۰. حاوی عوامل براق‌کننده و بدون نمک که پس از خشک‌شدن رگه بر جای نمی‌گذارد.",
    specs: [
      { label: "نسبت رقت", value: "۱ به ۲۰۰" },
      { label: "pH", value: "۷ (خنثی)" },
      { label: "بازدهی", value: "تا ۴۰ بار شست‌وشو" },
      { label: "سازگاری", value: "پوشش واکس و سرامیک" },
    ],
    usage: ["شست‌وشوی خودرو", "دیتیلینگ", "نگهداری رنگ"],
    featured: true,
  },
  {
    id: "care-wax-nano",
    name: "واکس نانو محافظ رنگ خودرو",
    slug: "wax-nano-mohafez-rang-khodro",
    category: "car-care",
    brand: "اکسل‌شاین",
    price: 268000,
    wholesalePrice: 189000,
    weightGrams: 500,
    volume: "۵۰۰ میلی‌لیتر",
    stock: 130,
    image: null,
    shortDescription:
      "پوشش نانو سرامیک اسپری با اثر آب‌گریز و دوام تا ۶ ماه.",
    description:
      "واکس مایع نانو با پلیمرهای سیلیکونی که لایه‌ای شفاف و آب‌گریز روی رنگ ایجاد می‌کند؛ عمق رنگ را افزایش می‌دهد و چسبیدن گردوغبار و لکه آب را کاهش می‌دهد. قابل استفاده روی بدنه، شیشه و رینگ.",
    specs: [
      { label: "پایه", value: "پلیمر سیلیکونی نانو" },
      { label: "زاویه تماس آب", value: "۱۰۵ درجه" },
      { label: "دوام", value: "تا ۶ ماه" },
      { label: "زمان اجرا", value: "۲۰ دقیقه برای هر خودرو" },
    ],
    usage: ["واکس و پولیش", "آب‌گریزکننده", "دیتیلینگ", "نگهداری رنگ"],
    featured: true,
  },
  {
    id: "care-dashboard",
    name: "تمیزکننده و احیاکننده داشبورد",
    slug: "tamizkonande-ehyakonande-dashboard",
    category: "car-care",
    brand: "اکسل‌شاین",
    price: 132000,
    wholesalePrice: 92000,
    weightGrams: 450,
    volume: "۴۵۰ میلی‌لیتر",
    stock: 300,
    image: null,
    shortDescription:
      "اسپری پاک‌کننده سطوح پلاستیکی کابین با ظاهر مات طبیعی و بوی ملایم.",
    description:
      "تمیزکننده سطوح داخلی که گردوغبار و چربی داشبورد، کنسول و روکش درها را پاک می‌کند و رنگ اصلی پلاستیک را بدون براقیت چرب احیا می‌کند. دارای محافظ UV برای کاهش ترک‌خوردگی.",
    specs: [
      { label: "نوع سطح", value: "پلاستیک، وینیل، لاستیک" },
      { label: "پرداخت", value: "مات طبیعی" },
      { label: "محافظ UV", value: "دارد" },
      { label: "حالت", value: "اسپری پمپی" },
    ],
    usage: ["نظافت داخل کابین", "احیای پلاستیک", "دیتیلینگ", "محافظ UV"],
    featured: false,
  },
  {
    id: "care-glass-spray",
    name: "اسپری شیشه‌پاک‌کن خودرو",
    slug: "spray-shishe-pakkon-khodro",
    category: "car-care",
    brand: "دیاموند کِر",
    price: 74000,
    wholesalePrice: 49000,
    weightGrams: 500,
    volume: "۵۰۰ میلی‌لیتر",
    stock: 340,
    image: null,
    shortDescription:
      "پاک‌کننده سریع شیشه و آینه بدون رگه، مناسب لایه دودی و نانو.",
    description:
      "فرمول کم‌کف که چربی، اثر برف‌پاک‌کن و لکه حشرات را از شیشه پاک می‌کند و بدون باقی‌گذاشتن رگه خشک می‌شود. برای شیشه جلو، آینه‌ها و نمایشگر لمسی خودرو ایمن است.",
    specs: [
      { label: "نوع", value: "پاک‌کننده شیشه آمونیاک‌فری" },
      { label: "سازگاری", value: "لایه دودی و پوشش نانو" },
      { label: "حالت", value: "اسپری پمپی" },
      { label: "خشک‌شدن", value: "بدون رگه" },
    ],
    usage: ["نظافت شیشه", "بدون رگه", "دیتیلینگ"],
    featured: false,
  },
  {
    id: "care-wheel-cleaner",
    name: "جرم‌گیر و پولیش رینگ و آلومینیوم",
    slug: "jermgir-polish-ring-aluminium",
    category: "car-care",
    brand: "اکسل‌شاین",
    price: 98000,
    wholesalePrice: 66000,
    weightGrams: 400,
    volume: "۴۰۰ میلی‌لیتر",
    stock: 175,
    image: null,
    shortDescription:
      "ژل اسیدی ملایم برای پاک‌کردن گردوغبار لنت و احیای براقیت رینگ.",
    description:
      "جرم‌گیر رینگ با فرمول ژله‌ای که روی سطح می‌ماند و رسوب گردوغبار ترمز، قیر و زنگاب سطحی را حل می‌کند. برای رینگ آلیاژی، فولادی و قالپاق‌های رنگی ایمن است.",
    specs: [
      { label: "نوع", value: "ژل جرم‌گیر رینگ" },
      { label: "زمان اثرگذاری", value: "۳ تا ۵ دقیقه" },
      { label: "سازگاری", value: "رینگ آلیاژی و فولادی" },
      { label: "حالت", value: "اسپری ژله‌ای" },
    ],
    usage: ["نظافت رینگ", "جرم‌گیری", "دیتیلینگ", "پولیش"],
    featured: false,
  },
];

/** جست‌وجوی محصول با اسلاگ */
export const productBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

/** محصولات منتخب صفحه اصلی */
export const featuredProducts = (): Product[] => products.filter((p) => p.featured);

/** محصولات یک دسته */
export const productsByCategory = (category: string): Product[] =>
  products.filter((p) => p.category === category);

/** فهرست همه کاربردهای موجود (برای فیلتر فروشگاه) */
export const allUsageTags = (): string[] =>
  Array.from(new Set(products.flatMap((p) => p.usage))).sort((a, b) =>
    a.localeCompare(b, "fa"),
  );

/** بازه قیمت محصولات موجود */
export const priceRange = (): { min: number; max: number } => {
  const values = products.map((p) => p.price);
  return { min: Math.min(...values), max: Math.max(...values) };
};
