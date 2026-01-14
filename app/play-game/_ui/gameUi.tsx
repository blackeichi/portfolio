"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Character from "./character";
import "./game.css";
import { arrowKeys } from "./utils";
import { GameHome } from "./maps/home/home";
import { HomeAction } from "./maps/home/homeAction";

export const GameUi = () => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentMap, setCurrentMap] = useState("home");

  const animationFrameRef = useRef<number | undefined>(undefined);
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

  // 이미지 프리로드 (완료 대기)
  useEffect(() => {
    const imagePaths = [
      "/images/game/character_front.png",
      "/images/game/character_front_run.png",
      "/images/game/character_back.png",
      "/images/game/character_back_run.png",
      "/images/game/character_right.png",
      "/images/game/character_right_run.png",
    ];

    const promises = imagePaths.map((src) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          resolve();
        };
        img.onerror = () => {
          reject(new Error(`Failed to load ${src}`));
        };
        img.src = src;
      });
    });

    Promise.all(promises)
      .then(() => {
        setImagesLoaded(true);
      })
      .catch((error) => {
        console.error("Image loading failed:", error);
        // 실패해도 게임은 보여줌 (선택적)
        setImagesLoaded(true);
      });
  }, []);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // 이미지 로딩 중일 때 로딩 화면 표시
  if (!imagesLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900 mx-auto mb-4"></div>
          <p className="text-lg">Loading game assets...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentMap === "home" && (
        <>
          <GameHome ref={mapRef} setImagesLoaded={setImagesLoaded} />
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
