# 2차 시안 · 전역 요구사항(마우스 드래그 방지) 반영

작성: 2026-08-31 09:09 · 브랜치 `refactor/detail-second`
커밋: (미진행 — 사용자 확인 대기)

## 작업 요청 요약

`.claude/docs/requirements/second-draft/README.md`에 신규 문서
`00-global.md`(전역 요구사항)가 추가됐다. 내용은 한 줄:

> 마우스 드래그 할 수 없도록 수정

## 해석 및 결정 사항

문구가 짧아 범위를 다음과 같이 판단했다.

- "마우스 드래그"는 두 가지 브라우저 동작을 포함한다고 해석했다.
  1. 마우스로 끌어 **텍스트를 드래그 선택**하는 것
  2. **이미지/링크를 드래그**해서 다른 창·바탕화면으로 끌어내는 것(HTML5
     네이티브 drag)
- 전역 요구사항이므로 사이트 전체(`html`)에 적용하되, **폼 컨트롤
  (`input`/`textarea`)은 예외**로 뒀다. 검색창 등에서 값 입력·수정·복사가
  막히면 접근성/사용성 문제가 되므로, 요구사항의 의도(콘텐츠 보호·오조작
  방지)를 벗어난다고 판단했다.
- 이미지 드래그 차단은 CSS(`-webkit-user-drag: none`)만으로는 Chrome/Safari
  계열에만 적용되고 Firefox에는 효과가 없어, `dragstart` 이벤트를
  `preventDefault`하는 전역 리스너를 별도 클라이언트 컴포넌트로 추가해
  브라우저 전반에서 동작하도록 했다.
- 실적 상세 캐로셀(`AchievementGallery`)·필터 탭 등 기존 인터랙션은 버튼
  클릭 기반이고 네이티브 HTML5 drag API에 의존하지 않아 이번 변경과
  충돌하지 않음을 코드로 확인했다.

## 변경 파일

- `src/app/globals.css` — `html`에 `user-select: none` 전역 적용,
  `input`/`textarea`는 `user-select: text`로 예외 처리, `img`/`a`에
  `-webkit-user-drag: none` 추가
- `src/components/layout/PreventDrag.tsx` — 신규. `dragstart`를
  `preventDefault`하는 순수 이펙트 전용 클라이언트 컴포넌트(렌더 결과 없음)
- `src/app/layout.tsx` — `PreventDrag`를 `body` 최상단에 마운트

## 실행 명령어 및 검증 결과

```
npx tsc --noEmit   # 에러 0
npm run lint       # 에러 0
npm run build      # 성공, 정적 페이지 9개 정상 생성
```

`npm run build` 산출물로 `next start`를 띄워 홈(`/`)과 실적 상세
(`/achievements/water-automation`) 모두 200 응답을 확인했다.

**주의**: 이번 변경은 시각적 요소가 없는 순수 동작(behavior) 변경이라,
이전 라운드들과 달리 Playwright 스크린샷 검증은 생략했다(레이아웃 변경이
없어 스크린샷으로 확인할 대상이 없음). 대신 코드 리뷰로 기존 캐로셀·필터
등 마우스 인터랙션과의 충돌 여부를 확인했다.

## 알려진 제약

- `user-select: none`을 전역 적용하면 사용자가 본문 텍스트(주소·전화번호
  등)를 마우스로 선택해 복사할 수 없게 된다. 요구사항을 문구 그대로
  해석한 결과이며, 만약 "이미지만 보호하고 텍스트 복사는 허용" 쪽이
  의도였다면 범위를 좁혀야 한다. 확인 부탁드립니다.
- README.md의 문서 링크(`1. 회사 소개 → ./03-about.md`)가 실제 파일명
  (`01-about.md`)과 여전히 불일치한다(이전 라운드부터 반복 언급).

## Follow-up

- 텍스트 선택 차단 범위에 대한 사용자 확인
- README.md 문서 번호·파일명 정리
