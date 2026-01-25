import { useImagePreload } from "@/app/play-game/hooks";
import { forwardRef, memo, useLayoutEffect } from "react";
import { PersonObj } from "./personObj";
import { PersonObjTwo } from "./personObjTwo";

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
        className="map absolute left-0 bottom-0 will-change-transform w-[400%] h-[400%]"
        style={{
          // 6435 x 6435 px
          backgroundImage: "url('/images/game/map.png')",
          backgroundSize: "auto 100%",
        }}
      >
        <PersonObj />
        <PersonObjTwo />
      </div>
    );
  }),
);

OutsideMap.displayName = "OutsideMap";
