import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandLine } from "@/components/ui/BrandLine";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import {
  getAchievementBySlug,
  getAchievements,
} from "@/lib/content/achievements";

export async function generateStaticParams() {
  const items = await getAchievements();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getAchievementBySlug(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/achievements/${slug}` },
  };
}

export default async function AchievementDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getAchievementBySlug(slug);
  if (!item) notFound();

  const meta = [
    { label: "고객사", value: item.client },
    { label: "발주", value: item.orderer },
    { label: "위치", value: item.location },
    { label: "프로젝트 기간", value: item.period },
    { label: "분류", value: item.category },
  ];

  return (
    <>
      <PageHero eyebrow={`Project · ${item.year}`} title={item.title} />
      <section className="bg-white">
        <Container>
          <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.title} 현장`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
                {/* 목록으로 돌아가기 (사진 좌상단, 크게) */}
                <Link
                  href="/#achievements"
                  className="absolute left-4 top-4 inline-flex items-center gap-2 bg-white/95 px-5 py-3 text-sm font-bold text-navy shadow-sm transition-colors hover:bg-orange hover:text-white"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  실적현황 목록
                </Link>
              </div>
              <p className="mt-8 text-base leading-8 text-ink/80">
                {item.summary}
              </p>
              <p className="mt-4 text-base leading-8 text-ink/80">{item.body}</p>
            </div>

            <aside>
              <div className="border-2 border-ink/10">
                <div className="p-6">
                  <BrandLine className="mb-5" />
                  <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-orange">
                    Project Info
                  </h2>
                </div>
                <dl>
                  {meta.map((row) => (
                    <div
                      key={row.label}
                      className="flex gap-4 border-t border-ink/10 px-6 py-4"
                    >
                      <dt className="w-24 shrink-0 text-sm font-bold text-steel">
                        {row.label}
                      </dt>
                      <dd className="text-sm leading-6 text-ink/85">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
