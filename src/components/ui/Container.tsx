import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** رَپر عرض‌ثابت مرکزی صفحه. */
export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn("container-page", className)}>{children}</Tag>;
}
