"use client";

import { useEffect, useState } from "react";

/**
 * تشخیص فعال‌بودن یک media query سمت کلاینت.
 * مقدار اولیه false است تا رندر سرور و کلاینت هماهنگ بماند.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
