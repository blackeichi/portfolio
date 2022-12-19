import { motion } from "framer-motion";
import { color } from "../../styles/color";
import data from "../../utils/data.json";
import { EachStory } from "../Components/EachStory";
import { Subtitle } from "../Components/Subtitle";
import { cardVariants } from "./FrontCover";

export type TStory = {
  title: string;
  text: string[];
};
export const Story = () => {
  const { coverLetter } = data;
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      id="coverletter"
      className="flex min-h-screen w-full flex-col px-10 py-10 font-SF_HambakSnow md:px-28 md:pt-28"
      style={{ borderBottom: `3px solid ${color.brown}` }}
    >
      <motion.div
        variants={cardVariants}
        className="mb-20 flex w-full flex-col items-center md:items-start"
      >
        <Subtitle color={color.greenColor} size="40px" text="Cover letter" />
        <Subtitle
          font={false}
          text="HAN JEONGWOO"
          color={color.yellowColor}
          size="13px"
        />
      </motion.div>
      {coverLetter.map((story: TStory, index) => (
        <div className="font-GothicA1Light font-bold" key={index}>
          <EachStory story={story} index={index} />
        </div>
      ))}
    </motion.div>
  );
};
