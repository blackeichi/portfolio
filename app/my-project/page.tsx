import { Title } from "@/components/atoms/title";
import { Metadata } from "next";
import Image from "next/image";
import { StackComponent } from "./_ui/stackComponent";
import { FunctionDescription } from "./_ui/functionDescription";
import { Text } from "@/components/atoms/text";
import { OpenProjectBtn } from "@/components/template/myProjectTemplate/openProjectBtn";

export const metadata: Metadata = {
  title: "프로젝트 개요",
};

export default function MyProjectPage() {
  return (
    <div className="flex p-6 w-full h-fit justify-center">
      <div className="max-w-200 w-full flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <Image
            src="/images/daily-log-icon.png"
            alt="project icon"
            width={50}
            height={50}
          />
          <Title>Daily Log</Title>
        </div>
        <Text>
          <div className="flex items-center gap-2">
            폴더버튼을 클릭하여 프로젝트를 확인할 수 있습니다.{" "}
            <OpenProjectBtn />
          </div>
        </Text>
        <FunctionDescription />
        <StackComponent />
      </div>
    </div>
  );
}
