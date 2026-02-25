import { MarkdownRendererServer } from "@/components/organisms/markdownRendererServer";
import { getMarkdownContent } from "@/libs/utils/markdown";

export const FunctionDescription = async () => {
  const content = await getMarkdownContent([
    "public",
    "markdown",
    "project",
    "function-description.md",
  ]);

  return (
    <div className="my-5">
      <MarkdownRendererServer content={content} />
    </div>
  );
};
