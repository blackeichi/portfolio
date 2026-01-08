export default function PerformanceOptimizationPage() {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 items-center w-full h-fit">
      <span>## 5. 성능 최적화 전략</span>
      <span>#### Debouncing</span>
      <span>- **적용 대상**: </span>
      <span>- 체크박스 연속 클릭</span>
      <span>- 리스트 아이템 순서 변경 (Drag & Drop)</span>
      <span>- 검색 입력 필드</span>
      <span>- 자동 저장 기능</span>
      <span>- **효과**: </span>
      <span>- 서버 부하 감소 (API 호출 횟수 80% 이상 감소)</span>
      <span>- 네트워크 트래픽 최소화</span>
      <span>- 사용자 경험 개선 (즉각적인 UI 반응 + 백그라운드 저장)</span>
      <span>#### Dynamic Import </span>
      <span>
        - 사용자의 액션에 따라 표기가 필요한 modal창의 경우 dynamic import로
        불러와 lazy loading과 CSR으로 서버에 부담을 줄이도록함.
      </span>
      <span>#### Memoization</span>
      <span>- `React.memo`: 컴포넌트 레벨 메모이제이션</span>
      <span>- `useMemo`: 계산 비용이 큰 연산 결과 캐싱</span>
      <span>- `useCallback`: 이벤트 핸들러 함수 메모이제이션</span>
      <span>- 리스트 렌더링 최적화를 위한 적극적인 메모이제이션 활용</span>
    </div>
  );
}
