interface TooltipPosition {
  visible: boolean;
  style: React.CSSProperties;
}

export function setHoverEvent(
  setPosition: React.Dispatch<React.SetStateAction<TooltipPosition>>,
) {
  const handleShow = (
    event: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>,
  ) => {
    if ("stopPropagation" in event) {
      event.stopPropagation();
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const isRight = rect.x >= window.innerWidth / 2;
    const isBottom = rect.y >= window.innerHeight / 2;

    setPosition({
      visible: true,
      style: {
        left: isRight ? 8 : rect.width - 10,
        top: isBottom ? -4 : rect.height + 10,
        transform:
          isRight && isBottom
            ? "translateX(-100%) translateY(-100%)"
            : isRight
              ? "translateX(-100%)"
              : isBottom
                ? "translateY(-100%)"
                : undefined,
      },
    });
  };

  const handleHide = () => {
    setPosition({ visible: false, style: {} });
  };

  return {
    onMouseEnter: handleShow,
    onMouseLeave: handleHide,
    onFocus: handleShow,
    onBlur: handleHide,
  };
}
