import { useImagePreload } from "@/libs/hooks/useImagePreload";
import { forwardRef, memo } from "react";

export const House = memo(
  forwardRef<HTMLDivElement>((_, ref) => {
    const imagePaths = ["/images/game/houseMap.png"];
    useImagePreload({ imagePaths });
    return (
      <div
        ref={ref}
        className="map absolute left-0 bottom-0 will-change-transform"
        style={{
          width: "400%",
          height: "400%",
          backgroundImage: "url('/images/game/houseMap.png')",
          backgroundSize: "auto 100%",
          transform: `translate(-37.5%, 37.5%)`,
        }}
      />
    );
  }),
);

House.displayName = "House";
