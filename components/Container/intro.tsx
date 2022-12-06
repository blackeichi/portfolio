import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bgColor, greenColor } from "../../styles/color";
import { motion } from "framer-motion";
import { useState } from "react";

const me = [
  "#Front-End",
  "#Passion",
  "#Kind",
  "#Steady",
  "#Responsibility",
  "#Goodlistener",
];
const na = [
  "#프론트엔드",
  "#열정",
  "#친절",
  "#꾸준함",
  "#책임감",
  "#좋은 청취자",
];

export const Intro = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col font-KOFIHDrLEEJWTTF lg:flex-row">
      <div
        className="flex w-full flex-col items-center  justify-around gap-16 py-10 pt-32 pl-5 sm:gap-32 sm:py-16 sm:pt-40 lg:h-screen lg:w-1/5 lg:items-start lg:gap-0 lg:py-0 lg:pt-10"
        style={{ backgroundColor: bgColor }}
      >
        <div className=" relative left-5 flex flex-col items-center whitespace-normal text-center font-bold text-white  lg:items-start lg:whitespace-nowrap">
          <h1 className="text-2xl sm:text-4xl">한정우&apos;s Portfolio</h1>
          <h1 className="mb-4 font-Pretendard text-7xl sm:text-9xl">
            BRAND ME
          </h1>
          <motion.div
            onHoverStart={() => setOpen(true)}
            onHoverEnd={() => setOpen(false)}
            className="absolute -bottom-5 z-10 flex gap-2"
          >
            {me.map((word, index) => (
              <h1 key={index} className="font-Pretendard text-xs sm:text-base">
                {word}
              </h1>
            ))}
          </motion.div>
          <motion.div
            className="absolute -bottom-6 flex gap-2"
            initial={{ opacity: 0, bottom: -24 }}
            animate={{ opacity: open ? 1 : 0, bottom: open ? -40 : -24 }}
          >
            {na.map((word, index) => (
              <h1 key={index} className="font-Pretendard text-xs sm:text-base">
                {word}
              </h1>
            ))}
          </motion.div>
        </div>
        <div className="flex items-center gap-4">
          <img
            className="aspect-square h-36 rounded-full border-2 lg:hidden"
            src="/photo(2).jpg"
          />
          <div className="flex flex-col gap-2 whitespace-nowrap font-KOFIHDrLEEJWTTF text-sm font-bold text-white sm:text-base lg:text-xl">
            <h1>
              <FontAwesomeIcon icon={faPhone} /> 010-9492-2246
            </h1>
            <a href="mailto:blackeichi@naver.com">
              <h1 className="cursor-pointer">
                <FontAwesomeIcon icon={faEnvelope} /> blackeichi@naver.com
              </h1>
            </a>
            <h1
              className="cursor-pointer"
              onClick={() =>
                window.open("https://github.com/blackeichi", "_blank")
              }
            >
              <FontAwesomeIcon icon={faGithub} /> GitHub
            </h1>
            <div
              className="flex cursor-pointer items-center gap-1"
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
        </div>
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
