import { color } from "../../styles/color";
import { Icon } from "../Components/Icon";
import { Subtitle } from "../Components/Subtitle";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { StackIcon } from "../Components/StackIcon";

export const AboutMe = () => {
  const [open, setOpen] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [mouseOn, setMouseOn] = useState(false);
  const [right, setRight] = useState(false);
  useEffect(() => {
    if (mouseOn) {
      const mouseMove = (e: any) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        setX(mouseX);
        setY(mouseY);
      };
      window.addEventListener("mousemove", mouseMove);
      return () => {
        window.removeEventListener("mousemove", mouseMove);
      };
    }
  });

  return (
    <div
      id="about"
      className="box-border flex min-h-screen w-full items-center"
    >
      <div
        className="flex h-full w-full flex-col items-center justify-center sm:pl-5 md:items-start md:pl-28"
        style={{
          borderTop: `3px solid ${color.brown}`,
          borderBottom: `3px solid ${color.brown}`,
          minHeight: "90vh",
        }}
      >
        <div className="relative mb-10 flex flex-col items-center gap-2 md:items-start">
          <Subtitle size="40px" text="About me" color={color.greenColor} />
          <motion.div
            className="max-w-fit"
            onHoverStart={() => setOpen(true)}
            onHoverEnd={() => setOpen(false)}
          >
            <Subtitle
              font={false}
              text="
          #Passion,
          #Kind,
          #Steady,
          #Responsibility,
          #Goodlistener,
          #Sometimes funny"
              color={color.yellowColor}
              size="10px"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, top: 65 }}
            animate={{ opacity: open ? 1 : 0, top: open ? 65 : 60 }}
            className="absolute"
          >
            <Subtitle
              font={false}
              text="
            #열정,
            #친절,
            #꾸준함,
            #책임감,
            #좋은 청취자,
            #가끔 익살꾸러기"
              color={color.yellowColor}
              size="11px"
            />
          </motion.div>
        </div>
        <div className="left-0 flex sm:pl-5 md:absolute md:mt-24 md:pl-28">
          <Swiper
            effect={"cube"}
            grabCursor={true}
            cubeEffect={{
              shadow: true,
              slideShadows: true,
              shadowOffset: 20,
              shadowScale: 0.94,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, EffectCube, Pagination]}
            className="mySwiper shadow-xl"
          >
            <SwiperSlide>
              <div
                className="mt-2 flex w-full flex-wrap items-center gap-1 pt-10"
                style={{
                  height: "250px",
                }}
              >
                <div className="absolute top-2 left-0 flex w-full justify-center font-PuradakGentleGothicR text-white">
                  <Subtitle
                    size="23px"
                    text="Front End"
                    color={"transparent"}
                    fontColor={color.lightOcher}
                  />
                </div>
                <StackIcon src="https://img.shields.io/badge/html5-DB7093?style=for-the-badge&logo=html5&logoColor=white" />
                <StackIcon src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
                <StackIcon src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white" />
                <StackIcon src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" />
                <StackIcon src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
                <StackIcon src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
                <StackIcon src="https://img.shields.io/badge/styled_component-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
                <StackIcon src="https://img.shields.io/badge/tailwindCSS-06B6D4?style=for-the-badge&logo=Tailwind%20CSS&logoColor=white" />
                <StackIcon src="https://img.shields.io/badge/Recoil-black?style=for-the-badge&logo=Recoil&logoColor=white" />
                <StackIcon src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="mt-2 flex w-full flex-wrap gap-1 px-2 pt-10"
                style={{
                  height: "120px",
                }}
              >
                <div className="absolute top-2 left-0 flex w-full justify-center font-PuradakGentleGothicR text-white">
                  <Subtitle
                    size="23px"
                    text="Back End"
                    color={"transparent"}
                    fontColor={color.lightOcher}
                  />
                </div>
                <StackIcon src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white" />
                <StackIcon src="https://img.shields.io/badge/PlanetScale-000000?style=for-the-badge&logo=PlanetScale&logoColor=white" />
                <StackIcon src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
                <StackIcon src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="mt-2 flex w-full flex-wrap gap-1 px-2 pt-10"
                style={{
                  height: "120px",
                }}
              >
                <div className="absolute top-2 left-0 flex w-full justify-center font-PuradakGentleGothicR text-white">
                  <Subtitle
                    size="23px"
                    text="Deployment"
                    color={"transparent"}
                    fontColor={color.lightOcher}
                  />
                </div>
                <StackIcon src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=Netlify&logoColor=white" />
                <StackIcon src="https://img.shields.io/badge/Github%20Pages-000000?style=for-the-badge&logo=Git&logoColor=white" />
                <StackIcon src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="mt-2 flex w-full flex-wrap gap-1 px-2 pt-10"
                style={{
                  height: "120px",
                }}
              >
                <div className="absolute top-2 left-0 flex w-full justify-center font-PuradakGentleGothicR text-white">
                  <Subtitle
                    size="23px"
                    text="Tried"
                    color={"transparent"}
                    fontColor={color.lightOcher}
                  />
                </div>
                <StackIcon src="https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&logo=React&logoColor=white" />
                <StackIcon src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" />
                <StackIcon src="https://img.shields.io/badge/pug-A86454?style=for-the-badge&logo=pug&logoColor=white" />
                <StackIcon src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div
          id="contentBox"
          className="mt-5 flex flex-col justify-end md:mt-0 md:flex-row md:items-end md:justify-start"
        >
          <div
            id="BlankBox"
            className="hidden h-4 md:flex"
            style={{ width: "360px" }}
          />
          <motion.div
            onHoverStart={() => setMouseOn(true)}
            onHoverEnd={() => setMouseOn(false)}
            className="mb-10 grid h-14 grid-cols-3 gap-3"
          >
            <Icon icon="name" title="이름" text="한정우" />
            <Icon icon="mbti" title="MBTI" text="INFJ" />
            <motion.div
              onHoverStart={() => setRight(true)}
              onHoverEnd={() => setRight(false)}
            >
              <Icon icon="birth" title="생년월일" text="95.06.13" />
            </motion.div>

            <Icon icon="certi" title="자격증" text="정보처리기사" />
            <Icon icon="certi" title="자격증" text="컴활 1급" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
