"use client";

import { alertMsgState, confirmMsgState, errorMsgState } from "@/libs/atom";
import { COLOR_THEME } from "@/libs/utils/constants";
import { useAtom } from "jotai";
import { SnackbarKey, useSnackbar } from "notistack";
import { useCallback, useEffect, useMemo } from "react";
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

  const action = useCallback(
    (snackbarId: SnackbarKey) => (
      <Button
        onClick={() => closeSnackbar(snackbarId)}
        text="확인"
        width={50}
        height={30}
      />
    ),
    [closeSnackbar],
  );

  const handleCloseConfirm = useCallback(() => {
    setConfirmMsg(null);
  }, [setConfirmMsg]);

  const handleConfirm = useCallback(() => {
    confirmMsg?.confirmEvent();
    setConfirmMsg(null);
  }, [confirmMsg, setConfirmMsg]);

  const handleCancel = useCallback(() => {
    confirmMsg?.cancelEvent?.();
    setConfirmMsg(null);
  }, [confirmMsg, setConfirmMsg]);

  const headBtns = useMemo(
    () => <IconButton icon={IoMdClose} onClick={handleCloseConfirm} />,
    [handleCloseConfirm],
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
  }, [alertMsg, enqueueSnackbar, action, setAlertMsg]);

  useEffect(() => {
    if (errorMsg) {
      enqueueSnackbar(errorMsg, {
        variant: "error",
        action,
        style: snackbarStyle,
      });
      setErrorMsg(null);
    }
  }, [errorMsg, enqueueSnackbar, action, setErrorMsg]);

  return (
    <Overlay isOpen={!!confirmMsg} onClick={handleCloseConfirm}>
      <WindowsBox
        title={confirmMsg?.title || "Hello, world"}
        width={400}
        headBtns={headBtns}
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
              onClick={handleConfirm}
              width={80}
              height={35}
              bold
            />
            <Button text="취소" onClick={handleCancel} width={80} height={35} />
          </div>
        </div>
      </WindowsBox>
    </Overlay>
  );
};
