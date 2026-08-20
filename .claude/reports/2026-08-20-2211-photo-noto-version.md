# 작업 보고서: 사진 기반 + Noto Sans KR 디자인 버전

- 일시: 2026-08-20 22:11
- 브랜치: `feat/design-photo` (← `feat/design-industrial`에서 분기)

## 작업 요청 요약
- Hero 배경에 산업 자동화 실사진(무료 저작권) 적용
- 각 사업분야에 어울리는 사진 적용
- 서체 Noto Sans KR 적용
- UI가 "AI 같은" 느낌이 나지 않게
- 네이비/오렌지 배경이 칙칙 → 더 밝게

## 반영 내용
### 사진 (실사진 자체 호스팅)
- 출처: Unsplash (상업적 사용·출처표기 불필요 라이선스)
- `public/images/`에 다운로드 후 `next/image`로 최적화 렌더 (총 1.2MB)
  - `hero-automation.jpg` — 오렌지 로봇 팔 자동화 라인(브랜드색 매칭) → Hero 배경
  - `business-industry.jpg` — 로봇 팔 → 산업 자동화 카드
  - `business-building.jpg` — 솔라 패널 빌딩 외벽 → 빌딩 자동화 카드
  - `business-datacenter.jpg` — 서버 케이블/랙 → 데이터센터 카드
- 다운로드한 4장 모두 육안 확인 후 채택
- Hero/카드 사진 위에 navy 그라디언트 오버레이로 텍스트 대비 확보, `alt` 부여

### 서체
- 본문 기본 서체를 **Noto Sans KR**로 교체 (`next/font/google`, self-host → 방문자 전원 동일 적용)
- 넘버·영문 라벨은 Geist Mono 유지(인더스트리얼 라벨감)
- 참고: 로컬 설치 폰트는 방문자에게 적용되지 않으므로 웹폰트로 self-host 처리

### 톤 밝게 / "AI틱" 제거
- Hero의 graphite 그리드 패턴 + 오렌지 글로우 blur 제거 → 실사진으로 대체
- 핵심가치 카드: 다크 navy → concrete 라이트 카드
- Contact 섹션: navy 다크 → 라이트(white) 톤
- 섹션 톤 교차 유지(About white → Tech concrete → Business white → Achievements concrete → Contact white)

### 변경 파일
- `src/app/layout.tsx`(Noto 폰트), `src/app/globals.css`(--font-sans)
- `src/components/sections/Hero.tsx`(사진 배경), `BusinessAreas.tsx`(카드 사진), `About.tsx`(핵심가치 라이트), `Contact.tsx`(라이트)
- `public/images/*.jpg` (신규 4장)
- `.claude/rules/design-system.md`(사진·폰트 규칙)

## 검증 결과
- `npm run lint`: 통과
- `npm run build`: 성공 (`/`, `/robots.txt`, `/sitemap.xml`)
- 프로덕션 렌더 확인:
  - Noto Sans KR 폰트 파일 로드
  - Hero 및 3개 사업 사진 렌더, 이미지 최적화(`/_next/image`) 200
  - 정적 이미지 200, hero alt 존재

## 주의 / Follow-up
- 이미지 라이선스: Unsplash 무료 라이선스(상업적 사용 가능). 필요 시 실제 회사 현장 사진으로 교체 권장(신뢰도↑).
- 실제 브라우저 육안 확인 권장: `npm run dev` → http://localhost:3000
- 사진은 임의 선정본 → 마음에 드는 컷으로 교체 가능(파일명 유지 시 코드 변경 불필요)
- 브랜치 3종 공존: `feat/company-homepage`(초기) / `feat/design-industrial`(다크 인더스트리얼) / `feat/design-photo`(사진+Noto). 채택본 병합은 사용자 결정

## 백그라운드 서버 참고
- 이 세션에서 프로덕션 서버를 여러 번 기동/종료함. 남은 프로세스 없음(`next-server` 종료 확인).
