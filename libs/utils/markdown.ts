import "server-only";
import { join } from "path";
import { readFile } from "fs/promises";

export async function getMarkdownContent(pathList: string[]): Promise<string> {
  try {
    const filePath = join(process.cwd(), ...pathList);
    const content = await readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Failed to load markdown for ${pathList.join("/")}:`, error);
    return "";
  }
}
