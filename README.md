# Portfolio Project - 기술 문서

## 프로젝트 개요

인터랙티브한 Windows 스타일의 포트폴리오 웹사이트로, 사용자에게 독특한 경험을 제공하는 개인 포트폴리오입니다.

---

## 기술 스택 (Tech Stack)

- **프레임워크**: Next.js
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **상태 관리**: Jotai
- **UI/UX 라이브러리**:
  - React Icons (아이콘)
  - React Spinners (로딩)
  - Notistack (알림/스낵바)

---

## 프로젝트 특징

### 1. Windows 스타일 UI/UX

- 드래그 가능한 윈도우 박스 (최소화, 최대화, 닫기 기능)
- 바탕화면 아이콘 시스템
- 하단 작업 표시줄 (Taskbar) with 열린 창 목록
- 윈도우 간 Z-index 관리 (포커스 시스템)

### 2. 컴포넌트 아키텍처

프로젝트는 **Atomic Design Pattern**을 기반으로 구조화되어 있습니다:

```
components/
├── atoms/              # 최소 단위 컴포넌트
│   ├── button.tsx
│   ├── text.tsx
│   ├── title.tsx
│   ├── contentBox.tsx
│   ├── overlay.tsx
│   └── windowsBoxHeader.tsx
├── molecules/          # atoms 조합
│   ├── iconButton.tsx
│   └── windowsBox.tsx
├── organisms/          # 복잡한 UI 블록
│   ├── snackbarComponent.tsx
│   └── windowsClientActionComponent/
└── template/           # 페이지 레이아웃
    ├── myProjectTemplate/
    └── rootTemplate/
```

**핵심 설계 원칙**:

- **관심사 분리**: 각 컴포넌트는 단일 책임 원칙을 따름
- **재사용성**: atoms와 molecules는 프로젝트 전반에서 재사용
- **지역성(Locality of Behavior)**: 특정 라우트에서만 사용하는 컴포넌트는 `_ui/` 폴더에 배치

### 3. 상태 관리 전략 (Jotai)

**전역 상태** ([libs/atom.ts](libs/atom.ts)):

```typescript
// 윈도우 시스템 상태
export const openedBoxListState = atom<OpenedBoxType[]>([]);
export const focusWindowState = atom<string | null>(null);

// UI 상태
export const loadingState = atom<number>(0);
export const snackbarState = atom<SnackbarType | null>(null);
```

**장점**:

- **선택적 리렌더링**: 특정 atom 변경 시 해당 구독 컴포넌트만 리렌더링
- **Prop Drilling 제거**: 깊은 컴포넌트 트리에서도 직접 상태 접근
- **경량화**: Redux 대비 훨씬 적은 보일러플레이트

### 4. 윈도우 관리 시스템

**핵심 로직** ([libs/hooks/useHandleWindowBox.ts](libs/hooks/useHandleWindowBox.ts)):

```typescript
// 윈도우 열기
const openNewWindow = (windowId: string, title: string, size?: Size) => {
  // 중복 체크 및 새 윈도우 추가
  setOpenedBoxList((prev) => [...prev, newWindow]);
  setFocusWindow(windowId);
};

// 윈도우 최대화/복원
const toggleMaximize = (windowId: string) => {
  // 현재 크기 저장 및 전체화면 전환
};

// 윈도우 닫기
const closeWindow = (windowId: string) => {
  setOpenedBoxList((prev) => prev.filter((box) => box.id !== windowId));
};
```

**기능**:

- 드래그하여 위치 이동
- 리사이징 (모서리/테두리 드래그)
- 최소화/최대화/닫기
- 포커스 관리 (클릭 시 맨 앞으로)
- LocalStorage에 전체화면 설정 저장

### 5. 라우팅 구조

```
app/
├── page.tsx                  # 홈 (바탕화면)
├── me/             # 자기소개 섹션 (개발 예정)
├── my-project/              # Daily Log 프로젝트 소개
│   ├── page.tsx            # 프로젝트 개요
│   ├── fe-library/         # 라이브러리 설명
│   ├── fe-structure/       # 프론트엔드 구조
│   ├── auth-strategy/      # 인증 전략
│   ├── handle-api/         # API 처리
│   ├── performance-optimization/  # 성능 최적화
│   └── service-policy/    # 비즈니스 정책
└── play-game/              # 미니 게임 (개발 예정)
```

**프로젝트 네비게이션** ([app/my-project/utils.ts](app/my-project/utils.ts)):

- 좌측 메뉴를 통한 서브 페이지 이동
- 주소창 UI (뒤로가기/앞으로가기 기능)
- iframe을 통한 프로젝트 미리보기

---

## 주요 구현 기능

### ✅ 완료된 기능

- [x] Windows 스타일 UI 시스템
- [x] 윈도우 드래그 & 리사이즈
- [x] 작업 표시줄 (열린 창 목록)
- [x] 전체화면 전환 기능
- [x] 로딩 컴포넌트 (React Spinners)
- [x] 스낵바 알림 시스템 (Notistack)
- [x] My Project 페이지 구조
  - [x] 프로젝트 개요
  - [x] 라이브러리 설명
  - [x] 프론트엔드 구조
  - [x] 인증 전략
  - [x] API 처리 로직
  - [x] 성능 최적화
  - [x] 비즈니스 정책
- [x] 서브 윈도우 시스템 (iframe 프로젝트 미리보기)
- [x] 윈도우 최대화 애니메이션
- [x] LocalStorage 기반 설정 저장

### 🚧 개발 예정

- [ ] 자기소개 섹션 (My Computer)
  - [ ] 한 줄 자기소개
  - [ ] 기술 스택 (Main/Sub)
  - [ ] 경력 사항
  - [ ] 자기소개서
- [ ] 미니 게임 (Play Game)
  - [x] 캐릭터 이동 시스템
  - [ ] 건물, 표지판 구현
  - [ ] 건물 진입 시 미니게임
- [ ] 서브 윈도우 고급 기능
  - [ ] Sticky 윈도우 (분할 화면)
  - [ ] 중앙 리사이저

### 관심사의 분리 (Separation of Concerns)

- **컴포넌트**: UI 렌더링에만 집중
- **Custom Hooks**: 로직 재사용 (`useHandleWindowBox.ts`)
- **Utils**: 순수 함수 유틸리티 (`constants.ts`, `event.ts`)
- **Types**: TypeScript 타입 정의 (`state.ts`)
