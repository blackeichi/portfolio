"use client";

import { useState, useRef, useCallback } from "react";
import Character from "./character";
import { GameHome } from "./maps/home/home";
import { HomeAction } from "./maps/home/homeAction";
import { House } from "./maps/house";
import "./game.css";
import { interactables, MAP_LIST, obstacles } from "./utils";
import HouseAction from "./maps/house/houseAction";

/* 
TODO
- action시 캐릭터 멈추기
- 맵의 bottom 경계선을 장애물로 설정
*/

export const GameUi = () => {
  const [currentMap, setCurrentMap] = useState(MAP_LIST.house);
  const [actionType, setActionType] = useState<string | null>(null);
  const mapPositionRef = useRef({ movex: 37.5, movey: -37.5 });
  const mapRef = useRef<HTMLDivElement>(null);

  const updateMapPosition = useCallback(
    ({ movex, movey }: { movex: number; movey: number }) => {
      if (actionType) return; // 액션 중일 때는 움직이지 않음
      const current = mapPositionRef.current;
      // 변경사항이 있을 때만 업데이트
      const positionChanged =
        movex !== current.movex || movey !== current.movey;
      // 액션 발생
      if (interactables[currentMap][`${movex}${movey}`]) {
        return setActionType(interactables[currentMap][`${movex}${movey}`]);
      }
      // console.log(movex, movey);
      // 장애물 체크
      if (!positionChanged || obstacles[currentMap][`${movex}${movey}`]) {
        return;
      }
      mapPositionRef.current = { movex, movey };
      if (mapRef.current) {
        mapRef.current.style.transform = `translate(${-movex}%, ${-movey}%)`;
      }
    },
    [currentMap, actionType],
  );

  return (
    <>
      {currentMap === "house" && (
        <>
          <House ref={mapRef} />
          <HouseAction actionType={actionType} setActionType={setActionType} />
        </>
      )}
      {currentMap === "home" && (
        <>
          <GameHome ref={mapRef} />
          <HomeAction mapPositionRef={mapPositionRef} />
        </>
      )}
      <Character
        updateMapPosition={updateMapPosition}
        mapPositionRef={mapPositionRef}
        currentMap={currentMap}
      />
    </>
  );
};
