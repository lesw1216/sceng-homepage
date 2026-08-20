import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getCompanyInfo } from "@/lib/content/company";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
