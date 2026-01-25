import { personTwoDirectionState } from "@/app/play-game/atoms";
import { useAtomValue } from "jotai";
import { memo } from "react";

export const PersonObjTwo = memo(() => {
  const personTwoDirection = useAtomValue(personTwoDirectionState);
  return (
    <div className="w-[2.7%] h-[2.7%] absolute right-[17%] top-[11%] z-10 will-change-transform">
      <div
        className={`h-full`}
        style={{
          backgroundImage: `url('/images/game/person2_${personTwoDirection}.png')`,
          backgroundSize: "100%",
        }}
      />
    </div>
  );
});

PersonObjTwo.displayName = "PersonObjTwo";
