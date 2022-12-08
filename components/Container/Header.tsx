import { motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  const element = useRef<HTMLDivElement>(null);
  const onMoveBox = () => {
    element.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    console.log("header");
  };
  return (
    <div
      onClick={onMoveBox}
      className={cls(
        "fixed z-20 h-16 w-full",
        scrolled ? "shadow-md shadow-gray-800" : "shadow-none"
      )}
      style={{ backgroundColor: scrolled ? bgColor : "transparent" }}
    ></div>
  );
};
