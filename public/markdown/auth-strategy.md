# 🔐 인증 전략 (Dual Token Strategy)

보안과 사용자 경험을 동시에 확보하기 위한 **Dual Token 전략**을 시행합니다.

---

## AccessToken

**저장 위치**: 클라이언트 메모리 상태 (Jotai Atom)

**수명**: 짧은 TTL (예: 15분)

**용도**: API 요청 시 Authorization 헤더에 포함

**보안 이점**: XSS 공격으로부터 보호 (LocalStorage/SessionStorage 미사용)

**특징**:

- 페이지 새로고침 시 초기화됨
- 서버 요청마다 헤더에 포함하여 인증

---

## RefreshToken

**저장 위치**: HttpOnly, Secure 쿠키

**수명**: 긴 TTL (예: 7일~30일)

**용도**: AccessToken 재발급

**보안 이점**:

- HttpOnly 속성으로 JavaScript에서 접근 불가 (XSS 방어)
- Secure 속성으로 HTTPS에서만 전송
- SameSite 속성으로 CSRF 공격 방어

**특징**:

- 자동으로 쿠키에 포함되어 토큰 갱신 API 호출 시 전송
- 백엔드에서 DB 또는 Redis에 저장하여 유효성 검증

---

## 로그인/회원가입 처리 (Server-Side Actions)

**Next.js Server Actions 활용**:

- 로그인과 회원가입은 민감한 정보(비밀번호, 개인정보)를 다루므로 서버 사이드에서 처리
- 클라이언트에서 직접 API를 호출하지 않고 Server Action을 통해 백엔드와 통신
- 쿠키 설정이 필요한 RefreshToken 처리를 서버 측에서 안전하게 수행

**보안상 이점**:

- 민감한 정보가 클라이언트 측 JavaScript에 노출되지 않음
- RefreshToken을 서버에서 직접 쿠키로 설정하여 XSS 공격 방어
- CSRF 토큰 없이도 Next.js의 내장 보안 기능으로 안전하게 처리
- 클라이언트 번들에 API 엔드포인트 URL이 노출되지 않음

---

## 인증 흐름

1. **로그인/회원가입**: Server Action을 통해 서버 사이드에서 처리, RefreshToken을 쿠키로 설정
2. **API 요청**: AccessToken을 헤더에 포함하여 요청
3. **토큰 만료**: AccessToken 만료 시 401 에러 발생
4. **자동 갱신**: 인터셉터가 RefreshToken으로 새로운 AccessToken 발급
5. **세션 종료**: RefreshToken도 만료되면 로그인 페이지로 리디렉션
