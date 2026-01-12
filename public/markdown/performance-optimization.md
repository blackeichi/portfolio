# ⚡ 성능 최적화 전략

---

## 1. Debouncing

### 적용 대상

- 체크박스 연속 클릭
- 리스트 아이템 순서 변경 (Drag & Drop)
- 검색 입력 필드
- 자동 저장 기능

### 효과

- 서버 부하 감소 (API 호출 횟수 80% 이상 감소)
- 네트워크 트래픽 최소화
- 사용자 경험 개선 (즉각적인 UI 반응 + 백그라운드 저장)

---

## 2. 전역 상태 관리

**전역 컴포넌트 배치**: 최상단 레이아웃에 Snackbar, Loading 컴포넌트 배치

```
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gowunBatang.className} antialiased `}>
        <ErrorBoundary enableLogging={true}>
          <SnackbarProviderComponent>
            <!-- 스낵바 컴포넌트 -->
            <Snackbar />
            <div className="w-screen h-screen overflow-hidden bg-stone-100 text-stone-800">
                <!-- 로딩 컴포넌트 -->
              <LoadingProgress />
              <PageLayout>{children}</PageLayout>
            </div>
          </SnackbarProviderComponent>
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

**선택적 구독**: Jotai의 Atom 단위 구독으로 상태 변경 시 해당 컴포넌트만 리렌더링

- 하위 트리의 불필요한 전체 리렌더링 차단

```
export const LoadingProgress = () => {
  const [loading, setLoading] = useAtom(loadingState);
  useEffect(() => {
    if (loading < 0) {
      setLoading(0);
    }
  }, [loading, setLoading]);
  return (
    <div className="z-50 fixed top-0 left-0 w-screen">
      {loading && loading > 0 ? (
        <div className="w-full h-1.5 relative overflow-hidden bg-inherit">
          <motion.div
            className="w-1/2 h-full -left-1/2 top-0 absolute"
            animate={{
              left: "100%",
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
            }}
          >
            <div className="w-full h-full bg-stone-800" />
          </motion.div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
```

---

## 3. Dynamic Import

코드 스플릿팅 - 초기 번들 사이즈 감소

사용자의 액션에 따라 표기가 필요한 modal창의 경우 dynamic import로 불러와 lazy loading과 CSR으로 서버에 부담을 줄이도록 함.

---

## 4. 메모이제이션

불필요한 재계산 방지로 렌더링 성능 개선

### React.memo

컴포넌트 레벨 메모이제이션으로 props가 변경되지 않으면 리렌더링 방지

```tsx
const TodoItem = React.memo(({ todo, onToggle }) => {
  return <div onClick={() => onToggle(todo.id)}>{todo.title}</div>;
});
```

### useMemo

계산 비용이 큰 연산 결과를 캐싱하여 불필요한 재계산 방지

```tsx
const filteredTodos = useMemo(
  () => todos.filter((todo) => todo.completed),
  [todos]
);
```

### useCallback

이벤트 핸들러 함수를 메모이제이션하여 자식 컴포넌트의 불필요한 리렌더링 방지

```tsx
const handleToggle = useCallback((id: number) => {
  setTodos((prev) =>
    prev.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
}, []);
```

**적용 효과**: 리스트 렌더링 최적화 및 복잡한 컴포넌트 트리에서 성능 향상
