# 디자인 시스템 규칙

## 색상 팔레트 (Single Source of Truth) — 라이트 인더스트리얼

브랜드 2색(navy·orange) + 보조 6색 = **총 8색만 사용한다. 이 외 임의 색상 도입 금지.**
색은 `src/app/globals.css`의 `@theme`에 `--color-*` 토큰으로 정의되어 Tailwind 유틸리티로 노출된다.

| 토큰 | HEX | Tailwind 예 | 용도 |
|------|-----|-------------|------|
| `navy` | `#242145` | `bg-navy` `text-navy` | CI navy. 제목, 활성 필터, 본문 강조 |
| `navy-700` | `#35315F` | `bg-navy-700` | navy 위 계층 surface, hover |
| `graphite` | `#14181F` | `bg-graphite` | 산업용 다크 표면 |
| `orange` | `#ED512C` | `bg-orange` `text-orange` | CI orange. 활성 상태, CTA, 강조 |
| `amber` | `#F5A623` | `text-amber` | sub accent. 수치·하이라이트·다크 위 링크 hover |
| `steel` | `#64748B` | `text-steel` | muted 텍스트, 영문 라벨, 라인 |
| `concrete` | `#E9EDF1` | `bg-concrete` | 밝은 섹션 베이스(라이트 톤 교차) |
| `ink` | `#12161C` | `text-ink` | 본문 기본 텍스트 |

### 파생 규칙
- 명암·상태(hover/disabled/overlay/border)는 **새 색을 만들지 말고** Tailwind opacity로 파생: `bg-navy/90`, `text-ink/70`, `border-ink/10`, `divide-white/10`.
- 그라디언트가 필요하면 위 토큰 조합만 사용.

## 브랜드 라인 (BrandLine)
- 로고 규칙을 선(divider)에 적용: **오렌지(`#ED512C`) : 네이비(`#242145`) = 2 : 1**, 두 색 경계는 "/" 형태의 **2px** 사선 간격.
- 구현: flex 2:1 + `gap-[2px]` + `skewX(-20deg)`(overflow-hidden). `components/ui/BrandLine`.
- 헤더/푸터 경계, 카드 상단선(핵심가치·보유기술) 등 **주요 구획선에만** 사용. 섹션마다 반복되는 구분선은 넣지 않는다.
- **헤더 nav active 밑줄에는 사용하지 않는다.** nav 활성 상태는 텍스트 색상(오렌지)만으로 표현한다.
- 세밀한 내부 1px 구분선(표 행 등)은 `border-ink/10`로 가볍게 유지.

## 레이아웃 / 페이지
- **단일 페이지**(`/`) + 앵커 섹션: `#top` `#about` `#tech` `#business` `#achievements` `#contact`. nav는 `/#섹션` 앵커.
- 실적 상세만 별도 라우트 `/achievements/[slug]` (목록 복귀는 `/#achievements`).
- **모든 섹션 배경은 흰색으로 통일**. 색은 텍스트·테두리·소형 액센트에만.
- 헤더/푸터는 화이트, `RootLayout` 공통. 로고는 `public/sce-logo-ko.svg`(헤더·푸터 공용), 파비콘은 `public/sce-symbol.svg`(+ 레거시 폴백 `src/app/favicon.ico`).
- 섹션 제목은 `SectionHeading`(오렌지 영문 라벨 + 바 + h2, 구분선 없음). 상세 페이지는 `PageHero`.
- 보유기술은 Stepper 없이 3개 Box로 구성하고, 단계 번호·제목을 Box 내부에 통합한다.

## 인더스트리얼 스타일 원칙 (가시성 우선)
- **대비를 강하게**: 본문 텍스트는 `text-ink/80` 이상, 제목은 `text-navy`/`text-white`. 연한 회색(`/50` 이하)은 라벨·메타에만.
- **배경은 흰색 고정**: 섹션/페이지 배경에 navy·orange를 쓰지 않는다. 옅은 회색(`concrete`)은 개별 UI 요소에만.
- **각진 형태**: 카드·버튼은 `rounded-sm` 또는 각지게. 과한 라운드 지양.
- **굵은 구획**: 카드 `border-2 border-ink/10`, 강조는 좌측/상단 `border-l-4`·컬러바(`accentBg`).
- **영문 라벨 + 넘버링**: 섹션·카드에 `uppercase tracking-[0.25em]` 영문 라벨과 `01`·`02` 넘버로 산업 도면 느낌.
- 색 강조 매핑은 `src/lib/accent.ts`(`accentBg`/`accentText`/`accentBorder`)의 정적 맵만 사용(Tailwind 동적 클래스 스캔 한계).

