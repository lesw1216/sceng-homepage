import type { Metadata } from "next";
import { TechSkills } from "@/components/sections/TechSkills";
import { PageHero } from "@/components/ui/PageHero";
import { getTechPhases } from "@/lib/content/techSkills";

export const metadata: Metadata = {
  title: "보유기술",
  description:
    "분석·설계부터 개발·제작, 설치·시운전·교육까지 자동화시스템의 전 과정을 책임지는 에스씨엔지니어링의 보유기술.",
  alternates: { canonical: "/technology" },
};

export default async function TechnologyPage() {
  const phases = await getTechPhases();
  return (
    <>
      <PageHero
        eyebrow="Technical Skills"
        title="보유기술"
        description="분석·설계부터 개발·제작, 설치·시운전까지 하나의 흐름으로 책임집니다."
      />
      <TechSkills phases={phases} />
    </>
  );
}
