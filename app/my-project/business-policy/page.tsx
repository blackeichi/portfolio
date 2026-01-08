export default function BusinessPolicyPage() {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 items-center w-full h-fit">
      <span>## 6. 비즈니스 로직 및 정책 제약</span>
      <span>
        서비스의 지속 가능성과 자원 관리를 위한 정책적 제약을 코드 레벨에서
        관리합니다.
      </span>
      <span>### AI 조언 기능 제약</span>
      <span>- **1회성 사용 제한**: </span>
      <span>- Prisma 스키마에 `useAiCount` 필드로 사용 횟수 추적</span>
      <span>- API 호출 전 클라이언트 측에서 `isUsed` 상태값 확인</span>
      <span>- 서버 측에서도 이중 검증하여 우회 방지</span>
      <span>- 사용 완료 후 UI에서 버튼 비활성화 및 안내 메시지 표시</span>
      <span>- **비용 최적화**: </span>
      <span>- OpenAI API 호출을 최소화하여 운영 비용 절감</span>
      <span>- 생성된 조언 내용을 DB에 캐싱하여 재요청 방지</span>
      <span>- **비용 최적화**:</span>
      <span>- `gpt-4o-mini` 사용으로 API 비용 절감 (GPT-4 대비 1/20 가격)</span>
      <span>
        - **1회성 사용 제한**: DB에 `useAiCount` 필드로 사용 횟수 추적
      </span>
      <span>- 생성된 조언을 DB에 캐싱하여 재요청 방지</span>
      <span>- **프롬프트 엔지니어링**:</span>
      <span>- System 메시지로 AI의 역할과 답변 스타일 정의</span>
      <span>- {"300자 이내"} 제약으로 응답 시간 단축 및 비용 절감</span>
      <span>- 정보 부족 시에도 유용한 팁 제공하도록 설정</span>
      <span>### 데이터 정책</span>
      <span>- **개인정보 보호**: </span>
      <span>- 비밀번호는 bcrypt로 단방향 해싱 (복호화 불가)</span>
      <span>- 민감한 데이터는 암호화하여 DB 저장</span>
      <span>- **데이터 보관 정책**:</span>
      <span>- 사용자 로그 데이터는 최대 1년 보관</span>
      <span>### Rate Limiting</span>
      <span>- **API 호출 제한**: </span>
      <span>- @nestjs/throttler로 IP당 요청 횟수 제한</span>
      <span>- 일반 API: 분당 60회</span>
      <span>- AI API: 시간당 5회 (무료 사용자), 무제한 (프리미엄)</span>
      <span>- DDoS 공격 및 악의적 사용 방지</span>
    </div>
  );
}