## 접근성 (필수 체크)
- 오렌지(`#ED512C`) 위 텍스트는 **흰색**을 쓰고 대비를 확인한다(작은 본문 텍스트는 대비 부족 가능 → 큰 텍스트/버튼 라벨에 한정).
- navy/graphite 배경 위에는 흰색 또는 `white/70` 이상 텍스트, 라벨 강조는 `amber`.
- 본문 최소 크기 16px, 대비 WCAG AA(4.5:1) 이상.
- 색만으로 정보를 전달하지 않는다(아이콘/텍스트 병행).

## 사진 (Photography)
- 실제 산업 현장 사진으로 색감·신뢰감을 준다(과한 그라디언트·글로우 등 "AI틱" 장식 지양).
- 이미지는 `public/images/`에 자체 호스팅, `next/image`로 렌더(`fill` + `sizes`, LCP는 `priority`).
- 사진 위 텍스트는 `navy` 그라디언트 오버레이로 대비 확보, `alt` 필수(→ seo.md).
- 출처: Unsplash 등 상업적 사용·출처표기 불필요한 무료 라이선스만 사용.

## 타이포그래피
- 폰트: **Pretendard Variable 하나만** 사용한다(`src/fonts/PretendardVariable.woff2`, `next/font/local` → `--font-pretendard` → Tailwind `font-sans`).
  - 컴포넌트별로 다른 `font-family`를 지정하지 않는다. 모노 서체(`font-mono`)는 사용하지 않는다.
- 기본 본문: `16px / 400 / line-height 1.6`(`body`에 전역 지정).
- Font weight는 **400·500·600·700 네 종류만** 사용한다. `font-light`/`font-extrabold`/`font-black` 금지.
  - 400 본문 · 500 메뉴/필터 · 600 카드 제목·버튼 · 700 Hero/Section 제목
- 크기 스케일(Desktop → Mobile)
  | 용도 | 크기 | 굵기 |
  |------|------|------|
  | Hero 제목 | `text-4xl sm:text-5xl` (36→48) | 700 |
  | Hero 설명 | `text-lg sm:text-xl` | 400 |
  | Section 제목 | `text-3xl sm:text-4xl` (30→36) | 700 |
  | 소제목 | `text-xl`~`text-2xl` | 600~700 |
  | 카드 제목 | `text-lg`~`text-xl` | 600 |
  | 본문 | `text-base` | 400 |
  | 부가 설명·라벨 | `text-sm` | 400~600 |
  | Navigation·버튼·필터 | `text-base` | 500~600 |
  | Footer | `text-sm` | 400 |
- 본문은 모바일에서도 `16px`을 유지한다. 큰 제목만 단계적으로 축소한다.
- 임의 크기(`text-[17px]`)와 `text-xs`(12px)는 사용하지 않는다.
- 행간: 큰 heading `leading-tight`, 본문 `leading-relaxed`.
- heading 계층(h1→h6)을 시각 크기가 아니라 문서 구조 기준으로 사용(SEO·접근성). 크기는 className으로 조정.

## 레이아웃·간격
- 페이지 컨테이너: `mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8`.
- 섹션 세로 여백: `py-16 sm:py-24`.
- 간격은 Tailwind 스케일(4의 배수)만 사용, 임의 px 값(`p-[13px]`) 지양.

## 컴포넌트 색 사용 가이드
- Primary 버튼: `bg-orange text-white hover:bg-orange/90`.
- Secondary 버튼: `bg-navy text-white hover:bg-navy-700` 또는 `border border-navy text-navy`.
- 카드: `bg-white border border-steel/20`, 강조 카드 `bg-mist` / `bg-sand`.
- 링크: 본문 링크 `text-navy underline`, hover `text-orange`.

## 인터랙션 (필수)
- 클릭 가능한 모든 요소(버튼·탭·필터·페이지네이션·로고·카드 링크)에 `cursor: pointer`. `globals.css`에서 `a[href]`/`button`/`select`/`[role="tab"]`에 전역 적용한다.
- Hover와 Active 상태는 시각적으로 구분되어야 한다.
