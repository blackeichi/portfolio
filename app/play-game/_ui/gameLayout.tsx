"use client";

import { COLOR_THEME } from "@/libs/utils/constants";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { StartScreen } from "./startScreen";

const InGame = dynamic(
  () => import("./inGame").then((mod) => ({ default: mod.InGame })),
  {
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="text-2xl">Loading Game...</div>
        </div>
      </div>
    ),
    ssr: false,
  },
);

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
      {size ? (
        <div
          className="bg-white overflow-hidden relative"
          style={{
            width: size,
            height: size,
          }}
        >
          {isStarted ? <InGame /> : <StartScreen setIsStarted={setIsStarted} />}
        </div>
      ) : (
        // 초기 로딩 스켈레톤
        <div className="bg-white overflow-hidden relative w-[90vh] h-[90vh] max-w-full max-h-full animate-pulse">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="h-12 w-64 bg-gray-300 rounded mx-auto" />
              <div className="space-y-2">
                <div className="h-8 w-48 bg-gray-200 rounded mx-auto" />
                <div className="h-8 w-48 bg-gray-200 rounded mx-auto" />
                <div className="h-8 w-48 bg-gray-200 rounded mx-auto" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
