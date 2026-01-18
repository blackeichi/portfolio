import { useImagePreload } from "@/libs/hooks/useImagePreload";
import { forwardRef } from "react";

export const GameHome = forwardRef<HTMLDivElement>((_, ref) => {
  const imagePaths = ["/images/game/map.png"];
  useImagePreload({ imagePaths });
  return (
    <div
      ref={ref}
      className="map absolute left-0 bottom-0 will-change-transform"
      style={{
        width: "400%",
        height: "400%",
        // 6435 x 6435 px
        backgroundImage: "url('/images/game/map.png')",
        backgroundSize: "auto 100%",
        transform: `translate(-37.5%, 0%)`,
      }}
    />
  );
});

GameHome.displayName = "GameHome";
