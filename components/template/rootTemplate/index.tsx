"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSetAtom } from "jotai";
import { loadingState } from "@/libs/atom";
import WindowTemplateFooter from "./windowTemplateFooter";
import MouseLoading from "./mouseLoading";
import HomeIcons from "./homeIcons";
import { MENU_LIST_DATA } from "@/libs/uitls/constants";
import WindowTemplateMain from "./windowTemplateMain";
import { SubWindow } from "./subWindow";

export const RootTemplate = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname().split("/")[1];
  const setLoading = useSetAtom(loadingState);
  const parentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setLoading(false);
  }, [pathname, setLoading]);
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
