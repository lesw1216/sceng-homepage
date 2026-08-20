import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { BusinessAreas } from "@/components/sections/BusinessAreas";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { TechSkills } from "@/components/sections/TechSkills";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { getAchievements } from "@/lib/content/achievements";
import { getBusinessAreas } from "@/lib/content/businessAreas";
import { getCompanyProfile } from "@/lib/content/company";
import { getTechPhases } from "@/lib/content/techSkills";

export default async function Home() {
  const [profile, phases, areas, achievements] = await Promise.all([
    getCompanyProfile(),
    getTechPhases(),
    getBusinessAreas(),
    getAchievements(),
  ]);
  const company = profile.info;

  return (
    <>
      <OrganizationJsonLd company={company} />
      <SiteHeader companyName={company.name} shortName={company.shortName} />
      <main>
        <Hero company={company} />
        <About profile={profile} />
        <TechSkills phases={phases} />
        <BusinessAreas areas={areas} />
        <Achievements items={achievements} />
        <Contact company={company} />
      </main>
      <SiteFooter company={company} />
    </>
  );
}
