"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Character from "./character";
import "./game.css";
import { arrowKeys } from "./utils";
import { GameHome } from "./maps/home/home";
import { HomeAction } from "./maps/home/homeAction";
import { useImagePreload } from "@/libs/hooks/useImagePreload";
import { House } from "./maps/house";

export const GameUi = () => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  const [currentMap, setCurrentMap] = useState("home");
  const mapPositionRef = useRef({ movex: 37.5, movey: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const updateMapPosition = useCallback((movex: number, movey: number) => {
    const x = -movex;
    const y = -movey;

    if (
      mapPositionRef.current.movex !== x ||
      mapPositionRef.current.movey !== y
    ) {
      mapPositionRef.current = { movex: x, movey: y };

      if (mapRef.current) {
        mapRef.current.style.transform = `translate(${x}%, ${y}%)`;
      }
    }
  }, []);

  // 캐릭터 위치 변경 핸들러 (메모이제이션)
  const handlePositionChange = useCallback(
    (position: { movex: number; movey: number }) => {
      updateMapPosition(position.movex, position.movey);
    },
    [updateMapPosition]
  );

  // 키 입력 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (arrowKeys.includes(e.key)) {
        e.preventDefault();
        setPressedKeys((prev) => {
          if (prev.includes(e.key)) return prev;
          return [...prev, e.key];
        });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (arrowKeys.includes(e.key)) {
        e.preventDefault();
        setPressedKeys((prev) => {
          if (!prev.includes(e.key)) return prev;
          return prev.filter((key) => key !== e.key);
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  const imagePaths = [
    "/images/game/character_front.png",
    "/images/game/character_front_run.png",
    "/images/game/character_back.png",
    "/images/game/character_back_run.png",
    "/images/game/character_right.png",
    "/images/game/character_right_run.png",
  ];
  useImagePreload({ imagePaths });

  return (
    <>
      {currentMap === "house" && (
        <>
          <House />
        </>
      )}
      {currentMap === "home" && (
        <>
          <GameHome ref={mapRef} />
          <HomeAction mapPositionRef={mapPositionRef} />
        </>
      )}
      <Character
        pressedKeys={pressedKeys}
        onPositionChange={handlePositionChange}
      />
    </>
  );
};
