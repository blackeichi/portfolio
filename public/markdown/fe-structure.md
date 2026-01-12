# 📁 프로젝트 구조

모노레포 방식으로 **Next.js (Frontend)**와 **NestJS (Backend)**를 하나의 Git 저장소에서 함께 관리합니다.

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
