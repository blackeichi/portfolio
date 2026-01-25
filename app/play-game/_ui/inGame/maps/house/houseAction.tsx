import { useSetAtom } from "jotai";
import { motion } from "framer-motion";
import { DialogBox } from "../../../components/dialogBox";
import { CHARACTER_KEYS, MAP_LIST } from "../../../utils";
import { HOUSE_ACTION_TYPE } from "./constants";
import {
  characterDirectionState,
  loadingContentState,
} from "../../../../atoms";
import { CancelActionComponent } from "../../../components/cancelActionComponent";

export default function HouseAction({
  actionType,
  setActionType,
  setCurrentMap,
  setCharacterKey,
  mapPositionRef,
  updateMapPosition,
  isNight,
  setIsNight,
  setNumber,
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
  setNumber: React.Dispatch<React.SetStateAction<number>>;
}) {
  const target = actionType ? HOUSE_ACTION_TYPE[actionType] : null;
  const setLoadingContent = useSetAtom(loadingContentState);
  const setDirection = useSetAtom(characterDirectionState);
  // move or answer event
  if (!target) return null;
  if (target === HOUSE_ACTION_TYPE.start)
    return (
      <>
        <div className="absolute left-0 top-0 w-full h-full bg-white z-20"></div>
        <motion.div
          className="absolute left-0 top-0 w-full h-full bg-black z-21 opacity-0"
          animate={{ opacity: 1 }}
        ></motion.div>
        <DialogBox
          key={target}
          dialogs={[
            ".....",
            ".....",
            "이런, 벌써 일어날 시간이네..",
            "오늘도 출근을 해야해!",
          ]}
          onClose={() => {
            console.log("actionType이 null이 되야하는데?");
            setActionType(null);
          }}
        />
      </>
    );
  else if (target === HOUSE_ACTION_TYPE.accessDoor) {
    if (isNight)
      return (
        <DialogBox
          key={target}
          dialogs={["어서 침대로 가자!"]}
          onClose={() => {
            updateMapPosition({
              movex: mapPositionRef.current.movex,
              movey: -33.5,
            });
            setDirection("up");
            setActionType(null);
          }}
        />
      );
    return (
      <DialogBox
        key={target}
        dialogs={["밖으로 나갈까?"]}
        onClose={() => setActionType(null)}
        yesEvent={() => {
          setActionType(HOUSE_ACTION_TYPE.outdoor);
        }}
        noEvent={() => {
          updateMapPosition({
            movex: mapPositionRef.current.movex,
            movey: -33.5,
          });
          setDirection("up");
          setActionType(null);
        }}
      />
    );
  } else if (target === HOUSE_ACTION_TYPE.outdoor) {
    return (
      <DialogBox
        key={target}
        dialogs={["아참!", "오늘은 헬스장을 가는 날이다..", "가야할까?"]}
        onClose={() => setActionType(null)}
        yesEvent={() => {
          setActionType(HOUSE_ACTION_TYPE.yesAnswer);
        }}
        noEvent={() => {
          setActionType(HOUSE_ACTION_TYPE.noAnswer);
        }}
      />
    );
  } else if (target === HOUSE_ACTION_TYPE.yesAnswer) {
    return (
      <DialogBox
        key={target}
        dialogs={[
          ".....",
          ".....",
          "오늘은 몸이 안좋은 거 같아...",
          "내일은 꼭 가야지!",
        ]}
        onClose={() => {
          mapPositionRef.current = { movex: 36, movey: -36 };
          setActionType(null);
          setLoadingContent(true);
          setCurrentMap(MAP_LIST.outside);
          setCharacterKey(CHARACTER_KEYS.character);
        }}
      />
    );
  } else if (target === HOUSE_ACTION_TYPE.noAnswer) {
    return (
      <DialogBox
        key={target}
        dialogs={["오늘은 그냥 쉬어야겠다.", "내일은 꼭 가야지!"]}
        onClose={() => {
          mapPositionRef.current = { movex: 36, movey: -36.5 };
          setActionType(null);
          setLoadingContent(true);
          setCurrentMap(MAP_LIST.outside);
          setCharacterKey(CHARACTER_KEYS.fat);
        }}
      />
    );
  } else if (target === HOUSE_ACTION_TYPE.bookEvent) {
    return (
      <DialogBox
        key={target}
        dialogs={
          isNight
            ? ["눈이 침침하다.."]
            : ["여러 가지 책이 꽂혀있다.", "특히 인문학 책이 많다."]
        }
        onClose={() => {
          setActionType(null);
        }}
      />
    );
  } else if (target === HOUSE_ACTION_TYPE.tvEvent) {
    return (
      <DialogBox
        key={target}
        dialogs={isNight ? ["1박~2일!"] : ["무한~도전!"]}
        onClose={() => {
          setActionType(null);
        }}
      />
    );
  } else if (target === HOUSE_ACTION_TYPE.radioEvent) {
    return (
      <DialogBox
        key={target}
        dialogs={
          isNight
            ? ["치지지직...", "하늘소..."]
            : ["치지지직...", "......", "라디오가 고장난 것 같다."]
        }
        onClose={() => {
          setActionType(null);
        }}
      />
    );
  } else if (target === HOUSE_ACTION_TYPE.computerEvent) {
    return (
      <DialogBox
        key={target}
        dialogs={
          isNight
            ? ["게임을 하고 싶지만..", "지금은 잠이 필요해"]
            : ["게임을 하고 싶지만..", "지금은 시간이 없다"]
        }
        onClose={() => {
          setActionType(null);
        }}
      />
    );
  } else if (target === HOUSE_ACTION_TYPE.bedEvent) {
    return (
      <DialogBox
        key={target}
        dialogs={
          isNight
            ? ["쇼츠를 조금만 볼까..", "....", "....", "zzz.."]
            : ["아직 따뜻해..."]
        }
        onClose={() => {
          if (!isNight) {
            setActionType(null);
            return;
          }
          setLoadingContent(true);
          mapPositionRef.current = { movex: 37.5, movey: -37.5 };
          setIsNight(false);
          setActionType(HOUSE_ACTION_TYPE.start);
          setCharacterKey(CHARACTER_KEYS.character);
          setDirection("down");
          setNumber((prev) => prev + 1);
        }}
      />
    );
  } else if (target === HOUSE_ACTION_TYPE.pictureEvent) {
    return (
      <DialogBox
        key={target}
        dialogs={isNight ? ["치킨이 먹고 싶다..."] : ["피자가 먹고 싶다..."]}
        onClose={() => {
          setActionType(null);
        }}
      />
    );
  } else if (target === HOUSE_ACTION_TYPE.needToBed) {
    return (
      <DialogBox
        key={target}
        dialogs={["집이다!", "오늘 하루 너무 피곤했어..", "침대로 가서 눕자"]}
        onClose={() => {
          setActionType(null);
        }}
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
