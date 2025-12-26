import WindowBoxHeader from "@/components/atoms/windowsBoxHeader";
import IconButton from "@/components/molecules/iconButton";
import { MENU_LIST_DATA } from "@/libs/uitls/constants";
import { WindowsHandler } from "./windowsHandler";
import { confirmMsgState, loadingState } from "@/libs/atom";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useHandleWindowBox } from "@/libs/hooks/useHandleWindowBox";
import { FaRegWindowMaximize, FaRegWindowRestore } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Position } from "@/libs/types/state";

export const ClientActionComponent = ({
  pathname,
  parentRef,
  box,
  setBox,
  isMax,
  setIsMax,
  isSticky,
  setIsSticky,
}: {
  pathname: string;
  parentRef: React.RefObject<HTMLDivElement | null>;
  box: Position;
  setBox: React.Dispatch<React.SetStateAction<Position>>;
  isMax: boolean;
  setIsMax: React.Dispatch<React.SetStateAction<boolean>>;
  isSticky: boolean;
  setIsSticky: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const setConfirmMsg = useSetAtom(confirmMsgState);
  const loading = useAtomValue(loadingState);
  const { handleDragStart, handleResizeStart, onResizeFunc } =
    useHandleWindowBox({
      parentRef,
      box,
      setBox,
      isMax,
      setIsMax,
      isSticky,
      setIsSticky,
    });
  return (
    <>
      <WindowBoxHeader
        title={loading ? "로딩중..." : MENU_LIST_DATA[pathname]?.title}
        titleIcon={loading ? undefined : MENU_LIST_DATA[pathname]?.icon}
        headBtns={
          <>
            <IconButton
              size={13}
              icon={isMax ? FaRegWindowRestore : FaRegWindowMaximize}
              onClick={onResizeFunc}
            />
            <IconButton
              icon={IoMdClose}
              onClick={() => {
                setConfirmMsg({
                  title: "닫기",
                  message: "정말 창을 닫으시겠어요?",
                  confirmEvent: () => router.push("/"),
                });
              }}
            />
          </>
        }
        onMouseDown={isMax ? undefined : handleDragStart}
        onDoubleClick={onResizeFunc}
      />
      {!isMax && <WindowsHandler handleResizeStart={handleResizeStart} />}
    </>
  );
};
