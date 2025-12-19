import { FOOTER_ELEMENT } from "@/libs/uitls/constants";
import { memo, useEffect, useState } from "react";
import FooterButton from "./footerButton";
import FooterPartition from "./footerPartition";
import FooterOpened from "./footerOpened";
import FooterMenus from "./footerMenus";
import FooterDates from "./footerDates";

function WindowTemplateFooter() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    if (isOpen) {
      const target = document.getElementById(FOOTER_ELEMENT);
      if (target) {
        target.focus();
      }
    }
  }, [isOpen]);
  return (
    <div className="relative z-20 box-content flex h-8.75 w-full shrink-0 items-center justify-between border-t-[3px] border-t-gray-100 bg-gray-300 px-1 py-0.5 text-xs select-none">
      <div
        id={FOOTER_ELEMENT}
        className="box-content flex h-full items-center gap-0.75"
        tabIndex={-1}
        onBlur={() => {
          setIsOpen(false);
        }}
      >
        <FooterButton isOpen={isOpen} setIsOpen={setIsOpen} />
        <FooterPartition />
        <FooterOpened />
        {isOpen && <FooterMenus setIsOpen={setIsOpen} />}
      </div>
      <div className="box-content flex h-full items-center gap-0.75">
        <FooterPartition />
        <FooterDates />
      </div>
    </div>
  );
}
export default memo(WindowTemplateFooter);
