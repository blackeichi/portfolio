import { useEffect } from "react";

export const CancelActionComponent = ({
  actionType,
  setActionType,
}: {
  actionType: string | null;
  setActionType: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  useEffect(() => {
    setActionType(null);
  }, [actionType, setActionType]);
  return null;
};
