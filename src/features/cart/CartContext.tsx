"use client";

/**
 * وضعیت سبد خرید.
 * - state سبک است: فقط { slug, qty }. اطلاعات کامل محصول و قیمت هنگام مصرف از
 *   lib/pricing استخراج می‌شود تا منبع حقیقت واحد بماند.
 * - persist در localStorage با محافظت در برابر خطا و hydration.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, CartTotals } from "@/types";
import { getCartTotals } from "@/lib/pricing";
import { productBySlug } from "@/data/products";
import { clamp } from "@/lib/utils";

const STORAGE_KEY = "chasb-cart-v1";
const MAX_QTY = 999;

type Action =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; slug: string; qty: number }
  | { type: "setQty"; slug: string; qty: number }
  | { type: "remove"; slug: string }
  | { type: "clear" };

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "hydrate":
      return action.lines;
    case "add": {
      if (!productBySlug(action.slug)) return state;
      const existing = state.find((l) => l.slug === action.slug);
      if (existing) {
        return state.map((l) =>
          l.slug === action.slug
            ? { ...l, qty: clamp(l.qty + action.qty, 1, MAX_QTY) }
            : l,
        );
      }
      return [...state, { slug: action.slug, qty: clamp(action.qty, 1, MAX_QTY) }];
    }
    case "setQty":
      return state.map((l) =>
        l.slug === action.slug
          ? { ...l, qty: clamp(Math.floor(action.qty || 1), 1, MAX_QTY) }
          : l,
      );
    case "remove":
      return state.filter((l) => l.slug !== action.slug);
    case "clear":
      return [];
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  totals: CartTotals;
  /** آیا خواندن از localStorage انجام شده؟ برای جلوگیری از پرش UI */
  ready: boolean;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  qtyOf: (slug: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, [] as CartLine[]);
  const [ready, setReady] = useState(false);

  // خواندن اولیه از localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) {
          dispatch({
            type: "hydrate",
            lines: parsed
              .filter((l) => l && typeof l.slug === "string" && productBySlug(l.slug))
              .map((l) => ({ slug: l.slug, qty: clamp(Math.floor(l.qty || 1), 1, MAX_QTY) })),
          });
        }
      }
    } catch {
      /* localStorage در دسترس نیست — سبد خالی می‌ماند */
    }
    setReady(true);
  }, []);

  // ذخیره در هر تغییر پس از hydration
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* نادیده */
    }
  }, [lines, ready]);

  const add = useCallback((slug: string, qty = 1) => dispatch({ type: "add", slug, qty }), []);
  const setQty = useCallback((slug: string, qty: number) => dispatch({ type: "setQty", slug, qty }), []);
  const remove = useCallback((slug: string) => dispatch({ type: "remove", slug }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);
  const qtyOf = useCallback(
    (slug: string) => lines.find((l) => l.slug === slug)?.qty ?? 0,
    [lines],
  );

  const totals = useMemo(() => getCartTotals(lines), [lines]);

  const value = useMemo<CartContextValue>(
    () => ({ lines, totals, ready, add, setQty, remove, clear, qtyOf }),
    [lines, totals, ready, add, setQty, remove, clear, qtyOf],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart باید درون <CartProvider> استفاده شود.");
  return ctx;
}
