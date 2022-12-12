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
        "fixed z-40 flex h-12 w-full items-center justify-end text-lg sm:h-16 lg:px-5",
        scrolled
          ? "bg-zinc-800 text-white"
          : "bg-zinc-800 text-white lg:bg-transparent lg:text-gray-400"
      )}
    >
      <div className="hidden gap-5 lg:flex">
        <Menu to={"about"} text={"ABOUT ME"} scrolled={scrolled} />
        <Menu to={"about"} text={"ABOUT ME"} scrolled={scrolled} />
        <Menu to={"about"} text={"ABOUT ME"} scrolled={scrolled} />
      </div>
      <div className="absolute top-0 z-20 flex h-12 w-full items-center justify-end bg-zinc-800 px-5 sm:h-16 lg:hidden">
        <div
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          className="flex aspect-square w-8 cursor-pointer items-center justify-center rounded-xl bg-white text-gray-900 hover:bg-gray-300 sm:w-10 sm:rounded-2xl"
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: open ? 0 : -200 }}
        transition={{ duration: 0.3 }}
        className="absolute top-12 left-0 z-10 flex w-full flex-col items-start justify-center gap-5 border-b-2 border-white bg-zinc-800 py-3 pl-5 sm:top-16 lg:hidden"
      >
        <Menu to={"about"} text={"ABOUT ME"} scrolled={scrolled} />
        <Menu to={"about"} text={"ARCHIVING"} scrolled={scrolled} />
        <Menu to={"about"} text={"PROJECT"} scrolled={scrolled} />
      </motion.div>
    </div>
  );
};
