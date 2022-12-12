import { useState } from "react";
import { color } from "../../styles/color";
import { Subtitle } from "../Components/Subtitle";
import { motion } from "framer-motion";

export const FrontCover = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      id="init"
      className="flex h-screen w-full flex-col pl-5 font-Pretendard lg:pl-14"
      style={{ backgroundColor: color.bgColor }}
    >
      <div
        className="relative z-20 flex h-1/2 w-full flex-col justify-end gap-2"
        style={{ backgroundColor: color.bgColor }}
      >
        <Subtitle text="PORTFOLIO" color={color.greenColor} size="80px" />
        <motion.div
          className="max-w-fit"
          onHoverStart={() => setOpen(true)}
          onHoverEnd={() => setOpen(false)}
        >
          <Subtitle
            font={false}
            text="#Front-End,
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
          initial={{ opacity: 0, top: 170 }}
          animate={{ opacity: open ? 1 : 0, top: open ? 170 : 162 }}
          className="absolute"
        >
          <Subtitle
            font={false}
            text="#프론트엔드,
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
        <div
          className="mt-3 h-1/2"
          style={{ borderLeft: `3px solid ${color.brown}` }}
        />
      </div>
      <div className="z-10 flex h-1/2 w-full">
        <div className="relative flex h-full w-9/12 flex-col justify-start gap-2">
          <div
            className="h-1/2"
            style={{ borderLeft: `3px solid ${color.brown}` }}
          />
          <div></div>
        </div>
        <div className="relative flex w-1/6">
          <div
            className="h fixed bottom-7 -z-10 hidden h-2/6 w-1/6 opacity-90 md:block lg:bottom-0 lg:h-3/6"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)),url("/photo(2).jpg")`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <div
            className="absolute bottom-0 h-1/6 w-full"
            style={{ backgroundColor: color.bgColor }}
          />
        </div>
        <div className="w-1/12" style={{ backgroundColor: color.bgColor }} />
      </div>
    </div>
  );
};
