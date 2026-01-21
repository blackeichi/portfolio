"use client";

import { useEffect, useState, useRef, useCallback, memo, useMemo } from "react";
import { useHandleActionEvent, useHandleMoveEvent } from "../hooks";
import { CHARACTER_ID, MAP_LIMIT } from "./utils";
import { useAtom } from "jotai";
import { characterDirectionState } from "../atoms";

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
  actionType: string | null;
  characterKey: string;
  setActionType: React.Dispatch<React.SetStateAction<string | null>>;
}
// 초당 이동 속도
const movementSpeed = 0.25;

const Character = ({
  updateMapPosition,
  mapPositionRef,
  currentMap,
  actionType,
  characterKey,
  setActionType,
}: CharacterProps) => {
  const { minX, maxX, minY, maxY } = useMemo(
    () => MAP_LIMIT[currentMap],
    [currentMap],
  );
  const { pressedKeys } = useHandleMoveEvent();
  useHandleActionEvent({
    mapPositionRef,
    currentMap,
    setActionType,
  });

  const [direction, setDirection] = useAtom(characterDirectionState);
  const [isRunning, setIsRunning] = useState(false);

  const characterRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const directionRef = useRef("down");
  const isRunningRef = useRef(false);
  const lastTimeRef = useRef<number>(performance.now());

  // ref 값 동기화
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);
  // 키 입력 처리 함수 (최적화)
  const updateCharacter = useCallback(() => {
    // actionType이 있으면 캐릭터 움직임 중단
    if (actionType) {
      if (isRunningRef.current) {
        setIsRunning(false);
      }
      animationFrameRef.current = requestAnimationFrame(updateCharacter);
      return;
    }

    let newMovex = mapPositionRef.current.movex;
    let newMovey = mapPositionRef.current.movey;
    let newDirection = directionRef.current;
    let running = false;
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
    /* newMovex = Math.round(newMovex * 2) / 2;
      newMovey = Math.round(newMovey * 2) / 2; */
    updateMapPosition({ movex: newMovex, movey: newMovey });

    if (directionChanged) {
      setDirection(newDirection as "up" | "down" | "left" | "right");
    }

    if (runningChanged) {
      setIsRunning(running);
    }

    // 다음 프레임 요청
    // eslint-disable-next-line react-hooks/exhaustive-deps
    animationFrameRef.current = requestAnimationFrame(updateCharacter);
  }, [
    actionType,
    pressedKeys,
    updateMapPosition,
    mapPositionRef,
    maxX,
    maxY,
    minX,
    minY,
    setDirection,
  ]);

  // 애니메이션 루프 시작
  useEffect(() => {
    // actionType이 없을 때만 애니메이션 시작
    if (!actionType) {
      lastTimeRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(updateCharacter);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateCharacter, actionType]);

  // 캐릭터 CSS 클래스 결정 (메모이제이션)
  const characterClasses = useCallback(() => {
    const classes = [characterKey];
    if (isRunning && !actionType) {
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
  }, [direction, isRunning, characterKey, actionType]);

  return (
    <div className="character_box">
      <div
        ref={characterRef}
        id={CHARACTER_ID}
        className={characterClasses()}
      />
    </div>
  );
};

export default memo(Character);
