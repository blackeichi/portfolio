import { useEffect, useMemo, useState } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { pressStart } from "@/libs/uitls/fonts";

export const DialogBox = ({
  dialogs,
  onClose,
  yesEvent,
  noEvent = onClose,
}: {
  dialogs: string[];
  onClose: () => void;
  yesEvent?: () => void;
  noEvent?: () => void;
}) => {
  const [page, setPage] = useState(1);
  const [answer, setAnswer] = useState<"예" | "아니요">("예");
  const maxPage = useMemo(
    () => (dialogs.length === 1 ? 1 : dialogs.length - 1),
    [dialogs],
  );
  const messages = useMemo(
    () => dialogs.slice(page - 1, page + 1),
    [dialogs, page],
  );
  const isLastPage = useMemo(() => page === maxPage, [page, maxPage]);
  useEffect(() => {
    const handleKeyEvent = (e: KeyboardEvent) => {
      if (yesEvent && isLastPage) {
        if (e.code === "ArrowUp") {
          e.preventDefault();
          setAnswer("예");
        } else if (e.code === "ArrowDown") {
          setAnswer("아니요");
        } else if (e.code === "Space") {
          e.preventDefault();
          if (answer === "예") {
            yesEvent();
          } else {
            noEvent();
          }
        }
      } else {
        if (e.code === "Space") {
          e.preventDefault();
          if (page < maxPage) {
            setPage((prev) => prev + 1);
          } else {
            onClose();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
    };
  }, [page, maxPage, answer, isLastPage, yesEvent, noEvent, onClose]);

  return (
    <div
      className={`bg-white w-full h-2/6 absolute left-0 bottom-0 z-30 p-[1.5vh] text-[3vh] ${
        pressStart.className
      }`}
    >
      {yesEvent && isLastPage && (
        <div
          key={page}
          className="absolute right-0 top-0 -translate-y-full bg-white h-full aspect-square z-30 p-[1vh] pb-0"
        >
          <div className="w-full h-full border-[0.5vh] rounded-lg p-[0.5vh]">
            <div className="relative w-full h-full border-[1vh] rounded-lg p-[0.5vh] pl-[2vh] whitespace-nowrap overflow-hidden flex flex-col gap-0.5 justify-center font-black">
              {["예", "아니요"].map((text, idx) => (
                <div key={idx} className="flex items-center gap-0.5">
                  <div className="w-[5vh] h-[5vh] text-[5vh]">
                    {text === answer && <FaCaretRight />}
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="w-full h-full border-[0.5vh] rounded-lg p-[0.5vh]">
        <div className="relative w-full h-full border-[1vh] rounded-lg p-[0.5vh] pl-[2vh] pb-[3vh] whitespace-nowrap overflow-hidden flex flex-col gap-0.5 justify-center font-black">
          {messages.map((msg, idx) => (
            <span key={idx}>{msg}</span>
          ))}
          {page < maxPage && (
            <motion.div
              key={page}
              className="absolute right-0 bottom-0 opacity-0 text-[5vh] animate-bounce"
              animate={{ opacity: 1 }}
              transition={{ duration: 0.05 }}
            >
              <FaCaretDown />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
