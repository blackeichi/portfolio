import { FOOTER_ELEMENT } from "@/libs/uitls/constants";
import { useEffect, useState } from "react";
import FooterButton from "./footerButton";
import FooterOpened from "./footerOpened";
import FooterMenus from "./footerMenus";
import FooterDates from "./footerDates";
import Partition from "@/components/atoms/partition";

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
    <div className="relative z-30 box-content flex h-8.75 w-full shrink-0 items-center justify-between border-t-[3px] border-t-gray-100 bg-gray-300 px-1 py-0.5 text-xs select-none">
      <div
        id={FOOTER_ELEMENT}
        className="box-content flex w-full h-full items-center gap-0.75"
        tabIndex={-1}
        onBlur={() => {
          setIsOpen(false);
        }}
      >
        <FooterButton isOpen={isOpen} setIsOpen={setIsOpen} />
        <Partition />
        <FooterOpened />
        {isOpen && <FooterMenus setIsOpen={setIsOpen} />}
      </div>
      <div className="box-content flex h-full items-center gap-0.75">
        <Partition />
        <FooterDates />
      </div>
    </div>
  );
}
export default WindowTemplateFooter;
