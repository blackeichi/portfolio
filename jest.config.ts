import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Next.js 앱의 경로를 제공하여 테스트 환경에서 next.config.js 및 .env 파일을 읽을 수 있다.
  dir: "./",
});

const config = {
  // 테스트 환경 설정
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
