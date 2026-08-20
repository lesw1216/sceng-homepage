import type { Metadata } from "next";
import { BusinessTabs } from "@/components/sections/BusinessTabs";
import { PageHero } from "@/components/ui/PageHero";
import { getBusinessAreas } from "@/lib/content/businessAreas";

export const metadata: Metadata = {
  title: "사업영역",
  description:
    "산업 자동화, 빌딩 자동화, 데이터센터 인프라 솔루션(EPMS/DCIM) 등 에스씨엔지니어링의 사업영역.",
  alternates: { canonical: "/business" },
};

export default async function BusinessPage({
  searchParams,
}: {
  searchParams: Promise<{ area?: string }>;
}) {
  const [areas, sp] = await Promise.all([getBusinessAreas(), searchParams]);
  return (
    <>
      <PageHero
        eyebrow="Core Business"
        title="사업영역"
        description="산업 자동화부터 빌딩 자동화, 데이터센터 인프라까지 통합 제어 솔루션을 제공합니다."
      />
      <BusinessTabs areas={areas} initialKey={sp.area} />
    </>
  );
}
