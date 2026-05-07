import { useCallback, useEffect, useRef, useState } from "react";
import { Dir, Position, RefType } from "../types/state";
import { DEFAULT_WINDOW_BOX } from "../utils/constants";

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

  const boxRef = useRef(box);
  const isStickyRef = useRef(isSticky);
  const resizeDirRef = useRef<Dir | null>(resizeDir);
  const rafRef = useRef<number | null>(null);
  const pendingBoxRef = useRef<Position | null>(null);
  const startPos = useRef<RefType>({
    mouseX: 0,
    mouseY: 0,
    ...defaultPosition,
  });

  useEffect(() => {
    boxRef.current = box;
  }, [box]);

  useEffect(() => {
    isStickyRef.current = isSticky;
  }, [isSticky]);

  useEffect(() => {
    isStickyedRef.current = isStickyed;
  }, [isStickyed]);

  useEffect(() => {
    resizeDirRef.current = resizeDir;
  }, [resizeDir]);

  const commitBox = useCallback(
    (nextBox: Position) => {
      boxRef.current = nextBox;
      pendingBoxRef.current = nextBox;

      if (rafRef.current !== null) return;
      // 바로 setBox를 호출하지 않고 requestAnimationFrame으로 감싸서 애니메이션 프레임마다 최대 한 번만 setBox가 호출되도록 최적화
      // 이렇게 하면 드래그나 리사이즈 이벤트가 매우 빈번하게 발생해도 setBox가 과도하게 호출되는 것을 방지할 수 있음
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (!pendingBoxRef.current) return;
        setBox(pendingBoxRef.current);
        pendingBoxRef.current = null;
      });
    },
    [setBox],
  );

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

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
      const currentBox = boxRef.current;

      const newX = clamp(
        startPos.current.x + dx,
        0,
        r.width - currentBox.width,
      );
      const newY = clamp(
        startPos.current.y + dy,
        0,
        r.height - currentBox.height,
      );
      const shouldStick =
        ((newX === 0 || newX === r.width - currentBox.width) &&
          (clientX <= 200 || clientX >= window.innerWidth - 200)) ||
        (newY === 0 && clientY <= 100);

      if (shouldStick !== isStickyRef.current) {
        isStickyRef.current = shouldStick;
        setIsSticky(shouldStick);
      }

      if (isStickyedRef.current) {
        const nextBox = {
          ...currentBox,
          height: defaultPosition.height,
          width: defaultPosition.width,
          x: newX,
          y: newY,
        };
        commitBox(nextBox);
        isStickyedRef.current = false;
        setIsStickyed(false);
      } else {
        commitBox({ ...currentBox, x: newX, y: newY });
      }
    },
    [parentRef, setIsSticky, defaultPosition, commitBox],
  );

  const resizeBox = useCallback(
    (mouseX: number, mouseY: number) => {
      const parent = parentRef.current;
      const currentResizeDir = resizeDirRef.current;
      if (!parent || !currentResizeDir) return;
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
      if (currentResizeDir.includes("left")) {
        newX = clamp(x + dx, 0, right - MIN_W);
        newW = right - newX;
      } else if (currentResizeDir.includes("right")) {
        newW = Math.max(MIN_W, width + dx);
        if (x + newW > r.width) newW = r.width - x;
      }

      // 수직
      if (currentResizeDir.includes("top")) {
        newY = clamp(y + dy, 0, bottom - MIN_H);
        newH = bottom - newY;
      } else if (currentResizeDir.includes("bottom")) {
        newH = Math.max(MIN_H, height + dy);
        if (y + newH > r.height) newH = r.height - y;
      }

      // 최종 경계 보정
      if (newX + newW > r.width) newW = r.width - newX;
      if (newY + newH > r.height) newH = r.height - newY;

      commitBox({
        x: Math.max(0, newX),
        y: Math.max(0, newY),
        width: newW,
        height: newH,
      });
    },
    [parentRef, commitBox],
  );

  useEffect(() => {
    if (!isDragging && !resizeDir) return;

    const onMove = (e: MouseEvent) => {
      e.preventDefault();
      if (isDragging) {
        moveBox(e.clientX, e.clientY);
      } else if (resizeDirRef.current) {
        resizeBox(e.clientX, e.clientY);
      }
    };

    const onUp = () => {
      if (isStickyRef.current) {
        const currentBox = boxRef.current;
        const isFull = currentBox.y === 0;
        isStickyedRef.current = true;
        setIsStickyed(true);
        if (isFull) {
          setIsMax(true);
          commitBox({
            ...currentBox,
            height: window.innerHeight - 42,
            width: window.innerWidth,
            x: 0,
            y: 0,
          });
        } else {
          const isAtLeft = currentBox.x === 0;
          commitBox({
            ...currentBox,
            height: window.innerHeight - 42,
            width: window.innerWidth / 2,
            x: isAtLeft ? 0 : window.innerWidth / 2,
            y: 0,
          });
        }
        isStickyRef.current = false;
        setIsSticky(false);
      }
      setIsDragging(false);
      resizeDirRef.current = null;
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
    setIsSticky,
    setIsMax,
    commitBox,
  ]);

  const beginInteraction = useCallback((e: React.MouseEvent) => {
    const currentBox = boxRef.current;
    startPos.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      x: currentBox.x,
      y: currentBox.y,
      width: currentBox.width,
      height: currentBox.height,
    };
  }, []);

  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (isMax) {
        const nextBox = {
          width: defaultPosition.width,
          height: defaultPosition.height,
          x: e.clientX - defaultPosition.width / 2,
          y: e.clientY,
        };
        setIsMax(false);
        commitBox(nextBox);
        startPos.current = {
          mouseX: e.clientX,
          mouseY: e.clientY,
          ...nextBox,
        };
      } else {
        beginInteraction(e);
      }
      setIsDragging(true);
    },
    [beginInteraction, isMax, setIsMax, defaultPosition, commitBox],
  );

  const handleResizeStart = useCallback(
    (dir: Dir, e: React.MouseEvent) => {
      beginInteraction(e);
      resizeDirRef.current = dir;
      setResizeDir(dir);
    },
    [beginInteraction],
  );

  const onResizeFunc = useCallback(() => {
    const currentBox = boxRef.current;
    if (isMax) {
      setIsMax(false);
      commitBox({
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
        x: currentBox.x,
        y: currentBox.y,
        width: currentBox.width,
        height: currentBox.height,
      };
      commitBox({
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight - 42,
      });
    }
  }, [isMax, commitBox, setIsMax]);

  useEffect(() => {
    const initialPosition = defaultPosition;
    return () => {
      boxRef.current = initialPosition;
      setBox(initialPosition);
      setIsMax(true);
    };
  }, [setBox, setIsMax, defaultPosition]);

  return {
    handleDragStart,
    handleResizeStart,
    onResizeFunc,
  };
};
