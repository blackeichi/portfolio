import { useEffect, useState } from "react";
import { ARROW_KEYS, CHARACTER_ID, interactables } from "./_ui/utils";

export const useHandleMoveEvent = () => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  // 키 입력 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (ARROW_KEYS.includes(e.key)) {
        e.preventDefault();
        setPressedKeys((prev) => {
          if (prev.includes(e.key)) return prev;
          return [...prev, e.key];
        });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (ARROW_KEYS.includes(e.key)) {
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

export const useHandleActionEvent = ({
  mapPositionRef,
  currentMap,
  setActionType,
}: {
  mapPositionRef: React.MutableRefObject<{ movex: number; movey: number }>;
  currentMap: string;
  setActionType: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        const { movex, movey } = mapPositionRef.current;
        const characterClass = document
          .getElementById(CHARACTER_ID)
          ?.className.split(" ")
          .slice(1)
          .join("");
        if (characterClass) {
          console.log(
            movex,
            movey,
            characterClass,
            interactables[currentMap][`${movex}${movey}${characterClass}`],
          );
        }
        /* if (interactables[currentMap][`${movex}${movey}${lastKey}`]) {
          setActionType(
            interactables[currentMap][`${movex}${movey}${lastKey}`],
          );
        } */
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentMap, mapPositionRef, setActionType]);
};
