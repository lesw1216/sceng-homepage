import type { Metadata } from "next";
import { AchievementsBrowser } from "@/components/achievements/AchievementsBrowser";
import { PageHero } from "@/components/ui/PageHero";
import {
  getAchievements,
  getAchievementYears,
} from "@/lib/content/achievements";

export const metadata: Metadata = {
  title: "실적현황",
  description:
    "에스씨엔지니어링의 연도별 산업·빌딩·데이터센터 자동화 프로젝트 수행 실적.",
  alternates: { canonical: "/achievements" },
};

export default async function AchievementsPage() {
  const [items, years] = await Promise.all([
    getAchievements(),
    getAchievementYears(),
  ]);
  return (
    <>
      <PageHero
        eyebrow="Track Record"
        title="실적현황"
        description="연도별 주요 프로젝트 수행 실적입니다."
      />
      <AchievementsBrowser items={items} years={years} />
    </>
  );
}
