import { SemiTitle } from "@/components/atoms/semi-title";
import { Title } from "@/components/atoms/title";
import { Metadata } from "next";
import Image from "next/image";
import { StackComponent } from "./_ui/stackComponent";
import { FunctionDescription } from "./_ui/functionDescription";

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
      <SemiTitle>식단, 루틴, 일기, Todo 통합 자기관리 서비스</SemiTitle>
      <FunctionDescription />
      <StackComponent />
    </div>
  );
}
