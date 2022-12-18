import { motion } from "framer-motion";
import { useState } from "react";
import { cls } from "../../utils/utils";
import { cardVariants } from "../Page/FrontCover";
import { TStory } from "../Page/Story";
import { HoveredText } from "./HoveredText";

type Teach = {
  story: TStory;
  index: number;
};
export const EachStory = ({ story, index }: Teach) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div variants={cardVariants}>
        <div
          onClick={() => setOpen((prev) => !prev)}
          className={cls(
            "flex max-w-fit cursor-pointer pt-10 pb-4 ",
            open ? "font-semibold text-gray-600" : "text-black"
          )}
        >
          <div className="border-r border-solid border-gray-400 pr-5">
            story {index + 1}
          </div>
          <div className="pl-5">
            <HoveredText text={story.title} large={true} />
          </div>
        </div>
        <div className="h-1 w-10 border-b-2 border-solid"></div>
      </motion.div>
      {open ? (
        <div className="mt-5 overflow-hidden">
          <motion.div
            className=" relative flex flex-col gap-4 font-normal leading-5"
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: open ? 1 : -300, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {story.text.map((text, index) => (
              <h1 key={index}>{text}</h1>
            ))}
          </motion.div>
        </div>
      ) : null}
    </motion.div>
  );
};
