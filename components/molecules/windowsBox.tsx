import { COLOR_THEME } from "@/libs/utils/constants";
import WindowBoxHeader from "../atoms/windowsBoxHeader";
import { memo, useMemo } from "react";

function WindowsBox({
  width = 200,
  height = 200,
  children,
  title,
  titleIcon,
  headBtns,
  needScroll = false,
  style,
}: {
  width?: number;
  height?: number;
  children?: React.ReactNode;
  title?: string;
  titleIcon?: string;
  headBtns?: React.ReactNode;
  needScroll?: boolean;
  style?: React.CSSProperties;
}) {
  const containerStyle = useMemo(
    () => ({ width: `${width}px`, height: `${height}px`, ...style }),
    [width, height, style],
  );

  const headerStyle = useMemo(
    () => ({ backgroundColor: COLOR_THEME.darkGray }),
    [],
  );

  const contentClassName = useMemo(
    () =>
      `h-full w-full ${
        needScroll ? "overflow-scroll" : "overflow-hidden"
      } flex items-center justify-center bg-gray-300`,
    [needScroll],
  );

  return (
    <div
      className="flex flex-col border-4 border-gray-100 border-r-gray-500 border-b-gray-500"
      style={containerStyle}
    >
      <WindowBoxHeader
        title={title}
        titleIcon={titleIcon}
        headBtns={headBtns}
        style={headerStyle}
      />
      <div className={contentClassName}>{children}</div>
    </div>
  );
}

export default memo(WindowsBox);
