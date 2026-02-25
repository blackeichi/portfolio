import "server-only";
import { getMarkdownContent } from "@/libs/utils/markdown";
import { sectors } from "./utils";

export async function getResumeMarkdownContents() {
  const contents = await Promise.all(
    sectors.map(async (sector) => ({
      id: sector.id,
      name: sector.name,
      icon: sector.icon,
      content: await getMarkdownContent([
        "public",
        "markdown",
        "resume",
        `${sector.id}.md`,
      ]),
    })),
  );
  return contents;
}
