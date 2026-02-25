"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSetAtom } from "jotai";
import { confirmMsgState, isFocusedMainState, loadingState } from "@/libs/atom";
import WindowTemplateFooter from "./windowTemplateFooter";
import MouseLoading from "./mouseLoading";
import HomeIcons from "./homeIcons";
import { MENU_LIST_DATA } from "@/libs/utils/constants";
import WindowTemplateMain from "./windowTemplateMain";
import { SubWindow } from "./subWindow";

export const RootTemplate = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname().split("/")[1];
  const setConfirmMsg = useSetAtom(confirmMsgState);
  const setLoading = useSetAtom(loadingState);
  const setIsFocusedMain = useSetAtom(isFocusedMainState);
  const parentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setLoading(false);
    setIsFocusedMain(true);
  }, [pathname, setLoading, setIsFocusedMain]);
  useEffect(() => {
    const alreadyAsked = localStorage.getItem("hideFullscreenPrompt");
    if (!alreadyAsked) {
      setConfirmMsg({
        title: "전체 화면",
        message: "전체 화면 모드를 실행하시겠습니까?",
        confirmEvent: () => {
          document.documentElement.requestFullscreen();
          localStorage.setItem("hideFullscreenPrompt", "true");
        },
        cancelEvent: () => {
          localStorage.setItem("hideFullscreenPrompt", "true");
        },
      });
    }
  }, [setConfirmMsg]);
  return (
    <main className="relative flex h-full w-full flex-col justify-center overflow-hidden">
      <div className="relative h-full w-full overflow-hidden" ref={parentRef}>
        {MENU_LIST_DATA?.[pathname] && (
          <WindowTemplateMain parentRef={parentRef} pathname={pathname}>
            {children}
          </WindowTemplateMain>
        )}
        <HomeIcons />
        <SubWindow parentRef={parentRef} />
      </div>
      {/* 윈도우즈 바닥 메뉴바 */}
      <WindowTemplateFooter />
      {/* 마우스 위치의 로딩 아이콘 - 라우팅하는 동안 보여짐 */}
      <MouseLoading />
    </main>
  );
};
