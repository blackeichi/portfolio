export default function HandleApiPage() {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 items-center w-full h-fit">
      <span>## 4. API 핸들링 로직</span>
      <span>
        통합 API 모듈을 통해 모든 HTTP 통신 과정을 자동화하고 일관된 사용자
        피드백을 제공합니다.
      </span>
      <span>#### 토큰 갱신 프로세스</span>
      <span>1. API 요청 전 AccessToken 유효성 검증</span>
      <span>2. AccessToken 만료 시 자동으로 갱신 API 호출</span>
      <span>- RefreshToken을 쿠키에 담아 `/auth/refresh` 엔드포인트 요청</span>
      <span>- 새로운 AccessToken 발급 받아 상태 업데이트</span>
      <span>3. 갱신된 AccessToken으로 원래 요청 재시도</span>
      <span>4. 두 토큰 모두 만료 시 `/login` 페이지로 자동 리디렉션</span>
      <span>#### 에러 핸들링</span>
      <span>- **401 Unauthorized**: 토큰 만료 → 자동 갱신 시도</span>
      <span>- **403 Forbidden**: 권한 부족 → 에러 메시지 표시</span>
      <span>- **404 Not Found**: 잘못된 엔드포인트 → 스낵바에 에러 표시</span>
      <span>- **500 Server Error**: 서버 오류 → 일반화된 에러 메시지 표시</span>
      <span>- **Network Error**: 네트워크 연결 실패 → 재시도 옵션 제공</span>
      <span>### UI/UX 피드백 시스템</span>
      <span>#### Global Loader</span>
      <span>- API 호출 시작 시 전역 로딩 상태 활성화</span>
      <span>- 여러 API 동시 호출 시 카운터 기반으로 로딩 상태 관리</span>
      <span>- 모든 요청 완료 시 로딩 상태 비활성화</span>
      <span>- React Spinners를 활용한 시각적 피드백</span>
      <span>#### Universal Snackbar</span>
      <span>- 서버 응답 메시지를 자동으로 스낵바에 표시</span>
      <span>- 성공: 녹색 스낵바 (예: {"저장되었습니다"})</span>
      <span>- 에러: 빨간색 스낵바 (예: {"권한이 없습니다"})</span>
      <span>- 경고: 노란색 스낵바 (예: {"입력값을 확인해주세요"})</span>
      <span>- 백엔드에서 표준화된 응답 형식으로 메시지 전달</span>
      <span>- 3초 후 자동 닫힘 또는 사용자가 수동으로 닫을 수 있음</span>
    </div>
  );
}
