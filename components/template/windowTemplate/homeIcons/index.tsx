import { EachHomeIcon } from "./EachHomeIcon";
import { memo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { loadingState, mousePositionState } from "@/libs/atom";
import { MENU_LIST } from "@/libs/uitls/constants";

function HomeIcons() {
  const router = useRouter();
  const setLoading = useSetAtom(loadingState);
  const setMousePosition = useSetAtom(mousePositionState);
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  return (
    <div
      className="absolute top-0 left-0 z-10 flex h-full w-full flex-col gap-3 pt-3 pl-1"
      onMouseMove={
        selectedMenu !== null
          ? (event) => setMousePosition({ x: event.clientX, y: event.clientY })
          : undefined
      }
      onClick={(event: React.MouseEvent<HTMLDivElement>) =>
        setMousePosition({ x: event.clientX, y: event.clientY })
      }
      onKeyDown={(event) => {
        if (selectedMenu !== null) {
          if (event.key === "Enter") {
            if (window.location.pathname === MENU_LIST[selectedMenu].href) {
              return setSelectedMenu(null);
            }
            setLoading(true);
            router.push(MENU_LIST[selectedMenu].href);
          } else if (event.key === "ArrowUp" && selectedMenu > 0) {
            setSelectedMenu(selectedMenu - 1);
          } else if (
            event.key === "ArrowDown" &&
            selectedMenu < MENU_LIST.length - 1
          ) {
            setSelectedMenu(selectedMenu + 1);
          }
        }
      }}
    >
      {MENU_LIST.map((menu, index) => (
        <EachHomeIcon
          key={menu.name}
          index={index}
          menu={menu}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          router={router}
          setLoading={setLoading}
        />
      ))}
    </div>
  );
}

export default memo(HomeIcons);
