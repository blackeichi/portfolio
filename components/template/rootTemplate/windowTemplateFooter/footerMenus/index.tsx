import { useSetAtom } from "jotai";
import { EachMenu } from "./EachMenu";
import { useRouter } from "next/navigation";
import { MENU_LIST } from "@/libs/utils/constants";
import { loadingState, mousePositionState } from "@/libs/atom";
import { memo } from "react";

function FooterMenus({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const setLoading = useSetAtom(loadingState);
  const setMousePosition = useSetAtom(mousePositionState);
  return (
    <div className="absolute bottom-10 left-2 flex w-64 flex-col gap-4 border-3 border-gray-100 border-r-gray-500 border-b-gray-500 bg-gray-300 p-3 text-xs">
      {MENU_LIST.map((menu) => {
        if (menu.function) return null;
        return (
          <EachMenu
            key={menu.name}
            image={menu.icon}
            alt={`${menu.name} icon`}
            text={menu.name}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
              setMousePosition({ x: event.clientX, y: event.clientY });
              setIsOpen(false);
              if (window.location.pathname !== menu.href) {
                setLoading(true);
                router.push(menu.href);
              }
            }}
          />
        );
      })}
    </div>
  );
}

export default memo(FooterMenus);
