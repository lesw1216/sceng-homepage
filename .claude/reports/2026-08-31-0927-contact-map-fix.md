# Contact 섹션 구글 지도 embed 오류 수정

작성: 2026-08-31 09:27 · 브랜치 `refactor/detail-second`
커밋: (미진행 — 사용자 확인 대기)

## 문제

사용자가 `src/components/sections/Contact.tsx`에 구글 지도 iframe embed
코드를 브라우저에서 복사한 raw HTML 그대로 붙여넣어 타입 에러가 발생했다.

```
src/components/sections/Contact.tsx(65,237): error TS2559:
Type 'string' has no properties in common with type
'Properties<string | number, string & {}>'.
```

**원인**: JSX의 `style` 속성은 HTML과 달리 CSS 문자열(`"border:0;"`)이
아니라 JS 객체(`{ border: 0 }`)를 받는다. 붙여넣은 raw HTML은 브라우저
DevTools의 "Copy outerHTML" 같은 곳에서 그대로 가져온 표준 HTML 문법이라
JSX 문법과 맞지 않았다. 그 외에도 `allowfullscreen=""`,
`referrerpolicy="..."`는 JSX 표준 카멜케이스(`allowFullScreen`,
`referrerPolicy`)가 아니었다(이쪽은 tsc가 에러로 잡지는 않았지만 정정).

## 처리

단순히 `Contact.tsx`의 JSX 문법만 고치는 대신, 옆에 이미 있던
`CompanyMap.tsx`(지도 API 연동 전 placeholder + "네이버 지도에서 보기"
버튼, "연동 시 이 컴포넌트 내부만 교체" TODO 주석 포함)의 placeholder
자리로 구글 지도 embed를 옮겨 넣었다. 사용자 확인 결과 네이버 지도 버튼은
구글 지도 아래에 그대로 유지한다.

- `src/components/sections/CompanyMap.tsx` — "준비 중" placeholder
  `<div>`를 제거하고 그 자리에 구글 지도 `<iframe>`을 올바른 JSX 속성으로
  렌더링(`style` → `className="h-[320px] w-full border-0"`로 전환해
  반응형 처리, `allowFullScreen`, `referrerPolicy`, 접근성을 위한
  `title={"${address} 위치 지도"}` 추가). 네이버 버튼은 그대로 유지.
- `src/components/sections/Contact.tsx` — 중복으로 남아있던 raw
  `<iframe>` 삭제. 지도는 `<CompanyMap>` 컴포넌트 하나로만 렌더링.

## 검증

```
npx tsc --noEmit   # 에러 0
npm run lint       # 에러 0
npm run build      # 성공
```

`next start`로 프로덕션 빌드를 띄우고 Playwright(헤드리스 Chromium)로
`/#contact` 확인: 콘솔 에러 0건, 지도 iframe 정확히 1개(중복 없음), 네이버
버튼 노출 확인. 데스크톱(1280px)·모바일(390px) 스크린샷으로 지도가 컨테이너
폭에 맞게 반응형으로 렌더링되고 레이아웃 깨짐이 없음을 확인.

## 참고

- 프로젝트 규칙(`design-system.md`)상 임의 px 대신 Tailwind 반응형 클래스를
  쓰는 게 맞아, 원본 embed의 고정 `width={600} height={450}` 대신
  `w-full`로 전환했다.
