import { IconType } from "react-icons";
import { useState, useCallback, useMemo, memo } from "react";
import Tooltip from "../atoms/tooltip";

function IconButton({
  icon,
  size,
  onClick,
  tooltip,
  width,
  height,
  disabled = false,
  className = "",
}: {
  icon: IconType;
  size?: number;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tooltip?: string;
  width?: number;
  height?: number;
  disabled?: boolean;
  className?: string;
}) {
  const [isTab, setIsTab] = useState(false);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        onClick(event);
      }
    },
    [disabled, onClick],
  );

  const handleMouseDown = useCallback(() => {
    if (!disabled) setIsTab(true);
  }, [disabled]);

  const handleMouseUp = useCallback(() => {
    setIsTab(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsTab(false);
  }, []);

  const buttonClassName = useMemo(
    () =>
      `flex items-center justify-center border-2 border-gray-100 border-r-gray-500 border-b-gray-500 bg-gray-300 ${
        disabled
          ? "cursor-not-allowed text-gray-500"
          : "cursor-pointer text-gray-800"
      } ${className} ${isTab ? "border-gray-500 p-0.5" : ""}`,
    [disabled, className, isTab],
  );

  const buttonStyle = useMemo(
    () => ({
      width: `${width || 20}px`,
      height: `${height || 20}px`,
    }),
    [width, height],
  );

  const iconElement = useMemo(() => icon({ size }), [icon, size]);

  return (
    <Tooltip tooltip={tooltip}>
      <button
        id="icon-button"
        className={buttonClassName}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={buttonStyle}
      >
        {iconElement}
      </button>
    </Tooltip>
  );
}

export default memo(IconButton);
