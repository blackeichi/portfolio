import { ContentBox } from "@/components/atoms/contentBox";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "정우의 드라이브 (B:)",
};

export default function DrivePage() {
  return (
    <div className="flex flex-col gap-10 p-2 w-full h-full">
      <ContentBox>
        <div className="w-full h-full flex justify-center pt-6 text-sm text-gray-500">
          현재 비어 있습니다.
        </div>
      </ContentBox>
    </div>
  );
}
