import Image from "next/image";

export default function WindowHeader({
  title,
  titleIcon,
  headBtns,
  onMouseDown = (e) => {},
  onDoubleClick = () => {},
}: {
  title?: string;
  titleIcon?: string;
  headBtns?: React.ReactNode;
  onMouseDown?: (e: React.MouseEvent) => void;
  onDoubleClick?: () => void;
}) {
  return (
    <div
      className="flex h-7 w-full shrink-0 items-center justify-between bg-blue-900 px-1 select-none"
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      {title ? (
        <div className="flex items-center gap-2">
          {titleIcon && (
            <Image src={titleIcon} alt="Title Icon" width={16} height={16} />
          )}
          <div className="text-xs font-bold text-white">{title}</div>
        </div>
      ) : null}
      <div
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        className="flex gap-1"
      >
        {headBtns}
      </div>
    </div>
  );
}
