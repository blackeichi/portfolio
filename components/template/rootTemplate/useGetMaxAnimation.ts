import { useEffect, useRef } from "react";

// isMax가 변경될 때만 애니메이션 클래스를 추가/제거하는 훅. window.css 참고
// resize, drag 등의 이벤트마다 애니메이션이 작동하면 부자연스러움
export const useGetMaxAnimation = (isMax: boolean) => {
  const windowBox = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (windowBox.current) {
      windowBox.current.classList.add("transition-all");
      const timeout = setTimeout(() => {
        if (windowBox.current) {
          windowBox.current.classList.remove("transition-all");
        }
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isMax]);

  return windowBox;
};
