import {
  characterDirectionState,
  loadingContentState,
} from "@/app/play-game/atoms";
import { CancelActionComponent } from "../../../components/cancelActionComponent";
import { DialogBox } from "../../../components/dialogBox";
import { OUT_SIDE_ACTION_TYPE } from "./constants";
import { useSetAtom } from "jotai";
import { MAP_LIST } from "../../../utils";
import { HOUSE_ACTION_TYPE } from "../house/constants";

export const OutsideAction = ({
  actionType,
  setActionType,
  setCurrentMap,
  updateMapPosition,
  mapPositionRef,
  isNight,
}: {
  actionType: string | null;
  setActionType: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentMap: React.Dispatch<React.SetStateAction<string>>;
  updateMapPosition: ({
    movex,
    movey,
  }: {
    movex: number;
    movey: number;
  }) => void;
  mapPositionRef: React.MutableRefObject<{ movex: number; movey: number }>;
  isNight: boolean;
}) => {
  const target = actionType ? OUT_SIDE_ACTION_TYPE[actionType] : null;
  const setLoadingContent = useSetAtom(loadingContentState);
  const setDirection = useSetAtom(characterDirectionState);
  if (!target) return null;
  if (target === OUT_SIDE_ACTION_TYPE.houseSign)
    return (
      <DialogBox
        key={target}
        dialogs={[`"정우의 집"`]}
        onClose={() => setActionType(null)}
      />
    );
  if (target === OUT_SIDE_ACTION_TYPE.goToHouse)
    return (
      <DialogBox
        key={target}
        dialogs={["집으로 들어가시겠습니까?"]}
        yesEvent={() => {
          mapPositionRef.current = { movex: 46, movey: -33.5 };
          setLoadingContent(true);
          setCurrentMap(MAP_LIST.house);
          if (isNight) {
            setActionType(HOUSE_ACTION_TYPE.needToBed);
          } else {
            setActionType(null);
          }
        }}
        noEvent={() => {
          setActionType(null);
          updateMapPosition({
            movex: mapPositionRef.current.movex,
            movey: -36.5,
          });
          setDirection("down");
        }}
        onClose={() => setActionType(null)}
      />
    );
  if (target === OUT_SIDE_ACTION_TYPE.goToGym)
    return (
      <DialogBox
        key={target}
        dialogs={
          isNight
            ? ["?"]
            : ["....", "....", "이곳은 헬스장이야..!", "나는 회사로 가야해!"]
        }
        onClose={() => {
          setActionType(null);
          updateMapPosition({
            movex: mapPositionRef.current.movex,
            movey: -21.5,
          });
          setDirection("down");
        }}
      />
    );
  if (target === OUT_SIDE_ACTION_TYPE.goToPC)
    return (
      <DialogBox
        key={target}
        dialogs={
          isNight
            ? ["....", "....", "게임할 여력이 없다..."]
            : ["....", "여기는 피씨방이야..!", "나는 회사로 가야해 ?!"]
        }
        onClose={() => {
          setActionType(null);
          updateMapPosition({
            movex: mapPositionRef.current.movex,
            movey: -48.5,
          });
          setDirection("down");
        }}
      />
    );
  if (target === OUT_SIDE_ACTION_TYPE.goToCompany && !isNight)
    return (
      <DialogBox
        key={target}
        dialogs={["출근하시겠습니까?"]}
        yesEvent={() => {
          mapPositionRef.current = { movex: 52.5, movey: -29 };
          setLoadingContent(true);
          setActionType(null);
          setCurrentMap(MAP_LIST.company);
        }}
        noEvent={() => {
          setActionType(null);
          updateMapPosition({
            movex: mapPositionRef.current.movex,
            movey: -48.5,
          });
          setDirection("down");
        }}
        onClose={() => setActionType(null)}
      />
    );
  if (target === OUT_SIDE_ACTION_TYPE.ItsTimeToGoHome)
    return (
      <DialogBox
        key={target}
        dialogs={["너무 힘들다..", "어서 집에 가자.."]}
        onClose={() => setActionType(null)}
      />
    );
  return (
    <CancelActionComponent
      actionType={actionType}
      setActionType={setActionType}
    />
  );
};
