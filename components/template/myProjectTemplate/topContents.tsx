"use client";

import { OpenProjectBtn } from "./openProjectBtn";

export const TopContents = () => {
  return (
    <div className="w-full flex relative h-5">
      <div className="absolute -top-2">
        <OpenProjectBtn />
      </div>
    </div>
  );
};
