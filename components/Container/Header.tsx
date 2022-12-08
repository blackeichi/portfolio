import { Link } from "react-scroll";
import { color } from "../../styles/color";
import { cls } from "../../utils/utils";

export const Header = ({ scrolled }: any) => {
  return (
    <div
      className={cls(
        "fixed z-20 flex h-16 w-full items-center justify-end px-5",
        scrolled
          ? "text-white shadow-sm shadow-gray-800"
          : "text-gray-400 shadow-none"
      )}
      style={{ backgroundColor: scrolled ? color.bgColor : "transparent" }}
    >
      <Link to="about" spy={true} smooth={true} duration={500}>
        <span>ABOUT ME</span>
      </Link>
    </div>
  );
};
