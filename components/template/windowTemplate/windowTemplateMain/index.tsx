import { useState } from "react";
import { Position } from "@/libs/types/state";
import { ClientActionComponent } from "./clientActionComponent";

export default function WindowTemplateMain({
  parentRef,
  children,
  pathname,
}: {
  parentRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
  pathname: string;
}) {
  const [box, setBox] = useState<Position>({
    x: 0,
    y: 0,
    width: 400,
    height: 400,
  });
  const [isMax, setIsMax] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  return (
    <>
      <div
        className={`absolute z-30 flex flex-col border-gray-100 border-r-gray-500 border-b-gray-500 bg-gray-300 ${
          isMax ? "border" : "border-4"
        }`}
        style={
          isMax
            ? {
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
              }
            : { left: box.x, top: box.y, width: box.width, height: box.height }
        }
      >
        <ClientActionComponent
          pathname={pathname}
          parentRef={parentRef}
          box={box}
          setBox={setBox}
          isMax={isMax}
          setIsMax={setIsMax}
          isSticky={isSticky}
          setIsSticky={setIsSticky}
        />
        <div className="relative h-full w-full flex-1 overflow-hidden p-4 pr-0.5 pb-0.5 select-none">
          <div className="h-full w-full overflow-scroll pr-1 pb-1">
            <div className="flex min-h-full min-w-full border-3 border-gray-500 border-r-gray-100 border-b-gray-100 bg-white">
              {children}
            </div>
          </div>
        </div>
      </div>
      {isSticky && (
        <div
          className="absolute z-20 w-1/2 h-full bg-white/80"
          style={{
            left: box.x === 0 ? 0 : "50%",
            top: 0,
          }}
        ></div>
      )}
    </>
  );
}
