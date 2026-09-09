import type { Config } from "tailwindcss";

/**
 * دیزاین‌سیستم پروژه.
 * رنگ‌ها از توکن‌های CSS در globals.css خوانده می‌شوند تا در آینده تم‌پذیر بمانند.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      fontFamily: {
        sans: ["Vazirmatn", "system-ui", "Segoe UI", "Tahoma", "sans-serif"],
      },
      colors: {
        // آبی فولادی صنعتی — رنگ پایه (Trustworthy / Technical)
        brand: {
          50: "#eef4f9",
          100: "#d6e4f0",
          200: "#aec9e1",
          300: "#7ea7cd",
          400: "#4d80b3",
          500: "#2f6293",
          600: "#234d76",
          700: "#1d3f61",
          800: "#1a3550",
          900: "#152a40",
          950: "#0d1a29",
        },
        // نارنجی صنعتی — اکسنت کم‌استفاده (CTA عمده / برچسب)
        accent: {
          50: "#fff4ec",
          100: "#ffe4d1",
          200: "#ffc4a3",
          300: "#ff9d6b",
          400: "#fb7132",
          500: "#ef5a1c",
          600: "#d64a13",
          700: "#b23a13",
          800: "#8d2f16",
          900: "#722915",
        },
        ink: "#16202b",
        muted: "#5b6b7a",
        line: "#e2e7ec",
        surface: "#ffffff",
        canvas: "#f6f8fa",
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "10px",
        xl: "14px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 26, 41, 0.04), 0 1px 3px rgba(16, 26, 41, 0.06)",
        pop: "0 8px 24px -8px rgba(16, 26, 41, 0.18)",
      },
      maxWidth: {
        prose: "68ch",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
