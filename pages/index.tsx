import { AboutMe } from "../components/Container/AboutMe";
import { Header } from "../components/Container/Header";
import { Intro } from "../components/Container/intro";
import { color } from "../styles/color";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";
import { cls } from "../utils/utils";

export default function Home() {
  const { scrollY } = useScroll();
  const [scrolled, setScroll] = useState(false);
  const [bigscrolled, setBigScroll] = useState(false);
  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > 150) {
        setScroll(true);
      } else {
        setScroll(false);
      }
      if (latest > 450) {
        setBigScroll(true);
      } else {
        setBigScroll(false);
      }
    });
  }, []);
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header scrolled={scrolled} />
      <Intro scrolled={scrolled} bigscrolled={bigscrolled} />
      <div
        className="items-cente flex w-full flex-col"
        style={{ backgroundColor: color.grayColor }}
      >
        <AboutMe />
      </div>
      <div className="fixed bottom-2 right-2 z-30 sm:bottom-10 sm:right-10">
        <Link to={"init"} spy={true} smooth={true} duration={500}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: scrolled ? 1 : 0 }}
            transition={{ duration: 0.1 }}
            className={cls(
              "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-gray-500 bg-white text-xl shadow-md shadow-gray-700 duration-200 hover:bg-gray-200 sm:h-16 sm:w-16 sm:text-3xl"
            )}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
