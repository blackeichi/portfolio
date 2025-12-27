import { WindowsClientActionComponent } from "@/components/organisms/windowsClientActionComponent";
import {
  isFocusedMainState,
  subOpenedBoxInfo,
  subOpenedState,
} from "@/libs/atom";
import {
  DEFAULT_SUB_WINDOW_BOX,
  SUB_WINDOW_LIST,
} from "@/libs/uitls/constants";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

type T_SUB_WINDOW_LIST = keyof typeof SUB_WINDOW_LIST;

export const SubWindow = ({
  parentRef,
}: {
  parentRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [subOpened, setSubOpened] = useAtom(subOpenedState);
  return (
    subOpened && (
      <SubWindowUI
        subOpened={subOpened}
        setSubOpened={setSubOpened}
        parentRef={parentRef}
      />
    )
  );
};

const SubWindowUI = ({
  subOpened,
  setSubOpened,
  parentRef,
}: {
  subOpened: T_SUB_WINDOW_LIST;
  setSubOpened: React.Dispatch<React.SetStateAction<T_SUB_WINDOW_LIST | null>>;
  parentRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const windowBox = useRef<HTMLDivElement | null>(null);
  const [isFocusedMain, setIsFocusedMain] = useAtom(isFocusedMainState);
  const [subBox, setSubBox] = useAtom(subOpenedBoxInfo);
  const [isMax, setIsMax] = useState(false);
  // 컨텐츠 창을 왼쪽 혹은 오른쪽으로 붙였을 때
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    return () => {
      setSubBox(DEFAULT_SUB_WINDOW_BOX);
      setIsFocusedMain(true);
    };
  }, []);
  return (
    <>
      <div
        ref={windowBox}
        className={`absolute flex flex-col border-gray-100 border-r-gray-500 border-b-gray-500 bg-gray-300 ${
          isMax ? "border" : "border-4"
        } ${isFocusedMain ? "z-10" : "z-32"}`}
        style={
          isMax
            ? {
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
              }
            : {
                left: subBox.x,
                top: subBox.y,
                width: subBox.width,
                height: subBox.height,
              }
        }
        onMouseDown={(event) => {
          event.stopPropagation();
          setIsFocusedMain(false);
        }}
      >
        <WindowsClientActionComponent
          title={SUB_WINDOW_LIST[subOpened].title}
          icon={SUB_WINDOW_LIST[subOpened].icon}
          windowBox={windowBox}
          parentRef={parentRef}
          box={subBox}
          setBox={setSubBox}
          isMax={isMax}
          setIsMax={setIsMax}
          isSticky={isSticky}
          setIsSticky={setIsSticky}
          onClose={() => {
            setSubOpened(null);
          }}
          defaultPosition={DEFAULT_SUB_WINDOW_BOX}
        />
        <div className="relative h-full w-full flex-1 overflow-hidden p-4 select-none">
          {/* {children} */}
        </div>
      </div>
      {/* 창의 변경될 사이즈 미리보기 */}
      {isSticky && (
        <div
          className="absolute z-20 h-full bg-white/80"
          style={
            subBox.y === 0
              ? {
                  left: 0,
                  top: 0,
                  width: "100%",
                }
              : {
                  left: subBox.x === 0 ? 0 : "50%",
                  top: 0,
                  width: "50%",
                }
          }
        ></div>
      )}
    </>
  );
};
