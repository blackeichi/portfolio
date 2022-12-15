import { color } from "../../styles/color";
import { Subtitle } from "../Components/Subtitle";

export const Regards = () => {
  return (
    <div
      id="regards"
      className="flex h-screen w-full items-center justify-center font-MonoplexKRRegular"
    >
      <div className="flex flex-col items-center justify-center gap-5">
        <div>
          <div className="mr-36">
            <Subtitle
              notpd={true}
              size="50px"
              text="Thank you"
              color={color.greenColor}
            />
          </div>
          <div className="flex justify-center">
            <h1 className="font-bold" style={{ fontSize: "50px" }}>
              &
            </h1>
          </div>
          <div className="flex justify-end">
            <Subtitle
              notpd={true}
              size="50px"
              text="Best regards."
              color={color.greenColor}
            />
          </div>
        </div>

        <h1>긴 글 읽어주셔서 감사합니다.</h1>
        <div
          className="flex w-32 flex-col items-center gap-2 pb-1 "
          style={{ backgroundColor: color.yellowColor }}
        >
          <div className="font-bold">
            <Subtitle
              font={false}
              notpd={true}
              size="15px"
              text="한정우"
              color={color.yellowColor}
            />
          </div>
          <Subtitle
            font={false}
            notpd={true}
            size="15px"
            text="Han Jeong Woo"
            color={color.yellowColor}
          />
        </div>
        <div className="flex flex-col items-center text-sm">
          <h1>H.P 010-9492-2246</h1>
          <h1>E-Mail blackeichi@naver.com</h1>
        </div>
      </div>
    </div>
  );
};
