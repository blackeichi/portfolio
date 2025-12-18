import { atom } from "jotai";

export const errorMsgState = atom<string | null>(null);
export const alertMsgState = atom<string | null>(null);
export const confirmMsgState = atom<{
  title?: string;
  message: string;
  confirmEvent: () => void;
} | null>(null);
export const loadingState = atom<boolean>(true);
export const mousePositionState = atom<{ x: number; y: number }>({
  x: 0,
  y: 0,
});
