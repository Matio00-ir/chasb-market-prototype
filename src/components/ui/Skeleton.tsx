import { cn } from "@/lib/utils";

/** بلوک بارگذاری. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton", className)} aria-hidden="true" />;
}

/** اسکلت کارت محصول — در حالت loading فروشگاه استفاده می‌شود. */
export function ProductCardSkeleton() {
  return (
    <div className="surface-card overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-9 w-9 rounded" />
        </div>
      </div>
    </div>
  );
}
