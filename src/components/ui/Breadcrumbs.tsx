import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Fragment } from "react";

export interface Crumb {
  label: string;
  href?: string;
}

/** مسیر راهنما (RTL). آخرین آیتم بدون لینک است. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="مسیر" className="flex items-center gap-1 text-xs text-muted">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <Fragment key={`${item.label}-${i}`}>
            {item.href && !last ? (
              <Link href={item.href} className="transition-colors hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span className={last ? "text-ink" : undefined} aria-current={last ? "page" : undefined}>
                {item.label}
              </span>
            )}
            {!last ? <ChevronLeft className="size-3.5 shrink-0 text-line" /> : null}
          </Fragment>
        );
      })}
    </nav>
  );
}
