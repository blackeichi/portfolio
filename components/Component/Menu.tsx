import { Link } from "react-scroll";
import { cls } from "../../utils/utils";

type TMenu = {
  to: string;
  text: string;
  scrolled: boolean;
};

export const Menu = ({ to, text, scrolled }: TMenu) => {
  return (
    <div
      className={cls(
        "cursor-pointer",
        scrolled
          ? "hover:text-red-400"
          : "hover:text-red-400 lg:hover:text-white"
      )}
    >
      <Link to={to} spy={true} smooth={true} duration={500}>
        <span>{text}</span>
      </Link>
    </div>
  );
};
