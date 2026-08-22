import { AchievementsBrowser } from "@/components/achievements/AchievementsBrowser";
import { About } from "@/components/sections/About";
import { BusinessTabs } from "@/components/sections/BusinessTabs";
import { Contact } from "@/components/sections/Contact";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { TechSkills } from "@/components/sections/TechSkills";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import {
  getAchievementCategories,
  getAchievements,
  getAchievementYears,
} from "@/lib/content/achievements";
import { getBusinessAreas } from "@/lib/content/businessAreas";
import { getCompanyProfile } from "@/lib/content/company";
import { getTechPhases } from "@/lib/content/techSkills";

export default async function Home() {
  const [profile, phases, areas, achievements, years, achievementCategories] =
    await Promise.all([
      getCompanyProfile(),
      getTechPhases(),
      getBusinessAreas(),
      getAchievements(),
      getAchievementYears(),
      getAchievementCategories(),
    ]);

  return (
    <>
      <OrganizationJsonLd company={profile.info} />
      <HeroCarousel company={profile.info} />
      <About profile={profile} />
      <TechSkills phases={phases} />
      <BusinessTabs areas={areas} />
      <AchievementsBrowser
        items={achievements}
        years={years}
        categories={achievementCategories}
      />
      <Contact company={profile.info} />
    </>
  );
}
