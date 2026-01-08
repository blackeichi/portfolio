"use client";

import { ContentBox } from "@/components/atoms/contentBox";
import WindowsBox from "@/components/molecules/windowsBox";

export const FunctionDescription = () => {
  return (
    <div className="my-5">
      <WindowsBox
        title={`📝 주요 기능 설명`}
        style={{ width: "512px", height: "fit-content" }}
      >
        <div className="w-full h-full p-4">
          <ContentBox style={{ padding: "16px" }}>
            <p className="text-xs sm:text-sm leading-relaxed">
              일상 생활을 체계적으로 관리할 수 있는 올인원 앱으로 식단 기록과
              칼로리 추적, 반복되는 루틴 설정, 일기 작성과 감정 상태 기록, Todo
              리스트 관리 등의 기능을 제공합니다.
            </p>
            <p>
              데이터 최적화와 보안, 사용자 친화적 인터페이스에 중점을 둔 AI 기능
              결합 웹/모바일 서비스입니다.
            </p>
          </ContentBox>
        </div>
      </WindowsBox>
    </div>
  );
};
