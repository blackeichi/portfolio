import { render, screen, fireEvent } from "@testing-library/react";
import IconButton from "./iconButton";
import { FaHome } from "react-icons/fa";

describe("IconButton", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  describe("기본 렌더링", () => {
    it("아이콘을 렌더링해야 한다", () => {
      render(<IconButton icon={FaHome} onClick={mockOnClick} />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("기본 크기(20x20)로 렌더링되어야 한다", () => {
      render(<IconButton icon={FaHome} onClick={mockOnClick} />);
      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ width: "20px", height: "20px" });
    });

    it("커스텀 크기로 렌더링되어야 한다", () => {
      render(
        <IconButton
          icon={FaHome}
          onClick={mockOnClick}
          width={40}
          height={40}
        />,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ width: "40px", height: "40px" });
    });
  });

  describe("onClick 동작", () => {
    it("클릭 시 onClick 핸들러를 호출해야 한다", () => {
      render(<IconButton icon={FaHome} onClick={mockOnClick} />);
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("여러 번 클릭 시 onClick을 여러 번 호출해야 한다", () => {
      render(<IconButton icon={FaHome} onClick={mockOnClick} />);
      const button = screen.getByRole("button");
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });
  });

  describe("disabled 상태", () => {
    it("disabled일 때 클릭 이벤트가 실행되지 않아야 한다", () => {
      render(
        <IconButton icon={FaHome} onClick={mockOnClick} disabled={true} />,
      );
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("disabled일 때 cursor-not-allowed 클래스가 적용되어야 한다", () => {
      render(
        <IconButton icon={FaHome} onClick={mockOnClick} disabled={true} />,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("cursor-not-allowed");
    });

    it("disabled가 아닐 때 cursor-pointer 클래스가 적용되어야 한다", () => {
      render(<IconButton icon={FaHome} onClick={mockOnClick} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("cursor-pointer");
    });
  });

  describe("마우스 인터랙션", () => {
    it("마우스 다운 시 border 스타일이 변경되어야 한다", () => {
      render(<IconButton icon={FaHome} onClick={mockOnClick} />);
      const button = screen.getByRole("button");

      expect(button).not.toHaveClass("border-gray-500");

      fireEvent.mouseDown(button);
      expect(button).toHaveClass("border-gray-500");

      fireEvent.mouseUp(button);
      expect(button).not.toHaveClass("border-gray-500");
    });

    it("마우스 리브 시 border 스타일이 초기화되어야 한다", () => {
      render(<IconButton icon={FaHome} onClick={mockOnClick} />);
      const button = screen.getByRole("button");

      fireEvent.mouseDown(button);
      expect(button).toHaveClass("border-gray-500");

      fireEvent.mouseLeave(button);
      expect(button).not.toHaveClass("border-gray-500");
    });

    it("disabled 상태에서는 마우스 다운 시 스타일이 변경되지 않아야 한다", () => {
      render(
        <IconButton icon={FaHome} onClick={mockOnClick} disabled={true} />,
      );
      const button = screen.getByRole("button");

      fireEvent.mouseDown(button);
      expect(button).not.toHaveClass("border-gray-500");
    });
  });

  describe("스타일 props", () => {
    it("커스텀 className이 적용되어야 한다", () => {
      render(
        <IconButton
          icon={FaHome}
          onClick={mockOnClick}
          className="custom-class"
        />,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });
  });
});
