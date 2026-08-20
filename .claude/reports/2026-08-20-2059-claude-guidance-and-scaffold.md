# 작업 보고서: Claude 지침 체계 + 브랜드 팔레트/SEO + 데이터 레이어

- 일시: 2026-08-20 20:59
- 브랜치: main

## 작업 요청 요약
- Next.js 프로젝트에 Claude Code용 지침 파일 생성 (best practice에 맞게)
- 범용 내용은 `CLAUDE.md`, 세부 규칙은 별도 rules 파일로 분리
- 브랜드 2색(`#001B3D`, `#F26C21`) + 조화되는 보조 색상 최대 5색으로 팔레트 구성
- Tailwind 기반 디자인, 제조업 회사 홈페이지, SEO 최우선
- (대화 중 추가) 콘텐츠 데이터 하드코딩 금지 → record 단위 구조화 + 백엔드 대비 접근 계층

## 사전 계획
- CLAUDE.md는 간결하게, `@import`로 주제별 규칙 문서 연결 (Claude Code 방식)
- 규칙 문서 5종: design-system / seo / data-layer / nextjs-conventions / code-style
- 팔레트: 브랜드 2색 + 산업형 웜-쿨 보조 5색 (총 7색), globals.css `@theme` 토큰화
- 데이터: TypeScript typed 모듈 + async accessor로 추상화, 스캐폴드 1건(achievements)
- layout.tsx 템플릿 metadata를 실제 기본 SEO 세트로 교체

## 변경 파일 목록
### 신규 — 지침
- `CLAUDE.md` — 프로젝트 개요, 스택, 명령어, 작업 전 확인 원칙, 규칙 `@import`
- `.claude/rules/design-system.md` — 7색 팔레트 표·Tailwind 토큰·접근성·타이포·레이아웃
- `.claude/rules/seo.md` — Metadata API, JSON-LD, sitemap/robots, CWV, 페이지 체크리스트
- `.claude/rules/data-layer.md` — record 구조·async accessor·직접 import 금지·백엔드 전환 절차
- `.claude/rules/nextjs-conventions.md` — App Router 규약, Server/Client 경계, 디렉토리
- `.claude/rules/code-style.md` — TS/네이밍/import/주석/품질 게이트

### 신규 — 데이터 레이어 스캐폴드
- `src/lib/content/types.ts` — `ContentRecord`, `Metric`, `Achievement`
- `src/content/achievements.ts` — placeholder 더미 record 2건 (`as const` 배열) + TODO
- `src/lib/content/achievements.ts` — `getAchievements()`, `getAchievementBySlug()` async accessor

### 수정 — 코드 반영
- `src/app/globals.css` — `@theme`에 브랜드 7색 `--color-*` 토큰 추가, light-first, body 폰트 정리 (템플릿 dark-mode 오버라이드 제거)
- `src/app/layout.tsx` — 템플릿 metadata를 기본 SEO 세트로 교체(metadataBase, title template, description, canonical, robots, openGraph), `lang="ko"`

## 실행 명령어
- `npm run lint`
- `npm run build`

## 검증 결과
- `npm run lint`: 통과 (경고/에러 없음)
- `npm run build`: 성공 — TypeScript 체크 통과, `/` 정적 프리렌더 정상

## 알려진 제약 / 주의사항
- 회사명·도메인·문구·실적 데이터는 모두 **placeholder + TODO**. 소개 자료 수신 후 확정 필요.
- `layout.tsx`의 `siteUrl`은 임시 도메인. 실제 도메인으로 교체 필요.
- Geist 폰트는 latin subset — 한글은 시스템 폰트로 폴백. 한글 웹폰트 필요 시 별도 논의.
- 다크모드는 의도적으로 제외(light-first). 필요 시 추후 도입.
- 색 대비: 오렌지 위 흰 텍스트는 소형 본문에서 WCAG AA 미달 가능 → 버튼/대형 텍스트에 한정(규칙 문서에 명시).

## Follow-up
- 회사 소개 자료 링크 수신 → `achievements.ts`, layout metadata, JSON-LD 확정
- `sitemap.ts` / `robots.ts` 추가 (페이지 구현 시)
- 실제 페이지·컴포넌트 구현 (데이터는 accessor 경유)
- 백엔드 추가 시 accessor 내부만 `fetch`로 교체
