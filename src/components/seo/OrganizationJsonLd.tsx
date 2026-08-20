import type { CompanyInfo } from "@/lib/content/types";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

/**
 * Organization 구조화 데이터(JSON-LD).
 * 서버 컴포넌트에서 script로 직접 렌더한다. (see .claude/rules/seo.md)
 */
export function OrganizationJsonLd({ company }: { company: CompanyInfo }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    alternateName: company.nameEn,
    url: SITE_URL,
    email: company.contact.email,
    telephone: company.contact.phone,
    description: SITE_DESCRIPTION,
    founder: { "@type": "Person", name: company.ceo },
    address: {
      "@type": "PostalAddress",
      streetAddress: company.contact.address,
      addressCountry: "KR",
    },
    knowsAbout: company.mainBusiness,
  };

  return (
    <script
      type="application/ld+json"
      // 구조화 데이터는 신뢰된 내부 데이터이므로 직접 주입
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
