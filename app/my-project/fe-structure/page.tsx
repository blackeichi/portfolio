"use client";

import WindowsBox from "@/components/molecules/windowsBox";
import { ContentBox } from "@/components/atoms/contentBox";
import { MarkdownRenderer } from "@/components/organisms/markdownRenderer";

export default function FeStructurePage() {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 items-center w-full h-fit">
      <WindowsBox
        title="🏗️ 프론트엔드 구조"
        style={{ width: "100%", maxWidth: "700px", height: "fit-content" }}
      >
        <div className="w-full h-full p-4">
          <ContentBox style={{ padding: "16px" }}>
            <div className="text-xs sm:text-sm leading-relaxed">
              <MarkdownRenderer markdownPath="/markdown/fe-structure.md" />
            </div>
          </ContentBox>
        </div>
      </WindowsBox>
    </div>
  );
}
