"use client";

import { ContentBox } from "@/components/atoms/contentBox";
import WindowsBox from "@/components/molecules/windowsBox";

export const FunctionDescription = () => {
  return (
    <div className="my-4">
      <WindowsBox
        title={`📝 주요 기능 설명`}
        style={{ width: "100%", height: "fit-content" }}
      >
        <div className="w-full h-full p-2">
          <ContentBox style={{ padding: "16px" }}>
            <ul className="list-disc list-inside flex flex-col gap-2 text-xs sm:text-sm">
              <li>
                <strong>식단 관리:</strong> 사용자가 하루 식단을 기록하고,
                칼로리 및 영양소 정보를 추적할 수 있습니다.
              </li>
              <li>
                <strong>루틴 관리:</strong> 매일 반복되는 루틴을 설정하고, 완료
                여부를 체크할 수 있습니다.
              </li>
              <li>
                <strong>일기 작성:</strong> 사용자가 일기를 작성하고, 감정
                상태를 기록할 수 있습니다.
              </li>
              <li>
                <strong>Todo 리스트:</strong> 할 일 목록을 생성하고, 완료된
                항목을 관리할 수 있습니다.
              </li>
              <li>
                <strong>통합 대시보드:</strong> 모든 기능의 요약 정보를 한눈에
                볼 수 있는 대시보드를 제공합니다.
              </li>
            </ul>
          </ContentBox>
        </div>
      </WindowsBox>
    </div>
  );
};
