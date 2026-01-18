"use client";

import { useState, useRef, useCallback } from "react";
import Character from "./character";
import { GameHome } from "./maps/home/home";
import { HomeAction } from "./maps/home/homeAction";
import { House } from "./maps/house";
import "./game.css";
import { homeObstacles, MAP_LIST } from "./utils";

export const GameUi = () => {
  const [currentMap, setCurrentMap] = useState(MAP_LIST.house);
  const mapPositionRef = useRef({ movex: 37.5, movey: -37.5 });
  const mapRef = useRef<HTMLDivElement>(null);

  const updateMapPosition = useCallback(
    ({ movex, movey }: { movex: number; movey: number }) => {
      const current = mapPositionRef.current;
      // 변경사항이 있을 때만 업데이트
      const positionChanged =
        movex !== current.movex || movey !== current.movey;
      /* 
      맵 추가후엔 currentMap 상태에 따라 다른 장애물 체크 필요
    */
      if (!positionChanged /* || homeObstacles[`${movex}${movey}`] */) {
        return;
      }
      mapPositionRef.current = { movex, movey };
      if (mapRef.current) {
        mapRef.current.style.transform = `translate(${-movex}%, ${-movey}%)`;
      }
    },
    [],
  );

  return (
    <>
      {currentMap === "house" && (
        <>
          <House ref={mapRef} />
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
