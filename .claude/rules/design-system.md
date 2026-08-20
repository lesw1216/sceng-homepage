# 디자인 시스템 규칙

## 색상 팔레트 (Single Source of Truth) — 라이트 인더스트리얼

브랜드 2색(navy·orange) + 보조 6색 = **총 8색만 사용한다. 이 외 임의 색상 도입 금지.**
색은 `src/app/globals.css`의 `@theme`에 `--color-*` 토큰으로 정의되어 Tailwind 유틸리티로 노출된다.

| 토큰 | HEX | Tailwind 예 | 용도 |
|------|-----|-------------|------|
| `navy` | `#001B3D` | `bg-navy` `text-navy` | 브랜드 primary. 다크 섹션(Contact), 제목 |
| `navy-700` | `#0A2E52` | `bg-navy-700` | navy 위 계층 surface, hover |
| `graphite` | `#14181F` | `bg-graphite` | 산업용 다크 표면. 헤더/Hero/교차 섹션 |
| `orange` | `#F26C21` | `bg-orange` `text-orange` | 브랜드 accent. CTA, 강조, 넘버·바 |
| `amber` | `#F5A623` | `text-amber` | sub accent. 수치·하이라이트·다크 위 링크 hover |
| `steel` | `#64748B` | `text-steel` | muted 텍스트, 영문 라벨, 라인 |
| `concrete` | `#E9EDF1` | `bg-concrete` | 밝은 섹션 베이스(라이트 톤 교차) |
| `ink` | `#12161C` | `text-ink` | 본문 기본 텍스트 |

### 파생 규칙
- 명암·상태(hover/disabled/overlay/border)는 **새 색을 만들지 말고** Tailwind opacity로 파생: `bg-navy/90`, `text-ink/70`, `border-ink/10`, `divide-white/10`.
- 그라디언트가 필요하면 위 토큰 조합만 사용.

## 인더스트리얼 스타일 원칙 (가시성 우선)
- **대비를 강하게**: 본문 텍스트는 `text-ink/80` 이상, 제목은 `text-navy`/`text-white`. 연한 회색(`/50` 이하)은 라벨·메타에만.
- **다크/라이트 섹션 교차**: graphite(Hero) → white(About) → concrete(Tech) → white(Business) → concrete(Achievements) → navy(Contact). `Section`의 `tone` prop 사용.
- **각진 형태**: 카드·버튼은 `rounded-sm` 또는 각지게. 과한 라운드 지양.
- **굵은 구획**: 카드 `border-2 border-ink/10`, 강조는 좌측/상단 `border-l-4`·컬러바(`accentBg`).
- **모노 라벨 + 넘버링**: 섹션·카드에 `font-mono` 영문 라벨과 `01`·`02` 넘버로 산업 도면 느낌.
- 색 강조 매핑은 `src/lib/accent.ts`(`accentBg`/`accentText`/`accentBorder`)의 정적 맵만 사용(Tailwind 동적 클래스 스캔 한계).

## 접근성 (필수 체크)
- 오렌지(`#F26C21`) 위 텍스트는 **흰색**을 쓰고 대비를 확인한다(작은 본문 텍스트는 대비 부족 가능 → 큰 텍스트/버튼 라벨에 한정).
- navy/graphite 배경 위에는 흰색 또는 `white/70` 이상 텍스트, 라벨 강조는 `amber`.
- 본문 최소 크기 16px, 대비 WCAG AA(4.5:1) 이상.
- 색만으로 정보를 전달하지 않는다(아이콘/텍스트 병행).

## 사진 (Photography)
- 실제 산업 현장 사진으로 색감·신뢰감을 준다(과한 그라디언트·글로우 등 "AI틱" 장식 지양).
- 이미지는 `public/images/`에 자체 호스팅, `next/image`로 렌더(`fill` + `sizes`, LCP는 `priority`).
- 사진 위 텍스트는 `navy` 그라디언트 오버레이로 대비 확보, `alt` 필수(→ seo.md).
- 출처: Unsplash 등 상업적 사용·출처표기 불필요한 무료 라이선스만 사용.

## 타이포그래피
- 폰트: `--font-sans`(**Noto Sans KR**, self-host) 기본. 넘버·영문 라벨 강조는 `--font-mono`(Geist Mono).
- 스케일(권장): `text-sm` 보조 → `text-base` 본문 → `text-lg/xl` 리드 → `text-3xl~5xl` 헤드라인.
- 제목은 `font-semibold`~`font-bold` + `tracking-tight`, 본문은 `leading-7`~`leading-8`.
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
