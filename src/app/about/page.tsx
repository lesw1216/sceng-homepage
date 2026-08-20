import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { PageHero } from "@/components/ui/PageHero";
import { getCompanyProfile } from "@/lib/content/company";

export const metadata: Metadata = {
  title: "회사소개",
  description:
    "에스씨엔지니어링(주) 회사소개 — CEO 인사말, 회사 개요, 주요 생산품목, 핵심 가치.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const profile = await getCompanyProfile();
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="회사소개"
        description={profile.info.headline}
      />
      <About profile={profile} />
    </>
  );
}
