export const ContentBox = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className="flex flex-1 border-3 border-gray-500 border-r-gray-100 border-b-gray-100 bg-white p-1 overflow-auto"
      style={style}
    >
      {children}
    </div>
  );
};
