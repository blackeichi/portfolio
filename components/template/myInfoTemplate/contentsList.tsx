"use client";

import { sectors } from "@/app/resume/utils";

export const ContentsList = () => {
  return (
    <ul className="flex flex-col gap-2">
      {sectors.map((sector) => {
        return (
          <li key={sector.id} className="w-full p-1 py-1.5 text-sm">
            <button
              className="hover:underline underline-offset-2 cursor-pointer w-full text-left"
              onClick={() => {
                const element = document.getElementById(sector.id);
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              {sector.icon} {sector.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
