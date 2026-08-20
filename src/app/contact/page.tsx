import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { PageHero } from "@/components/ui/PageHero";
import { getCompanyInfo } from "@/lib/content/company";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "에스씨엔지니어링(주) 연락처·오시는 길. 대표전화, 이메일, 주소 안내 및 네이버 지도.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const company = await getCompanyInfo();
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact"
        description="문의 사항이 있으시면 언제든지 연락 주시기 바랍니다."
      />
      <Contact company={company} />
    </>
  );
}
