import { EachHomeIcon } from "./EachHomeIcon";
import { memo, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { confirmMsgState, loadingState, mousePositionState } from "@/libs/atom";
import { MENU_LIST } from "@/libs/uitls/constants";
import { IconMenu } from "@/libs/types/state";

function HomeIcons() {
  const router = useRouter();
  const setLoading = useSetAtom(loadingState);
  const setMousePosition = useSetAtom(mousePositionState);
  const setConfirmMsgState = useSetAtom(confirmMsgState);
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const handleRunIcon = useCallback(
    (menu: IconMenu) => {
      if (menu.function) {
        if (menu.confirmMsg) {
          setConfirmMsgState({
            message: menu.confirmMsg,
            confirmEvent: () => {
              menu.function?.();
              setSelectedMenu(null);
            },
          });
        } else {
          menu.function?.();
          setSelectedMenu(null);
        }
      } else {
        if (window.location.pathname === menu.href) {
          return setSelectedMenu(null);
        }
        setLoading(true);
        router.push(menu.href);
      }
    },
    [router, setLoading, setConfirmMsgState]
  );
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
            handleRunIcon(MENU_LIST[selectedMenu]);
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
          handleRunIcon={handleRunIcon}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      ))}
    </div>
  );
}

export default memo(HomeIcons);
