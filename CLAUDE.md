# SC Engineering Homepage

제조업 회사 홈페이지. 회사 소개·제품/서비스·실적을 소개하고 문의로 연결하는 것이 목표.
검색엔진 최적화(SEO)를 최우선 품질 기준으로 개발한다.

> 회사명·상세 사실은 소개 자료 수신 전까지 placeholder(`SC Engineering`) + `TODO`로 둔다.

## 기술 스택
- Next.js 16 (App Router, `src/app`) · React 19 · React Compiler on
- TypeScript (strict) · Tailwind CSS v4 (CSS-first `@theme`)
- import alias: `@/*` → `src/*`

## 명령어
- `npm run dev` — 개발 서버
- `npm run build` — 프로덕션 빌드(타입 체크 포함)
- `npm run lint` — ESLint (next core-web-vitals + typescript)

## 작업 전 반드시 확인
- **색상**: 정해진 7색 토큰만. 임의 색 추가 금지 → `@.claude/rules/design-system.md`
- **콘텐츠 데이터**: 하드코딩 금지, accessor 경유 → `@.claude/rules/data-layer.md`
- **SEO**: 페이지 추가 시 메타데이터·canonical·구조화 데이터 점검 → `@.claude/rules/seo.md`
- **라이브러리 추가**: 사전 논의. 기존 의존성으로 해결 가능한지 먼저 확인.
- **컴포넌트/파일 신설 전**: 유사한 것이 있는지 먼저 확인하고 재사용 우선.

## 규칙 문서
@.claude/rules/design-system.md
@.claude/rules/seo.md
@.claude/rules/data-layer.md
@.claude/rules/nextjs-conventions.md
@.claude/rules/code-style.md
