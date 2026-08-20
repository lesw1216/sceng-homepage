# 작업 보고서: 멀티페이지 재구성 (로고/브랜드라인/캐러셀/탭/실적)

- 일시: 2026-08-20 23:04
- 브랜치: `feat/design-multipage` (← `feat/design-photo`에서 분기)

## 작업 요청 요약 (지시서 md 기준)
1. 페이지 하나 → 메뉴별 페이지로 재구성
2. 헤더 배경 밝게
3. Hero(#top): navy+사진 그라데이션 → 사진만
4. Hero: 산업/빌딩/데이터센터 사진 Carousel 3초 자동
5. Hero: 01/02/03 스트립 제거
6. CEO Message: 로고 공간 + 자료 그대로
7. 회사개요/핵심가치: 주요사업·생산품목 가시성, 핵심가치 로고톤(로고 제공됨)
8. 보유기술: 3단락 유지 + 상단 Stepper(분석및설계→개발및제작→설치및시운전)
9. 사업영역: 한번에 3개 X → 탭 선택, 좌 사진/우 내용(자료 동일)
10. 실적현황: 연도별·검색·그리드(사진/고객사/발주/위치/기간/이름) + 클릭 상세
11. 오시는길 → Contact, 주소부분 네이비 → 화이트
12. 모든 선을 로고 규칙(오렌지:네이비 2:1, "/" 경계) 라인으로 교체, footer 화이트+본문 경계선

## 반영 내용 (항목 대응)
- (1) App Router 멀티페이지: `/`, `/about`, `/technology`, `/business`, `/achievements`, `/achievements/[slug]`, `/contact`. 헤더/푸터는 `RootLayout` 공통.
- (2) 헤더 화이트 배경 + 실제 로고(`public/images/logo-sce.jpg`) + 라우트 nav(usePathname active, 밑줄 BrandLine).
- (3)(4)(5) `HeroCarousel`(client): 사업분야 사진 3장만 3초 자동 순환, 오버레이/네이비 그라데이션/넘버 스트립 제거, 하단 점 인디케이터.
- (6) 회사소개 CEO Message에 로고 공간 배치 + 인사말 원문 그대로.
- (7) 회사개요: 주요사업 3카드 + 주요생산품목 가시성 그리드. 핵심가치 Smart Solution(오렌지)/Control & Trust(네이비)로 로고 톤 반영.
- (8) 보유기술: 상단 Stepper(3단계 흐름, → 연결) + 하단 단계별 상세.
- (9) `BusinessTabs`(client): 상단 탭으로 분야 선택, 좌측 사진/우측 내용. 홈 카드 → `/business?area=key` 진입 시 해당 탭 활성.
- (10) `AchievementsBrowser`(client): 검색(프로젝트명·고객사·지역) + 연도 필터 + 그리드 카드(사진/연도/고객사/위치/기간) → `/achievements/[slug]` 상세(발주·위치·기간·분류 + 사진).
- (11) Contact: 주소 카드 네이비 → 화이트(BrandLine 포인트).
- (12) `BrandLine` 컴포넌트로 헤더/푸터 경계, nav/탭 active, 카드 상단 바 등 주요 선 교체.

## 데이터
- 실적: **SAMPLE(가상) 데이터 8건** — 실제 고객사 미특정, 각 항목에 "(SAMPLE)" 표기 + TODO. 실데이터 수신 시 `src/content/achievements.ts` 교체.
- Achievement 타입 확장(year/category/image/client/orderer/location/period), accessor에 `getAchievementYears` 추가.

## 자산
- 로고: `public/images/logo-sce.jpg` (제공본)
- 실적/사업 사진: Unsplash(상업적 사용 가능) 다운로드, `public/images/` 자체 호스팅(총 2.6MB), `next/image` 최적화.

## 주요 변경/생성 파일
- 공통: `components/ui/BrandLine.tsx`, `PageHero.tsx`, `layout/{SiteHeader,SiteFooter,navigation}`, `app/layout.tsx`
- 섹션: `sections/{HeroCarousel,About,TechSkills,BusinessTabs,Contact}.tsx`, `achievements/AchievementsBrowser.tsx`
- 페이지: `app/{page,about,technology,business,achievements,contact}/page.tsx`, `app/achievements/[slug]/page.tsx`
- 데이터: `content/achievements.ts`, `lib/content/{achievements,types}.ts`, `lib/images.ts`
- SEO: `app/sitemap.ts`(라우트+실적), 페이지별 metadata/canonical
- 삭제(구 홈 섹션): `sections/{Hero,BusinessAreas,Achievements}.tsx`, `ui/Section.tsx`

## 검증 결과
- `npm run lint`: 통과
- `npm run build`: 성공 — 19개 정적 페이지 생성, 실적 상세 8건 SSG, `/business`는 동적(searchParams)
- 프로덕션 렌더: 전 라우트 200, title template 정상, 로고/브랜드라인/캐러셀/스테퍼/실적 검색·연도필터·상세링크 확인

## 주의 / Follow-up
- BrandLine의 "/" 사선 간격·2:1 비율은 각도(100deg)와 stop(63%/68%)로 구현 — 실제 화면에서 두께/각도 미세조정 권장.
- 실적 SAMPLE → 실데이터 교체 필요.
- 로고 jpg(628KB, 흰 배경)라 헤더에서 흰 바탕과 자연스럽게 합쳐짐. 투명 PNG/SVG 로고가 있으면 더 깔끔.
- 육안 확인 권장: `npm run dev` → http://localhost:3000
- 브랜치 4종 공존: company-homepage / design-industrial / design-photo / design-multipage. 채택본 병합은 사용자 결정.
