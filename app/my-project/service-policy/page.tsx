"use client";

import { MarkdownRenderer } from "@/components/organisms/markdownRenderer";

export default function ServicePolicyPage() {
  return (
    <div className="text-xs sm:text-sm leading-relaxed w-full h-fit p-6 justify-center flex box-border">
      <div className="w-full max-w-200">
        <MarkdownRenderer markdownPath="/markdown/project/service-policy.md" />
      </div>
    </div>
  );
}
