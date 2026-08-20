import Image from "next/image";
import Link from "next/link";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { BrandLine } from "@/components/ui/BrandLine";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getBusinessAreas } from "@/lib/content/businessAreas";
import { getCompanyInfo } from "@/lib/content/company";
import { businessAreaImage } from "@/lib/images";

export default async function Home() {
  const [company, areas] = await Promise.all([
    getCompanyInfo(),
    getBusinessAreas(),
  ]);

  return (
    <>
      <OrganizationJsonLd company={company} />
      <HeroCarousel />

      {/* 인트로 */}
      <section className="bg-white">
        <Container>
          <div className="py-20 sm:py-28">
            <div className="flex items-center gap-3">
              <span className="h-7 w-1.5 bg-orange" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-steel">
                Systems and Controls
              </span>
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.2] tracking-tight text-navy sm:text-5xl">
              {company.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70">
              {company.name} · {company.tagline}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/business" variant="primary">
                사업영역 보기
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                문의하기
              </ButtonLink>
            </div>
          </div>
        </Container>
        <BrandLine />
      </section>

      {/* 사업분야 바로가기 */}
      <section className="bg-concrete">
        <Container>
          <div className="py-20 sm:py-28">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              사업분야
            </h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {areas.map((area) => (
                <Link
                  key={area.key}
                  href={`/business?area=${area.key}`}
                  className="group relative block aspect-[4/3] overflow-hidden bg-navy"
                >
                  <Image
                    src={businessAreaImage[area.key]}
                    alt={`${area.title} 현장`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <h3 className="text-2xl font-extrabold">{area.title}</h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-white/80">
                      {area.titleEn}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-orange">
                      자세히 보기 →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
