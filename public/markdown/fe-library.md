# 📚 주요 라이브러리 및 활용

## ![Capacitor](/images/icons/capacitor.png) Capacitor

웹 → 모바일 앱 변환 (크로스 플랫폼 지원)

웹과 모바일 앱이 동일한 소스를 사용하도록 구성

**• SSR 제약사항 대응**: Next.js의 SSR 특성상 FE 코드를 직접 빌드하여 사용하지 못하므로, Vercel에 배포된 주소를 WebView로 연결하여 모바일 앱에서 웹 서비스를 그대로 화면에 표시

---

## ![dnd-kit](/images/icons/dnd-kit.jpg) dnd-kit

드래그 앤 드롭 구현

할 일 목록, 루틴 순서 등을 직관적으로 재정렬

**• 리소스 최적화**: 드래그 중에는 UI만 업데이트하고, 드래그 종료 후 한 번만 서버에 저장

---

## ![framer-motion](/images/icons/framer-motion.png) framer-motion

애니메이션 및 전환 효과 추가

---

## ![Jotai](/images/icons/jotai.jpg) Jotai

전역 상태 관리 라이브러리

**• 선택적 리렌더링**: 전역 로딩바, 스낵바, 알림창 등 특정 atom을 구독한 컴포넌트만 리렌더링

**• prop drilling**가 없어 코드 간결화

---

## ![Moment](/images/icons/moment.png) Moment

날짜 및 시간 처리 라이브러리. 손쉽게 날짜 및 시간 변환, 계산 가능

---

## ![OpenAI](/images/icons/openai.jpg) OpenAI

오늘 작성한 일기(로그) 내용을 바탕으로 개선할 점 추천 및 피드백 제공

서버 사이드 Action을 통해서 OpenAI API를 호출하여 API key 보호

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
