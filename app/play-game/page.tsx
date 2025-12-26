import { COLOR_THEME } from "@/libs/uitls/constants";
import { Metadata } from "next";
import { GameUi } from "./_ui/gameUi";

export const metadata: Metadata = {
  title: "PLAY GAME",
};

export default function PlayGamePage() {
  return (
    <div
      className="w-full h-full flex justify-center overflow-hidden py-[1%]"
      style={{
        backgroundColor: COLOR_THEME.green,
      }}
    >
      <div
        className="aspect-square h-full bg-white overflow-hidden relative"
        style={{
          backgroundColor: COLOR_THEME.green,
        }}
      >
        <GameUi />
      </div>
    </div>
  );
}
