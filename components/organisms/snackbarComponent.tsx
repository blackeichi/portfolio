"use client";

import { alertMsgState, confirmMsgState, errorMsgState } from "@/libs/atom";
import { COLOR_THEME } from "@/libs/uitls/constants";
import { useAtom } from "jotai";
import { SnackbarKey, useSnackbar } from "notistack";
import { useEffect } from "react";
import Button from "../atoms/button";
import Overlay from "../atoms/overlay";
import WindowsBox from "../molecules/windowsBox";
import { IoMdClose } from "react-icons/io";
import IconButton from "../molecules/iconButton";
import { IoTriangle } from "react-icons/io5";

const snackbarStyle = {
  backgroundColor: COLOR_THEME.gray,
  boxShadow: "none",
  borderRadius: 0,
  color: "black",
  border: `4px solid ${COLOR_THEME.lightGray}`,
  borderRight: `4px solid ${COLOR_THEME.darkGray}`,
  borderBottom: `4px solid ${COLOR_THEME.darkGray}`,
};

export const SnackbarComponent = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [errorMsg, setErrorMsg] = useAtom(errorMsgState);
  const [alertMsg, setAlertMsg] = useAtom(alertMsgState);
  const [confirmMsg, setConfirmMsg] = useAtom(confirmMsgState);
  const action = (snackbarId: SnackbarKey) => (
    <Button
      onClick={() => {
        closeSnackbar(snackbarId);
      }}
      text="확인"
      width={50}
      height={30}
    />
  );
  useEffect(() => {
    if (alertMsg) {
      enqueueSnackbar(alertMsg, {
        variant: "info",
        action,
        style: snackbarStyle,
      });
      setAlertMsg(null);
    }
  }, [alertMsg]);
  useEffect(() => {
    if (errorMsg) {
      enqueueSnackbar(errorMsg, {
        variant: "error",
        action,
        style: snackbarStyle,
      });
      setErrorMsg(null);
    }
  }, [errorMsg]);
  return (
    <Overlay isOpen={!!confirmMsg} onClick={() => setConfirmMsg(null)}>
      <WindowsBox
        title={confirmMsg?.title || "Hello, world"}
        width={400}
        headBtns={
          <>
            <IconButton icon={IoMdClose} onClick={() => setConfirmMsg(null)} />
          </>
        }
      >
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="relative flex items-center pr-4 pl-16">
            <div className="absolute left-4 flex items-center justify-center">
              <p className="absolute mt-1 text-lg font-bold">!</p>
              <IoTriangle size={35} color={COLOR_THEME.yellow} />
            </div>
            <p>{confirmMsg?.message}</p>
          </div>
          <div className="flex gap-2">
            <Button
              text="확인"
              onClick={() => {
                confirmMsg?.confirmEvent();
                setConfirmMsg(null);
              }}
              width={80}
              height={35}
              bold
            />
            <Button
              text="취소"
              onClick={() => {
                confirmMsg?.cancelEvent?.();
                setConfirmMsg(null);
              }}
              width={80}
              height={35}
            />
          </div>
        </div>
      </WindowsBox>
    </Overlay>
  );
};
