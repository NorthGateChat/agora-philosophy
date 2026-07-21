import type { Metadata, Viewport } from "next";
import brand from "../brand.json";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${brand.nameZhHans}｜${brand.sloganZhHans}`,
  description: brand.descriptionZhHans,
  applicationName: brand.storeNameZhHans,
  keywords: ["哲学", "新标签页", "哲学家", "思想史", "philosophy", "new tab"],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: brand.storeNameZhHans,
    title: `${brand.nameZhHans}｜${brand.sloganZhHans}`,
    description: brand.descriptionZhHans,
    images: [{
      url: "/social-share.png",
      width: 1200,
      height: 630,
      alt: `${brand.storeNameZhHans} — ${brand.sloganZhHans}`,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.nameZhHans}｜${brand.sloganZhHans}`,
    description: brand.descriptionZhHans,
    images: ["/social-share.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ece4d7",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
