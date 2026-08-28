# 2차 시안 · 실적현황(Achievements) 반영

작성: 2026-08-28 17:35 · 브랜치 `refactor/detail-second`
커밋: `a8ec451`(실적현황 실제 자료 반영), `9c466b3`(scroll-behavior 경고 해소)

## 작업 요청 요약

`.claude/docs/requirements/second-draft/04-projects.md` 반영. 세 번에 걸쳐
하단에 요구사항이 누적됐다.

1. 실제 실적 이미지 3장(배건/서울성모병원/엘리시안) 참고 → 이미지 비율 수정,
   가톨릭대·엘리시안 각 2건씩 나뉜 레코드를 1건으로 병합하고 첨부 이미지의
   상세 스펙으로 설명 재작성, 리스트의 "고객~위치" 라벨 색상(네이비·볼드)
2. 카드 아이템 목록 줄바꿈 방지(카드 폭·5열×2행 유지)
3. 실적현황 상세 탭을 실적 데이터에서 파생하지 않고 고정 enum으로 분리
   (실적 0건 분야도 탭 노출)

## 결정 사항

- **이미지 크롭 도구**: `identify`/`imagemagick`이 환경에 없어, 프로젝트에
  이미 있던 `sharp`로 Node 스크립트를 짜서 콜라주 이미지에서 개별 사진
  좌표를 추정 크롭 → 미리보기 → 좌표 보정을 반복해 추출했다.
- **가톨릭대 "2건 병합"**: 실제 데이터를 확인해보니 이미 `water-building-
  automation` 단일 레코드였다(2건으로 분리된 상태를 찾지 못함). 병합은
  이전 라운드에서 이미 끝난 것으로 보고, 첨부 이미지 표 내용으로 본문만
  다시 썼다. 엘리시안 강촌은 실제로 `water-automation`/`water-2-automation`
  2건이 있어 `water-automation`으로 병합하고 나머지를 삭제했다.
- **가톨릭대 이미지 품질**: 원본이 세로로 긴 저해상도 제어반 사진이라,
  16:10 캐로셀 프레임에서 확대되며 다소 흐릿하다. 더 고화질 원본이 있으면
  교체를 권장한다(보고서 하단 Follow-up 참고).
- **고객~위치 라벨**: 요구사항이 정확히 지칭한 위치는 리스트 카드
  (`AchievementsBrowser.tsx`)였지만, 실적 상세 페이지의 Project Info
  패널도 동일하게 저대비(`text-steel`)였어서 같이 네이비·볼드로 바꿨다.
- **카테고리 enum 도입**: `src/content/achievementCategories.ts`에
  `ACHIEVEMENT_CATEGORIES` 고정 목록을 선언하고, `getAchievementCategories()`
  는 실적 데이터가 아니라 이 목록을 그대로 반환하도록 변경했다. 각 실적
  레코드는 더 이상 `category` 문자열을 직접 갖지 않고 `areaKey`로 enum을
  조회해 파생한다(`AchievementSource`에서 `category` 제거,
  `Achievement`에 파생 필드로 유지) — "enum 값을 사용하여 저장"이라는
  요구사항 문구를 이렇게 해석했다.

## 변경 파일

- `src/content/achievements.ts` — 엘리시안 병합, 3건 요약·본문 재작성,
  `category` 필드 제거
- `src/content/achievementCategories.ts` — 신규, 상세 탭 고정 enum
- `src/lib/content/achievements.ts` — `category` 파생 로직,
  `getAchievementCategories()`를 고정 목록 반환으로 변경
- `src/lib/content/types.ts` — `AchievementSource`/`Achievement`에서
  `category` 위치 이동(원천 → 파생)
- `src/components/achievements/AchievementsBrowser.tsx` — 라벨 네이비·볼드,
  dd `truncate` 처리
- `src/app/achievements/[slug]/page.tsx` — Project Info 라벨 네이비·볼드
- `public/images/achievements/` — 크롭 재등록(최초로 git 추적됨, 아래 참고)
- `src/app/layout.tsx` — `data-scroll-behavior="smooth"` 추가(별도 발견
  이슈, scroll-behavior 콘솔 경고 해소)

## 실행 명령어

```
npx tsc --noEmit
npm run lint
npm run build
```

## 검증 결과

- `npx tsc --noEmit` 에러 0 / `npm run lint` 에러 0 / `npm run build` 성공
  (정적 페이지도 실제 실적 3건만 생성됨을 확인)
- Playwright(헤드리스 Chromium)로 리스트·상세 3개 페이지, "데이터센터
  인프라 솔루션" 빈 탭 클릭, 카드 말줄임 모두 스크린샷 확인. 콘솔 에러 0건.

## 알려진 제약 · 주의사항

- **`public/images/achievements/`가 이번에 처음 git에 커밋됐다.** 지금까지
  한 번도 추적되지 않은 상태였다 — 즉 이전 배포본에는 실적 사진이 저장소
  기준으로는 없었을 수 있다(서버에 수동으로 올려뒀을 가능성). 배포 파이프
  라인이 git 기준이라면 이번 커밋 전에는 실제로 이미지가 빠져 있었을 것
  이다.
- 가톨릭대 서울성모병원 제어반 사진은 원본 해상도가 낮아 상세 페이지
  캐로셀에서 다소 흐릿하다. 고화질 원본이 있으면 교체를 권장한다.
- README.md가 안내하는 파일명(`03-about.md`)과 실제 파일명(`01-about.md`)
  불일치는 이번에도 이어지고 있다(이전 라운드부터 반복 언급).

## Follow-up

- 가톨릭대 제어반 사진 고화질 원본 확보 시 교체
- `README.md`의 문서 번호·파일명 정리
