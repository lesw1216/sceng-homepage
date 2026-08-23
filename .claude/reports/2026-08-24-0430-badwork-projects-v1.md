# Bad Work 지적사항 + 실적현황 추가 요구사항 ver.1 반영

작성: 2026-08-24 04:30 · 브랜치 `refactor/detail-first`
커밋: `7fa411e`(Hero), `20584e4`(실적현황)

## 작업 요청 요약

`README.md` 재확인 후, 이번 라운드에 내용이 채워진 `00-bad-work.md`와
`06-projects.md`의 "추가 요구사항 ver. 1"을 반영한다.

### `00-bad-work.md`
1. Hero 제목이 "… 자동화 / 솔루션"으로 끊김 →
   "스마트 공간과 최첨단 인프라를 위한 / 자동화 솔루션"이어야 함
2. 실적 없음 상황(개설 초기 / 조건 불일치)의 디자인을 리스트와 **함께** 표시하는
   요구사항을 수행하지 않음

### `06-projects.md` 추가 요구사항 ver. 1
- 상세 탭 상단 회색 수평선 제거, 활성 오렌지 + 오렌지 밑줄, hover 네이비 밑줄
- 검색바 포커스 시 오렌지 사각 테두리 제거
- 연도 Dropdown 오렌지 테두리 제거
- 카드 hover 시 하단에 회사 대표 선 밑줄(좌→우 애니메이션)
- `<`, `>` 크기 2단계 확대, hover 시 네이비가 좌→우로 채워짐

## 사용자 확인을 받은 결정

"상세 탭"이 어느 컴포넌트인지 문서만으로는 확정할 수 없었다.
(제목은 `05-business.md` 8.5와 동일하지만, "상단의 회색 수평선"은 실적현황 필터 행의
`border-y` 윗줄과만 일치했다.)
→ **실적현황 사업분야 필터(AchievementsBrowser)** 로 확인받고 진행했다.

## 원인 분석 — 오렌지 포커스 테두리가 지난 커밋에서 안 지워진 이유

지난 라운드에 입력창에 `focus-visible:outline-none`을 넣었는데도 그대로 남아 있었다.

빌드된 CSS를 열어 확인한 결과:
- Tailwind 유틸리티 `.focus-visible\:outline-none:focus-visible` → `@layer utilities` **안** (index 24688)
- `globals.css`의 `:focus-visible { outline: 3px solid orange }` → **레이어 밖** (index 27329)

CSS cascade layer 규칙상 **unlayered 스타일이 layered 스타일을 항상 이긴다**(specificity 무관).
따라서 컴포넌트 className으로는 덮을 수 없고, `globals.css`에서 처리해야 했다.

## 변경 파일

### 커밋 `7fa411e` — Hero 제목 줄바꿈 (bad-work 1)
- `src/lib/content/types.ts`
  - `CompanyInfo.headlineLines: string[]` 추가
  - `CompanyInfoSource = Omit<CompanyInfo, "headline">` 추가
- `src/content/company.ts`
  - `headline` → `headlineLines: ["스마트 공간과 최첨단 인프라를 위한", "자동화 솔루션"]`
- `src/lib/content/company.ts`
  - `toCompanyInfo()`로 `headline = headlineLines.join(" ")` 파생
    (achievements의 `year`/`period` 파생과 동일한 패턴)
- `src/components/sections/HeroCarousel.tsx`
  - h1이 각 줄을 `block` span으로 렌더 → 줄바꿈 위치 고정. 줄 내부는 `break-keep` 유지

`headline`(평문)은 `About.tsx`가 계속 쓰므로 파생값으로 유지했다.

### 커밋 `20584e4` — 실적현황 (06-projects ver.1 + bad-work 2)
- `src/app/globals.css`
  - `input/select/textarea:focus-visible { outline: none }` (레이어 밖, 위 규칙 뒤)
  - `select:focus-visible { border-color: navy }` — 포커스 표시자 대체
