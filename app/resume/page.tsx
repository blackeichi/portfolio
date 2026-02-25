import { Metadata } from "next";
import { Sector } from "./_ui/sector";
import { getResumeMarkdownContents } from "./serverUtils";

export const metadata: Metadata = {
  title: "내 이력서",
};

export default async function MyInfoPage() {
  const sectorsWithContent = await getResumeMarkdownContents();

  return (
    <div className="flex flex-col gap-10 p-2 w-full">
      {sectorsWithContent.map((sector) => (
        <Sector key={sector.id} sector={sector} />
      ))}
    </div>
  );
}
