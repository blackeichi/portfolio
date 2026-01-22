import { useImagePreload } from "@/app/play-game/hooks";
import { forwardRef, memo, useLayoutEffect } from "react";

const imagePaths = ["/images/game/houseMap.png"];

export const House = memo(
  forwardRef<
    HTMLDivElement,
    { mapPositionRef: React.MutableRefObject<{ movex: number; movey: number }> }
  >(({ mapPositionRef }, ref) => {
    useImagePreload({ imagePaths });
    useLayoutEffect(() => {
      const target = document.querySelector(".map") as HTMLElement;
      if (target) {
        target.style.transform = `translate(${-mapPositionRef.current.movex}%, ${-mapPositionRef.current.movey}%)`;
      }
    }, []);
    return (
      <div
        ref={ref}
        className="map absolute left-0 bottom-0 will-change-transform"
        style={{
          width: "400%",
          height: "400%",
          backgroundImage: "url('/images/game/houseMap.png')",
          backgroundSize: "auto 100%",
        }}
      />
    );
  }),
);

House.displayName = "House";
