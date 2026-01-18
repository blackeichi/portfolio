import { useEffect, useState } from "react";

export const useImagePreload = ({ imagePaths }: { imagePaths: string[] }) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
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
        setImagesLoaded(true);
      })
      .catch((error) => {
        console.error("Image loading failed:", error);
        // 실패해도 게임은 보여줌 (선택적)
        setImagesLoaded(true);
      });
  }, []);

  // 이미지 로딩 중일 때 로딩 화면 표시
  if (!imagesLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900 mx-auto mb-4"></div>
          <p className="text-lg">Loading game assets...</p>
        </div>
      </div>
    );
  }
};
