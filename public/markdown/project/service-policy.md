# 📋 서비스 운영 및 비용 최적화

서비스의 지속 가능성과 효율적인 자원 관리를 위한 운영 정책입니다.

---

## AI 사용량 제한

### 일일 사용 횟수 관리

**목적**: OpenAI API 비용 관리

**구현 방식**:

- `AiUsedCount` 테이블로 사용자별 일일 사용 횟수 추적
- 하루 최대 10회로 제한
- 매일 자정에 카운트 초기화

```prisma
model AiUsedCount {
  userId    Int      @unique
  user      User     @relation(fields: [userId], references: [id])
  count     Int      @default(0)
  date      String
}
```

**로직**:

1. 오늘 날짜가 아니면 → count를 1로, date를 오늘로 업데이트
2. 오늘 날짜이면 → count가 10 미만일 때만 +1 증가, 10 이상이면 에러 반환

---

### 일기별 AI 조언 중복 방지

**목적**: 동일 일기에 대한 중복 API 호출 방지

**구현 방식**:

- `hasReceivedAdvice` 플래그로 AI 조언 수신 여부 관리
- 한 번 조언받은 일기는 버튼 비활성화

```prisma
model Diary {
  // ... 기타 필드
  hasReceivedAdvice Boolean @default(false)
  @@unique([userId, date])
}
```

---

## 비용 최적화 전략

- **경량 모델 사용**: `gpt-4o-mini`로 API 비용 절감
- **응답 길이 제한**: 300자 이내로 제한하여 토큰 사용량 감소
- **결과 캐싱**: 생성된 조언을 DB에 저장하여 재호출 방지
- **최소 호출 원칙**: 필수적인 경우에만 API 호출

---

## 백엔드 서버 가용성 유지

**문제**: 무료 플랜 사용으로 15분이상 비호출 시 서버 대기 상태 전환

**해결책**:

- 외부 헬스체크 서비스로 5분마다 주기적 요청 전송
- 서버를 항상 활성 상태로 유지하여 사용자 경험 개선
