import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TODO: 회사 소개 자료 수신 후 도메인·문구 확정
const siteUrl = "https://www.scengineering.co.kr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SC Engineering | 제조 자동화 솔루션",
    template: "%s | SC Engineering",
  },
  description:
    "SC Engineering은 공장 자동화와 스마트팩토리 설비를 설계·구축하는 제조 엔지니어링 기업입니다.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "SC Engineering",
    title: "SC Engineering | 제조 자동화 솔루션",
    description:
      "SC Engineering은 공장 자동화와 스마트팩토리 설비를 설계·구축하는 제조 엔지니어링 기업입니다.",
    url: siteUrl,
    locale: "ko_KR",
  },
};

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
