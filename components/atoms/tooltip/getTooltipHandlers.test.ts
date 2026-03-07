import { getTooltipHandlers } from "./util";

beforeAll(() => {
  // window 크기 설정
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: 1024,
  });

  Object.defineProperty(window, "innerHeight", {
    writable: true,
    configurable: true,
    value: 768,
  });
});

describe("getTooltipHandlers", () => {
  let mockSetPosition: jest.Mock;
  let mockMouseEvent: Partial<React.MouseEvent<HTMLDivElement>>;
  let mockFocusEvent: Partial<React.FocusEvent<HTMLDivElement>>;
  let mockRect: DOMRect;

  beforeEach(() => {
    mockSetPosition = jest.fn();

    // 기본 DOMRect mock
    mockRect = {
      x: 100,
      y: 100,
      width: 200,
      height: 150,
      top: 100,
      right: 300,
      bottom: 250,
      left: 100,
    } as DOMRect;

    // Mock mouse event 설정
    mockMouseEvent = {
      stopPropagation: jest.fn(),
      currentTarget: {
        getBoundingClientRect: jest.fn(() => mockRect),
      } as unknown as HTMLDivElement,
    };

    // Mock focus event 설정
    mockFocusEvent = {
      currentTarget: {
        getBoundingClientRect: jest.fn(() => mockRect),
      } as unknown as HTMLDivElement,
    };
  });

  it("onMouseEnter, onMouseLeave, onFocus, onBlur 핸들러를 반환해야 한다", () => {
    const handlers = getTooltipHandlers(mockSetPosition);

    expect(handlers).toHaveProperty("onMouseEnter");
    expect(handlers).toHaveProperty("onMouseLeave");
    expect(handlers).toHaveProperty("onFocus");
    expect(handlers).toHaveProperty("onBlur");
    expect(typeof handlers.onMouseEnter).toBe("function");
    expect(typeof handlers.onMouseLeave).toBe("function");
    expect(typeof handlers.onFocus).toBe("function");
    expect(typeof handlers.onBlur).toBe("function");
  });

  describe("onMouseEnter", () => {
    it("이벤트 전파를 중지해야 한다", () => {
      const handlers = getTooltipHandlers(mockSetPosition);
      handlers.onMouseEnter(mockMouseEvent as React.MouseEvent<HTMLDivElement>);

      expect(mockMouseEvent.stopPropagation).toHaveBeenCalled();
    });

    it("요소가 왼쪽 상단에 있을 때 올바른 스타일을 설정해야 한다", () => {
      // 왼쪽 상단 (x < innerWidth/2, y < innerHeight/2)
      mockRect.x = 100;
      mockRect.y = 100;

      const handlers = getTooltipHandlers(mockSetPosition);
      handlers.onMouseEnter(mockMouseEvent as React.MouseEvent<HTMLDivElement>);

      expect(mockSetPosition).toHaveBeenCalledWith({
        visible: true,
        style: {
          left: mockRect.width - 10,
          top: mockRect.height + 10,
          transform: undefined,
        },
      });
    });

    it("요소가 오른쪽 상단에 있을 때 올바른 스타일을 설정해야 한다", () => {
      // 오른쪽 상단 (x >= innerWidth/2, y < innerHeight/2)
      mockRect.x = 600;
      mockRect.y = 100;

      const handlers = getTooltipHandlers(mockSetPosition);
      handlers.onMouseEnter(mockMouseEvent as React.MouseEvent<HTMLDivElement>);

      expect(mockSetPosition).toHaveBeenCalledWith({
        visible: true,
        style: {
          left: 8,
          top: mockRect.height + 10,
          transform: "translateX(-100%)",
        },
      });
    });

    it("요소가 왼쪽 하단에 있을 때 올바른 스타일을 설정해야 한다", () => {
      // 왼쪽 하단 (x < innerWidth/2, y >= innerHeight/2)
      mockRect.x = 100;
      mockRect.y = 500;

      const handlers = getTooltipHandlers(mockSetPosition);
      handlers.onMouseEnter(mockMouseEvent as React.MouseEvent<HTMLDivElement>);

      expect(mockSetPosition).toHaveBeenCalledWith({
        visible: true,
        style: {
          left: mockRect.width - 10,
          top: -4,
          transform: "translateY(-100%)",
        },
      });
    });

    it("요소가 오른쪽 하단에 있을 때 올바른 스타일을 설정해야 한다", () => {
      // 오른쪽 하단 (x >= innerWidth/2, y >= innerHeight/2)
      mockRect.x = 600;
      mockRect.y = 500;

      const handlers = getTooltipHandlers(mockSetPosition);
      handlers.onMouseEnter(mockMouseEvent as React.MouseEvent<HTMLDivElement>);

      expect(mockSetPosition).toHaveBeenCalledWith({
        visible: true,
        style: {
          left: 8,
          top: -4,
          transform: "translateX(-100%) translateY(-100%)",
        },
      });
    });
  });

  describe("onFocus", () => {
    it("포커스 이벤트에서도 툴팁을 표시해야 한다", () => {
      mockRect.x = 100;
      mockRect.y = 100;

      const handlers = getTooltipHandlers(mockSetPosition);
      handlers.onFocus(mockFocusEvent as React.FocusEvent<HTMLDivElement>);

      expect(mockSetPosition).toHaveBeenCalledWith({
        visible: true,
        style: {
          left: mockRect.width - 10,
          top: mockRect.height + 10,
          transform: undefined,
        },
      });
    });
  });

  describe("onMouseLeave", () => {
    it("툴팁을 숨기고 스타일을 초기화해야 한다", () => {
      const handlers = getTooltipHandlers(mockSetPosition);
      handlers.onMouseLeave();

      expect(mockSetPosition).toHaveBeenCalledWith({
        visible: false,
        style: {},
      });
    });
  });

  describe("onBlur", () => {
    it("블러 시 툴팁을 숨기고 스타일을 초기화해야 한다", () => {
      const handlers = getTooltipHandlers(mockSetPosition);
      handlers.onBlur();

      expect(mockSetPosition).toHaveBeenCalledWith({
        visible: false,
        style: {},
      });
    });
  });
});
