import { Title } from "@/components/atoms/title";
import { Metadata } from "next";
import Image from "next/image";
import { StackComponent } from "./_ui/stackComponent";
import { FunctionDescription } from "./_ui/functionDescription";
import { Text } from "@/components/atoms/text";

export const metadata: Metadata = {
  title: "프로젝트 개요",
};

export default function MyProjectPage() {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 items-center w-full h-fit">
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
        좌측 상단에 폴더버튼을 클릭하여 프로젝트를 확인할 수 있습니다.
      </Text>
      <FunctionDescription />
      <StackComponent />
    </div>
  );
}
