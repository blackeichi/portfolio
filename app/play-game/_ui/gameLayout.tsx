"use client";

import { COLOR_THEME } from "@/libs/uitls/constants";
import { useCallback, useEffect, useRef, useState } from "react";
import { InGame } from "./inGame";
import { StartScreen } from "./startScreen";

export const GameLayout = () => {
  const [size, setSize] = useState<string | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const layoutRef = useRef<HTMLDivElement | null>(null);

  const updateSize = useCallback(() => {
    if (layoutRef.current) {
      const layoutWidth = layoutRef.current.clientWidth;
      const layoutHeight = layoutRef.current.clientHeight;
      setSize(Math.min(layoutWidth, layoutHeight) + "px");
    }
  }, []);

  useEffect(() => {
    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    if (layoutRef.current) {
      resizeObserver.observe(layoutRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateSize]);
  return (
    <div
      id="gameLayoutBox"
      ref={layoutRef}
      className="w-full h-full flex justify-center items-center overflow-hidden"
      style={{
        backgroundColor: COLOR_THEME.green,
      }}
    >
      {size && (
        <div
          className="bg-white overflow-hidden relative"
          style={{
            width: size,
            height: size,
          }}
        >
          {isStarted ? <InGame /> : <StartScreen setIsStarted={setIsStarted} />}
        </div>
      )}
    </div>
  );
};
