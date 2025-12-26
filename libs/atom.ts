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

// footer에 열려있는 창에서 서브 창이 있는지
export const subOpendState = atom<{ icon: string; title: string } | null>(null);
// footer 열려잇는 창에서 메인에 포커스되어 잇는지
export const isFocusedMain = atom<string | null>(null);
