import { useState } from "react";
import { color } from "../../styles/color";
import { cls } from "../../utils/utils";
import { Menu } from "../Components/Menu";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const Header = ({ scrolled }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cls(
        "fixed z-40 flex h-12 w-full items-center justify-end text-lg text-white sm:h-10 md:px-4",
        scrolled ? "md:bg-zinc-800" : ""
      )}
    >
      <div className="hidden gap-5 md:flex">
        <Menu to={"about"} text={"ABOUT ME"} scrolled={scrolled} />
        <Menu to={"project"} text={"PROJECT"} scrolled={scrolled} />
        <Menu to={"coverletter"} text={"COVER LETTER"} scrolled={scrolled} />
        <Menu to={"regards"} text={"B.REGARDS"} scrolled={scrolled} />
      </div>
      <div className="absolute top-0 z-20 flex h-12 w-full items-center justify-end bg-transparent px-3 sm:h-16 md:hidden">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ delay: 0.1, duration: 0.2 }}
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          className="flex aspect-square w-8 cursor-pointer items-center justify-center rounded-xl bg-white text-gray-900 hover:bg-gray-300 sm:w-10 sm:rounded-2xl"
        >
          <FontAwesomeIcon icon={faBars} />
        </motion.div>
      </div>
      <motion.div
        initial={{ top: 0 }}
        animate={{ top: open ? 0 : -300 }}
        transition={{ duration: 0.5 }}
        className="absolute left-0 z-10 flex w-full flex-col items-start justify-center gap-5 border-b-2 border-white bg-zinc-800 py-5 pt-16 pl-5 md:hidden"
      >
        <Menu to={"about"} text={"ABOUT ME"} scrolled={scrolled} />
        <Menu to={"project"} text={"PROJECT"} scrolled={scrolled} />
        <Menu to={"coverletter"} text={"COVER LETTER"} scrolled={scrolled} />
        <Menu to={"regards"} text={"B.REGARDS"} scrolled={scrolled} />
      </motion.div>
    </div>
  );
};
