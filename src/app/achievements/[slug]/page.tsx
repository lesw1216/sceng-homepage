import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AchievementGallery } from "@/components/achievements/AchievementGallery";
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
    robots: item.isDemo ? { index: false, follow: false } : undefined,
    openGraph: {
      title: item.title,
      description: item.summary,
    },
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
      <PageHero
        eyebrow={`Project · ${item.year}`}
        title={item.title}
        action={
          <Link
            href="/#achievements"
            className="group relative inline-flex items-center gap-2 py-1 text-base font-semibold text-navy"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            실적현황 목록
            {/* hover 시 왼쪽 → 오른쪽으로 늘어나고, 벗어나면 반대 방향으로 사라진다. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-0.5 origin-right scale-x-0 bg-navy transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"
            />
          </Link>
        }
      />
      <section className="bg-white">
        <Container>
          <div className="grid gap-12 pb-16 sm:pb-20 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <AchievementGallery images={item.images} title={item.title} />
              <p className="mt-10 text-xl font-semibold leading-relaxed text-navy">
                {item.summary}
              </p>
              <p className="mt-6 text-base leading-relaxed text-ink/80">{item.body}</p>
            </div>

            <aside>
              <div className="sticky top-28 border border-ink/15">
                <div className="p-6">
                  <h2 className="text-base font-semibold uppercase tracking-wider text-navy">
                    Project Info
                  </h2>
                </div>
                <dl>
                  {meta.map((row) => (
                    <div
                      key={row.label}
                      className="flex gap-4 border-t border-ink/10 px-6 py-4"
                    >
                      <dt className="w-24 shrink-0 text-base font-bold text-navy">
                        {row.label}
                      </dt>
                      <dd className="text-base leading-relaxed text-ink/85">
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
