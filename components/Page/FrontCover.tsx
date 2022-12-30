import { useState } from "react";
import { color } from "../../styles/color";
import { Subtitle } from "../Components/Subtitle";
import { motion, useScroll, Variants } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { HoveredText } from "../Components/HoveredText";

export const cardVariants: Variants = {
  offscreen: {
    y: 150,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.8,
    },
  },
};
export const cardVariants2: Variants = {
  offscreen: {
    y: 150,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 0.8,
    transition: {
      type: "tween",
      duration: 0.8,
    },
  },
};
export const FrontCover = () => {
  return (
    <div
      id="init"
      className="font-Pretendard flex h-screen w-full flex-col justify-center pl-5 sm:justify-start lg:pl-14"
      style={{ backgroundColor: color.bgColor }}
    >
      <motion.div
        className="relative flex w-full flex-col justify-end gap-1 sm:h-1/2"
        style={{ backgroundColor: color.bgColor }}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={cardVariants}>
          <Subtitle text="ABOUT ME" color={color.greenColor} size="100px" />
          <Subtitle
            text="FRONT END WEB DEVELOPER"
            color={color.yellowColor}
            size="20px"
          />
        </motion.div>
        <div
          className="mt-3 h-0 sm:h-1/2"
          style={{ borderLeft: `3px solid ${color.brown}` }}
        />
      </motion.div>
      <div className="z-10 flex h-1/2 w-full">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          className="relative flex h-full w-8/12 flex-col justify-start gap-2"
        >
          <div
            className="h-3/5"
            style={{ borderLeft: `3px solid ${color.brown}` }}
          />
          <motion.div
            variants={cardVariants}
            className="relative bottom-10 flex flex-col gap-1 whitespace-nowrap pl-5 font-SF_HambakSnow text-sm font-bold"
          >
            <h1>
              Han <u>JeongWoo</u>
            </h1>
            <div
              className="flex max-w-fit cursor-pointer gap-2 "
              onClick={() =>
                window.open("https://open.kakao.com/o/sn2vWbSe", "_blank")
              }
            >
              <img
                className="h-4 w-4 rounded-md"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/KakaoTalk_logo.svg/900px-KakaoTalk_logo.svg.png"
              />
              <HoveredText text="010-9492-2246" />
            </div>
            <a href="mailto:blackeichi@naver.com" className="max-w-fit ">
              <div className="flex cursor-pointer items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} />
                <HoveredText large={true} text="blackeichi@naver.com" />
              </div>
            </a>
            <div
              className="flex max-w-fit cursor-pointer items-center gap-2"
              onClick={() =>
                window.open("https://github.com/blackeichi", "_blank")
              }
            >
              <FontAwesomeIcon icon={faGithub} />
              <HoveredText text="GitHub" />
            </div>
            <div
              className="flex max-w-fit cursor-pointer items-center gap-1 "
              onClick={() =>
                window.open("https://velog.io/@blackeichi", "_blank")
              }
            >
              <img
                className="w-4 rounded-md"
                src="https://pbs.twimg.com/profile_images/1228368893321736193/Ov0og7E8_400x400.jpg"
              />
              <HoveredText text="Velog" />
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          className="relative flex w-4/12"
        >
          <motion.div
            variants={cardVariants2}
            className=" fixed bottom-7 -z-10 hidden h-3/6 w-3/12 opacity-80 md:block lg:bottom-0 lg:h-3/5"
            style={{
              backgroundImage: `url("/photo(2).jpg")`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />

          <div
            className="absolute bottom-0 h-1/6 w-full"
            style={{ backgroundColor: color.bgColor }}
          />
        </motion.div>
      </div>
    </div>
  );
};
