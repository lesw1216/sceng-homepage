import type { NextConfig } from "next";

// GitHub Pages 프로젝트 페이지(https://<owner>.github.io/<repo>/)로 배포되면
// 저장소 이름만큼 서브경로가 붙는다. .github/workflows/deploy-pages.yml에서
// actions/configure-pages가 계산한 값을 NEXT_BASE_PATH로 넘겨주므로 저장소
// 이름을 여기 하드코딩하지 않는다. 커스텀 도메인(scengineering.co.kr) 연결
// 후나 로컬 빌드에서는 빈 문자열(루트 경로)이 된다.
const basePath = process.env.NEXT_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export",
  basePath,
  // 정적 호스팅(Cloudflare Pages/GitHub Pages)에는 next/image의 서버 최적화
  // (/_next/image)를 처리할 서버가 없다. unoptimized로 두면 next/image가
  // 원본 경로를 그대로 내보낸다.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
