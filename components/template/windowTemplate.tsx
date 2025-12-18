"use client";

import { useEffect } from "react";
import WindowTemplateFooter from "../organisms/windowTemplateFooter";
import { usePathname } from "next/navigation";
import { useSetAtom } from "jotai";
import { loadingState } from "@/libs/atom";
import MouseLoading from "../atoms/mouseLoading";

export const WindowTemplate = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const setLoading = useSetAtom(loadingState);
  useEffect(() => {
    setLoading(false);
  }, [pathname, setLoading]);
  return (
    <main className="relative flex h-full w-full flex-col justify-center overflow-hidden">
      <div className="relative h-full w-full overflow-hidden">{children}</div>
      {/* 윈도우즈 바닥 메뉴바 */}
      <WindowTemplateFooter />
      {/* 마우스 위치의 로딩 아이콘 - 라우팅하는 동안 보여짐 */}
      <MouseLoading />
    </main>
  );
};
