import { loadingState, mousePositionState } from "@/libs/atom";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";
import { useEffect } from "react";

export default function MouseLoading() {
  const loading = useAtomValue(loadingState);
  return <>{loading && <ActualUI />}</>;
}

const ActualUI = () => {
  const [mousePosition, setMousePosition] = useAtom(mousePositionState);
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);
  return (
    <div
      className={`animate-tick-spin fixed top-1/2 left-1/2 ${
        mousePosition?.x && mousePosition?.y ? "z-50" : "-translate-y-11"
      }`}
      style={
        mousePosition?.x && mousePosition?.y
          ? {
              top: mousePosition.y + 15,
              left: mousePosition.x + 15,
            }
          : {}
      }
    >
      <Image
        src="/images/hourglass.png"
        alt="Loading Icon"
        width={mousePosition?.x && mousePosition?.y ? 12 : 15}
        height={30}
      />
    </div>
  );
};
