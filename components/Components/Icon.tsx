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
    <div className="mt-2 flex gap-2 text-black">
      <div className="text-xl">
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
      <div className="flex flex-col justify-start text-xs">
        <h1 className="font-bold">{title}</h1>
        <h1>{text}</h1>
      </div>
    </div>
  );
};
