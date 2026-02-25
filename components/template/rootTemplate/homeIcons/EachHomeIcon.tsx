import { IconMenu } from "@/libs/types/state";
import Image from "next/image";

export const EachHomeIcon = ({
  index,
  menu,
  handleRunIcon,
  selectedMenu,
  setSelectedMenu,
}: {
  menu: IconMenu;
  index: number;
  handleRunIcon: (menu: IconMenu) => void;
  selectedMenu: number | null;
  setSelectedMenu: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const isSelected = selectedMenu === index;
  return (
    <div
      key={`${menu.name}-home-icon`}
      className={`relative flex w-16 cursor-pointer flex-col items-center justify-center gap-1 text-xs outline-0 select-none`}
      onClick={() => setSelectedMenu(index)}
      tabIndex={-1}
      onBlur={() => {
        setSelectedMenu(null);
      }}
      onDoubleClick={() => {
        handleRunIcon(menu);
      }}
    >
      <div className="relative flex h-10 w-10 items-center justify-center">
        <Image
          src={menu.icon}
          alt={`${menu.name} icon`}
          width={30}
          height={30}
          sizes="30px"
          style={{ width: '30px', height: '30px' }}
        />
        <div
          className={`absolute top-0 left-0 h-full w-full rounded-xs ${
            isSelected ? "bg-[rgba(0,0,0,0.3)]" : ""
          }`}
        />
      </div>
      <div className="relative px-1 text-center">
        <span>{menu.name}</span>
        <div
          className={`absolute top-0 left-0 h-full w-full rounded-xs ${
            isSelected
              ? "border border-dotted border-gray-200 bg-[rgba(0,0,0,0.3)]"
              : ""
          }`}
        />
      </div>
    </div>
  );
};
