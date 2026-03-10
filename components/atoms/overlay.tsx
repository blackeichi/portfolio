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
  const containerClasses = "fixed top-0 left-0 z-40 h-screen w-screen items-center justify-center";
  const displayClasses = isOpen ? "flex" : "hidden";

  return (
    <div className={`${containerClasses} ${displayClasses}`}>
      <div
        id="overlay-background"
        onClick={onClick}
        className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.4)]"
      />
      <div
        id="overlay-content-container"
        className="absolute z-10 mx-auto my-0 mb-20"
        style={style}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
}
