import WindowBoxHeader from "@/components/atoms/windowsBoxHeader";
import IconButton from "@/components/molecules/iconButton";
import { confirmMsgState } from "@/libs/atom";
import { useSetAtom } from "jotai";
import { useHandleWindowBox } from "@/libs/hooks/useHandleWindowBox";
import { FaRegWindowMaximize, FaRegWindowRestore } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Position } from "@/libs/types/state";
import { WindowsHandler } from "./windowsHandler";

export const WindowsClientActionComponent = ({
  title,
  icon,
  windowBox,
  parentRef,
  box,
  setBox,
  isMax,
  setIsMax,
  isSticky,
  setIsSticky,
  onClose,
  defaultPosition,
}: {
  title: string;
  icon: string;
  windowBox: React.RefObject<HTMLDivElement | null>;
  parentRef: React.RefObject<HTMLDivElement | null>;
  box: Position;
  setBox: React.Dispatch<React.SetStateAction<Position>>;
  isMax: boolean;
  setIsMax: React.Dispatch<React.SetStateAction<boolean>>;
  isSticky: boolean;
  setIsSticky: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  defaultPosition?: Position;
}) => {
  const setConfirmMsg = useSetAtom(confirmMsgState);
  const { handleDragStart, handleResizeStart, onResizeFunc } =
    useHandleWindowBox({
      windowBox,
      parentRef,
      box,
      setBox,
      isMax,
      setIsMax,
      isSticky,
      setIsSticky,
      defaultPosition,
    });
  return (
    <>
      <WindowBoxHeader
        title={title}
        titleIcon={icon}
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
                  confirmEvent: () => {
                    onClose();
                  },
                });
              }}
            />
          </>
        }
        onMouseDown={handleDragStart}
        onDoubleClick={onResizeFunc}
        isMax={isMax}
      />
      {!isMax && <WindowsHandler handleResizeStart={handleResizeStart} />}
    </>
  );
};
