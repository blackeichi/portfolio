import { renderHook, act } from "@testing-library/react";
import { useHandleMoveEvent, useHandleActionEvent } from "./hooks";

// utils mock
jest.mock("./_ui/utils", () => ({
  ARROW_KEYS: ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
  CHARACTER_ID: "character_ui",
  interactables: {
    testMap: {
      "00front": "test-action",
      "11back": "another-action",
    },
  },
}));

describe("useHandleMoveEvent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("초기 상태에서 pressedKeys는 빈 배열이어야 한다", () => {
    const { result } = renderHook(() => useHandleMoveEvent());

    expect(result.current.pressedKeys).toEqual([]);
  });

  it("화살표 키 입력 시 pressedKeys에 추가되어야 한다", () => {
    const { result } = renderHook(() => useHandleMoveEvent());

    act(() => {
      const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
      window.dispatchEvent(event);
    });

    expect(result.current.pressedKeys).toContain("ArrowUp");
  });

  it("여러 화살표 키를 동시에 누를 수 있어야 한다", () => {
    const { result } = renderHook(() => useHandleMoveEvent());

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    });

    expect(result.current.pressedKeys).toContain("ArrowUp");
    expect(result.current.pressedKeys).toContain("ArrowRight");
    expect(result.current.pressedKeys.length).toBe(2);
  });

  it("같은 키를 여러 번 눌러도 중복으로 추가되지 않아야 한다", () => {
    const { result } = renderHook(() => useHandleMoveEvent());

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
    });

    expect(result.current.pressedKeys).toEqual(["ArrowUp"]);
  });

  it("키를 떼면 pressedKeys에서 제거되어야 한다", () => {
    const { result } = renderHook(() => useHandleMoveEvent());

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
    });

    expect(result.current.pressedKeys).toContain("ArrowUp");

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowUp" }));
    });

    expect(result.current.pressedKeys).not.toContain("ArrowUp");
    expect(result.current.pressedKeys.length).toBe(0);
  });

  it("화살표가 아닌 키는 무시해야 한다", () => {
    const { result } = renderHook(() => useHandleMoveEvent());

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Space" }));
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    });

    expect(result.current.pressedKeys).toEqual([]);
  });

  it("언마운트 시 이벤트 리스너가 제거되어야 한다", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useHandleMoveEvent());

    expect(addEventListenerSpy).toHaveBeenCalledTimes(2); // keydown, keyup

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});

describe("useHandleActionEvent", () => {
  let mockMapPositionRef: React.MutableRefObject<{
    movex: number;
    movey: number;
  }>;
  let mockSetActionType: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockMapPositionRef = { current: { movex: 0, movey: 0 } };
    mockSetActionType = jest.fn();

    // DOM setup
    const characterElement = document.createElement("div");
    characterElement.id = "character_ui";
    characterElement.className = "character front";
    document.body.appendChild(characterElement);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("Space 키 입력 시 인터랙션을 감지해야 한다", () => {
    mockMapPositionRef.current = { movex: 0, movey: 0 };

    renderHook(() =>
      useHandleActionEvent({
        mapPositionRef: mockMapPositionRef,
        currentMap: "testMap",
        actionType: null,
        setActionType: mockSetActionType,
      }),
    );

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { code: "Space" }));
    });

    expect(mockSetActionType).toHaveBeenCalledWith("test-action");
  });

  it("actionType이 이미 있을 때는 새 액션을 트리거하지 않아야 한다", () => {
    mockMapPositionRef.current = { movex: 0, movey: 0 };

    renderHook(() =>
      useHandleActionEvent({
        mapPositionRef: mockMapPositionRef,
        currentMap: "testMap",
        actionType: "existing-action",
        setActionType: mockSetActionType,
      }),
    );

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { code: "Space" }));
    });

    expect(mockSetActionType).not.toHaveBeenCalled();
  });

  it("인터랙션이 없는 위치에서는 액션이 트리거되지 않아야 한다", () => {
    mockMapPositionRef.current = { movex: 5, movey: 5 }; // 인터랙션이 없는 위치

    renderHook(() =>
      useHandleActionEvent({
        mapPositionRef: mockMapPositionRef,
        currentMap: "testMap",
        actionType: null,
        setActionType: mockSetActionType,
      }),
    );

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { code: "Space" }));
    });

    expect(mockSetActionType).not.toHaveBeenCalled();
  });

  it("캐릭터 방향에 따라 다른 인터랙션을 감지해야 한다", () => {
    mockMapPositionRef.current = { movex: 1, movey: 1 };

    const characterElement = document.getElementById("character_ui");
    if (characterElement) {
      characterElement.className = "character back";
    }

    renderHook(() =>
      useHandleActionEvent({
        mapPositionRef: mockMapPositionRef,
        currentMap: "testMap",
        actionType: null,
        setActionType: mockSetActionType,
      }),
    );

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { code: "Space" }));
    });

    expect(mockSetActionType).toHaveBeenCalledWith("another-action");
  });

  it("언마운트 시 이벤트 리스너가 제거되어야 한다", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() =>
      useHandleActionEvent({
        mapPositionRef: mockMapPositionRef,
        currentMap: "testMap",
        actionType: null,
        setActionType: mockSetActionType,
      }),
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function),
    );

    removeEventListenerSpy.mockRestore();
  });
});
