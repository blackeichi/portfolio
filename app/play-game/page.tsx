import { COLOR_THEME } from "@/libs/uitls/constants";
import { Metadata } from "next";
import { GameLayout } from "./_ui/gameLayout";

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
      <GameLayout />
    </div>
  );
}
