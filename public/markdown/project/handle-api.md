# 🔄 API 핸들링 로직

커스텀 hook을 활용하여 모든 HTTP 통신 과정을 자동화하고 일관된 사용자 피드백을 제공합니다.

## useApiRequest Hook

```typescript
export function useApiRequest<T, B = undefined>(
  url: string,
  method: Method
): [state: FetchState<T>, fetchData: (body?: B) => Promise<T | undefined>] {
   ...
}
```

**주요 기능**:

- 자동 토큰 갱신 및 재시도
- 전역 로딩 상태 관리
- 에러 처리 및 스낵바 피드백
- TypeScript 타입 안전성 보장

---

## 토큰 갱신 프로세스

1. API 요청 전 AccessToken 유효성 검증
2. AccessToken 만료 시 자동으로 갱신 API 호출
   - RefreshToken을 쿠키에 담아 `/auth/refresh` 엔드포인트 요청
   - 새로운 AccessToken 발급 받아 상태 업데이트
3. 갱신된 AccessToken으로 **원래 요청 재시도**
4. 두 토큰 모두 만료 시 `/login` 페이지로 자동 리디렉션

---

## 에러 핸들링

**401 Unauthorized**: (로그인 페이지 제외) AccessToken 토큰 만료 → 자동 갱신 시도

**403 Forbidden**: 권한 부족 → 에러 메시지 표시

**404 Not Found**: 네트워크 연결 실패 → 재시도 옵션 제공

**500 Server Error**: 서버 오류 → 일반화된 에러 메시지 표시

---

## UI/UX 피드백 시스템

### 전역 로딩바

- API 호출 시작 시 전역 로딩 상태 활성화
- 여러 API 동시 호출 시 카운트 기반으로 로딩 상태 관리
- 모든 요청 완료 시 로딩 상태 비활성화

### 스낵바

- 서버 응답 메시지를 자동으로 스낵바에 표시
- **성공**: info(파란색) 스낵바 (예: "저장되었습니다")
- **에러**: error(빨간색) 스낵바 (예: "권한이 없습니다")
- 5초 후 자동 닫힘 또는 사용자가 수동으로 닫을 수 있음
