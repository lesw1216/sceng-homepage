# 작업 보고서: 에스씨엔지니어링 회사 홈페이지 구현

- 일시: 2026-08-20 21:18
- 브랜치: `feat/company-homepage`

## 작업 요청 요약
- 회사 소개서(PDF) 기반으로 회사소개·보유기술·사업영역·실적현황·Contact 구성
- 지도: 네이버 지도 **링크 이동** 방식(우선), API 미사용
- 진행하며 **주기적 커밋**

## 사전 계획
- 원페이지 스크롤 + 앵커 네비 구조
- 모든 콘텐츠는 `src/content` + async accessor로 구조화(하드코딩 금지 규칙 준수)
- 브랜드 7색 팔레트만 사용
- SEO: generateMetadata + JSON-LD + sitemap/robots
- 단계별 커밋

## 소개서에서 반영한 정보
- 회사: 에스씨엔지니어링(주) / SCEngineering, 대표 이구호
- 연락처: 032-710-3396 / 010-3907-0853 / ghlee@scengineering.co.kr
- 주소: 경기도 부천시 원미구 조마루로385번길 92, 부천테크노밸리 유1센터 907호
- 3대 사업(산업/빌딩/데이터센터), 보유기술(분석·설계/개발·제작/설치·시운전), 핵심가치, 주요생산품목, CEO 인사말

## 변경 파일 목록
### 데이터 레이어
- `src/lib/content/types.ts` — 도메인 타입 확장(CompanyInfo/Profile, TechPhase, BusinessArea 등)
- `src/content/company.ts`, `techSkills.ts`, `businessAreas.ts` — 소개서 데이터
- `src/content/achievements.ts` — 실적 데이터 없음 → **빈 배열 + TODO**(날조 방지)
- `src/lib/content/company.ts`, `techSkills.ts`, `businessAreas.ts` — async accessor
- `src/lib/accent.ts` — BrandAccent→Tailwind 정적 매핑

### 컴포넌트
- `src/components/ui/` — Container, Section, Button
- `src/components/layout/` — SiteHeader(모바일 메뉴), SiteFooter, navigation
- `src/components/sections/` — Hero, About, TechSkills, BusinessAreas, Achievements, Contact
- `src/components/seo/OrganizationJsonLd.tsx`

### 페이지·SEO
- `src/app/page.tsx` — accessor 로드 후 전 섹션 조립
- `src/app/layout.tsx` — generateMetadata(회사 accessor 기반)
- `src/app/sitemap.ts`, `src/app/robots.ts`
- `src/lib/site.ts` — SITE_URL, SITE_DESCRIPTION

## 커밋 이력 (feat/company-homepage)
1. chore: Claude 지침 체계 및 데이터 레이어 스캐폴드
2. feat: 회사 소개서 기반 콘텐츠 데이터 구조화
3. feat: 공통 UI/레이아웃 컴포넌트
4. feat: 홈 섹션 컴포넌트
5. feat: 홈 페이지 조립 및 SEO 마감

## 검증 결과
- `npm run lint`: 통과
- `npm run build`: 성공 — `/`, `/robots.txt`, `/sitemap.xml` 정적 생성
- 프로덕션 서버 렌더 확인:
  - `<title>` / description / canonical / og:title 정상
  - Organization JSON-LD 1건 삽입
  - h1 및 5개 섹션 앵커(#about/#tech/#business/#achievements/#contact) 존재
  - 네이버 지도 검색 링크 정상
  - robots.txt 정상 출력

## 알려진 제약 / 주의사항
- **실적현황**: 소개서에 프로젝트 실적 데이터가 없어 "준비 중" 빈 상태로 처리. 자료 수신 후 `src/content/achievements.ts`에 record로 채우면 됨.
- **도메인**: `SITE_URL`은 소개서의 www.scengineering.co.kr 사용. 실제 배포 도메인 확정 시 갱신.
- **OG 이미지**: 별도 이미지 에셋 없음(미설정). 로고/OG 이미지 제공 시 추가.
- **폰트**: Geist(latin) — 한글은 시스템 폰트 폴백. 한글 웹폰트 필요 시 별도 논의.
- **지도**: 링크 이동 방식. 임베드 지도(네이버/다음 API) 필요 시 별도 작업.

## Follow-up
- 실적 자료·회사 로고·OG 이미지 수신 후 반영
- 필요 시 실적 상세 페이지(`/achievements/[slug]`) + sitemap 동적 반영
- 배포 도메인 확정 후 `SITE_URL` 갱신
- 브랜치 병합(PR) 여부는 사용자 확인 필요
