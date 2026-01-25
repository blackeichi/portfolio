import { personDirectionState } from "@/app/play-game/atoms";
import { useAtomValue } from "jotai";
import { memo } from "react";

export const PersonObj = memo(() => {
  const personDirection = useAtomValue(personDirectionState);
  return (
    <div className="w-[2.4%] h-[2.4%] absolute right-[11.5%] bottom-[12%] z-10 will-change-transform">
      <div
        className={`h-full bg-size-[100%]`}
        style={{
          backgroundImage: `url('/images/game/person_${personDirection}.png')`,
        }}
      />
    </div>
  );
});

PersonObj.displayName = "PersonObj";
