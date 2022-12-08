import { AboutMe } from "../components/Container/AboutMe";
import { Header } from "../components/Container/Header";
import { Intro } from "../components/Container/intro";
import { color } from "../styles/color";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const { scrollY } = useScroll();
  const [scrolled, setScroll] = useState(false);
  const [bigscrolled, setBigScroll] = useState(false);
  useEffect(() => {
    return scrollY.onChange((latest) => {
      console.log(latest);
      if (latest > 150) {
        setScroll(true);
      } else {
        setScroll(false);
      }
      if (latest > 350) {
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
    </div>
  );
}
