"use client";

import { atom } from "jotai";
import { DEFAULT_SUB_WINDOW_BOX, SUB_WINDOW_LIST } from "./utils/constants";
import { Position } from "./types/state";

export const errorMsgState = atom<string | null>(null);
export const alertMsgState = atom<string | null>(null);
export const confirmMsgState = atom<{
  title?: string;
  message: string;
  confirmEvent: () => void;
  cancelEvent?: () => void;
} | null>(null);
export const loadingState = atom<boolean>(true);
export const mousePositionState = atom<{ x: number; y: number }>({
  x: 0,
  y: 0,
});

// footer에 열려있는 창에서 서브 창이 있는지
export const subOpenedState = atom<keyof typeof SUB_WINDOW_LIST | null>(null);
export const subOpenedBoxInfo = atom<Position>(DEFAULT_SUB_WINDOW_BOX);
// footer 열려잇는 창에서 메인에 포커스되어 잇는지
export const isFocusedMainState = atom<boolean>(true);
