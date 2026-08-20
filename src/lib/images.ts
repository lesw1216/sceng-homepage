/** 사업영역 key → 대표 이미지 (public/images) */
export const businessAreaImage: Record<string, string> = {
  "industry-automation": "/images/business-industry.jpg",
  "building-automation": "/images/business-building.jpg",
  "datacenter-infra": "/images/business-datacenter.jpg",
};

/** 홈 Hero 캐러셀 슬라이드 (사업분야별 대표 사진) */
export const heroSlides: { src: string; alt: string }[] = [
  { src: "/images/business-industry.jpg", alt: "산업 자동화 로봇 생산 라인" },
  { src: "/images/business-building.jpg", alt: "빌딩 자동화 스마트 빌딩 외벽" },
  { src: "/images/business-datacenter.jpg", alt: "데이터센터 인프라 서버 설비" },
];
