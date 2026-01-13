"use client";

import { ContentBox } from "@/components/atoms/contentBox";
import { ContentsList } from "./contentsList";

export const MyInfoTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full gap-4 flex">
      <ContentsList />
      <ContentBox>{children}</ContentBox>
    </div>
  );
};
