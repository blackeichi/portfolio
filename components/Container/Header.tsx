import { color } from "../../styles/color";
import { cls } from "../../utils/utils";
import { Menu } from "../Component/Menu";

export const Header = ({ scrolled }: any) => {
  return (
    <div
      className={cls(
        "fixed z-20 flex h-16 w-full items-center justify-end gap-5 px-5",
        scrolled
          ? "text-white shadow-sm shadow-gray-800"
          : "text-gray-400 shadow-none"
      )}
      style={{ backgroundColor: scrolled ? "rgba(0,0,0,0.6)" : "transparent" }}
    >
      <Menu to={"about"} text={"ABOUT ME"} scrolled={scrolled} />
      <Menu to={"about"} text={"ABOUT ME"} scrolled={scrolled} />
      <Menu to={"about"} text={"ABOUT ME"} scrolled={scrolled} />
    </div>
  );
};
