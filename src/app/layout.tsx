import type { Metadata } from "next";
import localFont from "next/font/local";
import { PreventDrag } from "@/components/layout/PreventDrag";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getCompanyInfo } from "@/lib/content/company";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import "./globals.css";

// 전역 단일 서체: Pretendard Variable (로컬 self-host, 400~700을 한 파일로 커버)
const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "400 700",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyInfo();
  const title = `${company.name} | 산업·빌딩·데이터센터 자동화`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${company.name}`,
    },
    description: SITE_DESCRIPTION,
    keywords: [
      "산업 자동화",
      "빌딩 자동화",
      "데이터센터 인프라",
      "EPMS",
      "DCIM",
      "자동제어반",
      "제어반 제작",
      "PLC",
      "SCADA",
      "스마트팩토리",
      company.nameEn,
    ],
    alternates: { canonical: "/" },
    icons: { icon: "/sce-symbol.svg", shortcut: "/sce-symbol.svg" },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: company.name,
      title,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: SITE_DESCRIPTION,
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const company = await getCompanyInfo();
  return (
    <html
      lang="ko"
      data-scroll-behavior="smooth"
      className={`${pretendard.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PreventDrag />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter company={company} />
      </body>
    </html>
  );
}
