import { useImagePreload } from "@/app/play-game/hooks";
import Image from "next/image";
import { forwardRef, memo, useLayoutEffect } from "react";

const imagePaths = ["/images/game/map.png"];

export const OutsideMap = memo(
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
          // 6435 x 6435 px
          backgroundImage: "url('/images/game/map.png')",
          backgroundSize: "auto 100%",
        }}
      />
    );
  }),
);

OutsideMap.displayName = "OutsideMap";
