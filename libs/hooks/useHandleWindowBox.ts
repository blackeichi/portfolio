import { useCallback, useEffect, useRef, useState } from "react";
import { Dir, Position, RefType } from "../types/state";
import { DEFAULT_WINDOW_BOX } from "../uitls/constants";

const MIN_W = 350;
const MIN_H = 250;

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

const getDefaultBoxPosition = {
  x: DEFAULT_WINDOW_BOX.windowX,
  y: DEFAULT_WINDOW_BOX.windowY,
  width: DEFAULT_WINDOW_BOX.windowWidth,
  height: DEFAULT_WINDOW_BOX.windowHeight,
};

export const useHandleWindowBox = ({
  windowBox,
  parentRef,
  box,
  setBox,
  isMax,
  setIsMax,
  isSticky,
  setIsSticky,
  defaultPosition = getDefaultBoxPosition,
}: {
  windowBox: React.RefObject<HTMLDivElement | null>;
  parentRef: React.RefObject<HTMLDivElement | null>;
  box: Position;
  setBox: React.Dispatch<React.SetStateAction<Position>>;
  isMax: boolean;
  setIsMax: React.Dispatch<React.SetStateAction<boolean>>;
  isSticky: boolean;
  setIsSticky: React.Dispatch<React.SetStateAction<boolean>>;
  defaultPosition?: Position;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [resizeDir, setResizeDir] = useState<Dir | null>(null);
  const [isStickyed, setIsStickyed] = useState<boolean>(false);
  const startPos = useRef<RefType>({
    mouseX: 0,
    mouseY: 0,
    ...defaultPosition,
  });
  // isMax가 변경될 때만 애니메이션 클래스를 추가/제거하는 훅.
  // resize, drag 등의 이벤트마다 애니메이션이 작동하면 부자연스러움
  useEffect(() => {
    if (windowBox.current && !isDragging) {
      windowBox.current.classList.add("transition-all");
      const timeout = setTimeout(() => {
        if (windowBox.current) {
          windowBox.current.classList.remove("transition-all");
        }
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isMax, windowBox, isDragging]);

  const moveBox = useCallback(
    (clientX: number, clientY: number) => {
      const dx = clientX - startPos.current.mouseX;
      const dy = clientY - startPos.current.mouseY;
      const parent = parentRef.current;
      if (!parent) return;
      const r = parent.getBoundingClientRect();

      const newX = clamp(startPos.current.x + dx, 0, r.width - box.width);
      const newY = clamp(startPos.current.y + dy, 0, r.height - box.height);
      if (
        ((newX === 0 || newX === r.width - box.width) &&
          (clientX <= 200 || clientX >= window.innerWidth - 200)) ||
        (newY === 0 && clientY <= 100)
      ) {
        setIsSticky(true);
      } else {
        if (isSticky) {
          setIsSticky(false);
        }
      }
      if (isStickyed) {
        setBox((prev) => ({
          ...prev,
          height: defaultPosition.height,
          width: defaultPosition.width,
          x: newX,
          y: newY,
        }));
        setIsStickyed(false);
      } else {
        setBox((prev) => ({ ...prev, x: newX, y: newY }));
      }
    },
    [
      parentRef,
      box.width,
      box.height,
      setBox,
      isSticky,
      setIsSticky,
      isStickyed,
      defaultPosition,
    ]
  );

  const resizeBox = useCallback(
    (mouseX: number, mouseY: number) => {
      const parent = parentRef.current;
      if (!parent) return;
      const r = parent.getBoundingClientRect();

      const { x, y, width, height, mouseX: sx, mouseY: sy } = startPos.current;
      const dx = mouseX - sx;
      const dy = mouseY - sy;
      // 기준은 시작 시점의 우측/하단 모서리
      const right = x + width;
      const bottom = y + height;

      let newX = x;
      let newY = y;
      let newW = width;
      let newH = height;

      // 수평
      if (resizeDir?.includes("left")) {
        newX = clamp(x + dx, 0, right - MIN_W);
        newW = right - newX;
      } else if (resizeDir?.includes("right")) {
        newW = Math.max(MIN_W, width + dx);
        if (x + newW > r.width) newW = r.width - x;
      }

      // 수직
      if (resizeDir?.includes("top")) {
        newY = clamp(y + dy, 0, bottom - MIN_H);
        newH = bottom - newY;
      } else if (resizeDir?.includes("bottom")) {
        newH = Math.max(MIN_H, height + dy);
        if (y + newH > r.height) newH = r.height - y;
      }

      // 최종 경계 보정
      if (newX + newW > r.width) newW = r.width - newX;
      if (newY + newH > r.height) newH = r.height - newY;

      setBox({
        x: Math.max(0, newX),
        y: Math.max(0, newY),
        width: newW,
        height: newH,
      });
    },
    [resizeDir, parentRef, setBox]
  );

  useEffect(() => {
    if (!isDragging && !resizeDir) return;

    const onMove = (e: MouseEvent) => {
      e.preventDefault();
      if (isDragging) {
        moveBox(e.clientX, e.clientY);
      } else if (resizeDir) {
        resizeBox(e.clientX, e.clientY);
      }
    };

    const onUp = () => {
      if (isSticky) {
        const isFull = box.y === 0;
        setIsStickyed(true);
        if (isFull) {
          setIsMax(true);
          setBox((prev) => ({
            ...prev,
            height: window.innerHeight - 42,
            width: window.innerWidth,
            x: 0,
            y: 0,
          }));
        } else {
          const isAtLeft = box.x === 0;
          setBox((prev) => ({
            ...prev,
            height: window.innerHeight - 42,
            width: window.innerWidth / 2,
            x: isAtLeft ? 0 : window.innerWidth / 2,
            y: 0,
          }));
        }
        setIsSticky(false);
      }
      setIsDragging(false);
      setResizeDir(null);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    // 드래그 중 커서와 텍스트 선택 방지
    document.body.style.cursor = resizeDir || "move";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [
    isDragging,
    resizeDir,
    moveBox,
    resizeBox,
    box,
    isSticky,
    setBox,
    setIsSticky,
    setIsMax,
  ]);

  const beginInteraction = useCallback(
    (e: React.MouseEvent) => {
      startPos.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
      };
    },
    [box]
  );
  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (isMax) {
        setIsMax(false);
        setBox({
          width: defaultPosition.width,
          height: defaultPosition.height,
          x: e.clientX - defaultPosition.width / 2,
          y: e.clientY,
        });
        startPos.current = {
          mouseX: e.clientX,
          mouseY: e.clientY,
          x: e.clientX - defaultPosition.width / 2,
          y: e.clientY,
          width: defaultPosition.width,
          height: defaultPosition.height,
        };
      } else {
        beginInteraction(e);
      }
      setIsDragging(true);
    },
    [beginInteraction, setIsDragging, isMax, setIsMax, setBox, defaultPosition]
  );

  const handleResizeStart = useCallback(
    (dir: Dir, e: React.MouseEvent) => {
      beginInteraction(e);
      setResizeDir(dir);
    },
    [beginInteraction]
  );

  const onResizeFunc = useCallback(() => {
    if (isMax) {
      setIsMax(false);
      setBox({
        x: startPos.current.x,
        y: startPos.current.y,
        width: startPos.current.width,
        height: startPos.current.height,
      });
    } else {
      setIsMax(true);
      startPos.current = {
        mouseX: 0,
        mouseY: 0,
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
      };
      setBox({
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight - 42,
      });
    }
  }, [isMax, box, setBox, setIsMax]);
  useEffect(() => {
    return () => {
      setBox(defaultPosition);
      setIsMax(true);
    };
  }, [setBox, setIsMax, defaultPosition]);
  return {
    handleDragStart,
    handleResizeStart,
    onResizeFunc,
  };
};
