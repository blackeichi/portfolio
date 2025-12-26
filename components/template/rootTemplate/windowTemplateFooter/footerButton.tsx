import { pressStart } from "@/libs/uitls/fonts";
import Image from "next/image";
import { memo } from "react";

function FooterButton({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`flex h-full w-20 items-center justify-center gap-2 border-3 text-[9px] ${
        pressStart.className
      } ${
        isOpen
          ? "border-gray-500 border-r-gray-100 border-b-gray-100 p-0.5"
          : "border-gray-100 border-r-gray-500 border-b-gray-500"
      }`}
      onClick={() => {
        setIsOpen((prev) => !prev);
      }}
    >
      <Image
        src="/images/windowIcon.png"
        alt="window icon"
        width={20}
        height={20}
      />
      <span>Menu</span>
    </div>
  );
}
export default memo(FooterButton);
