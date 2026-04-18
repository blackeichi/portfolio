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
  const baseClasses = "text-sm sm:text-base text-gray-700";
  const fontClasses = isBold ? "font-bold" : "font-normal";

  return (
    <p className={`${fontClasses} ${baseClasses} ${className}`} style={style}>
      {children}
    </p>
  );
};
