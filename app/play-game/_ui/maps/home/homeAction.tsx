import { useEffect } from "react";
import { homeInteractions } from "./utils";

export const HomeAction = ({
  mapPositionRef,
}: {
  mapPositionRef: React.MutableRefObject<{ movex: number; movey: number }>;
}) => {
  useEffect(() => {
    const handleAction = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        const x = -mapPositionRef.current.movex;
        const y = -mapPositionRef.current.movey;
        const action = homeInteractions[`${x}${y}`];
        if (action) {
          console.log(`${x}${y}`);
        }
      }
    };
    window.addEventListener("keypress", handleAction);
    return () => {
      window.removeEventListener("keypress", handleAction);
    };
  }, []);
  return null;
};
