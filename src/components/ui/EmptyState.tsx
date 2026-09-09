import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** حالت خالی استاندارد برای فروشگاه، سبد و نتایج فیلتر. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed border-line bg-surface px-6 py-14 text-center",
        className,
      )}
    >
      <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-canvas text-muted">
        <Icon className="size-7" strokeWidth={1.6} />
      </span>
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      {description ? (
        <p className="mt-1.5 max-w-sm text-sm text-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
