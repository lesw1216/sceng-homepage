# 코드 스타일 규칙

## TypeScript
- `strict` 준수. `any` 지양, 불가피하면 이유 주석.
- 컴포넌트 props는 명시적 `interface`/`type`로 선언. export되는 함수의 반환 타입은 명시.
- import 경로는 `@/*` alias 사용(상대경로 `../../` 지양).

## React 컴포넌트
- 함수 컴포넌트 + 화살표/선언 함수 일관되게(기존 파일 컨벤션 우선).
- 파일당 하나의 주요 컴포넌트, 파일명은 컴포넌트명과 일치(PascalCase).
- 조건부 className은 명확하게 조합(템플릿 리터럴 또는 배열 `.join(" ")`). 유틸 없이 시작하고, 복잡해지면 도입을 별도 논의.

## 네이밍
- 의도가 드러나는 이름. `data`, `result`, `temp`, `handler` 같은 무내용 이름 금지.
- 이벤트 핸들러 `handleX`, boolean `isX`/`hasX`, accessor `getX`.
- 상수 `UPPER_SNAKE_CASE`, 그 외 `camelCase`, 타입/컴포넌트 `PascalCase`.

## import 순서
1. 외부 라이브러리 (`react`, `next/*`)
2. 내부 절대경로 (`@/lib`, `@/components`)
3. 상대경로 · 타입 · 스타일

## 주석
- "무엇을 한다"의 동어반복 금지. **"왜"**만 남긴다(비자명한 결정, 제약, TODO).
- 디버깅용 `console.log`는 커밋 전 제거.

## 스타일링
- Tailwind 유틸리티 우선. 색은 `design-system.md`의 7색 토큰만.
- 인라인 `style`은 동적 계산이 불가피할 때만.

## 품질 게이트
- 커밋/PR 전 `npm run lint` 통과. `npm run build` 타입 에러 0.
- 라이브러리 추가는 반드시 사전 논의(현재 의존성으로 해결 가능한지 먼저 확인).
