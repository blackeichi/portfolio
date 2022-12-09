import { color } from "../../styles/color";
import { Icon } from "../Component/Icon";
import { Title } from "../Component/Title";

export const AboutMe = () => {
  return (
    <div
      id="about"
      className="relative box-border flex min-h-screen w-full items-center justify-center gap-10 py-5"
      style={{ color: color.bgColor }}
    >
      <div className="absolute top-5 left-5 hidden w-40 items-center justify-center opacity-50 sm:flex sm:w-96 lg:relative lg:opacity-100">
        <img className="w-full rounded-2xl" src="/Backimg.webp" />
        <div className="absolute aspect-square overflow-hidden rounded-full border-4 border-gray-300 sm:w-64 lg:w-3/4">
          <img className="w-full" src="/myPic.jpg" />
        </div>
      </div>
      <div className="z-10 flex h-full items-center justify-center px-10 sm:px-20 md:px-40 lg:px-10">
        <div className="relative flex h-full flex-col items-center gap-5">
          <div className="flex h-full flex-col justify-center sm:items-center">
            <Title title="About Me" />
            <div
              style={{ backgroundColor: color.darkGary }}
              className="mt-3 flex flex-col gap-5 rounded-xl p-5 font-Pretendard text-lg font-bold text-white"
            >
              <span>
                안녕하세요. 꾸준한 자기발전과 업무에 대한 책임감을 가지고 있는
                신뢰형 인재 한정우입니다.{" "}
              </span>
              <span>
                프론트엔드 개발자를 희망하며 새로운 것을 공부하는 것에 대한
                열정을 가지고 있습니다.
              </span>
              <span>
                조직 및 동료들과 잘 어우러지는 성격이며, 조직에 헌신적인 태도를
                가지고 있습니다.
              </span>
            </div>
            <div className="mt-4 grid w-full grid-cols-2 px-2 sm:grid-cols-3">
              <Icon icon="name" title="이름" text="한정우" />
              <Icon icon="mbti" title="MBTI" text="INFJ" />
              <Icon icon="birth" title="생년월일" text="95.06.13" />
              <Icon icon="certi" title="자격증" text="정보처리기사" />
              <Icon icon="certi" title="자격증" text="컴퓨터활용능력 1급" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
