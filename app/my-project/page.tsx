import { Title } from "@/components/atoms/title";
import Image from "next/image";
import { StackComponent } from "./_ui/stackComponent";
import { FunctionDescription } from "./_ui/functionDescription";
import { Text } from "@/components/atoms/text";
import { OpenProjectBtn } from "@/components/template/myProjectTemplate/openProjectBtn";

export default function MyProjectPage() {
  return (
    <div className="flex p-6 w-full h-fit justify-center">
      <div className="max-w-200 w-full flex flex-col gap-4 sm:gap-6">
        <div className="flex gap-4 sm:gap-6 items-center">
          <Image
            src="/images/daily-log-icon.png"
            alt="project icon"
            width={80}
            height={80}
            priority
            className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl overflow-hidden"
          />
          <Title>Daily Log</Title>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Text>폴더버튼을 클릭하여 프로젝트를 확인할 수 있습니다.</Text>
          <OpenProjectBtn />
        </div>
        <FunctionDescription />
        <StackComponent />
      </div>
    </div>
  );
}
