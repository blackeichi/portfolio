export default function Overlay({
  onClick,
  isOpen = true,
  children,
  style = {},
}: {
  onClick: () => void;
  isOpen?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`fixed top-0 left-0 z-40 h-screen w-screen items-center justify-center ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div
        onClick={onClick}
        className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.4)]"
      />
      <div
        className="absolute z-10 mx-auto my-0 mb-20"
        style={style}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
}
