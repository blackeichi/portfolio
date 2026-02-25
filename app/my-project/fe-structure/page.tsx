import { MarkdownRendererServer } from "@/components/organisms/markdownRendererServer";
import { getMarkdownContent } from "@/libs/utils/markdown";

export default async function FeStructurePage() {
  const content = await getMarkdownContent([
    "public",
    "markdown",
    "project",
    "fe-structure.md",
  ]);

  return (
    <div className="text-xs sm:text-sm leading-relaxed w-full h-fit p-6 justify-center flex box-border">
      <div className="w-full max-w-200">
        <MarkdownRendererServer content={content} />
      </div>
    </div>
  );
}
