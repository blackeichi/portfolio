import { IconType } from "react-icons";
import Tooltip from "../atoms/tooltip";
import { useState } from "react";

export default function IconButton({
  icon,
  size,
  onClick,
  tooltip,
  width,
  height,
  disabled = false,
  className = "",
  color,
  bgColor,
}: {
  icon: IconType;
  size?: number;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  tooltip?: string;
  width?: number;
  height?: number;
  disabled?: boolean;
  className?: string;
  color?: string;
  bgColor?: string;
}) {
  const [isTab, setIsTab] = useState(false);
  return (
    <Tooltip tooltip={tooltip}>
      <div
        className={`flex items-center justify-center border-2 border-gray-100 border-r-gray-500 border-b-gray-500 bg-gray-300 ${
          disabled
            ? "cursor-not-allowed text-gray-500"
            : "cursor-pointer text-gray-800"
        } ${className} ${isTab ? "border-gray-500 p-0.5" : ""}`}
        onClick={disabled ? () => {} : onClick}
        onMouseDown={() => {
          if (!disabled) setIsTab(true);
        }}
        onMouseUp={() => setIsTab(false)}
        onMouseLeave={() => setIsTab(false)}
        style={{
          width: `${width || 20}px`,
          height: `${height || 20}px`,
          backgroundColor: bgColor,
        }}
      >
        {icon({ size, color })}
      </div>
    </Tooltip>
  );
}
