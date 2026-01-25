import Image from "next/image";

export const EachMenu = ({
  image,
  alt,
  text,
  onClick,
}: {
  image: string;
  alt: string;
  text: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  return (
    <div
      className="flex cursor-pointer items-center gap-4 p-3 hover:bg-blue-900 hover:text-white whitespace-nowrap"
      onClick={onClick}
    >
      <Image src={image} alt={alt} width={25} height={25} />
      <span className="pr-20">{text}</span>
    </div>
  );
};
