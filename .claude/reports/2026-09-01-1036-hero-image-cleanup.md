# Hero 이미지 네이밍 정리 + 미사용 이미지 파악

작성: 2026-09-01 10:36 · 브랜치 `refactor/detail-second`
커밋: (미진행 — 사용자 확인 대기)

## 작업 요청 요약

`public/images/hero/`에 새로 추가한 사진 3장(공백·한글 파일명, 규칙 없음)의
네이밍을 정리하고, `src/lib/images.ts`(현재 존재하지 않는 옛 경로를 가리켜
빌드가 깨진 상태였음)를 맞춰 수정. 더불어 프로젝트 전체에서 미사용
이미지를 찾아 보고(삭제는 하지 않음).

## 변경 파일

- `public/images/hero/` — 3개 파일명 변경(내용 무변경):
  - `관제시스템_리조트_OVERVIEW.webp` → `01-resort-control-system.webp`
  - `배건하이텍 6공장 사진.webp` → `02-baegeon-hitech-factory.webp`
  - `울산ECC.webp` → `03-ulsan-tire-warehouse.webp`
- `src/lib/images.ts` — `heroSlides` 경로를 새 파일명으로 갱신, alt 텍스트를
  실제 사진 내용에 맞게 교체.

## 검증

```
npx tsc --noEmit   # 에러 0
npm run lint       # 에러 0
npm run build      # 성공
```

`next start` + Playwright(1280px, 390px)로 홈 Hero 캐러셀 3장 모두 콘솔
에러 없이 정상 렌더링, `heroSlides` 3개 경로가 실제 next/image 요청 URL과
일치함을 확인.

## 확인 필요 — 데스크톱 1번 슬라이드 텍스트 가독성

1번 슬라이드(리조트 관제시스템 SCADA 화면)는 데스크톱(1280px) 뷰포트에서
헤드라인 텍스트가 걸치는 위치에 밝은 흰색 UI 카드가 있어, 현재 `.text-on-photo`
(그림자만 적용, 그라디언트 오버레이 없음)만으로는 **대비가 약하게 나옵니다.**
모바일(390px)에서는 크롭 위치가 달라져 상대적으로 괜찮았습니다. 스크린샷으로
직접 확인하시고, 필요하면 다음 중 선택해 알려주세요.
- 그대로 둔다
- 해당 슬라이드에만 어두운 오버레이(navy 그라디언트) 추가
- 사진 자체를 다른 크롭/사진으로 교체

## 미사용 이미지 목록 (삭제 안 함, 확인 후 별도 요청 시 진행)

`public/images/**` 전체 파일과 `src/` 활성(비주석) 코드의 `/images/...`
참조를 대조한 결과, 아래는 어떤 활성 코드에서도 참조되지 않습니다.

| 파일 | 비고 |
|---|---|
| `public/images/ach-electrical.jpg` | 마이그레이션 이전 실적 임시 스톡 사진. `achievements.ts`의 **주석 처리된** 옛 목록에서만 등장 |
| `public/images/ach-machine.jpg` | 위와 동일 |
| `public/images/ach-plant.jpg` | 위와 동일 |
| `public/images/hero-automation.jpg` | 마이그레이션 이전 Hero 임시 스톡 사진(현재 `hero/` 폴더 밖, `public/images/` 루트). 마찬가지로 주석에서만 등장 |
| `public/images/achievements/industry/A002/관제시스템_리조트_OVERVIEW.webp` | `achievements.ts:608`의 `images` 배열에 `관제시스템_골프장_OVERVIEW.webp`가 중복 기재되어 실제로는 이 파일이 안 쓰임(배열 오타로 보임). **사용자 확인: 이번 라운드에서는 배열 수정 안 함.** |

## 참고

- `public/images/hero/02-baegeon-hitech-factory.webp` 좌하단에 "AI로 생성한
  콘텐츠" 워터마크가 있습니다(스크린샷 크롭 위치상 Hero에서는 안 보이지만
  원본 파일에는 남아있음). 이번 라운드 범위 밖이라 손대지 않았고 참고로만
  남깁니다.
