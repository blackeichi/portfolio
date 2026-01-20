"use client";

import { atom } from "jotai";

// game loading
export const loadingContentState = atom<boolean>(true);
export const characterDirectionState = atom<"up" | "down" | "left" | "right">(
  "down",
);
