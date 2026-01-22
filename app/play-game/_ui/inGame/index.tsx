import { useState, useRef, useCallback } from "react";
import Character from "./character";
import { House } from "./maps/house";
import { CHARACTER_KEYS, interactables, MAP_LIST, obstacles } from "../utils";
import HouseAction from "./maps/house/houseAction";
import { useAtomValue } from "jotai";
import { OutsideMap } from "./maps/outside";
import { OutsideAction } from "./maps/outside/outsideAction";
import "./game.css";
import { loadingContentState } from "../../atoms";
import { HOUSE_ACTION_TYPE } from "./maps/house/constants";

export const InGame = () => {
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
      const current = mapPositionRef.current;
      // 변경사항이 있을 때만 업데이트
      const positionChanged =
        movex !== current.movex || movey !== current.movey;
      // console.log(movex, movey);
      // 액션 발생
      // const roundedMovex = Math.round(movex * 2) / 2;
      // const roundedMovey = Math.round(movey * 2) / 2;
      if (interactables[currentMap][`${movex}${movey}`]) {
        return setActionType(interactables[currentMap][`${movex}${movey}`]);
      }
      // 장애물 체크
      if (!positionChanged || obstacles[currentMap][`${movex}${movey}`]) {
        return;
      }
      mapPositionRef.current = { movex: movex, movey: movey };
      if (mapRef.current) {
        mapRef.current.style.transform = `translate(${-movex}%, ${-movey}%)`;
      }
    },
    [currentMap],
  );
  return (
    <>
      {loadingContent && (
        <div className="w-full h-full bg-white z-50 absolute left-0 top-0"></div>
      )}
      {currentMap === MAP_LIST.house && (
        <>
          <House ref={mapRef} mapPositionRef={mapPositionRef} />
          <HouseAction
            actionType={actionType}
            setActionType={setActionType}
            setCurrentMap={setCurrentMap}
            setCharacterKey={setCharacterKey}
            mapPositionRef={mapPositionRef}
            updateMapPosition={updateMapPosition}
          />
        </>
      )}
      {currentMap === MAP_LIST.outside && (
        <>
          <OutsideMap ref={mapRef} mapPositionRef={mapPositionRef} />
          <OutsideAction
            actionType={actionType}
            setActionType={setActionType}
            setCurrentMap={setCurrentMap}
            updateMapPosition={updateMapPosition}
            mapPositionRef={mapPositionRef}
          />
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
