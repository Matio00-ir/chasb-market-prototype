import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductLoading() {
  return (
    <Container className="py-8 lg:py-10">
      <Skeleton className="h-4 w-64" />
      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr]">
        <Skeleton className="aspect-square w-full" />
        <div className="space-y-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    </Container>
  );
}
