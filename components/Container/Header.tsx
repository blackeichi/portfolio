import { motion, useScroll } from "framer-motion";
import { Link } from "react-scroll";
import { useEffect, useState } from "react";
import { bgColor } from "../../styles/color";
import { cls } from "../../utils/utils";

export const Header = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScroll] = useState(false);
  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > 95) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }, []);
  return (
    <div
      className={cls(
        "fixed z-20 h-16 w-full",
        scrolled ? "shadow-md shadow-gray-800" : "shadow-none"
      )}
      style={{ backgroundColor: scrolled ? bgColor : "transparent" }}
    >
      <Link to="test" spy={true} smooth={true} duration={300}>
        <span>이동하기</span>
      </Link>
    </div>
  );
};
