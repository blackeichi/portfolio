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
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
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
    <div className="flex min-h-screen flex-col items-center overflow-clip">
      <Header scrolled={scrolled} />
      <FrontCover />
      <motion.div
        className="card-container h-screen w-full bg-black"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false, amount: 0.5 }}
        //amount = 이 div가 얼마나 보였을 때 작동할지
        //부모 div에서 이렇게 설정하고 자식에서 애니메이션 구현
      >
        <motion.div
          className="card h-52 w-52 bg-white"
          variants={cardVariants}
        ></motion.div>
      </motion.div>
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
