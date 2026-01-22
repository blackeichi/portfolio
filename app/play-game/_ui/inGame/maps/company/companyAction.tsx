import { useSetAtom } from "jotai";
import { DialogBox } from "../../../components/dialogBox";
import { CHARACTER_KEYS, MAP_LIST } from "../../../utils";
import {
  characterDirectionState,
  loadingContentState,
} from "../../../../atoms";
import { CancelActionComponent } from "../../../components/cancelActionComponent";
import { COMPANY_ACTION_TYPE } from "./constants";
import { useState } from "react";
import { OUT_SIDE_ACTION_TYPE } from "../outside/constants";

export default function CompanyAction({
  actionType,
  setActionType,
  setCurrentMap,
  setCharacterKey,
  mapPositionRef,
  updateMapPosition,
  isNight,
  setIsNight,
}: {
  actionType: string | null;
  setActionType: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentMap: React.Dispatch<React.SetStateAction<string>>;
  setCharacterKey: React.Dispatch<
    React.SetStateAction<keyof typeof CHARACTER_KEYS>
  >;
  mapPositionRef: React.MutableRefObject<{ movex: number; movey: number }>;
  updateMapPosition: ({
    movex,
    movey,
  }: {
    movex: number;
    movey: number;
  }) => void;
  isNight: boolean;
  setIsNight: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [workLists, setWorkLists] = useState({
    bug1: isNight,
    bug2: isNight,
    work1: isNight,
    work2: isNight,
  });
  const target = actionType ? COMPANY_ACTION_TYPE[actionType] : null;
  const setLoadingContent = useSetAtom(loadingContentState);
  const setDirection = useSetAtom(characterDirectionState);
  // move or answer event
  if (!target) return null;
  if (target === COMPANY_ACTION_TYPE.weStillHaveWork)
    return (
      <DialogBox
        key={target}
        dialogs={["아직 처리해야할", "업무가 남아있습니다!!"]}
        onClose={() => setActionType(null)}
      />
    );
  if (target === COMPANY_ACTION_TYPE.goToOutside)
    return (
      <DialogBox
        key={target}
        dialogs={["퇴근하시겠습니까?"]}
        yesEvent={() => {
          if (
            workLists.bug1 &&
            workLists.bug2 &&
            workLists.work1 &&
            workLists.work2
          ) {
            mapPositionRef.current = { movex: 17.5, movey: -48 };
            setLoadingContent(true);
            setActionType(OUT_SIDE_ACTION_TYPE.ItsTimeToGoHome);
            setCurrentMap(MAP_LIST.outside);
            setIsNight(true);
            setCharacterKey(CHARACTER_KEYS.old);
          } else {
            setActionType(COMPANY_ACTION_TYPE.weStillHaveWork);
            updateMapPosition({
              movex: mapPositionRef.current.movex,
              movey: -29,
            });
            setDirection("up");
          }
        }}
        noEvent={() => {
          setActionType(null);
          updateMapPosition({
            movex: mapPositionRef.current.movex,
            movey: -29,
          });
          setDirection("up");
        }}
        onClose={() => setActionType(null)}
      />
    );
  else if (
    target === COMPANY_ACTION_TYPE.handleBug ||
    target === COMPANY_ACTION_TYPE.handleBug_2
  ) {
    const alreadyHandled =
      (target === COMPANY_ACTION_TYPE.handleBug && workLists.bug1) ||
      (target === COMPANY_ACTION_TYPE.handleBug_2 && workLists.bug2);
    return (
      <DialogBox
        key={target}
        dialogs={
          alreadyHandled
            ? ["이미 처리한 버그입니다."]
            : ["....", "버그가 발생했다..!", "버그를 처리하시겠습니까?"]
        }
        yesEvent={
          alreadyHandled
            ? undefined
            : () => {
                if (target === COMPANY_ACTION_TYPE.handleBug) {
                  setWorkLists({ ...workLists, bug1: true });
                } else {
                  setWorkLists({ ...workLists, bug2: true });
                }
                setActionType(null);
              }
        }
        noEvent={
          alreadyHandled
            ? undefined
            : () => {
                setActionType(null);
              }
        }
        onClose={() => setActionType(null)}
      />
    );
  } else if (
    target === COMPANY_ACTION_TYPE.handleWork ||
    target === COMPANY_ACTION_TYPE.handleWork_2
  ) {
    const alreadyHandled =
      (target === COMPANY_ACTION_TYPE.handleWork && workLists.work1) ||
      (target === COMPANY_ACTION_TYPE.handleWork_2 && workLists.work2);
    return (
      <DialogBox
        key={target}
        dialogs={
          alreadyHandled
            ? ["이미 처리한 업무입니다."]
            : ["....", "처리해야할 업무가 있다.", "업무를 처리하시겠습니까?"]
        }
        yesEvent={
          alreadyHandled
            ? undefined
            : () => {
                if (target === COMPANY_ACTION_TYPE.handleWork) {
                  setWorkLists({ ...workLists, work1: true });
                } else {
                  setWorkLists({ ...workLists, work2: true });
                }
                setActionType(null);
              }
        }
        noEvent={
          alreadyHandled
            ? undefined
            : () => {
                setActionType(null);
              }
        }
        onClose={() => setActionType(null)}
      />
    );
  }
  return (
    <CancelActionComponent
      actionType={actionType}
      setActionType={setActionType}
    />
  );
}
