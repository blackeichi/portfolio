import { color } from "../../styles/color";
import { Icon } from "../Components/Icon";
import { Subtitle } from "../Components/Subtitle";
import { motion } from "framer-motion";
import { useState } from "react";
export const AboutMe = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      id="about"
      className="box-border flex h-screen w-full items-center py-10"
    >
      <div
        className="flex h-full w-full flex-col justify-center pl-5 md:pl-28"
        style={{
          borderTop: `3px solid ${color.brown}`,
          borderBottom: `3px solid ${color.brown}`,
        }}
      >
        <div className="relative flex flex-col gap-2">
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
        <div className="mt-10 flex flex-col items-center gap-5 md:flex-row md:items-end lg:gap-10">
          <div
            style={{
              background: `linear-gradient(${color.bgColor},${color.ocherColor}) ${color.lightOcher},)`,
            }}
            className=" flex w-80 flex-col gap-3 px-6 py-10 font-KOFIHDrLEEJWTTF text-base "
          >
            ###사각형 기술 스택 넣기
            <span>
              안녕하세요. 꾸준한 자기발전과 업무에 대한 책임감을 가지고 있는
              신뢰형 인재 한정우입니다.{" "}
            </span>
            <span>
              프론트엔드 개발자를 희망하며 새로운 것을 공부하는 것에 대한 열정을
              가지고 있습니다.
            </span>
            <span>
              동료들과 팀에 잘 어우러지는 성격이며, 조직에 헌신적인 태도를
              가지고 있습니다.
            </span>
          </div>
          <div>
            <div className="relative grid h-14 grid-cols-3 gap-3 sm:h-12 md:bottom-10">
              <Icon icon="name" title="이름" text="한정우" />
              <Icon icon="mbti" title="MBTI" text="INFJ" />
              <Icon icon="birth" title="생년월일" text="95.06.13" />
              <Icon icon="certi" title="자격증" text="정보처리기사" />
              <Icon icon="certi" title="자격증" text="컴활 1급" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
