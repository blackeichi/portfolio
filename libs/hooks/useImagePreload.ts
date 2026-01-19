import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { loadingContentState } from "../atom";

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
