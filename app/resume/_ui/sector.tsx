"use client";

import { MarkdownRendererServer } from "@/components/organisms/markdownRendererServer";
import { SectorTitle } from "./sectorTitle";
import { useState } from "react";

export const Sector = ({
  sector,
}: {
  sector: { id: string; name: string; content: string };
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div id={sector.id} className="flex flex-col gap-4 w-full scroll-mt-4">
      <SectorTitle
        title={sector.name}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="pl-4">
          <MarkdownRendererServer content={sector.content} />
        </div>
      )}
    </div>
  );
};
