import type { Metadata } from "next";
import { Geist_Mono, Noto_Sans_KR } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getCompanyInfo } from "@/lib/content/company";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import "./globals.css";

// 본문 기본 서체: Noto Sans KR (self-host, 방문자 전원 동일 적용)
const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

// 넘버·영문 라벨용 모노 (인더스트리얼 라벨)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${notoSansKr.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter company={company} />
      </body>
    </html>
  );
}
