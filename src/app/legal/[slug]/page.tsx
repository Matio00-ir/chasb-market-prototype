import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

interface LegalDoc {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

const DOCS: Record<string, LegalDoc> = {
  terms: {
    title: "قوانین و مقررات",
    intro:
      "استفاده از فروشگاه چسب‌مارکت به منزله پذیرش قوانین زیر است. این متن نمونه است و در نسخه نهایی توسط تیم حقوقی تکمیل می‌شود.",
    sections: [
      {
        heading: "ثبت سفارش",
        body: "پس از ثبت سفارش، کارشناس فروش برای تأیید موجودی و هماهنگی ارسال تماس می‌گیرد. قیمت‌ها تا زمان تأیید نهایی ممکن است بازبینی شوند.",
      },
      {
        heading: "قیمت‌گذاری عمده",
        body: "قیمت هر پله بر اساس تعداد سفارش هر کالا محاسبه می‌شود و در صفحه محصول و سبد خرید شفاف نمایش داده می‌شود.",
      },
      {
        heading: "لغو و مرجوعی",
        body: "کالای سالم و پلمب تا ۷ روز قابل بازگشت است. کالای باز شده یا مصرف‌شده مشمول مرجوعی نمی‌شود.",
      },
    ],
  },
  privacy: {
    title: "حریم خصوصی",
    intro:
      "چسب‌مارکت به حفظ اطلاعات کاربران متعهد است. این متن نمونه است و جزئیات کامل در نسخه نهایی منتشر می‌شود.",
    sections: [
      {
        heading: "اطلاعاتی که جمع‌آوری می‌شود",
        body: "نام، شماره تماس و نشانی صرفاً برای پردازش و ارسال سفارش استفاده می‌شود.",
      },
      {
        heading: "اشتراک‌گذاری اطلاعات",
        body: "اطلاعات کاربران در اختیار شرکت حمل صرفاً برای تحویل سفارش قرار می‌گیرد و برای مقاصد تبلیغاتی به شخص ثالث واگذار نمی‌شود.",
      },
      {
        heading: "امنیت",
        body: "دسترسی به اطلاعات مشتریان محدود و کنترل‌شده است.",
      },
    ],
  },
  shipping: {
    title: "شیوه ارسال و مرجوعی",
    intro:
      "هزینه و زمان ارسال بر اساس وزن سفارش و روش انتخابی محاسبه می‌شود.",
    sections: [
      {
        heading: "محاسبه هزینه ارسال",
        body: "هزینه ارسال بر اساس وزن کل سفارش در پنج پله تعریف شده است. برای سفارش‌های بالای ۲۰ کیلوگرم، هزینه پس از استعلام از باربری اعلام می‌شود.",
      },
      {
        heading: "زمان تحویل",
        body: "پردازش سفارش حداکثر ۲۴ ساعت کاری است. زمان تحویل بسته به مقصد و روش ارسال بین ۱ تا ۵ روز کاری متغیر است.",
      },
      {
        heading: "بازگشت کالا",
        body: "در صورت مغایرت یا آسیب، تا ۴۸ ساعت پس از تحویل با پشتیبانی تماس بگیرید.",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(DOCS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = DOCS[slug];
  return { title: doc?.title ?? "سند" };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = DOCS[slug];
  if (!doc) notFound();

  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "خانه", href: "/" }, { label: doc.title }]} />
      <article className="mt-4 max-w-prose">
        <h1 className="text-2xl font-bold text-ink">{doc.title}</h1>
        <p className="mt-3 text-sm leading-8 text-muted">{doc.intro}</p>
        <div className="mt-6 space-y-6">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-base font-bold text-ink">{s.heading}</h2>
              <p className="mt-2 text-sm leading-8 text-muted">{s.body}</p>
            </section>
          ))}
        </div>
        <p className="mt-10 rounded-lg bg-canvas p-4 text-xs text-muted">
          این سند بخشی از نسخه نمونه (Prototype) است و اعتبار حقوقی ندارد.
        </p>
      </article>
    </Container>
  );
}
