# 2차 시안 · 사업영역(BusinessTabs) 반영

작성: 2026-08-28 15:53 · 브랜치 `refactor/detail-second`
커밋: `40763a7`

## 작업 요청 요약

`.claude/docs/requirements/second-draft/03-business.md` 반영.

1. 탭 상세 영역 구조 개편: "1열 사진 + 2열 항목" → 보유기술 본문 3열 박스
   디자인 재사용(번호·그림자 숫자 제외)
2. 각 사업영역 공통 3단락(사업 분야 / 생산 품목 / 솔루션) 구성
3. 3개 사업영역(산업 자동화, 빌딩 자동화, 데이터센터 인프라 솔루션)의
   세부 내용을 전량 교체
4. 탭 hover(네이비, 좌→우 확장) / 활성(오렌지, 텍스트+밑줄) 상태 정의

## 결정 사항

- **세 번째 박스 이름**: 요구사항이 "사업 영역 별 솔루션"과 "솔루션" 사이
  고민 중이라고 명시. 다른 두 박스("사업 분야", "생산 품목")와 길이를 맞춰
  **"솔루션"**으로 확정했다.
- **탭 hover/활성 배색**: `design-system.md`는 "사업영역 탭: 활성 navy"로
  적혀 있지만, 이번 요구사항은 "활성 오렌지 + 오렌지 밑줄, hover 네이비
  밑줄"을 명시적으로 요구해 더 최신 문서를 따랐다(실적현황
  `AchievementsBrowser`의 `FilterButton`과 동일 패턴). `design-system.md`
  갱신이 필요하다.
- **괄호·슬래시 공백**: 요구사항 원문에 "공장 자동화시스템(FA)"(공백 없음)와
  "주 제어반 (PLC Panel)"(공백 있음)처럼 항목마다 표기가 들쭉날쭉했다.
  같은 문서 안에서도 "조명자동제어 (LCS)"/"조명자동제어(LCS)"처럼 동일
  항목이 다르게 적힌 경우도 있어 의도된 표기 차이가 아니라고 판단,
  사이트 기존 관례(괄호·슬래시 앞뒤 공백 없음, 예: `EPMS/DCIM`)로 전부
  통일했다.
- **이미지 제거**: 요구사항이 2열 구조(사진+목록) 자체를 3열 박스로
  대체하라고 명시해 사진을 완전히 뺐다. `lib/images.ts`의
  `businessAreaImage`는 다른 곳에서 쓰지 않지만 실제 자산 경로 데이터라
  삭제하지 않고 남겨뒀다(회사소개 라운드의 `productGroups`와 동일한 판단).

## 변경 파일

- `src/lib/content/types.ts` — `BusinessArea.items` → `businessFields` /
  `productItems` / `solutions`로 분리
- `src/content/businessAreas.ts` — 3개 사업영역 세부 내용 전면 교체
- `src/components/sections/BusinessTabs.tsx` — 2열(사진+목록) 구조 제거,
  3열 박스(보유기술 재사용, 번호 제외) 도입, 탭 hover/활성 배색 변경
- `.claude/docs/requirements/second-draft/03-business.md` — 신규 요구사항 문서

## 실행 명령어

```
npx tsc --noEmit
npm run lint
npm run build
```

## 검증 결과

- `npx tsc --noEmit` 에러 0 / `npm run lint` 에러 0 / `npm run build` 성공
- Playwright(헤드리스 Chromium)로 `#business` 섹션을 3개 탭 모두 클릭해
  확인: 탭별 3열 박스 내용, 활성 오렌지/hover 네이비 밑줄 애니메이션,
  번호·그림자 숫자 미노출 확인. 콘솔 에러 0건.

## 알려진 제약 · 주의사항

- `design-system.md`의 "사업영역 탭: 활성 navy" 규정이 이번 반영과
  어긋난다. 실적현황 필터와 마찬가지로 오렌지-활성/네이비-hover 규정으로
  정리가 필요하다(직전 보유기술 라운드까지 누적된 것과 별개 항목).
- `businessAreaImage`(사업영역 대표 사진 경로)는 현재 어디서도 쓰이지
  않는다. 완전히 불필요하면 알려주면 삭제하겠다.
