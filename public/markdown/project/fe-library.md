# 📚 주요 라이브러리 및 활용

## ![OpenAI](/images/icons/openai.jpg) OpenAI

**용도**: 오늘 작성한 일기(로그) 내용을 바탕으로 개선할 점 추천 및 피드백 제공

**보안**: 서버 사이드 Action을 통해서 OpenAI API를 호출하여 API key 보호

---

## ![Jotai](/images/icons/jotai.jpg) Jotai

전역 상태 관리 라이브러리

**• 선택적 리렌더링**: 전역 로딩바, 스낵바, 알림창 등 특정 atom을 구독한 컴포넌트만 리렌더링

**• prop drilling**가 없어 코드 간결화

---

## ![Capacitor](/images/icons/capacitor.png) Capacitor

**용도**: 웹 앱을 Android 네이티브 앱으로 변환

**구현 방식**:

- Next.js SSR 특성으로 인해 정적 빌드 사용 불가
- Vercel 배포 URL을 WebView로 연결하여 앱 내에서 웹 서비스 제공
- 단일 코드베이스로 웹과 모바일 모두 지원

---

## ![dnd-kit](/images/icons/dnd-kit.jpg) dnd-kit

드래그 앤 드롭 구현

할 일 목록, 루틴 순서 등을 직관적으로 재정렬

**• 리소스 최적화**: 드래그 중에는 UI만 업데이트하고, 드래그 종료 후 한 번만 서버에 저장

---

## ![framer-motion](/images/icons/framer-motion.png) framer-motion

애니메이션 및 전환 효과 추가

---

## ![Moment](/images/icons/moment.png) Moment

날짜 및 시간 처리 라이브러리. 손쉽게 날짜 및 시간 변환, 계산 가능

---

## xlsx

엑셀 파일 생성 및 다운로드 (데이터 내보내기)

사용자의 로그 데이터를 Excel 파일로 변환하여 백업 및 오프라인 분석 지원

---

## React UI 관련 라이브러리

### 1. react-calendar

달력 UI 구현

### 2. react-datepicker

날짜 선택 UI 구현

### 3. react-icons

다양한 아이콘 사용

### 4. react-spinners

로딩 스피너 컴포넌트 사용
