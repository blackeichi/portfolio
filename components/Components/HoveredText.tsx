import { motion } from "framer-motion";
import { useState } from "react";
import { color } from "../../styles/color";
import { cls } from "../../utils/utils";

type Type = {
  text: string;
  btn?: boolean;
  large?: boolean;
};

export const HoveredText = ({ text, btn = false, large = false }: Type) => {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className={cls(
        "relative overflow-hidden",
        btn ? "py-2 px-2 shadow-lg" : ""
      )}
    >
      <h1>{text}</h1>
      <motion.div
        className={cls("absolute top-0 -z-10 h-full w-full")}
        style={{ backgroundColor: color.brown }}
        initial={{ x: large ? -250 : -150 }}
        animate={{ x: hover ? (btn ? -10 : 0) : large ? -250 : -150 }}
        transition={{ duration: 0.4, type: "tween" }}
      />
    </motion.div>
  );
};
