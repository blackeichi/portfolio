import Image from "next/image";
import { useRouter } from "next/navigation";

export const EachHomeIcon = ({
  menu,
  index,
  selectedMenu,
  setSelectedMenu,
  router,
  setLoading,
}: {
  menu: { name: string; icon: string; href: string };
  index: number;
  selectedMenu: number | null;
  setSelectedMenu: React.Dispatch<React.SetStateAction<number | null>>;
  router: ReturnType<typeof useRouter>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
        if (window.location.pathname !== menu.href) {
          setLoading(true);
          router.push(menu.href);
        } else {
          setSelectedMenu(null);
        }
      }}
    >
      <div className="relative flex h-10 w-10 items-center justify-center">
        <Image
          src={menu.icon}
          alt={`${menu.name} icon`}
          width={30}
          height={30}
        />
        <div
          className={`absolute top-0 left-0 h-full w-full rounded-[2px] ${
            isSelected ? "bg-[rgba(0,0,0,0.3)]" : ""
          }`}
        />
      </div>
      <div className="relative px-1 text-center">
        <span>{menu.name}</span>
        <div
          className={`absolute top-0 left-0 h-full w-full rounded-[2px] ${
            isSelected
              ? "border-1 border-dotted border-gray-200 bg-[rgba(0,0,0,0.3)]"
              : ""
          }`}
        />
      </div>
    </div>
  );
};
