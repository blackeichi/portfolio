import { color } from "../../styles/color";
import data from "../../utils/data.json";
import { EachStory } from "../Components/EachStory";
import { Subtitle } from "../Components/Subtitle";

export type TStory = {
  title: string;
  text: string[];
};

export const Story = () => {
  const { coverLetter } = data;
  return (
    <div className="flex min-h-screen w-full flex-col px-10 py-10 font-SF_HambakSnow md:px-28 md:pt-28">
      <div className="mb-20 flex w-full flex-col items-center md:items-start">
        <Subtitle color={color.greenColor} size="40px" text="Cover letter" />
        <div className="cursor-pointer">
          <Subtitle
            font={false}
            text="OPEN RESUME"
            color={color.yellowColor}
            size="13px"
          />
        </div>
      </div>
      {coverLetter.map((story: TStory, index) => (
        <div className="font-GothicA1Light font-bold" key={index}>
          <EachStory story={story} index={index} />
        </div>
      ))}
    </div>
  );
};
