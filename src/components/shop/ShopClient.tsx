"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, PackageSearch, RotateCcw } from "lucide-react";
import type { Product, CategorySlug } from "@/types";
import { categories } from "@/data/categories";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { formatNumber, toFaDigits } from "@/lib/format";
import { stockLevel } from "@/components/product/StockStatus";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "پیشنهاد فروشگاه" },
  { key: "price-asc", label: "ارزان‌ترین" },
  { key: "price-desc", label: "گران‌ترین" },
  { key: "name", label: "بر اساس نام" },
];

const WEIGHT_BUCKETS = [
  { key: "light", label: "سبک (زیر ۵۰۰ گرم)", test: (g: number) => g < 500 },
  { key: "medium", label: "متوسط (۵۰۰ گرم تا ۵ کیلو)", test: (g: number) => g >= 500 && g < 5000 },
  { key: "heavy", label: "سنگین (۵ کیلو به بالا)", test: (g: number) => g >= 5000 },
] as const;

export function ShopClient({
  allProducts,
  brands,
  usageTags,
  priceBounds,
}: {
  allProducts: Product[];
  brands: string[];
  usageTags: string[];
  priceBounds: { min: number; max: number };
}) {
  const params = useSearchParams();

  const [search, setSearch] = useState("");
  const [selCats, setSelCats] = useState<CategorySlug[]>([]);
  const [selBrands, setSelBrands] = useState<string[]>([]);
  const [selUsage, setSelUsage] = useState<string[]>([]);
  const [selWeights, setSelWeights] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("featured");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // مقداردهی اولیه از پارامترهای URL (?category= , ?q=)
  useEffect(() => {
    const cat = params.get("category");
    const q = params.get("q");
    if (cat && categories.some((c) => c.slug === cat)) {
      setSelCats([cat as CategorySlug]);
    }
    if (q) setSearch(q);
    // فقط یک‌بار در لود اولیه
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedSearch = useDebouncedValue(search, 200);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const toggle = <T,>(list: T[], value: T, setter: (v: T[]) => void) =>
    setter(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);

  const resetAll = () => {
    setSearch("");
    setSelCats([]);
    setSelBrands([]);
    setSelUsage([]);
    setSelWeights([]);
    setMaxPrice(priceBounds.max);
    setInStockOnly(false);
    setSort("featured");
  };

  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    let list = allProducts.filter((p) => {
      if (q) {
        const haystack = `${p.name} ${p.brand} ${p.usage.join(" ")} ${p.shortDescription}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (selCats.length && !selCats.includes(p.category)) return false;
      if (selBrands.length && !selBrands.includes(p.brand)) return false;
      if (selUsage.length && !selUsage.some((u) => p.usage.includes(u))) return false;
      if (
        selWeights.length &&
        !selWeights.some((w) => WEIGHT_BUCKETS.find((b) => b.key === w)?.test(p.weightGrams))
      )
        return false;
      if (p.price > maxPrice) return false;
      if (inStockOnly && stockLevel(p.stock) === "out") return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name, "fa");
        default:
          return Number(b.featured) - Number(a.featured);
      }
    });
    return list;
  }, [allProducts, debouncedSearch, selCats, selBrands, selUsage, selWeights, maxPrice, inStockOnly, sort]);

  const activeCount =
    selCats.length +
    selBrands.length +
    selUsage.length +
    selWeights.length +
    (inStockOnly ? 1 : 0) +
    (maxPrice < priceBounds.max ? 1 : 0) +
    (debouncedSearch.trim() ? 1 : 0);

  const controls = (
    <FilterControls
      brands={brands}
      usageTags={usageTags}
      priceBounds={priceBounds}
      state={{ search, selCats, selBrands, selUsage, selWeights, maxPrice, inStockOnly }}
      actions={{
        setSearch,
        toggleCat: (v) => toggle(selCats, v, setSelCats),
        toggleBrand: (v) => toggle(selBrands, v, setSelBrands),
        toggleUsage: (v) => toggle(selUsage, v, setSelUsage),
        toggleWeight: (v) => toggle(selWeights, v, setSelWeights),
        setMaxPrice,
        setInStockOnly,
      }}
    />
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* سایدبار دسکتاپ */}
      <aside className="hidden lg:block">
        <div className="sticky top-28 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-ink">فیلترها</h2>
            {activeCount > 0 ? (
              <button
                onClick={resetAll}
                className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink"
              >
                <RotateCcw className="size-3.5" />
                حذف همه
              </button>
            ) : null}
          </div>
          <div className="surface-card p-4">{controls}</div>
        </div>
      </aside>

      {/* ستون نتایج */}
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            <span className="font-bold text-ink">{toFaDigits(filtered.length)}</span> کالا
            {activeCount > 0 ? " با فیلترهای اعمال‌شده" : ""}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded border border-line bg-surface px-3 text-sm font-medium text-ink lg:hidden"
            >
              <SlidersHorizontal className="size-4" />
              فیلترها
              {activeCount > 0 ? (
                <span className="grid size-5 place-items-center rounded-full bg-accent-500 text-[11px] text-white">
                  {toFaDigits(activeCount)}
                </span>
              ) : null}
            </button>

            <label className="inline-flex items-center gap-2 text-sm">
              <span className="text-muted">مرتب‌سازی:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-10 rounded border border-line bg-surface px-2 text-sm outline-none focus:border-brand-400"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {filtered.length > 0 ? (
          <ProductGrid products={filtered} priorityCount={4} />
        ) : (
          <EmptyState
            icon={PackageSearch}
            title="محصولی با این فیلترها پیدا نشد"
            description="بازه قیمت یا فیلترها را تغییر دهید و دوباره امتحان کنید."
            action={
              <Button variant="outline" size="sm" onClick={resetAll}>
                حذف همه فیلترها
              </Button>
            }
          />
        )}
      </div>

      {/* دراور موبایل */}
      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 end-0 flex w-[88%] max-w-sm flex-col bg-surface shadow-pop">
            <div className="flex items-center justify-between border-b border-line p-4">
              <span className="font-bold text-ink">فیلترها</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="grid size-9 place-items-center rounded border border-line"
                aria-label="بستن"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{controls}</div>
            <div className="grid grid-cols-2 gap-2 border-t border-line p-4">
              <Button variant="outline" onClick={resetAll}>
                حذف همه
              </Button>
              <Button onClick={() => setDrawerOpen(false)}>
                نمایش {toFaDigits(filtered.length)} کالا
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */

interface FilterState {
  search: string;
  selCats: CategorySlug[];
  selBrands: string[];
  selUsage: string[];
  selWeights: string[];
  maxPrice: number;
  inStockOnly: boolean;
}

function FilterControls({
  brands,
  usageTags,
  priceBounds,
  state,
  actions,
}: {
  brands: string[];
  usageTags: string[];
  priceBounds: { min: number; max: number };
  state: FilterState;
  actions: {
    setSearch: (v: string) => void;
    toggleCat: (v: CategorySlug) => void;
    toggleBrand: (v: string) => void;
    toggleUsage: (v: string) => void;
    toggleWeight: (v: string) => void;
    setMaxPrice: (v: number) => void;
    setInStockOnly: (v: boolean) => void;
  };
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink">جست‌وجو</label>
        <input
          type="search"
          value={state.search}
          onChange={(e) => actions.setSearch(e.target.value)}
          placeholder="نام محصول، برند…"
          className="h-10 w-full rounded border border-line bg-canvas px-3 text-sm outline-none focus:border-brand-400 focus:bg-surface"
        />
      </div>

      <FilterGroup title="دسته‌بندی">
        {categories.map((c) => (
          <CheckRow
            key={c.slug}
            label={c.title}
            checked={state.selCats.includes(c.slug)}
            onChange={() => actions.toggleCat(c.slug)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="برند">
        {brands.map((b) => (
          <CheckRow
            key={b}
            label={b}
            checked={state.selBrands.includes(b)}
            onChange={() => actions.toggleBrand(b)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="بازه قیمت">
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          step={1000}
          value={state.maxPrice}
          onChange={(e) => actions.setMaxPrice(Number(e.target.value))}
          className="w-full accent-brand-700"
        />
        <p className="mt-1 text-xs text-muted">
          حداکثر: <span className="font-semibold text-ink">{formatNumber(state.maxPrice)}</span> تومان
        </p>
      </FilterGroup>

      <FilterGroup title="کاربرد">
        <div className="flex flex-wrap gap-1.5">
          {usageTags.map((u) => {
            const active = state.selUsage.includes(u);
            return (
              <button
                key={u}
                type="button"
                onClick={() => actions.toggleUsage(u)}
                className={cn(
                  "rounded border px-2 py-1 text-[11px] transition-colors",
                  active
                    ? "border-brand-700 bg-brand-50 text-brand-700"
                    : "border-line text-muted hover:border-brand-300",
                )}
              >
                {u}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="وزن / حجم">
        {WEIGHT_BUCKETS.map((w) => (
          <CheckRow
            key={w.key}
            label={w.label}
            checked={state.selWeights.includes(w.key)}
            onChange={() => actions.toggleWeight(w.key)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="موجودی">
        <CheckRow
          label="فقط کالاهای موجود"
          checked={state.inStockOnly}
          onChange={() => actions.setInStockOnly(!state.inStockOnly)}
        />
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-4 first:border-t-0 first:pt-0">
      <h3 className="mb-2.5 text-xs font-semibold text-ink">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted hover:text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4 rounded border-line accent-brand-700"
      />
      {label}
    </label>
  );
}
