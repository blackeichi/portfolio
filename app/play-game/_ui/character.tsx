"use client";

import { useEffect, useState, useRef, useCallback, memo } from "react";

interface CharacterProps {
  pressedKeys: string[];
  onPositionChange: (position: { movex: number; movey: number }) => void;
}
const end = 100;
const movementSpeed = 0.4;
const maxMoveMap = 75;
const minMove = 0;
const obstacles = [
  { x: [-end, 2], y: [72.5, end] },
  { x: [69.5, end], y: [72.5, end] },
];

const Character = ({ pressedKeys, onPositionChange }: CharacterProps) => {
  const [direction, setDirection] = useState("down");
  const [isRunning, setIsRunning] = useState(false);

  const characterRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const positionRef = useRef({ movex: 37.5, movey: 0 });
  const directionRef = useRef("down");
  const isRunningRef = useRef(false);

  // ref 값 동기화
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  function checkCollision(newX: number, newY: number) {
    return obstacles.some((obstacle) => {
      return (
        newX >= obstacle.x[0] &&
        newX <= obstacle.x[1] &&
        -newY >= obstacle.y[0] &&
        -newY <= obstacle.y[1]
      );
    });
  }

  // 키 입력 처리 함수 (최적화)
  const updateCharacter = useCallback(() => {
    const current = positionRef.current;
    let newMovex = current.movex;
    let newMovey = current.movey;
    let newDirection = directionRef.current;
    let running = false;

    // 배열의 마지막 키(가장 최근 입력)를 우선으로 처리
    const lastKey = pressedKeys[pressedKeys.length - 1];

    if (lastKey) {
      running = true;

      // 가장 최근 입력된 키에 따라 방향 결정
      if (lastKey === "ArrowUp") {
        newDirection = "up";
        if (-newMovey < maxMoveMap) {
          newMovey -= movementSpeed;
        }
      } else if (lastKey === "ArrowDown") {
        newDirection = "down";
        if (newMovey < -minMove) {
          newMovey += movementSpeed;
        }
      } else if (lastKey === "ArrowRight") {
        newDirection = "right";
        if (newMovex < maxMoveMap) {
          newMovex += movementSpeed;
        }
      } else if (lastKey === "ArrowLeft") {
        newDirection = "left";
        if (newMovex > minMove) {
          newMovex -= movementSpeed;
        }
      }
    }

    if (pressedKeys.length === 0) {
      running = false;
    }
    // 변경사항이 있을 때만 업데이트
    const positionChanged =
      newMovex !== current.movex || newMovey !== current.movey;
    const directionChanged = newDirection !== directionRef.current;
    const runningChanged = running !== isRunningRef.current;
    if (positionChanged && !checkCollision(newMovex, newMovey)) {
      positionRef.current = { movex: newMovex, movey: newMovey };
      onPositionChange(positionRef.current);
    }

    if (directionChanged) {
      setDirection(newDirection);
    }

    if (runningChanged) {
      setIsRunning(running);
    }

    // 다음 프레임 요청
    // eslint-disable-next-line react-hooks/exhaustive-deps
    animationFrameRef.current = requestAnimationFrame(updateCharacter);
  }, [pressedKeys, onPositionChange]);

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

  return (
    <div className="character_box">
      <div ref={characterRef} className={characterClasses()} />
    </div>
  );
};

export default memo(Character);
