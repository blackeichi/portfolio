import { pressStart } from "@/libs/uitls/fonts";
import { useEffect, useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import { DialogBox } from "../components/dialogBox";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { movementSpeedState } from "../../atoms";

const MENU_ITEMS = [
  { id: "START", name: "Start Game" },
  { id: "MANUAL", name: "Manual" },
  { id: "EXIT", name: "Exit" },
] as const;

export const StartScreen = ({
  setIsStarted,
}: {
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [selected, setSelected] = useState<"START" | "MANUAL" | "EXIT">(
    "MANUAL",
  );
  const [actionsType, setActionsType] = useState<"EXIT" | "START" | null>(null);
  const setMovementSpeed = useSetAtom(movementSpeedState);
  useEffect(() => {
    const handleKeyEvent = (e: KeyboardEvent) => {
      if (actionsType) return;
      if (e.code === "ArrowUp") {
        e.preventDefault();
        setSelected((prev) => {
          if (prev === "START") return "EXIT";
          if (prev === "MANUAL") return "START";
          if (prev === "EXIT") return "MANUAL";
          return prev;
        });
      } else if (e.code === "ArrowDown") {
        e.preventDefault();
        setSelected((prev) => {
          if (prev === "START") return "MANUAL";
          if (prev === "MANUAL") return "EXIT";
          if (prev === "EXIT") return "START";
          return prev;
        });
      } else if (e.code === "Space") {
        e.preventDefault();
        if (selected === "START") {
          setActionsType("START");
        } else if (selected === "EXIT") {
          setActionsType("EXIT");
        }
      }
    };
    window.addEventListener("keydown", handleKeyEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
    };
  }, [actionsType, selected, setIsStarted]);
  return (
    <>
      <div
        className={`bg-white w-full p-[1.5vh] text-[3.3vh] ${
          pressStart.className
        }`}
      >
        <div className="w-full h-full border-[0.5vh] rounded-lg p-[0.5vh]">
          <div className="relative w-full h-full border-[1vh] rounded-lg p-[2vh] whitespace-nowrap overflow-hidden flex flex-col gap-[1.5vh] justify-center font-black text-[3vh]">
            {MENU_ITEMS.map((text, idx) => (
              <div key={idx} className="flex items-center gap-[0.5vh]">
                <div className="w-[5vh] h-[5vh] text-[5vh]">
                  {text.id === selected && <FaCaretRight />}
                </div>
                <span>{text.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {actionsType === "START" && (
        <DialogBox
          dialogs={[
            "캐릭터의 이동 속도를 선택해주세요.",
            "...",
            "화면 주사율이 100Hz 이상인 경우",
            "50%를 선택하는 것을 권장합니다.",
          ]}
          options={["100%", "50%"]}
          yesEvent={() => {
            setMovementSpeed(0.5);
            setIsStarted(true);
          }}
          noEvent={() => {
            setMovementSpeed(0.25);
            setIsStarted(true);
          }}
          onClose={() => setActionsType(null)}
          needFont={false}
        />
      )}
      {actionsType === "EXIT" && (
        <DialogBox
          dialogs={["정말 종료하시겠습니까?"]}
          yesEvent={() => router.push("/")}
          noEvent={() => {
            setActionsType(null);
          }}
          onClose={() => {
            setActionsType(null);
          }}
        />
      )}
      {selected === "MANUAL" && (
        <div
          className={`bg-white w-full h-fit absolute left-0 bottom-0 z-30 p-[1.5vh] text-[3.3vh]`}
        >
          <div className="w-full h-full border-[0.5vh] rounded-lg p-[0.5vh]">
            <div className="relative w-full h-full border-[1vh] rounded-lg pl-[2vh] py-[3vh] whitespace-nowrap overflow-hidden flex flex-col gap-[1.5vh] justify-center font-black">
              <span>{`< 조작법 안내 >`}</span>
              <span>- 화살표: 이동</span>
              <span>- 스페이스바: 선택 및 대화 진행</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
