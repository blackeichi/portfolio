# 🔐 인증 및 보안 전략

사용자 인증은 보안과 사용자 경험을 동시에 확보하기 위한 **Dual Token 전략**을 시행합니다.

---

## AccessToken

**저장 위치**: 클라이언트 메모리 상태 (Jotai Atom)

**수명**: 짧은 TTL

**용도**: API 요청 시 Authorization 헤더에 포함

**특징**:

- 페이지 새로고침 시 초기화됨
- 서버 요청마다 헤더에 포함하여 인증

---

## RefreshToken

**저장 위치**: HttpOnly, Secure 쿠키

**수명**: 긴 TTL (30일)

**용도**: AccessToken 재발급

**특징**:

- 자동으로 쿠키에 포함되어 토큰 갱신 API 호출 시 전송
- 백엔드에서 DB에 저장하여 유효성 검증

---

## 로그인/회원가입 처리

**쿠키 설정의 딜레마**

- 로그인과 회원가입은 비밀번호를 다루기 때문에 **서버 사이드에서 처리하는 것이 이상적**
- 하지만 로그인 시 쿠키를 설정하는 것은 Nextjs의 서버 사이드보다는 백엔드에서 하는 것이 **보안상 바람직하지 않다고 판단**
- 따라서 **회원가입은 백엔드의 Server Action**으로, **로그인은 클라이언트 사이드**에서 처리하는 방식으로 절충

```backend/auth/auth.controller.ts
  @Post('login')
  @HttpCode(HttpStatus.OK) // 200 return code
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 200,
    description: '로그인이 성공적으로 완료되었습니다.',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패 (잘못된 이메일 또는 비밀번호)',
  })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const isGuestLogin = dto.email === process.env.GUEST_EMAIL;
    const { accessToken, refreshToken } = await this.authService.login(
      dto.email,
      isGuestLogin ? process.env.GUEST_PASSWORD || '' : dto.password,
    );
    <!-- 쿠키 설정! -->
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30일
    });

    return { accessToken };
  }
```

---

## 인증 흐름

1. **로그인/회원가입**: Server Action을 통해 서버 사이드에서 처리, RefreshToken을 쿠키로 설정
2. **API 요청**: AccessToken을 헤더에 포함하여 요청
3. **토큰 만료**: AccessToken 만료 시 401 에러 발생
4. **자동 갱신**: 인터셉터가 RefreshToken으로 새로운 AccessToken 발급
5. **세션 종료**: RefreshToken도 만료되면 로그인 페이지로 리디렉션

---

## 추가 보안 조치

- **CORS 설정**: 허용된 출처(Origin)만 API 접근 가능
- **Bcrypt**: 비밀번호 해싱
- **FE, BE 더블 체크**: 클라이언트와 서버 양쪽에서 동일한 검증 규칙 적용
  - 이메일 포맷 검증, 텍스트 입력 제한, 숫자 범위, 필수 입력 및 정상적인 접근인지 등
- **class-validator**: DTO에서 입력값 검증 및 SQL Injection 방어
- **Rate Limiting**: @nestjs/throttler로 무차별 대입 공격 방어
- **Helmet**: HTTP 보안 헤더 자동 설정 (XSS, Clickjacking 방어)
