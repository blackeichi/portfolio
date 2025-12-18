export function setHoverEvent(
  setIsHovered: React.Dispatch<React.SetStateAction<string>>
) {
  return {
    onMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      const rect = event.currentTarget.getBoundingClientRect();
      setIsHovered(
        (rect.x >= window.innerWidth / 2
          ? "left-2 -translate-x-full "
          : `left-[${rect.width - 10}px] `) +
          (rect.y >= window.innerHeight / 2
            ? "-top-1 -translate-y-full"
            : `top-[${rect.height + 10}px]`)
      );
    },
    onMouseLeave: () => {
      setIsHovered("");
    },
  };
}
