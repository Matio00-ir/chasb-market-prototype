import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** سرتیتر بخش‌های صفحه اصلی و صفحات داخلی. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: { href: string; label: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-prose">
        {eyebrow ? (
          <p className="mb-1.5 text-sm font-medium text-accent-600">{eyebrow}</p>
        ) : null}
        <h2 className="text-xl font-bold text-ink sm:text-2xl">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm text-muted sm:text-[15px]">{description}</p>
        ) : null}
      </div>

      {action ? (
        <Link
          href={action.href}
          className="link-quiet inline-flex shrink-0 items-center gap-1 text-sm font-medium"
        >
          {action.label}
          <ArrowLeft className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}
