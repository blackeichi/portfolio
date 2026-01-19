import { DialogBox } from "../../components/dialogBox";
import { HOUSE_ACTION_TYPE, houseInteractions } from "./utils";

export default function HouseAction({
  actionType,
  setActionType,
}: {
  actionType: string | null;
  setActionType: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const target = actionType ? houseInteractions[actionType] : null;
  console.log(target, actionType);
  if (!target) return null;
  if (target === HOUSE_ACTION_TYPE.outdoor) {
    return (
      <DialogBox
        dialogs={["오늘은 헬스장을 가는 날이다..", "가야할까?"]}
        onClose={() => setActionType(null)}
      />
    );
  }
}
