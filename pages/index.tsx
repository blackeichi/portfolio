import { AboutMe } from "../components/Page/AboutMe";
import { Header } from "../components/Page/Header";
import { color } from "../styles/color";
import { motion, useScroll, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { FixedMenu } from "../components/Components/FixedMenu";
import { Project } from "../components/Page/Project";
import { FrontCover } from "../components/Page/FrontCover";
import { Story } from "../components/Page/Story";
import { Regards } from "../components/Page/Regards";

const cardVariants: Variants = {
  offscreen: {
    y: 300,
    opacity: 0,
  },
  onscreen: {
    y: 50,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.8,
    },
  },
};
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
    <div className="flex min-h-screen flex-col items-center overflow-clip text-zinc-700">
      <Header scrolled={scrolled} />
      <FrontCover />

      <div className="z-10 w-full" style={{ backgroundColor: color.bgColor }}>
        <AboutMe />
        <Project />
        <Story />
        <Regards />
      </div>
      <FixedMenu scrolled={scrolled} />
    </div>
  );
}
