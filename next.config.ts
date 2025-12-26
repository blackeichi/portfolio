import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 외부 이미지 호스트 허용 설정
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org", // 기술 스택 아이콘
      },
      {
        protocol: "https",
        hostname: "skillicons.dev", // 기술 스택 아이콘 (대체)
      },
    ],
    // SVG 이미지 허용 (보안상 기본적으로 비활성화됨)
    dangerouslyAllowSVG: true,
    // SVG를 첨부파일로 처리하여 브라우저에서 직접 실행 방지
    contentDispositionType: "attachment",
    // SVG 내부 스크립트 실행 차단을 위한 보안 정책
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
