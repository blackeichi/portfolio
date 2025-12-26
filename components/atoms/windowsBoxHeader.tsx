import Image from "next/image";
import { useState } from "react";

export default function WindowBoxHeader({
  title,
  titleIcon,
  headBtns,
  onMouseDown = () => {},
  onDoubleClick = () => {},
  isMax,
}: {
  title?: string;
  titleIcon?: string;
  headBtns?: React.ReactNode;
  onMouseDown?: (e: React.MouseEvent) => void;
  onDoubleClick?: () => void;
  isMax?: boolean;
}) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  return (
    <div
      className="flex h-7 w-full shrink-0 items-center justify-between bg-blue-900 px-1 select-none"
      {...(isMax
        ? {
            onMouseDown: (e) => {
              setPosition({ x: e.clientX, y: e.clientY });
            },
            ...(position
              ? {
                  onMouseMove: (e) => {
                    if (
                      Math.abs(position.x - e.clientX) > 5 ||
                      Math.abs(position.y - e.clientY) > 5
                    ) {
                      onMouseDown(e);
                    }
                  },
                }
              : {}),
          }
        : { onMouseDown })}
      onDoubleClick={onDoubleClick}
      onMouseUp={() => {
        setPosition(null);
      }}
    >
      {title ? (
        <div className="flex items-center gap-2">
          {titleIcon && (
            <Image src={titleIcon} alt="Title Icon" width={16} height={16} />
          )}
          <div className="text-xs font-bold text-white">{title}</div>
        </div>
      ) : null}
      {headBtns && (
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          className="flex gap-1"
        >
          {headBtns}
        </div>
      )}
    </div>
  );
}
