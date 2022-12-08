import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { color } from "../../styles/color";

type TTitle = {
  title: string;
};
export const Title = ({ title }: TTitle) => {
  return (
    <div className="flex items-center gap-4" style={{ color: color.bgColor }}>
      <FontAwesomeIcon className="text-3xl text-gray-400" icon={faHashtag} />
      <h1 className="font-Cafe24Shiningstar text-7xl font-bold sm:text-8xl">
        {title}
      </h1>
    </div>
  );
};
