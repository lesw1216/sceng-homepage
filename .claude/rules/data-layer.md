# 데이터 레이어 규칙 (하드코딩 금지)

콘텐츠(실적, 제품, 뉴스, 회사정보 등)를 컴포넌트에 **하드코딩하지 않는다.**
게시글 성격의 데이터는 **record 단위 객체**로 구조화하고, **async 접근 계층**을 통해서만 소비한다.
목적: 나중에 백엔드/CMS가 붙어도 호출부 변경 없이 접근 계층 내부만 교체(기술부채 최소화).

## 디렉토리 구조
```
src/
  content/                 # 원천 데이터 (typed as const 배열) — "DB의 로컬 대역"
    achievements.ts
  lib/
    content/
      types.ts             # 도메인 타입 (ContentRecord, Achievement, Metric ...)
      achievements.ts      # accessor: getAchievements(), getAchievementBySlug()
```

## 규칙
1. **직접 import 금지**: 컴포넌트/페이지는 `src/content/*`를 직접 import하지 않는다. 항상 `src/lib/content/*`의 accessor를 경유한다.
2. **타입은 ContentRecord를 확장**: 게시글형 데이터는 `slug`·`title`·`date`·`summary`·`body` 공통 필드를 가진 `ContentRecord`를 확장한다. `slug`는 고유(URL 키).
3. **accessor는 async**: 지금 로컬 데이터를 동기로 반환해도 시그니처는 `Promise`로 고정한다. (API 전환 대비)
   - 목록: `getX(): Promise<X[]>`
   - 단건: `getXBySlug(slug): Promise<X | null>`
4. **호출은 서버에서**: accessor는 Server Component / `generateMetadata` / `sitemap.ts`에서 `await`로 호출한다.

## 새 콘텐츠 도메인 추가 절차
1. `src/lib/content/types.ts`에 `ContentRecord`를 확장한 타입 추가.
2. `src/content/<domain>.ts`에 typed 데이터 배열 작성.
3. `src/lib/content/<domain>.ts`에 async accessor 작성.
4. 페이지/컴포넌트는 accessor만 사용.

## 백엔드 전환 시
- accessor **함수 본문만** `fetch(process.env.NEXT_PUBLIC_API_URL + ...)`로 교체.
- 반환 타입(도메인 타입)과 함수 시그니처는 유지 → 호출부·컴포넌트 무변경.
- 응답 형태가 도메인 타입과 다르면 accessor 내부에서 매핑.
