import { render, fireEvent } from "@testing-library/react";
import { WindowsHandler } from "./windowsHandler";

describe("WindowsHandler", () => {
  let mockHandleResizeStart: jest.Mock;

  beforeEach(() => {
    mockHandleResizeStart = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("기본 렌더링", () => {
    it("8개의 핸들러를 렌더링해야 한다", () => {
      const { container } = render(
        <WindowsHandler handleResizeStart={mockHandleResizeStart} />,
      );
      const handlers = container.querySelectorAll("div");
      expect(handlers).toHaveLength(8);
    });
  });

  describe("방향별 핸들러", () => {
    it("top 핸들러에서 마우스 다운 시 handleResizeStart를 호출해야 한다", () => {
      const { container } = render(
        <WindowsHandler handleResizeStart={mockHandleResizeStart} />,
      );
      const topHandler = container.querySelector(".cursor-n-resize");

      expect(topHandler).toBeInTheDocument();

      if (topHandler) {
        fireEvent.mouseDown(topHandler);
        expect(mockHandleResizeStart).toHaveBeenCalledWith(
          "top",
          expect.any(Object),
        );
      }
    });

    it("bottom 핸들러에서 마우스 다운 시 handleResizeStart를 호출해야 한다", () => {
      const { container } = render(
        <WindowsHandler handleResizeStart={mockHandleResizeStart} />,
      );
      const bottomHandler = container.querySelector(".cursor-s-resize");

      expect(bottomHandler).toBeInTheDocument();

      if (bottomHandler) {
        fireEvent.mouseDown(bottomHandler);
        expect(mockHandleResizeStart).toHaveBeenCalledWith(
          "bottom",
          expect.any(Object),
        );
      }
    });

    it("left 핸들러에서 마우스 다운 시 handleResizeStart를 호출해야 한다", () => {
      const { container } = render(
        <WindowsHandler handleResizeStart={mockHandleResizeStart} />,
      );
      const leftHandler = container.querySelector(".cursor-w-resize");

      expect(leftHandler).toBeInTheDocument();

      if (leftHandler) {
        fireEvent.mouseDown(leftHandler);
        expect(mockHandleResizeStart).toHaveBeenCalledWith(
          "left",
          expect.any(Object),
        );
      }
    });

    it("right 핸들러에서 마우스 다운 시 handleResizeStart를 호출해야 한다", () => {
      const { container } = render(
        <WindowsHandler handleResizeStart={mockHandleResizeStart} />,
      );
      const rightHandler = container.querySelector(".cursor-e-resize");

      expect(rightHandler).toBeInTheDocument();

      if (rightHandler) {
        fireEvent.mouseDown(rightHandler);
        expect(mockHandleResizeStart).toHaveBeenCalledWith(
          "right",
          expect.any(Object),
        );
      }
    });

    it("top-left 핸들러에서 마우스 다운 시 handleResizeStart를 호출해야 한다", () => {
      const { container } = render(
        <WindowsHandler handleResizeStart={mockHandleResizeStart} />,
      );
      const topLeftHandler = container.querySelector(".cursor-nw-resize");

      expect(topLeftHandler).toBeInTheDocument();

      if (topLeftHandler) {
        fireEvent.mouseDown(topLeftHandler);
        expect(mockHandleResizeStart).toHaveBeenCalledWith(
          "top-left",
          expect.any(Object),
        );
      }
    });

    it("top-right 핸들러에서 마우스 다운 시 handleResizeStart를 호출해야 한다", () => {
      const { container } = render(
        <WindowsHandler handleResizeStart={mockHandleResizeStart} />,
      );
      const topRightHandler = container.querySelector(".cursor-ne-resize");

      expect(topRightHandler).toBeInTheDocument();

      if (topRightHandler) {
        fireEvent.mouseDown(topRightHandler);
        expect(mockHandleResizeStart).toHaveBeenCalledWith(
          "top-right",
          expect.any(Object),
        );
      }
    });

    it("bottom-left 핸들러에서 마우스 다운 시 handleResizeStart를 호출해야 한다", () => {
      const { container } = render(
        <WindowsHandler handleResizeStart={mockHandleResizeStart} />,
      );
      const bottomLeftHandler = container.querySelector(".cursor-sw-resize");

      expect(bottomLeftHandler).toBeInTheDocument();

      if (bottomLeftHandler) {
        fireEvent.mouseDown(bottomLeftHandler);
        expect(mockHandleResizeStart).toHaveBeenCalledWith(
          "bottom-left",
          expect.any(Object),
        );
      }
    });

    it("bottom-right 핸들러에서 마우스 다운 시 handleResizeStart를 호출해야 한다", () => {
      const { container } = render(
        <WindowsHandler handleResizeStart={mockHandleResizeStart} />,
      );
      const bottomRightHandler = container.querySelector(".cursor-se-resize");

      expect(bottomRightHandler).toBeInTheDocument();

      if (bottomRightHandler) {
        fireEvent.mouseDown(bottomRightHandler);
        expect(mockHandleResizeStart).toHaveBeenCalledWith(
          "bottom-right",
          expect.any(Object),
        );
      }
    });
  });
});
