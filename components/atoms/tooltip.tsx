import { setHoverEvent } from "@/libs/utils/event";
import { useState } from "react";

export default function Tooltip({
  tooltip,
  children,
}: {
  tooltip?: string;
  children: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = useState<string>("");
  return (
    <div className="relative" {...(tooltip && setHoverEvent(setIsHovered))}>
      {children}
      {isHovered && tooltip && (
        <div
          className={`absolute z-30 max-w-60 bg-[rgba(0,0,0,0.85)] p-2.5 text-[11px] wrap-break-word whitespace-nowrap mt-1 text-white ${isHovered}`}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
}
