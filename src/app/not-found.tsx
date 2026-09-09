import Link from "next/link";
import { Home, PackageSearch, SearchX } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-canvas text-muted">
        <SearchX className="size-8" strokeWidth={1.5} />
      </span>
      <p className="mt-5 text-5xl font-extrabold text-ink">۴۰۴</p>
      <h1 className="mt-2 text-lg font-bold text-ink">صفحه موردنظر پیدا نشد</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        ممکن است نشانی اشتباه وارد شده باشد یا این صفحه حذف شده باشد.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center gap-2 rounded bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-600"
        >
          <Home className="size-4" />
          صفحه اصلی
        </Link>
        <Link
          href="/shop"
          className="inline-flex h-11 items-center justify-center gap-2 rounded border border-line px-5 text-sm font-semibold text-ink hover:bg-canvas"
        >
          <PackageSearch className="size-4" />
          فروشگاه
        </Link>
      </div>
    </Container>
  );
}
