import { useSetAtom } from "jotai";
import { DialogBox } from "../../components/dialogBox";
import { CHARACTER_KEYS, MAP_LIST } from "../../utils";
import { HOUSE_ACTION_TYPE } from "./utils";
import { loadingContentState } from "@/libs/atom";

export default function HouseAction({
  actionType,
  setActionType,
  setCurrentMap,
  setCharacterKey,
}: {
  actionType: string | null;
  setActionType: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentMap: React.Dispatch<React.SetStateAction<string>>;
  setCharacterKey: React.Dispatch<
    React.SetStateAction<keyof typeof CHARACTER_KEYS>
  >;
}) {
  const target = actionType ? HOUSE_ACTION_TYPE[actionType] : null;
  const setLoadingContent = useSetAtom(loadingContentState);

  // move or answer event
  if (!target) return null;
  if (target === HOUSE_ACTION_TYPE.start)
    return (
      <DialogBox
        dialogs={[
          "활기찬 아침!",
          "오늘도 출근을 해야해!",
          "집 밖으로 나가볼까?",
        ]}
        onClose={() => setActionType(null)}
      />
    );
  if (target === HOUSE_ACTION_TYPE.outdoor) {
    return (
      <DialogBox
        dialogs={["오늘은 헬스장을 가는 날이다..", "가야할까?"]}
        onClose={() => setActionType(null)}
        yesEvent={() => {
          setActionType(HOUSE_ACTION_TYPE.yesAnswer);
        }}
        noEvent={() => {
          setActionType(HOUSE_ACTION_TYPE.noAnswer);
        }}
      />
    );
  }
  if (target === HOUSE_ACTION_TYPE.yesAnswer) {
    return (
      <DialogBox
        dialogs={[
          ".....",
          ".....",
          "오늘은 몸이 안좋은 거 같아...",
          "내일은 꼭 가야지!",
        ]}
        onClose={() => {
          setActionType(null);
          setLoadingContent(true);
          setCurrentMap(MAP_LIST.home);
          setCharacterKey(CHARACTER_KEYS.fat);
        }}
      />
    );
  }
  if (target === HOUSE_ACTION_TYPE.noAnswer) {
    return (
      <DialogBox
        dialogs={["오늘은 그냥 쉬어야겠다!", "내일은 꼭 가야지!"]}
        onClose={() => {
          setActionType(null);
          setLoadingContent(true);
          setCurrentMap(MAP_LIST.home);
          setCharacterKey(CHARACTER_KEYS.fat);
        }}
      />
    );
  }
  return null;
}
