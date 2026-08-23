# 1차 시안 수정 2차 반영

작성: 2026-08-24 02:10 · 브랜치 `refactor/detail-first` (README 지시대로 브랜치 유지)

## 작업 요청 요약

`.claude/docs/requirements/first-draft/` 아래 요구사항 문서 중 추가·수정된 6건을 반영한다.
커밋은 요구사항 문서 단위로 나눈다.

변경된 문서: `00-global.md`(2.4), `01-header.md`(1.1·1.2·1.3), `02-hero.md`,
`05-business.md`(8.5), `06-projects.md`(6.8·6.9·6.11·6.12), `07-project-detail.md`

## 사전 계획

1. `00-global` 2.4 — 실적 이미지 단건 → 배열, 목록은 첫 장 / 상세는 전체
2. `01-header` — 로고 높이 고정, nav 색상·밑줄·크기, 하단 회색선 + 스크롤 그림자
3. `02-hero` — 제목 어절 단위 줄바꿈, 태그라인 한 줄
4. `05-business` 8.5 — 상세 탭 색상·밑줄 개편
5. `06-projects` — 카드 디자인, 페이지네이션 꺽쇠 위치·디자인, 6.11 재작업, 6.12 검색바
6. `07-project-detail` — 사진 캐로셀 + 필름 스트립

## 사용자 확인을 받은 결정

| 항목 | 문서 표기 | 결정 |
|------|----------|------|
| 헤더 로고 높이 | "height를 15px" | **`h-15`(60px)로 해석** — 15px는 한글 로고타입 판독 불가 |
| 헤더/본문 구분 | "배경 등으로 구분" | **헤더 흰색 유지 + 스크롤 시 shadow** (옅은 회색 배경 대신) |

## 변경 파일

### 커밋 `de94062` — 실적 이미지 배열화 (00-global 2.4)
- `src/lib/content/types.ts` — `AchievementSource.image: string` → `images: string[]`
- `src/content/achievements.ts` — 30건 전부 배열로 변환. 캐로셀 검증을 위해 장수를 1~4장으로 섞음
- `src/components/achievements/AchievementsBrowser.tsx` — 목록 카드는 `images[0]`
- `src/app/achievements/[slug]/page.tsx` — 상세는 배열 소비

### 커밋 `74f2810` — 헤더 (01-header)
- `src/components/layout/SiteHeader.tsx`
  - 로고 높이 `h-10 sm:h-15`(40/60px), 원본 비율 868:155 유지. 헤더 높이 `h-16 sm:h-20`
  - nav 비활성 `text-steel` / 활성 `text-navy`, 활성 시 navy 밑줄 고정
  - hover 밑줄: `origin-right scale-x-0` → `group-hover:origin-left scale-x-100` (해제 시 역방향 축소)
  - nav 글씨 `text-base` → `text-lg`
  - 하단 `BrandLine` 제거 → `border-b border-ink/15`
  - `scroll` 리스너로 `scrollY > 0`일 때 `shadow-md` 부여
  - 모바일 메뉴도 동일한 steel/navy 색 규칙 적용
- `.claude/rules/design-system.md` — BrandLine 사용처·nav 규칙을 현재 상태로 갱신

### 커밋 `2ed6799` — Hero (02-hero)
- `src/components/sections/HeroCarousel.tsx`
  - h1 `break-keep` + `max-w-4xl` → "…인프라를 위한 / 자동화 솔루션"으로 줄바꿈
  - 태그라인 문단 `max-w-2xl` 제거, 부모 `max-w-4xl` 제거 → 데스크톱 한 줄

### 커밋 `4b71eb3` — 사업영역 탭 (05-business 8.5)
- `src/components/sections/BusinessTabs.tsx` — 비활성 steel / 활성 navy,
  `BrandLine` 밑줄 → navy 실선 + hover 좌→우 애니메이션

