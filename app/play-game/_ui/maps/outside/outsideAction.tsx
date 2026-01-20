import {
  characterDirectionState,
  loadingContentState,
} from "@/app/play-game/atoms";
import { CancelActionComponent } from "../../components/cancelActionComponent";
import { DialogBox } from "../../components/dialogBox";
import { OUT_SIDE_ACTION_TYPE } from "./utils";
import { useSetAtom } from "jotai";
import { MAP_LIST } from "../../utils";

export const OutsideAction = ({
  actionType,
  setActionType,
  setCurrentMap,
  updateMapPosition,
  mapPositionRef,
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
}) => {
  const target = actionType ? OUT_SIDE_ACTION_TYPE[actionType] : null;
  const setLoadingContent = useSetAtom(loadingContentState);
  const setDirection = useSetAtom(characterDirectionState);
  if (!target) return null;
  if (target === OUT_SIDE_ACTION_TYPE.houseSign)
    return (
      <DialogBox
        key={target}
        dialogs={["정우의 집"]}
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
          setActionType(null);
          setCurrentMap(MAP_LIST.house);
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
  return (
    <CancelActionComponent
      actionType={actionType}
      setActionType={setActionType}
    />
  );
};
