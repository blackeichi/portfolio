"use client";

import { ContentBox } from "@/components/atoms/contentBox";
import { ContentsList } from "./contentsList";

export const MyInfoTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full gap-4 flex">
      <div className="w-[30%] min-w-30 max-w-50 pl-2 sm:pl-6">
        <ContentsList />
      </div>
      <ContentBox>
        <div className="flex p-6 w-full justify-center">
          <div className="w-full max-w-300">{children}</div>
        </div>
      </ContentBox>
    </div>
  );
};
