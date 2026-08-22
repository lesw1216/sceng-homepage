import { ButtonLink } from "@/components/ui/Button";

interface CompanyMapProps {
  address: string;
  mapUrl: string;
}

/**
 * 오시는 길 지도 영역.
 * 지도 API(Client ID) 발급 전이라 레이아웃 공간만 확보한다.
 * TODO: 지도 API 연동 시 이 컴포넌트 내부만 교체하면 되도록 독립 구성.
 */
export function CompanyMap({ address, mapUrl }: CompanyMapProps) {
  return (
    <div>
      <div
        className="flex min-h-[320px] items-center justify-center border border-dashed border-steel/50 bg-concrete/40 p-8 text-center"
        role="img"
        aria-label={`회사 위치 지도 영역 (${address})`}
      >
        <p className="text-base leading-relaxed text-ink/70">
          지도 영역 (준비 중)
          <br />
          아래 버튼으로 네이버 지도에서 위치를 확인하실 수 있습니다.
        </p>
      </div>
      <div className="mt-5">
        <ButtonLink href={mapUrl} variant="secondary" external>
          네이버 지도에서 보기
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M11 3a1 1 0 1 0 0 2h2.6l-6.3 6.3a1 1 0 1 0 1.4 1.4L15 6.4V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5Z" />
            <path d="M5 5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H5V7h3a1 1 0 0 0 0-2H5Z" />
          </svg>
        </ButtonLink>
      </div>
    </div>
  );
}
