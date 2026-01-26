import { useEffect, useState } from "react";
import { ARROW_KEYS, CHARACTER_ID, interactables } from "./_ui/utils";
import { useSetAtom } from "jotai";
import { loadingContentState } from "./atoms";

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
  actionType,
  setActionType,
}: {
  mapPositionRef: React.MutableRefObject<{ movex: number; movey: number }>;
  currentMap: string;
  actionType: string | null;
  setActionType: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (actionType) return;
        const { movex, movey } = mapPositionRef.current;
        const roundedMovex = Math.round(movex * 2) / 2;
        const roundedMovey = Math.round(movey * 2) / 2;
        const characterClass =
          document
            .getElementById(CHARACTER_ID)
            ?.className.split(" ")
            .slice(1)
            .filter((cls) => cls !== "run")
            .join("") || "front";
        if (
          interactables[currentMap][
            `${roundedMovex}${roundedMovey}${characterClass}`
          ]
        ) {
          setActionType(
            interactables[currentMap][
              `${roundedMovex}${roundedMovey}${characterClass}`
            ],
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentMap, mapPositionRef, actionType, setActionType]);
};

export const useImagePreload = ({ imagePaths }: { imagePaths: string[] }) => {
  const setLoadingContent = useSetAtom(loadingContentState);
  // 이미지 프리로드 (완료 대기)
  useEffect(() => {
    const promises = imagePaths.map((src) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          resolve();
        };
        img.onerror = () => {
          reject(new Error(`Failed to load ${src}`));
        };
        img.src = src;
      });
    });
    Promise.all(promises)
      .then(() => {
        setLoadingContent(false);
      })
      .catch((error) => {
        console.error("Image loading failed:", error);
        // 실패해도 게임은 보여줌 (선택적)
        setLoadingContent(false);
      });
  }, [imagePaths, setLoadingContent]);
};