### 커밋 `f9cc957` — 실적현황 (06-projects)
- `src/components/achievements/AchievementsBrowser.tsx`
  - 카드: `rounded-sm border border-ink/15 shadow-sm`, hover 시 `-translate-y-1 shadow-md`
  - 카드 Item 라벨(고객·발주처·기간·위치) `text-steel` → `text-navy`, 내용 색상 유지
  - 페이지네이션 꺽쇠를 그리드 래퍼에 `absolute -left-7 / -right-7 top-1/2 -translate-y-1/2`로
    이동 → 그리드 좌우 폭이 필터 행과 일치. 배경·테두리 제거, 꺽쇠 SVG만 노출
  - Empty State를 `EmptyState` 컴포넌트로 분리, 두 상태 문구를 명확히 구분(6.11)
  - 검색바: `focus-visible:outline-none`으로 오렌지 아웃라인 제거,
    포커스 시 `BrandLine` 밑줄이 좌→우로 확장, 검색 아이콘 `steel` → 포커스 시 `navy`

### 커밋 `b32039b` — 실적 상세 (07-project-detail)
- `src/components/achievements/AchievementGallery.tsx` (신규, client)
  - 16:10 영역 유지, opacity 크로스페이드, 3초 간격 무한 순환
  - 양끝 세로 중앙 꺽쇠(배경·테두리 없음, `drop-shadow-lg`로 사진 위 가독성 확보)
  - 하단 썸네일 스트립(활성 항목 navy 테두리 + 불투명도 대비)
  - 사진 1장이면 꺽쇠·스트립·자동 순환 생략
  - `prefers-reduced-motion: reduce`에서 자동 순환 중지 (HeroCarousel과 동일 정책)
- `src/app/achievements/[slug]/page.tsx` — 단일 `Image` → `AchievementGallery`

## 실행 명령어

```
npx tsc --noEmit      # 각 커밋 전
npm run lint          # 각 커밋 전
npm run build
```

## 검증 결과

- `npx tsc --noEmit` 에러 0
- `npm run lint` 경고·에러 0
- `npm run build` 성공 — `/`, `/achievements/[slug]` 30건, `robots.txt`, `sitemap.xml` 정상 생성
- **6.11 검증**: `src/content/achievements.ts`를 임시로 빈 배열로 바꿔 빌드 → 성공.
  생성된 `index.html`에서 "아직 등록된 실적이 없습니다." 문구와
  `border-ink/15 bg-white p-14 text-center` 확인. 남아 있는 `bg-navy`는 nav 밑줄뿐이며
  Empty State 배경은 흰색임을 확인. 검증 후 데이터 원복(`git diff` 없음)
- 생성 CSS에서 유틸리티 실제 출력 확인:
  `sm:h-15 → height:calc(var(--spacing)*15)`(=60px), `break-keep`,
  `group-focus-within:{origin-left,scale-x-100,text-navy}`, `group-hover/card:scale-105`,
  `-left-7 / -right-7`

## 알려진 제약 · 주의사항

- **nav 글씨 크기 충돌**: `00-global.md` 3.4 표는 Navigation을 15~16px로 규정하지만
  `01-header.md`가 "한 단계 키운다"를 명시해 18px(`text-lg`)로 적용했다.
  전역 표를 갱신할지 확인 필요.
- **로고 15px**: 문서 표기는 15px이나 판독 문제로 60px로 합의. 문서 문구는 수정하지 않았다.
- **Hero 태그라인 한 줄**: 폰트 메트릭 기준 20px에서 약 1050px 필요,
  컨테이너 내부 폭은 lg 이상에서 1240px이므로 데스크톱에서는 한 줄로 들어간다.
  뷰포트가 그보다 좁으면(태블릿·모바일) 두 줄 이상으로 접힌다 — 의도된 반응형 동작.
- **페이지네이션 꺽쇠 모바일**: 컨테이너 좌우 여백이 20px(`px-5`)인 base 구간에서는
  `-left-7`(28px)이 화면 밖으로 나가므로 `sm` 미만에서는 숨긴다.
  해당 구간에서는 하단 페이지 번호 네비게이션으로 이동한다.
- **검색바 포커스 링 제거**: 전역 오렌지 `:focus-visible` 아웃라인을 검색 입력에서만
  껐다. 대신 대표 선 밑줄이 포커스 표시자 역할을 하므로 접근성상 표시자는 유지된다.
- 실적 사진은 여전히 데모용 무료 라이선스 이미지 재사용본이다. 실제 자료 수신 시
  `src/content/achievements.ts`의 `images` 배열만 교체하면 된다.

## Follow-up

- `00-global.md` 3.4 Navigation 크기 규정과 `01-header.md` 확대 요구사항 정합성 정리
- 실적 상세 OG 이미지에 `images[0]`을 노출할지 검토(현재 미지정, 범위 밖이라 보류)
