"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/** فیلد جست‌وجوی محصولات — پس از submit به /shop?q= هدایت می‌کند. */
export function SearchBar({
  className,
  autoFocus = false,
  onSubmitted,
}: {
  className?: string;
  autoFocus?: boolean;
  onSubmitted?: () => void;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const q = value.trim();
        router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
        onSubmitted?.();
      }}
      className={cn(
        "flex items-center gap-2 rounded border border-line bg-canvas px-3 transition-colors focus-within:border-brand-400 focus-within:bg-surface",
        className,
      )}
    >
      <Search className="size-4 shrink-0 text-muted" aria-hidden="true" />
      <input
        type="search"
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="جست‌وجوی محصول، برند یا کاربرد…"
        aria-label="جست‌وجوی محصولات"
        className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted/80"
      />
      <button
        type="submit"
        className="shrink-0 rounded bg-brand-700 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-600"
      >
        جست‌وجو
      </button>
    </form>
  );
}
