# 1차 시안 수정 (refactor/detail-first)

## 작업 요청 요약

`.claude/docs/requirements/first-draft/` 의 요구사항 문서 10건(00-global ~ 09-footer)을 구현하고,
요구사항 문서 단위로 커밋한다.

## 사전 계획

- `main` 기준 `refactor/detail-first` 브랜치 생성.
- 요구사항 문서 순서대로 작업 → 문서 1건 = 커밋 1건.
- 전역(00) 작업을 먼저 적용해 폰트·색상·타이포그래피·커서 규칙을 확정한 뒤 섹션별 구조 수정.
- 각 단계마다 `npm run lint` / `npm run build` 통과 확인.

### 사전 확인한 결정 사항

| 항목 | 결정 |
|------|------|
| Geist Mono | 완전 제거. Pretendard 단일 폰트 + letter-spacing으로 라벨 표현 |
| 지도 API | Client ID 미발급 → `CompanyMap` 독립 컴포넌트로 레이아웃만 확보 |

## 커밋 목록

| 커밋 | 요구사항 |
|------|----------|
| `b72ac9d` refactor(global) | 00-global.md |
| `6a4e02c` refactor(header) | 01-header.md |
| `8245c88` refactor(hero) | 02-hero.md |
| `c2eb64d` refactor(about) | 03-about.md |
| `fde0984` refactor(tech) | 04-technology.md |
| `29fa118` refactor(business) | 05-business.md |
| `1d986c8` feat(projects) | 06-projects.md |
| `68a0b41` refactor(project-detail) | 07-project-detail.md |
| `fd5b056` refactor(contact) | 08-contact.md |
| `682e9fa` feat(footer) | 09-footer.md |

## 변경 파일 목록

### 전역 (00-global)
- `src/fonts/PretendardVariable.woff2` (신규) — Pretendard Variable 로컬 폰트(2.0MB, jsDelivr npm 배포본).
- `src/app/layout.tsx` — `next/font/local`로 Pretendard 적용, Noto Sans KR·Geist Mono 제거.
- `src/app/globals.css` — CI 색상 토큰(orange `#ED512C`, navy `#242145`, navy-700 `#35315F`),
  body 기본 Typography(16px/400/1.6), 클릭 가능 요소 전역 `cursor: pointer`,
  사진 위 텍스트용 `.text-on-photo`.
- 전 컴포넌트 — `font-mono` 제거, `font-extrabold` → `font-bold`, `text-xs`·임의 px 크기 제거,
  Hero/Section/카드/버튼/네비게이션 크기를 공통 Scale로 정렬.
- `.claude/rules/design-system.md` — 색상표·타이포그래피·인터랙션 규칙 갱신.

### 헤더 / Hero
- `src/components/layout/navigation.ts` — `HERO_SECTION_ID` 추가.
- `src/components/layout/SiteHeader.tsx` — 로고 클릭 시 메인 최상단 이동(`usePathname` 분기),
  스크롤 스파이에 Hero 구간 포함 + 문서 순서 기준 판정, 활성 nav BrandLine 제거.
- `src/components/sections/HeroCarousel.tsx` — Gradient Overlay 제거, 헤더와 2px 간격,
  하단 사업 목록 → CTA 2개, 정지/시작 버튼·hover 일시정지 제거(무한 자동 순환).
- `src/components/ui/Button.tsx` — 버튼 Typography 정렬, ghost variant 대비 강화.

### 회사소개 / 보유기술 / 사업영역
- `src/components/sections/About.tsx` — 단일 컬럼 재구성(회사 소개 → 회사 개요 → 핵심 가치 →
  주요 생산품목), 서명 문구, 라벨 네이비, 핵심 가치 2열 + 상단 대표 선, 품목 Box 흰 배경.
- `src/content/company.ts`, `src/lib/content/company.ts`, `src/lib/content/types.ts` —
  `ceoSignature` 추가, `nameEn`을 `SC ENGINEERING Co., Ltd`로 변경, 인사말 첫 문장 수정,
  `businessNumber`(임시값) 추가.
- `src/components/sections/TechSkills.tsx` — Stepper 제거, 번호·제목을 Box 내부로 통합,
  번호 디자인을 핵심 가치와 동일(네이비)하게, 상단 대표 선.
- `src/components/ui/SectionHeading.tsx` — 폭 제한을 제목에만 적용(소개 문구 한 줄 표시).
- `src/components/sections/BusinessTabs.tsx` — 간격 통일, 2열 내부 수평선 제거,
  설명 시작 위치를 이미지 상단에 고정, 항목 단일 컬럼(줄바꿈 방지), 이미지 placeholder 배경 변경.

