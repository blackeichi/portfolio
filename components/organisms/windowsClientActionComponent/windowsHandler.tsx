import { Dir } from "@/libs/types/state";

function Handler({
  dir,
  onMouseDown,
  className = "",
}: {
  dir: Dir;
  onMouseDown: (dir: Dir, e: React.MouseEvent) => void;
  className?: string;
}) {
  return (
    <div
      onMouseDown={(e) => onMouseDown(dir, e)}
      className={`absolute bg-transparent ${className}`}
    />
  );
}

export const WindowsHandler = ({
  handleResizeStart,
}: {
  handleResizeStart: (dir: Dir, e: React.MouseEvent) => void;
}) => {
  return (
    <>
      <Handler
        dir="top"
        onMouseDown={handleResizeStart}
        className="-top-1 left-1/2 h-1 w-full -translate-x-1/2 cursor-n-resize"
      />
      <Handler
        dir="bottom"
        onMouseDown={handleResizeStart}
        className="-bottom-1 left-1/2 h-1 w-full -translate-x-1/2 cursor-s-resize"
      />
      <Handler
        dir="left"
        onMouseDown={handleResizeStart}
        className="top-1/2 -left-1 h-full w-1 -translate-y-1/2 cursor-w-resize"
      />
      <Handler
        dir="right"
        onMouseDown={handleResizeStart}
        className="top-1/2 -right-1 h-full w-1 -translate-y-1/2 cursor-e-resize"
      />
      <Handler
        dir="top-left"
        onMouseDown={handleResizeStart}
        className="-top-1 -left-1 h-2 w-2 cursor-nw-resize"
      />
      <Handler
        dir="top-right"
        onMouseDown={handleResizeStart}
        className="-top-1 -right-1 h-2 w-2 cursor-ne-resize"
      />
      <Handler
        dir="bottom-left"
        onMouseDown={handleResizeStart}
        className="-bottom-1 -left-1 h-2 w-2 cursor-sw-resize"
      />
      <Handler
        dir="bottom-right"
        onMouseDown={handleResizeStart}
        className="-right-1 -bottom-1 h-2 w-2 cursor-se-resize"
      />
    </>
  );
};
