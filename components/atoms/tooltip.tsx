import { setHoverEvent } from "@/libs/utils/event";
import { useState } from "react";

interface TooltipPosition {
  visible: boolean;
  style: React.CSSProperties;
}

export default function Tooltip({
  tooltip,
  children,
}: {
  tooltip?: string;
  children: React.ReactNode;
}) {
  const [position, setPosition] = useState<TooltipPosition>({
    visible: false,
    style: {},
  });

  return (
    <div
      id="tooltip-wrapper"
      className="relative"
      {...(tooltip && setHoverEvent(setPosition))}
    >
      {children}
      {position.visible && tooltip && (
        <div
          id="tooltip-content"
          className="absolute z-30 max-w-60 bg-[rgba(0,0,0,0.85)] p-2.5 text-[11px] text-white break-words"
          style={position.style}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
}
