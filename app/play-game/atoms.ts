"use client";

import { atom } from "jotai";

// game loading
export const loadingContentState = atom<boolean>(true);
export const characterDirectionState = atom<"up" | "down" | "left" | "right">(
  "down",
);
export const movementSpeedState = atom<0.25 | 0.5>(0.5);
export const personDirectionState = atom<"front" | "left" | "back">("front");
export const personTwoDirectionState = atom<"front" | "left" | "right">(
  "right",
);
