import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { color } from "../../styles/color";
import { motion } from "framer-motion";
import { forwardRef, useState } from "react";

const me = [
  "#Front-End",
  "#Passion",
  "#Kind",
  "#Steady",
  "#Responsibility",
  "#Goodlistener",
  "#Sometimes funny",
];
const na = [
  "#프론트엔드",
  "#열정",
  "#친절",
  "#꾸준함",
  "#책임감",
  "#좋은 청취자",
  "#가끔 익살꾸러기",
];

export const Intro = ({ scrolled, bigscrolled }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      id="init"
      className="flex  w-full flex-col font-KOFIHDrLEEJWTTF lg:flex-row"
    >
      <div
        className="flex w-full flex-col items-center justify-around gap-24 py-10 pt-20 sm:gap-32 sm:py-16 sm:pt-40 lg:h-screen lg:w-1/5 lg:items-start lg:gap-0 lg:py-0 lg:pl-5 lg:pt-10"
        style={{ backgroundColor: color.bgColor }}
      >
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: scrolled ? -1000 : 0 }}
          className=" relative flex flex-col items-center whitespace-normal text-center font-bold text-white  lg:items-start lg:whitespace-nowrap"
        >
          <h1 className="text-2xl sm:text-4xl">한정우&apos;s Portfolio</h1>
          <h1 className="mb-4 font-Pretendard text-7xl sm:text-9xl">
            BRAND ME
          </h1>
          <div className="absolute -bottom-6 left-0 flex w-full justify-center sm:-bottom-10 lg:-bottom-2 lg:justify-start">
            <motion.div
              onHoverStart={() => setOpen(true)}
              onHoverEnd={() => setOpen(false)}
              className="z-10 flex flex-wrap justify-center gap-2 lg:flex-nowrap"
            >
              {me.map((word, index) => (
                <h1
                  key={index}
                  className="font-Pretendard text-xs sm:text-base"
                >
                  {word}
                </h1>
              ))}
            </motion.div>
            <motion.div
              className="absolute flex justify-center gap-0 sm:gap-2 lg:-bottom-4 lg:justify-start"
              initial={{ opacity: 0, bottom: -16 }}
              animate={{ opacity: open ? 1 : 0, bottom: open ? -30 : -16 }}
            >
              {na.map((word, index) => (
                <h1
                  key={index}
                  className="font-Pretendard text-xs sm:text-base"
                >
                  {word}
                </h1>
              ))}
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: bigscrolled ? -1000 : 0 }}
          className="flex items-center gap-4"
        >
          <img
            className="aspect-square h-36 rounded-full border-2 lg:hidden"
            src="/photo(2).jpg"
          />
          <div className="flex flex-col gap-2 whitespace-nowrap font-KOFIHDrLEEJWTTF text-sm font-bold text-white sm:text-base lg:text-xl">
            <div
              className="flex cursor-pointer gap-2 duration-200 hover:scale-105"
              onClick={() =>
                window.open("https://open.kakao.com/o/sn2vWbSe", "_blank")
              }
            >
              <img
                className="h-6 w-6 rounded-md"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/KakaoTalk_logo.svg/900px-KakaoTalk_logo.svg.png"
              />
              <h1> 010-9492-2246</h1>
            </div>
            <a href="mailto:blackeichi@naver.com">
              <h1 className="cursor-pointer duration-200 hover:scale-105">
                <FontAwesomeIcon icon={faEnvelope} /> blackeichi@naver.com
              </h1>
            </a>
            <h1
              className="cursor-pointer duration-200 hover:scale-105"
              onClick={() =>
                window.open("https://github.com/blackeichi", "_blank")
              }
            >
              <FontAwesomeIcon icon={faGithub} /> GitHub
            </h1>
            <div
              className="flex cursor-pointer items-center gap-1 duration-200 hover:scale-105"
              onClick={() =>
                window.open("https://velog.io/@blackeichi", "_blank")
              }
            >
              <img
                className="w-6 rounded-md"
                src="https://pbs.twimg.com/profile_images/1228368893321736193/Ov0og7E8_400x400.jpg"
              />
              <h1>Velog</h1>
            </div>
          </div>
        </motion.div>
      </div>
      <div
        className="right-0 -z-10 hidden h-full min-h-screen w-full lg:fixed lg:block lg:w-4/5"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url("/photo(2).jpg")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
};
