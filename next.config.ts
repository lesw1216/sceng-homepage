import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export",
  // 커스텀 도메인(scengineering.co.kr) 루트에서 서비스하므로 basePath/assetPrefix는
  // 설정하지 않는다. actions/configure-pages의 base_path 출력은 리포지토리
  // 프로젝트 페이지 경로(/sceng-homepage) 기준이라 커스텀 도메인 루트 배포와
  // 맞지 않아 사용하지 않는다.
  // 정적 호스팅(Cloudflare Pages/GitHub Pages)에는 next/image의 서버 최적화
  // (/_next/image)를 처리할 서버가 없다. unoptimized로 두면 next/image가
  // 원본 경로를 그대로 내보낸다.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
