import { cn } from "@/lib/utils";
import { artIcon } from "./artMaps";
import type { ArtKey } from "@/types";

/**
 * تصویر تزئینی دسته‌بندی — نسخه تیره و پرکنتراست برای کارت‌هایی که متن روی آن قرار می‌گیرد.
 */
export function CategoryArt({
  art,
  className,
  iconClassName,
}: {
  art: ArtKey;
  className?: string;
  iconClassName?: string;
}) {
  const Icon = artIcon[art];
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-brand-800 to-brand-950",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <Icon
        className={cn(
          "absolute -bottom-8 -start-8 size-44 text-white/10",
          iconClassName,
        )}
        strokeWidth={1}
      />
    </div>
  );
}
