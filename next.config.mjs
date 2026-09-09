/** @type {import('next').NextConfig} */

// خروجی استاتیک برای GitHub Pages فقط وقتی BUILD_STATIC=true باشد فعال می‌شود
// تا اجرای معمولی `npm run dev` / `npm run build` بدون تغییر بماند.
const isStaticExport = process.env.BUILD_STATIC === "true";

// نام مخزن روی GitHub Pages؛ سایت زیرمسیر /<repo>/ سرو می‌شود.
const repoBasePath = "/chasb-market-prototype";

const nextConfig = {
  reactStrictMode: true,
  ...(isStaticExport
    ? {
        output: "export",
        basePath: repoBasePath,
        assetPrefix: `${repoBasePath}/`,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