- `src/components/achievements/AchievementsBrowser.tsx`
  - 필터 행 `border-y` → `border-b` (상단 회색선 제거)
  - `FilterButton` 컴포넌트 분리: 활성 `text-orange` + 오렌지 밑줄 고정,
    비활성 `text-steel`, hover 시 네이비 밑줄이 좌→우로 확장
  - 카드 `relative` + hover 시 하단 `BrandLine`이 좌→우로 확장
  - `StepArrow` 컴포넌트 분리: `h-7` → `h-9`(2단계 확대), 배경·테두리 없음.
    steel 꺽쇠 위에 navy 꺽쇠를 겹치고 `clip-path: inset(0 100% 0 0)` →
    `inset(0)`으로 전환해 색이 좌→우로 채워지게 함
  - 위치는 `-left-8 lg:-left-9` / `-right-8 lg:-right-9` (컨테이너 좌우 여백 안쪽)
  - Empty State 문구를 `EMPTY_NO_RECORD` / `EMPTY_NO_MATCH` 상수로 승격
  - 데모 데이터가 있는 동안 두 Empty State 디자인을 리스트 하단에 함께 노출

## 실행 명령어

```
npx tsc --noEmit
npm run lint
npm run build
```

## 검증 결과

- `npx tsc --noEmit` 에러 0 / `npm run lint` 에러 0 / `npm run build` 성공
- 생성 CSS 확인
  - `.[clip-path:inset(0_100%_0_0)]{clip-path:inset(0 100% 0 0)}`
  - `.group-hover:[clip-path:inset(0_0_0_0)]:is(:where(.group):hover *){clip-path:inset(0)}`
  - `.transition-[clip-path]{transition-property:clip-path;…}`
  - `input:focus-visible,select:focus-visible,textarea:focus-visible{outline:none}`
    → 전역 오렌지 규칙 **뒤**, 레이어 밖에 위치
  - `select:focus-visible{border-color:var(--color-navy)}`
- 렌더 마크업 확인 (`.next/server/app/index.html`)
  - h1: `<span class="block">스마트 공간과 최첨단 인프라를 위한</span><span class="block">자동화 솔루션</span>`
  - 필터 행: `border-b border-ink/10 py-6` — `border-y` 잔존 0건
  - 활성 필터: `font-semibold text-orange`
  - Empty State Preview 블록 및 A/B 두 안내 화면 렌더 확인

## 알려진 제약 · 주의사항

- **`06-projects.md` 6.3과 추가 요구사항 ver.1이 충돌한다.**
  6.3은 "선택됨 → 네이비"(취소선 없음), ver.1은 "활성 오렌지"다.
  더 나중 문서인 ver.1을 따랐다. 6.3에 취소선을 넣어 주시면 문서가 정리된다.
- **Empty State Preview는 홈 페이지에 실제로 렌더된다.** 데모 데이터(`isDemo`)가
  하나라도 있을 때만 나타나므로 실제 자료로 교체하면 자동으로 사라진다.
  다만 그 전까지는 검색엔진에도 노출되므로, 배포 전이라면 유지하고
  운영 배포 시점에는 실제 데이터로 교체하거나 이 블록을 제거해야 한다.
- **`select` 포커스 표시자**: 오렌지 아웃라인을 제거하면 키보드 사용자가 포커스를
  잃으므로 네이비 테두리로 대체했다. 요구사항에 대체 색 지정이 없어 필터 활성색
  체계(네이비)를 따랐다.
- **꺽쇠 hover 애니메이션 방향**: `clip-path`가 좌→우로 열리고, hover 해제 시
  같은 경로로 되감겨 오른쪽 → 왼쪽으로 걷힌다. 다른 밑줄(`origin-right`로 축소)과
  사라지는 방향이 반대다. 통일이 필요하면 알려주기 바란다.
- 브라우저에서의 hover·focus 실제 동작은 미검증이다(headless browser 의존성 없음).
  `npm run dev`로 확인 부탁드린다.

## Follow-up

- `06-projects.md` 6.3 색상 규정 정리(취소선)
- `00-global.md` 3.4 Navigation 크기(15~16px) vs `01-header.md` 확대 지시(18px)
- 헤더 nav hover 밑줄(navy) / 활성 밑줄(orange) 색 통일 여부
