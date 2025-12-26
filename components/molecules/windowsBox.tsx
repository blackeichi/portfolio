import { COLOR_THEME } from "@/libs/uitls/constants";
import WindowBoxHeader from "../atoms/windowsBoxHeader";

export default function WindowsBox({
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
  return (
    <div
      className="flex flex-col border-4 border-gray-100 border-r-gray-500 border-b-gray-500"
      style={{ width: `${width}px`, height: `${height}px`, ...style }}
    >
      <WindowBoxHeader
        title={title}
        titleIcon={titleIcon}
        headBtns={headBtns}
        style={{
          backgroundColor: COLOR_THEME.darkGray,
        }}
      />
      <div
        className={`h-full w-full ${
          needScroll ? "overflow-scroll" : "overflow-hidden"
        } flex items-center justify-center bg-gray-300`}
      >
        {children}
      </div>
    </div>
  );
}
