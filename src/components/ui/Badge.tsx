import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "brand" | "accent" | "success" | "warning" | "danger";

const tones: Record<Tone, string> = {
  neutral: "bg-canvas text-muted border-line",
  brand: "bg-brand-50 text-brand-700 border-brand-100",
  accent: "bg-accent-50 text-accent-700 border-accent-100",
  success: "bg-emerald-50 text-emerald-700 border-emerald-100",
  warning: "bg-amber-50 text-amber-700 border-amber-100",
  danger: "bg-rose-50 text-rose-700 border-rose-100",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs font-medium leading-5",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
