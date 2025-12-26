"use client";

import { usePathname } from "next/navigation";
import { COLOR_THEME } from "@/libs/uitls/constants";
import Link from "next/link";
import { projectContents } from "@/app/my-project/utils";

export const ContentsList = () => {
  const pathname = usePathname();
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
              backgroundColor: isActive ? COLOR_THEME.blue : "transparent",
            }}
          >
            {isActive ? (
              <span className="cursor-default">
                {index + 1}. {content.name}
              </span>
            ) : (
              <Link
                href={content.path}
                className="hover:underline underline-offset-2"
              >
                {index + 1}. {content.name}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};
