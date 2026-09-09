import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/features/cart/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const SITE_NAME = "چسب‌مارکت";
const SITE_DESCRIPTION =
  "فروشگاه تخصصی انواع چسب صنعتی، ساختمانی و عمومی و محصولات نظافت و مراقبت خودرو — با امکان خرید تکی و عمده و قیمت همکاری.";

export const metadata: Metadata = {
  metadataBase: new URL("https://chasbmarket.example"),
  title: {
    default: `${SITE_NAME} | فروش تخصصی چسب و محصولات مراقبت خودرو`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "چسب صنعتی",
    "چسب ساختمانی",
    "چسب عمومی",
    "چسب خودرو",
    "مراقبت خودرو",
    "خرید عمده چسب",
    "قیمت همکاری",
  ],
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | فروش تخصصی چسب و محصولات مراقبت خودرو`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1d3f61",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <CartProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:inset-x-0 focus:top-0 focus:z-50 focus:bg-brand-700 focus:p-3 focus:text-center focus:text-sm focus:text-white"
          >
            پرش به محتوای اصلی
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
