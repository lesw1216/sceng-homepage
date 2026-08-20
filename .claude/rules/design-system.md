# 디자인 시스템 규칙

## 색상 팔레트 (Single Source of Truth)

브랜드 2색 + 보조 5색 = **총 7색만 사용한다. 이 외 임의 색상 도입 금지.**
색은 `src/app/globals.css`의 `@theme`에 `--color-*` 토큰으로 정의되어 Tailwind 유틸리티로 노출된다.

| 토큰 | HEX | Tailwind 예 | 용도 |
|------|-----|-------------|------|
| `navy` | `#001B3D` | `bg-navy` `text-navy` | 브랜드 primary. 헤더/푸터, 주요 텍스트 |
| `orange` | `#F26C21` | `bg-orange` `text-orange` | 브랜드 accent. CTA, 강조, 링크 hover |
| `navy-700` | `#0B2E52` | `bg-navy-700` | navy 위 계층 surface, hover |
| `steel` | `#5B7185` | `text-steel` `border-steel` | muted 텍스트, border, 보조 라벨 |
| `mist` | `#EEF2F6` | `bg-mist` | 밝은 섹션 배경 |
| `sand` | `#FCEEE3` | `bg-sand` | orange 계열 따뜻한 tint 배경 |
| `ink` | `#0F1A28` | `text-ink` | 본문 기본 텍스트 |

### 파생 규칙
- 명암·상태(hover/disabled/overlay)는 **새 색을 만들지 말고** Tailwind opacity로 파생: `bg-navy/90`, `text-ink/60`, `border-steel/30`.
- 그라디언트가 필요하면 위 토큰 조합만 사용.

## 접근성 (필수 체크)
- 오렌지(`#F26C21`) 위 텍스트는 **흰색**을 쓰고 대비를 확인한다(작은 본문 텍스트는 대비 부족 가능 → 큰 텍스트/버튼 라벨에 한정, 필요 시 `navy` 텍스트).
- navy/ink 배경 위에는 흰색 또는 `mist` 텍스트.
- 본문 최소 크기 16px, 대비 WCAG AA(4.5:1) 이상.
- 색만으로 정보를 전달하지 않는다(아이콘/텍스트 병행).

## 타이포그래피
- 폰트: `--font-sans`(Geist) 기본. 코드/수치 강조는 `--font-mono`.
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
