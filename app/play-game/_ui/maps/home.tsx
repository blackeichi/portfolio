import React, { forwardRef, useEffect } from "react";

interface GameHomeProps {
  setImagesLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GameHome = forwardRef<HTMLDivElement, GameHomeProps>(
  ({ setImagesLoaded }, ref) => {
    useEffect(() => {
      const imagePaths = ["/images/game/map.png"];
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
        .catch((error) => {
          console.error("Image loading failed:", error);
        })
        .finally(() => {
          setImagesLoaded(true);
        });
    }, []);
    return (
      <div
        ref={ref}
        className="map absolute left-0 bottom-0 will-change-transform"
        style={{
          width: "400%",
          height: "400%",
          backgroundImage: "url('/images/game/map.png')",
          backgroundSize: "auto 100%",
          transform: `translate(-37.5%, 0%)`,
        }}
      />
    );
  }
);

GameHome.displayName = "GameHome";
