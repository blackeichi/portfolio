import { MENU_LIST_DATA } from "@/libs/uitls/constants";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function FooterOpened() {
  const pathname = usePathname();
  return (
    pathname &&
    MENU_LIST_DATA[pathname] && (
      <div className="flex h-full w-48 items-center gap-2 border-3 border-gray-500 border-r-gray-100 border-b-gray-100 px-1">
        <Image
          src={MENU_LIST_DATA[pathname]?.icon}
          alt="Menu Icon"
          width={16}
          height={16}
        />
        {MENU_LIST_DATA[pathname]?.title}
      </div>
    )
  );
}
