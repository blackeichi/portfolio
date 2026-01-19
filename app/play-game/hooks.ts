import { useEffect, useState } from "react";
import { arrowKeys } from "./_ui/utils";

export const useHandleMoveEvent = () => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  // 키 입력 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (arrowKeys.includes(e.key)) {
        e.preventDefault();
        setPressedKeys((prev) => {
          if (prev.includes(e.key)) return prev;
          return [...prev, e.key];
        });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (arrowKeys.includes(e.key)) {
        e.preventDefault();
        setPressedKeys((prev) => {
          if (!prev.includes(e.key)) return prev;
          return prev.filter((key) => key !== e.key);
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return { pressedKeys };
};

export const useHandleActionEvent = (actionFunc: () => void) => {
  useEffect(() => {
    if (!actionFunc) return;
    const handleSpaceKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        actionFunc();
      }
    };
    window.addEventListener("keydown", handleSpaceKey);
    return () => {
      window.removeEventListener("keydown", handleSpaceKey);
    };
  }, [actionFunc]);
};
