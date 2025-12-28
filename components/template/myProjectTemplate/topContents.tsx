"use client";

import { usePathname, useRouter } from "next/navigation";
import { OpenProjectBtn } from "./openProjectBtn";
import { projectContents } from "@/app/my-project/utils";
import IconButton from "@/components/molecules/iconButton";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";

export const TopContents = () => {
  const router = useRouter();
  const pathname = usePathname();
  const target = projectContents.findIndex(
    (content) => content.path === pathname
  );
  return (
    <div className="w-full flex relative h-5">
      <div className="absolute -top-2 flex w-full h-7.5 gap-1.5">
        <IconButton
          tooltip="뒤로가기"
          onClick={() => {
            router.push(projectContents[Math.max(0, target - 1)].path);
          }}
          icon={IoCaretBack}
          width={30}
          height={30}
          size={20}
          disabled={target <= 0}
        />
        <IconButton
          tooltip="앞으로 가기"
          onClick={() => {
            router.push(
              projectContents[Math.min(projectContents.length - 1, target + 1)]
                .path
            );
          }}
          icon={IoCaretForward}
          width={30}
          height={30}
          size={20}
          disabled={target >= projectContents.length - 1}
        />
        <div
          className={`flex h-full w-60 items-center border-3 px-1 bg-white border-gray-500 border-r-gray-100 border-b-gray-100`}
        >
          <div className="text-xs flex items-center gap-1.5">
            <span className="font-bold">주소 :\</span>
            <span>{projectContents[target]?.name}</span>
            <span>- {target + 1}</span>
          </div>
        </div>
        <OpenProjectBtn />
      </div>
    </div>
  );
};