### 실적 현황 / 실적 상세
- `src/lib/content/types.ts` — `AchievementSource`/`Achievement` 분리, `areaKey`·`startDate`·
  `endDate`·`sequence` 추가, `AchievementCategory` 추가.
- `src/content/achievements.ts` — 사업 분야별 10건, 총 30건 데모 데이터.
- `src/lib/content/achievements.ts` — year·period 파생, 정렬(시작일 → 종료일 → 등록순서 내림차순),
  `getAchievementCategories()` 추가, preview 레코드 제거.
- `src/lib/achievements.ts` (신규) — `filterAchievements`/`getTotalPages`/`getPageItems` 순수 함수.
- `src/components/achievements/AchievementsBrowser.tsx` — 검색(명시적 실행) + 사업분야 Button Group
  + 연도 Select, 5열 × 2행 리스트, 좌우 이동 버튼, 하단 페이지네이션, Empty State 2종.
- `src/app/page.tsx`, `src/app/sitemap.ts` — accessor 연결, 데모 레코드 sitemap 제외.
- `src/components/ui/PageHero.tsx` — BrandLine 제거, `action` slot 추가, 상하 간격 축소.
- `src/app/achievements/[slug]/page.tsx` — 목록 버튼을 제목 행으로 이동(hover 밑줄 애니메이션),
  데모 안내 문구 제거, aside BrandLine 제거, PROJECT INFO 네이비.

### Contact / Footer
- `src/components/sections/Contact.tsx` — 안내 문구·네이비 주소 카드 제거,
  "프로젝트 문의" / "오시는 길" 2개 Sub Section 구성.
- `src/components/sections/CompanyMap.tsx` (신규) — 지도 영역 확보 + 네이버 지도 버튼.
- `src/components/layout/SiteFooter.tsx` — 대표·사업자등록번호 추가, 대표전화/이메일 줄 분리,
  Footer Typography 14px.

## 실행 명령어

```bash
git checkout -b refactor/detail-first
curl -sSL -o src/fonts/PretendardVariable.woff2 \
  https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/woff2/PretendardVariable.woff2
npm run lint
npm run build
```

## 검증 결과

- `npm run lint` — 통과(0 error).
- `npm run build` — 타입 에러 0, 정적 페이지 36개 생성(홈 + 실적 상세 30 + 시스템 라우트).
- 정렬 검증 — 프리렌더된 홈 HTML의 카드 순서가 시작일 내림차순, 동일 시작일(2026-03)에서는
  종료일 내림차순(2026-10 → 2026-09 → 2026-08)으로 출력되는 것을 확인.
- 실행 확인 — dev 서버에서 `/` 200, `/achievements/idc-epms-build` 200,
  Pretendard woff2(`/_next/static/media/PretendardVariable-*.woff2`) 로드 확인.

## 알려진 제약 / 주의사항

- **지도 미구현**: 네이버 지도 API는 Client ID가 필요해 `CompanyMap`에 레이아웃만 확보했다.
  키 확보 후 이 컴포넌트 내부만 교체하면 된다.
- **사업자등록번호는 임시값**(`123-45-67890`). 실제 번호 확인 후 `src/content/company.ts` 교체 필요.
- **실적 30건은 데모 데이터**다. 고객사·발주처는 익명(A 반도체 등), 대표 이미지는 기존
  `public/images`의 무료 라이선스 사진을 사업 분야별로 재사용했다. 데모 레코드는 `isDemo: true`로
  표시해 sitemap 제외 + `noindex`를 유지하므로, 실제 자료로 교체할 때 이 플래그를 함께 제거해야 한다.
- **Hero 그라디언트 제거**로 사진 위 흰 텍스트 대비가 사진에 따라 달라질 수 있다.
  현재는 `.text-on-photo`(text-shadow)로만 보완했으므로, 실제 촬영 사진 교체 시 재확인이 필요하다.
- 기존 실적 상세 데모 레코드(`demo-integrated-automation-project`)는 30건 데모 데이터로 대체되어
  제거했다. 해당 URL은 이제 404다.
- `src/lib/accent.ts`는 현재 참조하는 컴포넌트가 없다(이번 변경 이전부터). 정리 여부는 별도 판단 필요.

## Follow-up

- 지도 API Client ID 확보 후 `CompanyMap` 실제 지도 연동.
- 실제 실적 자료 수신 시 `src/content/achievements.ts` 교체 및 `isDemo` 제거.
- 사업자등록번호 등 회사 기본 정보 확정값 반영.
