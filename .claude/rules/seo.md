# SEO 규칙 (최우선)

이 프로젝트는 검색엔진 최적화를 **최우선 품질 기준**으로 다룬다. 페이지·컴포넌트를 만들 때마다 아래를 점검한다.

## Metadata (Next.js Metadata API)
- 모든 route는 정적 `metadata` 또는 동적 `generateMetadata`로 메타데이터를 **반드시** 노출한다.
- `src/app/layout.tsx`에 전역 기본값을 둔다:
  - `metadataBase: new URL(...)` — OG/canonical 절대경로 계산에 필수.
  - `title: { default, template: "%s | SC Engineering" }` — 하위 페이지는 `title`만 지정.
  - `description`, `alternates.canonical`, `robots`, `openGraph`, `twitter`.
- 페이지별 필수: **고유한** `title`·`description`, `alternates.canonical`(상대경로 `/about` 등).
- 동적 상세 페이지(예: 실적 상세)는 `generateMetadata`에서 accessor로 record를 조회해 title/description/OG를 채운다.

```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const item = await getAchievementBySlug(params.slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/achievements/${item.slug}` },
    openGraph: { title: item.title, description: item.summary },
  };
}
```

## 구조화 데이터 (JSON-LD)
- 조직 정보는 `Organization`(또는 제조업 성격상 `LocalBusiness`) JSON-LD를 layout 또는 홈에 삽입.
- 실적/사례는 필요 시 `Article`, 제품은 `Product` 스키마 고려.
- 삽입은 `<script type="application/ld+json">`을 서버 컴포넌트에서 직접 렌더(문자열 `JSON.stringify`). 외부 스크립트 아님.

## 크롤링·인덱싱
- `src/app/sitemap.ts` — 정적 route + accessor로 조회한 동적 route를 모두 포함.
- `src/app/robots.ts` — 크롤링 허용 + `sitemap` 경로 지정.
- 배포 전 `robots` 메타에서 개발 중 `noindex`가 남지 않았는지 확인.

## 렌더링·성능 (Core Web Vitals)
- **Server Component 우선.** 데이터 패칭은 서버에서, `"use client"`는 상호작용 경계에서만.
- 이미지는 **항상 `next/image`** + 의미 있는 `alt`. 장식 이미지는 `alt=""`.
- 폰트는 `next/font`로 self-host(레이아웃 시프트 방지). LCP 요소 이미지에 `priority`.
- 시맨틱 태그(`header`/`nav`/`main`/`section`/`article`/`footer`) 사용, `main`은 페이지당 하나.

## 페이지 추가 체크리스트
- [ ] 고유한 title·description 지정했는가
- [ ] canonical 지정했는가
- [ ] h1은 하나이고 heading 계층이 순서대로인가
- [ ] 모든 이미지에 alt가 있는가
- [ ] 동적 route라면 sitemap에 반영되는가
- [ ] Server Component로 렌더되는가(불필요한 `"use client"` 없는가)
