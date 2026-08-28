# 2차 시안 · 회사 소개(About) 반영

작성: 2026-08-28 14:21 · 브랜치 `refactor/detail-second`
커밋: `3298a07`(로고 비율 버그 수정), `f8ea2aa`(회사소개 2차 시안)

## 작업 요청 요약

`.claude/docs/requirements/second-draft/README.md` → `01-about.md`
(파일명은 `03-about.md`로 안내돼 있었으나 실제 파일은 `01-about.md`) 반영.

1. 인사말 섹션 제목 아래 문구 교체, 인사말을 2열로 분리(좌: 인용구+로고 이미지 재현, 우: 기존 CEO 메시지), 서명 문구 변경
2. 회사 개요: 주요사업 제거, 회사명 영문 표기 추가, 주소·전화번호·홈페이지 추가
3. 주요 생산품목 섹션 제거

## 변경 전 발견한 별도 이슈

`public/sce-logo-ko.svg`의 viewBox가 이전 라운드(직전 세션)에서 `868×155` →
`1312×155`로 바뀌었는데, `SiteHeader`/`SiteFooter`의 `next/image`
`width`/`height`는 여전히 `868`로 고정돼 있어 로고가 가로로 눌려 보이는
상태였다. 이번 요구사항과 무관하지만 같은 자산을 다루는 김에 `3298a07`에서
1312로 맞춰 수정했다.

## 결정 사항

- **`public/sce-log-ko-l.svg`(오탈자) → `public/sce-logo-ko-l.svg`로 파일명 정정.**
  요구사항 문서가 지정한 경로(`/public/sce-logo-ko-l.svg`)와 다른 이름으로
  이미 저장돼 있던 파일을 그대로 이름만 맞춰 사용했다(내용 수정 없음).
- **회사명 영문 표기**: 요구사항 "회사 명 뒤에 `Systems and Controls
  Engineering`을 추가한다"를 기존 "회사명" 행(`{name} | {nameEn}`) 구조에
  맞춰 `nameEn` 값 자체를 `"SC ENGINEERING Co., Ltd"` →
  `"Systems and Controls Engineering"`으로 교체하는 것으로 해석했다.
  (별도 필드를 추가하지 않고 기존 필드 값 교체)
- **주소 표기**: 요구사항 문서 원문의 "조마루로385번갈"은 명백한 오탈자로
  보고 "조마루로385번길"로 교정해 반영했다. 우편번호(14558)는 새로 추가.
- **주요 생산품목 데이터**: `productGroups`는 컴포넌트에서만 제거하고
  `src/content/company.ts` / `src/lib/content/company.ts`의 데이터·접근자는
  남겨뒀다. 실제 제품 데이터이므로 화면 노출 요구사항과 별개로 임의 삭제하지
  않았다(추후 재사용 가능성 고려). `mainBusiness`도 동일한 이유로 데이터는
  유지하고 회사 개요 표에서만 제거했다(SEO JSON-LD `knowsAbout`에서 계속 사용 중).
- **인사말 인용구·로고 콘텐츠**: `data-layer.md` 원칙에 따라 컴포넌트에
  하드코딩하지 않고 `CompanyProfile`에 `aboutTagline` /
  `greetingQuoteLines` / `greetingHighlight` / `greetingClosing` 필드를
  추가해 `src/content/company.ts`에서 관리한다.

## 변경 파일

- `src/lib/content/types.ts` — `CompanyProfile`에 인사말·부제 필드 추가
- `src/content/company.ts` — `nameEn`/`contact.address`/`ceoSignature` 수정,
  `aboutTagline`/`greetingQuoteLines`/`greetingHighlight`/`greetingClosing` 추가
- `src/lib/content/company.ts` — accessor가 새 필드를 profile에 포함
- `src/components/sections/About.tsx` — 인사말 2열 레이아웃, 회사 개요 행
  구성 변경, 주요 생산품목 블록 제거
- `src/components/layout/SiteHeader.tsx`, `SiteFooter.tsx` — 로고 비율 버그 수정
- `public/sce-logo-ko-l.svg` — 신규(파일명 정정 후 커밋)

## 실행 명령어

```
npx tsc --noEmit
npm run lint
npm run build
```

## 검증 결과

- `npx tsc --noEmit` 에러 0 / `npm run lint` 에러 0 / `npm run build` 성공
- Playwright(headless Chromium, 로컬에 `libnspr4`/`libnss3`/`libasound2` 부재로
  `.deb`를 스크래치 디렉터리에 내려받아 압축 해제 후 `LD_LIBRARY_PATH`로 임시
  로드)로 개발 서버(`http://localhost:3000`)를 직접 구동해 확인:
  - `#about` 인사말이 2열(인용구+로고 / CEO 메시지)로 렌더링됨, 서명 문구 반영 확인
  - 회사 개요 표에 주소·전화번호·홈페이지 노출, 주요사업 행 없음
  - 핵심 가치 다음에 주요 생산품목 섹션이 더 이상 렌더되지 않음
  - 헤더·푸터 로고가 찌그러짐 없이 정상 비율로 표시됨
  - 콘솔 에러 0건

## 알려진 제약 · 주의사항

- `README.md`가 안내하는 파일명(`03-about.md`)과 실제 파일명(`01-about.md`)이
  다르다. 문서 정리가 필요하면 알려주기 바란다.
- 회사명 영문 표기 교체로 `"SC ENGINEERING Co., Ltd"` 값이 완전히 사라졌다.
  이 값이 별도로 필요하면(예: 법인 등기명) 알려주면 필드를 분리하겠다.
- 로고 이미지(`sce-logo-ko-l.svg`) 내용 자체는 검수하지 않았다(제공된 파일을
  경로만 맞춰 그대로 사용).
