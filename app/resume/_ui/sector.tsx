import { MarkdownRendererServer } from "@/components/organisms/markdownRendererServer";

export const Sector = ({
  sector,
}: {
  sector: { id: string; name: string; content: string };
}) => {
  return (
    <div id={sector.id} className="flex flex-col gap-4 w-full scroll-mt-4">
      <div className="flex items-center gap-2 select-none">
        <h2 className="font-bold text-blue-800 text-2xl sm:text-3xl">
          {sector.name}
        </h2>
        <div className="flex-1 h-px bg-gray-300" />
      </div>
      <div className="pl-4">
        <MarkdownRendererServer content={sector.content} />
      </div>
    </div>
  );
};
