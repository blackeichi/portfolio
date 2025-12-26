"use client";

import { usePathname, useRouter } from "next/navigation";
import { COLOR_THEME } from "@/libs/uitls/constants";
import { projectContents } from "@/app/my-project/utils";
import { useSetAtom } from "jotai";
import { loadingState, mousePositionState } from "@/libs/atom";
import { useEffect } from "react";

export const ContentsList = () => {
  const pathname = usePathname();
  const router = useRouter();
  const setLoading = useSetAtom(loadingState);
  const setMousePosition = useSetAtom(mousePositionState);
  useEffect(() => {
    setLoading(false);
  }, [pathname, setLoading]);
  return (
    <ul className="flex flex-col gap-2 w-full">
      {projectContents.map((content, index) => {
        const isActive = pathname === content.path;
        return (
          <li
            key={content.path}
            className={`w-full p-1 py-1.5 text-sm ${
              isActive ? "font-bold text-white" : ""
            }`}
            style={{
              backgroundColor: isActive ? COLOR_THEME.darkGray : "transparent",
            }}
          >
            {isActive ? (
              <span className="cursor-default">
                {index + 1}. {content.name}
              </span>
            ) : (
              <div
                className="hover:underline underline-offset-2 cursor-pointer"
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  if (window.location.pathname !== content.path) {
                    setMousePosition({ x: event.clientX, y: event.clientY });
                    setLoading(true);
                    router.push(content.path);
                  }
                }}
              >
                {index + 1}. {content.name}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};
