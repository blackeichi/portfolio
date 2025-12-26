export const Text = ({
  children,
  isBold,
  className,
  style,
}: {
  children: React.ReactNode;
  isBold?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <p
      className={`font-${
        isBold ? "bold" : "normal"
      } text-xs sm:text-sm text-gray-700 ${className}`}
      style={style}
    >
      {children}
    </p>
  );
};
