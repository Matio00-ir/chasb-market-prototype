import {
  Boxes,
  Handshake,
  Truck,
  BadgeCheck,
  Headset,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const items = [
  {
    Icon: Boxes,
    title: "تنوع محصول",
    desc: "بیش از هزار کد کالا در پنج دسته تخصصی، از چسب صنعتی تا دیتیلینگ خودرو.",
  },
  {
    Icon: Handshake,
    title: "قیمت همکاری",
    desc: "پلکان قیمت شفاف روی همه کالاها؛ برای خرید ۱۰۰ عدد به بالا قیمت همکاری.",
  },
  {
    Icon: Truck,
    title: "ارسال سریع",
    desc: "پردازش سفارش در ۲۴ ساعت و محاسبه شفاف هزینه ارسال بر اساس وزن.",
  },
  {
    Icon: BadgeCheck,
    title: "تضمین اصالت",
    desc: "تأمین مستقیم از برند و واردکننده، همراه با فاکتور رسمی.",
  },
  {
    Icon: Headset,
    title: "پشتیبانی فنی",
    desc: "مشاوره انتخاب چسب مناسب کاربرد، پیش و پس از خرید.",
  },
];

/** بخش «چرا ما». */
export function WhyUs() {
  return (
    <section className="border-y border-line bg-surface py-14 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="مزیت‌ها"
          title="چرا از چسب‌مارکت بخریم؟"
          description="یک تأمین‌کننده واحد برای نیاز تکی و عمده کسب‌وکار شما."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-lg border border-line bg-canvas p-5"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded bg-brand-700 text-white">
                <Icon className="size-5" strokeWidth={1.7} />
              </span>
              <div>
                <h3 className="text-sm font-bold text-ink">{title}</h3>
                <p className="mt-1.5 text-xs leading-6 text-muted">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
