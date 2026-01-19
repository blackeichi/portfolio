"use client";

import { useState, useRef, useCallback } from "react";
import Character from "./character";
import { GameHome } from "./maps/home/home";
import { HomeAction } from "./maps/home/homeAction";
import { House } from "./maps/house";
import "./game.css";
import { CHARACTER_KEYS, interactables, MAP_LIST, obstacles } from "./utils";
import HouseAction from "./maps/house/houseAction";
import { HOUSE_ACTION_TYPE } from "./maps/house/utils";
import { useAtomValue } from "jotai";
import { loadingContentState } from "@/libs/atom";

export const GameUi = () => {
  const loadingContent = useAtomValue(loadingContentState);
  const [currentMap, setCurrentMap] = useState(MAP_LIST.house);
  const [actionType, setActionType] = useState<string | null>(
    HOUSE_ACTION_TYPE.start,
  );
  const [characterKey, setCharacterKey] = useState<keyof typeof CHARACTER_KEYS>(
    CHARACTER_KEYS.character,
  );
  const mapPositionRef = useRef({ movex: 37.5, movey: -37.5 });
  const mapRef = useRef<HTMLDivElement>(null);

  const updateMapPosition = useCallback(
    ({ movex, movey }: { movex: number; movey: number }) => {
      if (actionType) return; // 액션 중일 때는 움직이지 않음
      const current = mapPositionRef.current;
      // 변경사항이 있을 때만 업데이트
      const positionChanged =
        movex !== current.movex || movey !== current.movey;
      // console.log(movex, movey);
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
      {loadingContent && (
        <div className="w-full h-full bg-white z-50 absolute left-0 top-0"></div>
      )}
      {currentMap === MAP_LIST.house && (
        <>
          <House ref={mapRef} />
          <HouseAction
            actionType={actionType}
            setActionType={setActionType}
            setCurrentMap={setCurrentMap}
            setCharacterKey={setCharacterKey}
          />
        </>
      )}
      {currentMap === MAP_LIST.home && (
        <>
          <GameHome ref={mapRef} />
          <HomeAction mapPositionRef={mapPositionRef} />
        </>
      )}
      <Character
        updateMapPosition={updateMapPosition}
        mapPositionRef={mapPositionRef}
        currentMap={currentMap}
        actionType={actionType}
        characterKey={characterKey}
        setActionType={setActionType}
      />
    </>
  );
};
