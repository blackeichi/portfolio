import { AboutMe } from "../components/Containers/AboutMe";
import { Header } from "../components/Containers/Header";
import { color } from "../styles/color";
import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { FixedMenu } from "../components/Components/FixedMenu";
import { Project } from "../components/Containers/Project";
import { FrontCover } from "../components/Containers/FrontCover";

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
      <FrontCover />
      <div
        className="z-10 min-h-screen w-full"
        style={{ backgroundColor: color.bgColor }}
      >
        <AboutMe />
      </div>
      {/* 
      <div
        className="items-cente flex w-full flex-col"
        style={{ backgroundColor: color.grayColor }}
      >
        <Project />
        <div className="h-screen w-full bg-green-500"></div>
      </div> */}
      <FixedMenu scrolled={scrolled} />
    </div>
  );
}
