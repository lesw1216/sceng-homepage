// GitHub Pages 커스텀 도메인이 apex(scengineering.co.kr)로만 설정돼 있어
// www 서브도메인은 SSL 인증서가 없다(curl 접속 시 SSL 에러). www 없는
// 주소를 canonical/OG/sitemap 기준으로 삼는다.
export const SITE_URL = "https://scengineering.co.kr";

export const SITE_DESCRIPTION =
  "에스씨엔지니어링(주)는 산업 자동화, 빌딩 자동화, 데이터센터 인프라(EPMS/DCIM)를 아우르는 통합 제어 솔루션 전문기업입니다.";

/** Power Edge Cube용 Edge 시스템 데모 (헤더 CTA) */
export const EDGE_DEMO_URL = "https://demo.scengineering.co.kr";
