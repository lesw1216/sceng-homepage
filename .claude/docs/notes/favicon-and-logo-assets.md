# 로고·파비콘 에셋 처리 기록

`refactor/detail-first` 브랜치에서 로고를 `sce-logo-ko.svg`로, 파비콘을 `sce-symbol.svg`로 교체하면서
확인이 필요했던 항목과 그 판단 근거를 남긴다. (관련 요구사항: `first-draft/00-global.md` §2.3, `first-draft/01-header.md`)

## 1. SVG를 `next/image`로 렌더할 때 `unoptimized`가 필요한 이유

`next/image`는 기본적으로 `/_next/image?url=...&w=...&q=...` 엔드포인트로 이미지를 보내 리사이즈·WebP 변환을 한다.
Next는 **SVG를 이 경로에 태우는 것을 기본 차단**한다(`images.dangerouslyAllowSVG`가 기본 `false`).

```
curl "/_next/image?url=%2Fsce-logo-ko.svg&w=384&q=75"  → 400
```

차단 사유는 보안이다. SVG는 `<script>`·`foreignObject`를 포함할 수 있는 실행 가능한 문서이므로,
최적화 경로를 열어두면 **서비스 origin에서 임의 SVG가 서빙**될 수 있다.
지금은 자체 에셋만 다루지만, 나중에 사용자 업로드 이미지를 같은 컴포넌트에 물리면 그대로 stored XSS가 된다.
옵션 이름에 `dangerously`가 붙은 이유다.

### 결론: `unoptimized` 유지
- 벡터라서 리사이즈·포맷 변환 이득이 없다(`srcset`도 무의미).
- `width`/`height`를 명시했으므로 CLS 없음.
- 파일 14.5KB(gzip 수 KB).
- 유일한 차이는 캐시 헤더를 최적화 엔드포인트가 아닌 `/public` 정적 서빙 규칙(호스팅·CDN 설정)에 맡긴다는 점.
  장기 캐시가 필요하면 `next.config.ts`의 `headers()`로 해당 경로에만 지정한다.
- `dangerouslyAllowSVG`를 켜는 선택지는 **얻는 것이 없고 보안만 잃으므로 채택하지 않는다.**

## 2. `/favicon.ico` — 왜 필요하고 어디에 두는가

`<link rel="icon">`이 없던 시절의 관행 때문에, 다수 클라이언트가 문서의 선언과 무관하게
**사이트 루트의 `/favicon.ico`를 관습적으로 조회**한다.

- 최신 브라우저: `<link rel="icon">`을 읽으므로 영향 없음.
- 구형 브라우저·일부 웹뷰: SVG 파비콘 미지원 → 폴백이 없으면 기본 아이콘.
- 서드파티 수집기(Slack·Notion 링크 프리뷰, RSS 리더, 북마크 서비스, favicon API): 상당수가 `/favicon.ico`를 우선 조회.
- 폴백이 없으면 서버 로그에 404가 계속 쌓인다.

기능 장애나 랭킹 영향은 없지만, Google 모바일 검색 결과에 파비콘이 노출되므로
브랜드 노출 관점에서 ICO 폴백을 두는 편이 안전하다.

### 정상 위치: `src/app/favicon.ico`
App Router에서는 `app/favicon.ico`가 **파일 컨벤션**이며, 두는 것만으로 Next가 링크 태그를 자동 생성한다.

```html
<link rel="icon" href="/favicon.ico?favicon.<hash>.ico" sizes="256x256" type="image/x-icon"/>
```

`public/favicon.ico`에 두면 `/favicon.ico`로 서빙되기는 하지만 링크 태그가 생성되지 않아
관습적 루트 조회에만 의존하게 된다. 또한 `app/`과 `public/`에 같은 경로가 동시에 존재하면 충돌한다.
→ **`src/app/favicon.ico` 한 곳에만 둔다.**

## 3. 비정사각 심볼(500×218)의 한계

파비콘이 그려지는 자리(탭 16px, 북마크 32px, 검색 결과)는 전부 **정사각 슬롯**이다.
`sce-symbol.svg`는 2.32:1(타원 궤도 + 내부 `SCE` 레터마크)이라 정사각에 넣으면 위아래가 비고,
그림이 슬롯 높이의 43%만 사용한다. 레터마크는 원본 높이의 40%(y 58.8~148.1 / 218)에 불과하다.

| 표시 크기 | 실제 그림 높이 | `SCE` 글자 높이 |
|---|---|---|
| 192px | 83px | 34px |
| 48px (Google 권장 단위) | 21px | 8.4px |
| 32px | 14px | 5.6px |
| 16px (브라우저 탭) | 7px | 2.8px |

즉 탭 크기에서는 판독이 어렵다. 근본 해결은 **정사각 심볼 전용 버전**(타원 궤도만, 또는 한 글자 락업)을 받는 것.

## 현재 적용 상태 (2026-08-23)

| 용도 | 파일 | 선언 |
|---|---|---|
| 헤더·푸터 로고 | `public/sce-logo-ko.svg` | `next/image` + `unoptimized` |
| 파비콘(주) | `public/sce-symbol.svg` | `layout.tsx`의 `metadata.icons` (`icon`·`shortcut`) |
| 파비콘(레거시 폴백) | `src/app/favicon.ico` | Next 파일 컨벤션이 자동 생성 |

렌더 결과(빌드 산출물 `head`):

```html
<link rel="shortcut icon" href="/sce-symbol.svg"/>
<link rel="icon" href="/favicon.ico?favicon.<hash>.ico" sizes="256x256" type="image/x-icon"/>
<link rel="icon" href="/sce-symbol.svg"/>
```

### 추가된 `favicon.ico` 검증

- 컨테이너 정상(ICO type=1), 엔트리 1개: **256×256, 32bpp, PNG 임베드, 알파 채널 있음**. 정사각이고 내용은 로고 심볼과 동일.
- 개선 여지: 엔트리가 256 하나뿐이라 16/32px 표시는 브라우저 다운스케일에 의존한다.
  16·32·48을 포함한 멀티사이즈 ICO로 만들면 작은 크기 선명도가 올라간다.
- 배경이 투명이라 다크 테마 탭에서 네이비 획의 대비가 낮아질 수 있다. 필요하면 흰색 배경 버전을 검토한다.
- 래스터화가 필요하면 `sharp`(0.35.3, `next`의 의존성으로 이미 설치됨)로 처리 가능하다. 별도 라이브러리 도입 불필요.
