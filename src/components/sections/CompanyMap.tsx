import { ButtonLink } from "@/components/ui/Button";

interface CompanyMapProps {
  address: string;
  mapUrl: string;
}

/** 오시는 길 지도 영역. 구글 지도 embed + 네이버 지도 외부 링크를 함께 제공한다. */
export function CompanyMap({ address, mapUrl }: CompanyMapProps) {
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m5!3m3!1m2!1s0x357b63b97f37be75%3A0xa01d8697dc2114ab!2z67aA7LKc7YWM7YGs64W467C466asIFUx7IS87YSw!5e0!3m2!1sko!2skr!4v1788135509924!5m2!1sko!2skr"
        className="h-[320px] w-full border-0"
        title={`${address} 위치 지도`}
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
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
