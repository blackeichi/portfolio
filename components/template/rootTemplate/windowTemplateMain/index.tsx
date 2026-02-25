import { useRef, useState } from "react";
import { Position } from "@/libs/types/state";
import { DEFAULT_WINDOW_BOX, MENU_LIST_DATA } from "@/libs/utils/constants";
import { WindowsClientActionComponent } from "@/components/organisms/windowsClientActionComponent";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { isFocusedMainState } from "@/libs/atom";

export default function WindowTemplateMain({
  parentRef,
  children,
  pathname,
}: {
  parentRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
  pathname: string;
}) {
  const windowBox = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const setIsFocusedMain = useSetAtom(isFocusedMainState);
  const [box, setBox] = useState<Position>({
    x: 0,
    y: 0,
    width: DEFAULT_WINDOW_BOX.windowWidth,
    height: DEFAULT_WINDOW_BOX.windowHeight,
  });
  const [isMax, setIsMax] = useState(true);
  // 컨텐츠 창을 왼쪽 혹은 오른쪽으로 붙였을 때
  const [isSticky, setIsSticky] = useState(false);
  return (
    <>
      <div
        ref={windowBox}
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
        onMouseDown={(event) => {
          event.stopPropagation();
          setIsFocusedMain(true);
        }}
      >
        <WindowsClientActionComponent
          title={MENU_LIST_DATA[pathname]?.title}
          icon={MENU_LIST_DATA[pathname]?.icon}
          windowBox={windowBox}
          parentRef={parentRef}
          box={box}
          setBox={setBox}
          isMax={isMax}
          setIsMax={setIsMax}
          isSticky={isSticky}
          setIsSticky={setIsSticky}
          onClose={() => {
            router.push("/");
          }}
        />
        <div className="relative h-full w-full flex-1 overflow-hidden p-4 select-none">
          {children}
        </div>
      </div>
      {/* 창의 변경될 사이즈 미리보기 */}
      {isSticky && (
        <div
          className="absolute z-20 h-full bg-white/80"
          style={
            box.y === 0
              ? {
                  left: 0,
                  top: 0,
                  width: "100%",
                }
              : {
                  left: box.x === 0 ? 0 : "50%",
                  top: 0,
                  width: "50%",
                }
          }
        ></div>
      )}
    </>
  );
}
