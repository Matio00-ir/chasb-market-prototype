import { Container } from "@/components/ui/Container";
import { brands } from "@/data/brands";

/** نوار برندها — زیر Hero. */
export function TrustBar() {
  return (
    <section className="border-b border-line bg-surface py-6">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <span className="text-xs font-medium text-muted">
            برندهای موجود:
          </span>
          {brands.map((b) => (
            <span key={b} className="text-sm font-semibold text-ink/70">
              {b}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
