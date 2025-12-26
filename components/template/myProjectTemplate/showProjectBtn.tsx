"use client";

import IconButton from "@/components/molecules/iconButton";
import { isFocusedMainState, subOpenedState } from "@/libs/atom";
import { SUB_WINDOW_LIST } from "@/libs/uitls/constants";
import { useSetAtom } from "jotai";
import { FcOpenedFolder } from "react-icons/fc";

export const ShowProjectBtn = () => {
  const setSubOpened = useSetAtom(subOpenedState);
  const setIsFocusedMain = useSetAtom(isFocusedMainState);
  return (
    <div className="w-full flex relative h-5">
      <div className="absolute -top-2">
        <IconButton
          tooltip="프로젝트 열기"
          onClick={() => {
            setSubOpened(SUB_WINDOW_LIST.embed_project.key);
            setIsFocusedMain(false);
          }}
          icon={FcOpenedFolder}
          width={30}
          height={30}
          size={20}
        />
      </div>
    </div>
  );
};
