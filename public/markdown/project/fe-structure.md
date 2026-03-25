# 📁 프로젝트 구조

모노레포 방식으로 **Next.js (Frontend)** 와 **NestJS(Backend)** 를 하나의 Git 저장소에서 함께 관리합니다.

### 주요 특징

- **독립적 배포 환경**: 서비스 규모 확장을 고려하여 프론트엔드와 백엔드를 각각 독립적으로 배포
  - Frontend: Vercel 배포
  - Backend: Render 배포

- **통신 프로토콜**: RESTful API 기반

- **데이터베이스**:
  - Database: Neon (PostgreSQL) 활용
  - ORM: Prisma를 사용한 데이터베이스 스키마 관리 및 Type-safe 쿼리 구현
  - Deployment: NestJS 백엔드와 Neon 서버리스 DB를 연동하여 배포

---

## 컴포넌트 계층 구조

[**Atomic Design 방법론**] : [[아키텍처] Atomic Design vs FSD (Feature-Sliced Design)](https://blackeichi.tistory.com/29)

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

## 🧱 프론트엔드 설계 포인트

## 1. Route Handler 기반 BFF 구조

Next.js Route Handler를 프론트엔드 내부 BFF 계층처럼 두어  
백엔드 요청 전달, 쿠키 처리, 응답 정리를 한곳에서 담당하도록 구조를 정리했습니다.

이 구조를 통해 프론트엔드에서는 `/api/*` 형태의 내부 엔드포인트를 기준으로  
일관된 방식으로 데이터를 요청할 수 있도록 만들었습니다.

## 2. 쿠키 기반 인증 구조

인증은 AccessToken / RefreshToken을 모두 쿠키 기반으로 관리하는 방향으로 구현했습니다.

이를 통해 서버에서도 인증 정보를 활용할 수 있게 되었고,  
SSR 시점의 데이터 패칭과 초기 데이터 주입을 보다 자연스럽게 구성할 수 있었습니다.

## 3. React Query 기반 서버 상태 관리

페이지와 컴포넌트 훅을 React Query 패턴으로 마이그레이션해 서버 상태 관리 방식을 표준화했습니다.

- queryKey / queryFn 기반 패턴 통일
- 캐싱 및 재요청 흐름 일관화
- 서버 상태와 UI 상태의 책임 분리

## 4. SSR 프리페치 + initialData

각 페이지 첫 진입 시 서버에서 필요한 데이터를 먼저 프리페치하고,  
이를 React Query `initialData`로 연결해 초기 로딩 경험을 개선했습니다.

이 구조를 통해 첫 화면 진입 시점에 빈 화면이나 중복 요청을 줄이고,  
클라이언트 진입 이후에도 자연스럽게 React Query 흐름으로 이어지도록 구성했습니다.
