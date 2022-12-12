import { color } from "../../styles/color";
import { cls } from "../../utils/utils";

type TSubtitle = {
  text: string;
  size: string;
  color: string;
  font?: boolean;
};

export const Subtitle = ({ text, size, color, font = true }: TSubtitle) => {
  return (
    <div
      style={{ fontSize: `${size}` }}
      className={cls(
        "relative box-border flex max-h-fit max-w-fit items-center  text-center font-bold",
        font ? "font-SF_HambakSnow" : ""
      )}
    >
      <h1 className="z-10 flex items-center pl-3 text-black">{text}</h1>
      <div
        className="absolute h-3/6"
        style={{ backgroundColor: color, width: "110%" }}
      />
    </div>
  );
};
