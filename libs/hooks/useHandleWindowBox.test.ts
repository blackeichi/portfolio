import { renderHook, act } from "@testing-library/react";
import { useHandleWindowBox } from "./useHandleWindowBox";
import { Position } from "../types/state";
import { RefObject } from "react";

describe("useHandleWindowBox", () => {
  let mockWindowBox: RefObject<HTMLDivElement>;
  let mockParentRef: RefObject<HTMLDivElement>;
  let mockBox: Position;
  let mockSetBox: jest.Mock;
  let mockSetIsMax: jest.Mock;
  let mockSetIsSticky: jest.Mock;

  beforeEach(() => {
    // Mock refs
    mockWindowBox = {
      current: {
        classList: {
          add: jest.fn(),
          remove: jest.fn(),
        },
      } as unknown as HTMLDivElement,
    };

    mockParentRef = {
      current: {
        getBoundingClientRect: jest.fn().mockReturnValue({
          width: 1920,
          height: 1080,
          top: 0,
          left: 0,
          right: 1920,
          bottom: 1080,
        }),
      } as unknown as HTMLDivElement,
    };

    mockBox = {
      x: 100,
      y: 100,
      width: 500,
      height: 400,
    };

    mockSetBox = jest.fn();
    mockSetIsMax = jest.fn();
    mockSetIsSticky = jest.fn();

    // Mock window 크기
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1920,
    });

    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1080,
    });

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe("초기 렌더링", () => {
    it("handleDragStart, handleResizeStart, onResizeFunc를 반환해야 한다", () => {
      const { result } = renderHook(() =>
        useHandleWindowBox({
          windowBox: mockWindowBox,
          parentRef: mockParentRef,
          box: mockBox,
          setBox: mockSetBox,
          isMax: false,
          setIsMax: mockSetIsMax,
          isSticky: false,
          setIsSticky: mockSetIsSticky,
        }),
      );

      expect(result.current).toHaveProperty("handleDragStart");
      expect(result.current).toHaveProperty("handleResizeStart");
      expect(result.current).toHaveProperty("onResizeFunc");
      expect(typeof result.current.handleDragStart).toBe("function");
      expect(typeof result.current.handleResizeStart).toBe("function");
      expect(typeof result.current.onResizeFunc).toBe("function");
    });
  });

  describe("전환 애니메이션", () => {
    it("isMax 변경 시 transition 클래스를 추가하고 제거해야 한다", () => {
      const { rerender } = renderHook(
        ({ isMax }) =>
          useHandleWindowBox({
            windowBox: mockWindowBox,
            parentRef: mockParentRef,
            box: mockBox,
            setBox: mockSetBox,
            isMax,
            setIsMax: mockSetIsMax,
            isSticky: false,
            setIsSticky: mockSetIsSticky,
          }),
        { initialProps: { isMax: false } },
      );

      // isMax 변경
      rerender({ isMax: true });

      // transition-all 클래스가 추가되어야 함
      expect(mockWindowBox.current?.classList.add).toHaveBeenCalledWith(
        "transition-all",
      );

      // 300ms 후 제거되어야 함
      act(() => {
        jest.advanceTimersByTime(300);
      });

      expect(mockWindowBox.current?.classList.remove).toHaveBeenCalledWith(
        "transition-all",
      );
    });
  });

  describe("드래그 기능", () => {
    it("handleDragStart를 호출하면 드래그가 시작되어야 한다", () => {
      const { result } = renderHook(() =>
        useHandleWindowBox({
          windowBox: mockWindowBox,
          parentRef: mockParentRef,
          box: mockBox,
          setBox: mockSetBox,
          isMax: false,
          setIsMax: mockSetIsMax,
          isSticky: false,
          setIsSticky: mockSetIsSticky,
        }),
      );

      const mockEvent = {
        clientX: 150,
        clientY: 150,
      } as React.MouseEvent;

      act(() => {
        result.current.handleDragStart(mockEvent);
      });

      // 초기 위치 확인
      expect(mockSetBox).not.toHaveBeenCalled();

      // mousemove 이벤트로 드래그 이동 시뮬레이션 (오른쪽으로 50px, 아래로 50px)
      act(() => {
        const moveEvent = new MouseEvent("mousemove", {
          clientX: 200,
          clientY: 200,
        });
        document.dispatchEvent(moveEvent);
      });

      // setBox가 호출되고, 함수 형태로 호출되었는지 확인
      expect(mockSetBox).toHaveBeenCalled();
      const setBoxCall = mockSetBox.mock.calls[0][0];

      // 함수로 호출된 경우 실제 값 확인
      if (typeof setBoxCall === "function") {
        const newBox = setBoxCall(mockBox);
        // 초기 위치 (100, 100)에서 (50, 50) 이동하여 (150, 150)이 되어야 함
        expect(newBox.x).toBe(150);
        expect(newBox.y).toBe(150);
        expect(newBox.width).toBe(mockBox.width);
        expect(newBox.height).toBe(mockBox.height);
      }

      // mouseup 이벤트로 드래그 종료
      act(() => {
        const upEvent = new MouseEvent("mouseup");
        document.dispatchEvent(upEvent);
      });
    });

    it("최대화 상태에서 드래그를 시작하면 창 크기가 기본 크기로 복원되어야 한다", () => {
      const defaultPosition = {
        x: 200,
        y: 200,
        width: 500,
        height: 400,
      };

      const { result } = renderHook(() =>
        useHandleWindowBox({
          windowBox: mockWindowBox,
          parentRef: mockParentRef,
          box: mockBox,
          setBox: mockSetBox,
          isMax: true,
          setIsMax: mockSetIsMax,
          isSticky: false,
          setIsSticky: mockSetIsSticky,
          defaultPosition,
        }),
      );

      const mockEvent = {
        clientX: 960,
        clientY: 100,
      } as React.MouseEvent;

      act(() => {
        result.current.handleDragStart(mockEvent);
      });

      expect(mockSetIsMax).toHaveBeenCalledWith(false);
      expect(mockSetBox).toHaveBeenCalled();

      // 드래그 시작 시, 마우스 위치 기준으로 창이 중앙 정렬되어야 함
      const setBoxCall = mockSetBox.mock.calls[0][0];
      expect(setBoxCall).toEqual({
        width: defaultPosition.width,
        height: defaultPosition.height,
        x: mockEvent.clientX - defaultPosition.width / 2, // 960 - 250 = 710
        y: mockEvent.clientY, // 100
      });
    });
  });

  describe("리사이즈 기능", () => {
    it("handleResizeStart를 호출하면 리사이즈가 시작되어야 한다", () => {
      const { result } = renderHook(() =>
        useHandleWindowBox({
          windowBox: mockWindowBox,
          parentRef: mockParentRef,
          box: mockBox,
          setBox: mockSetBox,
          isMax: false,
          setIsMax: mockSetIsMax,
          isSticky: false,
          setIsSticky: mockSetIsSticky,
        }),
      );

      const mockEvent = {
        clientX: 600, // box.x(100) + box.width(500) = 600 (우측 하단 모서리)
        clientY: 500, // box.y(100) + box.height(400) = 500
      } as React.MouseEvent;

      act(() => {
        result.current.handleResizeStart("bottom-right", mockEvent);
      });

      // mousemove 이벤트로 리사이즈 시뮬레이션 (오른쪽으로 100px, 아래로 100px)
      act(() => {
        const moveEvent = new MouseEvent("mousemove", {
          clientX: 700,
          clientY: 600,
        });
        document.dispatchEvent(moveEvent);
      });

      // setBox가 호출되었는지 확인
      expect(mockSetBox).toHaveBeenCalled();
      const setBoxCall = mockSetBox.mock.calls[0][0];

      // 크기가 증가해야 함
      expect(setBoxCall.x).toBe(100); // x는 그대로
      expect(setBoxCall.y).toBe(100); // y는 그대로
      expect(setBoxCall.width).toBe(600); // 500 + 100
      expect(setBoxCall.height).toBe(500); // 400 + 100

      // mouseup 이벤트로 리사이즈 종료
      act(() => {
        const upEvent = new MouseEvent("mouseup");
        document.dispatchEvent(upEvent);
      });
    });

    it("좌측 상단 모서리를 드래그하여 리사이즈할 수 있어야 한다", () => {
      const { result } = renderHook(() =>
        useHandleWindowBox({
          windowBox: mockWindowBox,
          parentRef: mockParentRef,
          box: mockBox,
          setBox: mockSetBox,
          isMax: false,
          setIsMax: mockSetIsMax,
          isSticky: false,
          setIsSticky: mockSetIsSticky,
        }),
      );

      const mockEvent = {
        clientX: 100, // box.x
        clientY: 100, // box.y
      } as React.MouseEvent;

      act(() => {
        result.current.handleResizeStart("top-left", mockEvent);
      });

      // mousemove 이벤트로 리사이즈 시뮬레이션 (왼쪽으로 50px, 위로 50px 이동)
      act(() => {
        const moveEvent = new MouseEvent("mousemove", {
          clientX: 50,
          clientY: 50,
        });
        document.dispatchEvent(moveEvent);
      });

      expect(mockSetBox).toHaveBeenCalled();
      const setBoxCall = mockSetBox.mock.calls[0][0];

      // 위치가 변경되고 크기가 증가해야 함
      expect(setBoxCall.x).toBe(50); // 100 - 50
      expect(setBoxCall.y).toBe(50); // 100 - 50
      expect(setBoxCall.width).toBe(550); // 500 + 50
      expect(setBoxCall.height).toBe(450); // 400 + 50

      act(() => {
        const upEvent = new MouseEvent("mouseup");
        document.dispatchEvent(upEvent);
      });
    });

    it("최소 크기보다 작게 리사이즈할 수 없어야 한다", () => {
      const smallBox = {
        x: 100,
        y: 100,
        width: 400,
        height: 300,
      };

      const { result } = renderHook(() =>
        useHandleWindowBox({
          windowBox: mockWindowBox,
          parentRef: mockParentRef,
          box: smallBox,
          setBox: mockSetBox,
          isMax: false,
          setIsMax: mockSetIsMax,
          isSticky: false,
          setIsSticky: mockSetIsSticky,
        }),
      );

      const mockEvent = {
        clientX: 500, // box.x + box.width
        clientY: 400, // box.y + box.height
      } as React.MouseEvent;

      act(() => {
        result.current.handleResizeStart("bottom-right", mockEvent);
      });

      // 최소 크기보다 작게 만들려는 시도 (너무 많이 축소)
      act(() => {
        const moveEvent = new MouseEvent("mousemove", {
          clientX: 200, // width가 100이 되려고 시도 (최소값 350보다 작음)
          clientY: 200, // height가 100이 되려고 시도 (최소값 250보다 작음)
        });
        document.dispatchEvent(moveEvent);
      });

      expect(mockSetBox).toHaveBeenCalled();
      const setBoxCall = mockSetBox.mock.calls[0][0];

      // 최소 크기로 제한되어야 함 (MIN_W=350, MIN_H=250)
      expect(setBoxCall.width).toBeGreaterThanOrEqual(350);
      expect(setBoxCall.height).toBeGreaterThanOrEqual(250);

      act(() => {
        const upEvent = new MouseEvent("mouseup");
        document.dispatchEvent(upEvent);
      });
    });
  });

  describe("최대화/복원 기능", () => {
    it("onResizeFunc 호출 시 최대화되지 않은 상태에서 최대화해야 한다", () => {
      const { result } = renderHook(() =>
        useHandleWindowBox({
          windowBox: mockWindowBox,
          parentRef: mockParentRef,
          box: mockBox,
          setBox: mockSetBox,
          isMax: false,
          setIsMax: mockSetIsMax,
          isSticky: false,
          setIsSticky: mockSetIsSticky,
        }),
      );

      act(() => {
        result.current.onResizeFunc();
      });

      expect(mockSetIsMax).toHaveBeenCalledWith(true);
      expect(mockSetBox).toHaveBeenCalledWith({
        x: 0,
        y: 0,
        width: 1920,
        height: 1038, // window.innerHeight - 42
      });
    });

    it("onResizeFunc 호출 시 최대화된 상태에서 복원해야 한다", () => {
      const { result } = renderHook(() =>
        useHandleWindowBox({
          windowBox: mockWindowBox,
          parentRef: mockParentRef,
          box: { x: 0, y: 0, width: 1920, height: 1038 },
          setBox: mockSetBox,
          isMax: true,
          setIsMax: mockSetIsMax,
          isSticky: false,
          setIsSticky: mockSetIsSticky,
        }),
      );

      act(() => {
        result.current.onResizeFunc();
      });

      expect(mockSetIsMax).toHaveBeenCalledWith(false);
      expect(mockSetBox).toHaveBeenCalled();
    });
  });

  describe("경계 체크", () => {
    it("드래그 시 부모 경계를 벗어나지 않아야 한다 - 왼쪽 경계", () => {
      const { result } = renderHook(() =>
        useHandleWindowBox({
          windowBox: mockWindowBox,
          parentRef: mockParentRef,
          box: mockBox,
          setBox: mockSetBox,
          isMax: false,
          setIsMax: mockSetIsMax,
          isSticky: false,
          setIsSticky: mockSetIsSticky,
        }),
      );

      // 드래그 시작
      const startEvent = {
        clientX: 150,
        clientY: 150,
      } as React.MouseEvent;

      act(() => {
        result.current.handleDragStart(startEvent);
      });

      // 경계 밖으로 이동 시도 (왼쪽으로 많이 이동)
      act(() => {
        const moveEvent = new MouseEvent("mousemove", {
          clientX: -100, // 왼쪽 경계 밖
          clientY: 150,
        });
        document.dispatchEvent(moveEvent);
      });

      expect(mockSetBox).toHaveBeenCalled();
      const setBoxCall = mockSetBox.mock.calls[0][0];

      if (typeof setBoxCall === "function") {
        const newBox = setBoxCall(mockBox);
        // x는 최소값 0으로 클램핑되어야 함
        expect(newBox.x).toBeGreaterThanOrEqual(0);
        expect(newBox.y).toBeGreaterThanOrEqual(0);
      }

      // mouseup 이벤트로 드래그 종료
      act(() => {
        const upEvent = new MouseEvent("mouseup");
        document.dispatchEvent(upEvent);
      });
    });

    it("드래그 시 부모 경계를 벗어나지 않아야 한다 - 오른쪽 경계", () => {
      const { result } = renderHook(() =>
        useHandleWindowBox({
          windowBox: mockWindowBox,
          parentRef: mockParentRef,
          box: mockBox,
          setBox: mockSetBox,
          isMax: false,
          setIsMax: mockSetIsMax,
          isSticky: false,
          setIsSticky: mockSetIsSticky,
        }),
      );

      const startEvent = {
        clientX: 150,
        clientY: 150,
      } as React.MouseEvent;

      act(() => {
        result.current.handleDragStart(startEvent);
      });

      // 경계 밖으로 이동 시도 (오른쪽으로 많이 이동)
      act(() => {
        const moveEvent = new MouseEvent("mousemove", {
          clientX: 3000, // 오른쪽 경계 밖 (1920보다 훨씬 큼)
          clientY: 150,
        });
        document.dispatchEvent(moveEvent);
      });

      expect(mockSetBox).toHaveBeenCalled();
      const setBoxCall = mockSetBox.mock.calls[0][0];

      if (typeof setBoxCall === "function") {
        const newBox = setBoxCall(mockBox);
        // x + width가 부모 너비를 초과하지 않아야 함
        expect(newBox.x + newBox.width).toBeLessThanOrEqual(1920);
      }

      act(() => {
        const upEvent = new MouseEvent("mouseup");
        document.dispatchEvent(upEvent);
      });
    });

    it("드래그 시 부모 경계를 벗어나지 않아야 한다 - 하단 경계", () => {
      const { result } = renderHook(() =>
        useHandleWindowBox({
          windowBox: mockWindowBox,
          parentRef: mockParentRef,
          box: mockBox,
          setBox: mockSetBox,
          isMax: false,
          setIsMax: mockSetIsMax,
          isSticky: false,
          setIsSticky: mockSetIsSticky,
        }),
      );

      const startEvent = {
        clientX: 150,
        clientY: 150,
      } as React.MouseEvent;

      act(() => {
        result.current.handleDragStart(startEvent);
      });

      // 경계 밖으로 이동 시도 (아래로 많이 이동)
      act(() => {
        const moveEvent = new MouseEvent("mousemove", {
          clientX: 150,
          clientY: 2000, // 하단 경계 밖 (1080보다 훨씬 큼)
        });
        document.dispatchEvent(moveEvent);
      });

      expect(mockSetBox).toHaveBeenCalled();
      const setBoxCall = mockSetBox.mock.calls[0][0];

      if (typeof setBoxCall === "function") {
        const newBox = setBoxCall(mockBox);
        // y + height가 부모 높이를 초과하지 않아야 함
        expect(newBox.y + newBox.height).toBeLessThanOrEqual(1080);
      }

      act(() => {
        const upEvent = new MouseEvent("mouseup");
        document.dispatchEvent(upEvent);
      });
    });

    it("리사이즈 시 부모 경계를 벗어나지 않아야 한다", () => {
      const { result } = renderHook(() =>
        useHandleWindowBox({
          windowBox: mockWindowBox,
          parentRef: mockParentRef,
          box: mockBox,
          setBox: mockSetBox,
          isMax: false,
          setIsMax: mockSetIsMax,
          isSticky: false,
          setIsSticky: mockSetIsSticky,
        }),
      );

      const mockEvent = {
        clientX: 600,
        clientY: 500,
      } as React.MouseEvent;

      act(() => {
        result.current.handleResizeStart("bottom-right", mockEvent);
      });

      // 경계를 넘어서 리사이즈 시도
      act(() => {
        const moveEvent = new MouseEvent("mousemove", {
          clientX: 3000, // 부모 너비를 초과
          clientY: 2000, // 부모 높이를 초과
        });
        document.dispatchEvent(moveEvent);
      });

      expect(mockSetBox).toHaveBeenCalled();
      const setBoxCall = mockSetBox.mock.calls[0][0];

      // 경계 내에서 제한되어야 함
      expect(setBoxCall.x + setBoxCall.width).toBeLessThanOrEqual(1920);
      expect(setBoxCall.y + setBoxCall.height).toBeLessThanOrEqual(1080);

      act(() => {
        const upEvent = new MouseEvent("mouseup");
        document.dispatchEvent(upEvent);
      });
    });
  });

  describe("언마운트", () => {
    it("언마운트 시 box를 기본 위치로 복원하고 최대화해야 한다", () => {
      const defaultPosition = {
        x: 200,
        y: 200,
        width: 500,
        height: 400,
      };

      const { unmount } = renderHook(() =>
        useHandleWindowBox({
          windowBox: mockWindowBox,
          parentRef: mockParentRef,
          box: mockBox,
          setBox: mockSetBox,
          isMax: false,
          setIsMax: mockSetIsMax,
          isSticky: false,
          setIsSticky: mockSetIsSticky,
          defaultPosition,
        }),
      );

      unmount();

      expect(mockSetBox).toHaveBeenCalledWith(defaultPosition);
      expect(mockSetIsMax).toHaveBeenCalledWith(true);
    });
  });
});
