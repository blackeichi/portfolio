import { ClipLoader } from "react-spinners";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  width?: string | number;
  height?: string | number;
  fontSize?: string | number;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  bold?: boolean;
}

export default function Button({
  text,
  onClick,
  disabled = false,
  isLoading = false,
  width = "fit-content",
  height = "fit-content",
  fontSize = "13px",
  style = {},
  icon,
  bold = false,
  ...rest
}: ButtonProps) {
  const baseClasses =
    "flex items-center justify-center border-2 border-gray-100 border-r-gray-500 border-b-gray-500 bg-gray-300 disabled:cursor-not-allowed active:border-gray-500 active:border-r-gray-100 active:border-b-gray-100 active:p-0.5";
  const stateClasses = disabled ? "text-gray-400" : "cursor-pointer text-gray-800";
  const boldClasses = bold ? "border-3 outline -outline-offset-1 outline-gray-800" : "";

  return (
    <button
      {...rest}
      className={`${baseClasses} ${stateClasses} ${boldClasses}`}
      disabled={disabled || isLoading}
      tabIndex={-1}
      onClick={!disabled && !isLoading ? onClick : undefined}
      style={{
        ...style,
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        fontSize,
      }}
    >
      {isLoading ? (
        <ClipLoader size={12} aria-label="Loading Button" />
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {text}
        </>
      )}
    </button>
  );
}
