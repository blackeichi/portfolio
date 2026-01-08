# 프론트엔드 구조

## 컴포넌트 계층 구조

```
apps/frontend/app/components/
├── atoms/          # 최소 단위 컴포넌트 (UI 일관성 유지)
│   ├── button.tsx  # 재사용 가능한 기본 버튼
│   ├── input.tsx   # 입력 필드
│   ├── checkBox.tsx # 체크박스
│   └── tooltip.tsx # 툴팁
├── molecules/      # atoms 조합 (비즈니스 로직 최소화)
│   ├── iconButton.tsx # 아이콘 + 버튼
│   └── okCancelBtns.tsx # 확인/취소 버튼 그룹
├── organisms/      # 복잡한 UI 블록 (비즈니스 로직 포함)
│   └── Table/      # 테이블 컴포넌트
└── template/       # 레이아웃 템플릿
    └── pageLayout.tsx # 페이지 레이아웃
```

---

## 관심사 분리 (Locality of Behavior)

**특정 라우트에서만 사용하는 훅과 유틸**: 해당 라우트 폴더 내에 위치시켜 코드 응집도를 높임

- 예: `app/todo/hooks/`, `app/log/utils/`

**공용 리소스**: 전역 폴더에서 관리하여 중복 코드 방지

- `libs/`: 상태관리, 스낵바, 커스텀 훅, 웹 스토리지 유틸리티
- `types/`: TypeScript 타입 정의
- `constants/`: 상수 및 설정값

---

## 렌더링 성능 최적화

**전역 컴포넌트 배치**: 최상단 레이아웃에 Snackbar, Loading 컴포넌트 배치

**선택적 구독**: Jotai의 Atom 단위 구독으로 상태 변경 시 해당 컴포넌트만 리렌더링

- 하위 트리의 불필요한 전체 리렌더링 차단

**코드 스플리팅**: Dynamic Import를 활용한 초기 번들 사이즈 감소

**메모이제이션**: React.memo, useMemo, useCallback을 적극 활용하여 불필요한 재계산 방지
