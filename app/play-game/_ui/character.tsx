"use client";

import { useEffect, useState, useRef, useCallback, memo } from "react";
import { useImagePreload } from "@/libs/hooks/useImagePreload";
import { useHandleMoveEvent } from "../hooks";
import { MAP_LIMIT } from "./utils";

interface CharacterProps {
  updateMapPosition: ({
    movex,
    movey,
  }: {
    movex: number;
    movey: number;
  }) => void;
  mapPositionRef: React.MutableRefObject<{ movex: number; movey: number }>;
  currentMap: string;
}
// collision 처리를 위해 0.5 단위로 끊기.
const movementSpeed = 0.5;

const Character = ({
  updateMapPosition,
  mapPositionRef,
  currentMap,
}: CharacterProps) => {
  const { minX, maxX, minY, maxY } = MAP_LIMIT[currentMap];
  const { pressedKeys } = useHandleMoveEvent();

  const [direction, setDirection] = useState("down");
  const [isRunning, setIsRunning] = useState(false);

  const characterRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const directionRef = useRef("down");
  const isRunningRef = useRef(false);

  // ref 값 동기화
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);
  // 키 입력 처리 함수 (최적화)
  const updateCharacter = useCallback(() => {
    let newMovex = mapPositionRef.current.movex;
    let newMovey = mapPositionRef.current.movey;
    let newDirection = directionRef.current;
    let running = false;
    console.log(newMovey, minY, maxY);
    // 배열의 마지막 키(가장 최근 입력)를 우선으로 처리
    const lastKey = pressedKeys[pressedKeys.length - 1];

    if (lastKey) {
      running = true;

      // 가장 최근 입력된 키에 따라 방향 결정
      if (lastKey === "ArrowUp") {
        newDirection = "up";
        if (newMovey > maxY) {
          newMovey -= movementSpeed;
        }
      } else if (lastKey === "ArrowDown") {
        newDirection = "down";
        if (newMovey < minY) {
          newMovey += movementSpeed;
        }
      } else if (lastKey === "ArrowRight") {
        newDirection = "right";
        if (newMovex < maxX) {
          newMovex += movementSpeed;
        }
      } else if (lastKey === "ArrowLeft") {
        newDirection = "left";
        if (newMovex > minX) {
          newMovex -= movementSpeed;
        }
      }
    }

    if (pressedKeys.length === 0) {
      running = false;
    }

    const directionChanged = newDirection !== directionRef.current;
    const runningChanged = running !== isRunningRef.current;

    updateMapPosition({ movex: newMovex, movey: newMovey });

    if (directionChanged) {
      setDirection(newDirection);
    }

    if (runningChanged) {
      setIsRunning(running);
    }

    // 다음 프레임 요청
    // eslint-disable-next-line react-hooks/exhaustive-deps
    animationFrameRef.current = requestAnimationFrame(updateCharacter);
  }, [pressedKeys, updateMapPosition, mapPositionRef]);

  // 애니메이션 루프 시작
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(updateCharacter);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateCharacter]);

  // 캐릭터 CSS 클래스 결정 (메모이제이션)
  const characterClasses = useCallback(() => {
    const classes = ["character"];

    if (isRunning) {
      classes.push("run");
    }

    switch (direction) {
      case "up":
        classes.push("back");
        break;
      case "right":
        classes.push("right");
        break;
      case "left":
        classes.push("right", "flip");
        break;
      default: // down
        break;
    }

    return classes.join(" ");
  }, [direction, isRunning]);

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
    <div className="character_box">
      <div ref={characterRef} className={characterClasses()} />
    </div>
  );
};

export default memo(Character);
