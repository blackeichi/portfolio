"use client";

import { MarkdownRenderer } from "@/components/organisms/markdownRenderer";

export const FunctionDescription = () => {
  return (
    <div className="my-5">
      <MarkdownRenderer markdownPath="/markdown/function-description.md" />
    </div>
  );
};
