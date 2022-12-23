import { color } from "../../styles/color";
import { cls } from "../../utils/utils";

type TSubtitle = {
  text: string;
  size: string;
  color: string;
  font?: boolean;
  fontColor?: string;
  notpd?: boolean;
};

export const Subtitle = ({
  text,
  size,
  color,
  font = true,
  fontColor = "black",
  notpd = false,
}: TSubtitle) => {
  return (
    <div
      style={{ fontSize: `${size}` }}
      className={cls(
        "relative box-border flex max-h-fit max-w-fit items-center  text-center font-bold",
        font ? "font-SF_HambakSnow " : "font-GothicA1Light"
      )}
    >
      <h1 className="z-10 flex items-center pl-3 " style={{ color: fontColor }}>
        {text}
      </h1>
      <div
        className="absolute h-3/6"
        style={{ backgroundColor: color, width: notpd ? "100%" : "110%" }}
      />
    </div>
  );
};
