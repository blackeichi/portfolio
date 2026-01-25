import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";

export const SectorTitle = ({
  title,
  isOpen,
  onToggle,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer select-none text-xl"
      onClick={onToggle}
    >
      <span className="text-lg transition-transform duration-200">
        {isOpen ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
      </span>
      <h2 className="font-bold text-blue-800">{title}</h2>
      <div className="flex-1 h-px bg-gray-300" />
    </div>
  );
};
