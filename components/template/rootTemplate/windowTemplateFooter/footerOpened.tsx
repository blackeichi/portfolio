import { isFocusedMainState, subOpenedState } from "@/libs/atom";
import { MENU_LIST_DATA, SUB_WINDOW_LIST } from "@/libs/utils/constants";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { memo } from "react";

function FooterOpened() {
  const pathname = usePathname().split("/")[1];
  const subOpened = useAtomValue(subOpenedState);
  const [isFocusedMain, setIsFocusedMain] = useAtom(isFocusedMainState);
  return (
    <>
      {pathname && MENU_LIST_DATA[pathname] && (
        <div
          className={`flex h-full max-w-48 flex-1 items-center gap-2 border-3 px-1 cursor-pointer ${
            isFocusedMain
              ? "border-gray-500 border-r-gray-100 border-b-gray-100"
              : "border-gray-100 border-r-gray-500 border-b-gray-500"
          }`}
          onClick={() => {
            if (!isFocusedMain) setIsFocusedMain(true);
          }}
        >
          <Image
            src={MENU_LIST_DATA[pathname]?.icon}
            alt="Menu Icon"
            width={16}
            height={16}
          />
          {MENU_LIST_DATA[pathname]?.title}
        </div>
      )}
      {subOpened && (
        <div
          className={`flex h-full max-w-48 flex-1 items-center gap-2 border-3 px-1 cursor-pointer ${
            !isFocusedMain
              ? "border-gray-500 border-r-gray-100 border-b-gray-100"
              : "border-gray-100 border-r-gray-500 border-b-gray-500"
          }`}
          onClick={() => {
            if (isFocusedMain) setIsFocusedMain(false);
          }}
        >
          <Image
            src={SUB_WINDOW_LIST[subOpened].icon}
            alt="Menu Icon"
            width={16}
            height={16}
          />
          {SUB_WINDOW_LIST[subOpened]?.title}
        </div>
      )}
    </>
  );
}

export default memo(FooterOpened);
