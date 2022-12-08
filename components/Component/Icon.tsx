import {
  faAward,
  faCalendar,
  faCertificate,
  faImagePortrait,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { color } from "../../styles/color";

type TIcon = {
  icon: string;
  title: string;
  text: string;
};

export const Icon = ({ icon, title, text }: TIcon) => {
  return (
    <div className="mt-5 flex gap-4" style={{ color: color.darkGary }}>
      <div className="text-3xl">
        <FontAwesomeIcon
          icon={
            icon === "name"
              ? faUser
              : icon === "mbti"
              ? faImagePortrait
              : icon === "certi"
              ? faAward
              : faCalendar
          }
        />
      </div>
      <div className="flex flex-col justify-start">
        <h1 className="text-lg font-bold">{title}</h1>
        <h1>{text}</h1>
      </div>
    </div>
  );
};
