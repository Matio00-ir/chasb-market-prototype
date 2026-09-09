import { Container } from "@/components/ui/Container";
import { ProductCardSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function ShopLoading() {
  return (
    <Container className="py-8 lg:py-10">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-4 h-7 w-48" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        <Skeleton className="hidden h-[520px] w-full lg:block" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </Container>
  );
}
