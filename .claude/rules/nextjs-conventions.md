# Next.js 컨벤션 (App Router)

Next 16 App Router · React 19 · React Compiler 활성화 기준.

## 파일 규약 (`src/app`)
- `page.tsx` route UI, `layout.tsx` 공통 레이아웃, `loading.tsx` 로딩, `error.tsx` 에러 경계, `not-found.tsx` 404.
- route 세그먼트 = 폴더. 동적 route는 `[slug]`, catch-all은 `[...slug]`.
- 특수 파일: `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` 등은 `src/app` 루트에.

## Server / Client 경계
- **기본은 Server Component.** 데이터 패칭·SEO·정적 콘텐츠는 서버에서.
- `"use client"`는 상태·이벤트·브라우저 API가 필요한 **최소 단위 컴포넌트**에만 선언. 페이지 전체를 client로 만들지 않는다.
- client 컴포넌트는 되도록 leaf에 두고, 데이터는 서버에서 내려 props로 전달.
- React Compiler가 켜져 있으므로 수동 `useMemo`/`useCallback` 남발 금지(꼭 필요한 경우만).

## 데이터·캐싱
- 콘텐츠는 `src/lib/content/*` accessor로 조회(→ `data-layer.md`).
- 외부 `fetch`는 서버에서, 캐시 정책(`cache`, `next.revalidate`)을 의도적으로 지정.

## 디렉토리
```
src/
  app/            # route (App Router)
  components/     # 재사용 UI. ui/(원자) · sections/(페이지 섹션) 등으로 세분 가능
  lib/            # 유틸·데이터 접근 계층
  content/        # 원천 콘텐츠 데이터
```
- import는 `@/*` alias 사용(`@/lib/content/achievements`).

## 폰트·에셋·환경변수
- 폰트: `next/font`(현재 Geist). Korean 웹폰트 필요 시 별도 논의 후 `next/font/google`로 추가.
- 이미지: `public/` 정적 에셋 또는 `next/image`.
- 환경변수: 브라우저 노출 값만 `NEXT_PUBLIC_` 접두. 비밀은 서버 전용, 커밋 금지.

## 컴포넌트 신설 전
- `src/components`에 유사한 것이 있는지 먼저 확인하고 재사용/확장을 우선한다.
