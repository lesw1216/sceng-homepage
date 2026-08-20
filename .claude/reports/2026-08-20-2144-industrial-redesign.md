# 작업 보고서: 라이트 인더스트리얼 디자인 개편

- 일시: 2026-08-20 21:44
- 브랜치: `feat/design-industrial` (← `feat/company-homepage`에서 분기)

## 작업 요청 요약
- 네이비/오렌지 2색만으로는 밋밋 → 두 색 유지 + 제조업과 어울리는 색 재조합
- 양옆 마진/패딩이 과함 → 축소
- 전반적으로 가시성이 없음 → 제조업에서 두드러지는 형태로 개편
- 별도 브랜치에서 진행

## 결정 사항 (사용자 확인)
- 무드: **라이트 인더스트리얼** (밝은 베이스 + 다크 섹션 교차 + 오렌지 강조)

## 변경 내용
### 팔레트 확장 (globals.css `@theme`, design-system.md)
- 추가: `graphite #14181F`(다크 표면), `amber #F5A623`(수치·하이라이트), `concrete #E9EDF1`(밝은 베이스)
- 조정: `steel #64748B`, `ink #12161C`
- 유지: `navy #001B3D`, `navy-700`, `orange #F26C21` → 총 8색

### 레이아웃 폭/여백
- `Container` max-w `6xl(1152px) → 1440px`, 좌우 여백 축소로 콘텐츠 폭 확대

### 가시성 강화
- 본문 텍스트 `ink/70 → ink/80~85`, 제목 굵기 `font-extrabold`
- 카드 `border-2 border-ink/10` + 각진(`rounded-sm`) 형태, hover 시 오렌지 보더

### 인더스트리얼 스타일
- `Section`에 `index`(01~05) + `tone`(light/concrete/navy/graphite) 추가, 모노 라벨 + 오렌지 세로 바
- 다크/라이트 교차: Hero(graphite) → About(white) → Tech(concrete) → Business(white) → Achievements(concrete) → Contact(navy)
- Hero: 다크 graphite + 그리드 패턴 + 오렌지 글로우 + 3대 사업 넘버 스트립
- 카드: 상단/좌측 컬러바, 넘버, 모노 영문 라벨
- 헤더/푸터 graphite 톤, 각진 로고

### 변경 파일
- `src/app/globals.css`, `.claude/rules/design-system.md`
- `src/lib/accent.ts`, `src/lib/content/types.ts`(BrandAccent 확장), `src/content/{businessAreas,techSkills}.ts`(accent 값)
- `src/components/ui/{Container,Section,Button}.tsx`
- `src/components/sections/{Hero,About,TechSkills,BusinessAreas,Achievements,Contact}.tsx`
- `src/components/layout/{SiteHeader,SiteFooter}.tsx`

## 검증 결과
- `npm run lint`: 통과
- `npm run build`: 성공 (`/`, `/robots.txt`, `/sitemap.xml`)
- 프로덕션 렌더 확인: graphite/concrete/navy 톤 교차, 섹션 넘버 01~05, `max-w-[1440px]`, 굵은 Hero(h1 text-6xl extrabold), amber 강조 모두 반영

## 주의 / Follow-up
- BrandAccent에서 `navy-700` 제거하고 `graphite`/`amber` 추가 → 데이터 accent 값도 갱신함
- 실제 브라우저 육안 확인 권장: `npm run dev` 후 http://localhost:3000
- 로고/OG 이미지, 실적 데이터, 배포 도메인은 이전 보고서 follow-up과 동일
- `feat/company-homepage`(구 디자인)와 `feat/design-industrial`(신 디자인) 두 버전 공존 → 채택본 병합은 사용자 결정
