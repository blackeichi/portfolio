import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { useHandleActionEvent } from "../../hooks";

export const DialogBox = ({
  dialogs,
  onClose,
}: {
  dialogs: string[];
  onClose: () => void;
}) => {
  const [page, setPage] = useState(1);
  const maxPage = dialogs.length - 1;
  const messages = dialogs.slice(page - 1, page + 1);
  useHandleActionEvent(() => {
    if (page < maxPage) {
      setPage((prev) => prev + 1);
    } else {
      onClose();
    }
  });
  return (
    <div className="bg-white w-full h-2/6 absolute left-0 bottom-0 z-50 p-1.5">
      <div className="w-full h-full border-2 rounded-lg p-0.5">
        <div className="relative w-full h-full border-3 rounded-lg p-0.5 pb-4 whitespace-nowrap overflow-hidden flex flex-col gap-0.5 justify-center font-bold">
          {messages.map((msg, idx) => (
            <span key={idx}>{msg}</span>
          ))}
          {page < maxPage && (
            <motion.div
              key={page}
              className="absolute right-0 bottom-0 opacity-0"
              animate={{ opacity: 1 }}
              transition={{ duration: 0.05 }}
            >
              <FaCaretDown size={24} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
