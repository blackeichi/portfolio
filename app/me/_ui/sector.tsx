"use client";

import { MarkdownRenderer } from "@/components/organisms/markdownRenderer";
import { SectorTitle } from "./sectorTitle";
import { useState } from "react";

export const Sector = ({
  sector,
}: {
  sector: { id: string; name: string };
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
          <MarkdownRenderer markdownPath={`/markdown/me/${sector.id}.md`} />
        </div>
      )}
    </div>
  );
};
