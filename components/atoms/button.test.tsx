import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./button";

// ClipLoader mock
jest.mock("react-spinners", () => ({
  ClipLoader: ({
    size,
    "aria-label": ariaLabel,
  }: {
    size: number;
    "aria-label"?: string;
  }) => (
    <div data-testid="clip-loader" aria-label={ariaLabel}>
      {" "}
      Loading (size: {size}){" "}
    </div>
  ),
}));
describe("Button", () => {
  const mockOnClick = jest.fn();
  beforeEach(() => {
    mockOnClick.mockClear();
  });
  describe("기본 렌더링", () => {
    it("텍스트를 렌더링해야 한다", () => {
      render(<Button text="클릭" onClick={mockOnClick} />);
      const button = screen.getByText("클릭");
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });
  });
  describe("onClick 동작", () => {
    it("클릭 시 onClick 핸들러를 호출해야 한다", () => {
      render(<Button text="클릭" onClick={mockOnClick} />);
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
    it("여러 번 클릭 시 onClick을 여러 번 호출해야 한다", () => {
      render(<Button text="클릭" onClick={mockOnClick} />);
      const button = screen.getByRole("button");
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });
  });
  describe("disabled 상태", () => {
    it("disabled일 때 disabled 속성이 있어야 한다", () => {
      render(<Button text="비활성" onClick={mockOnClick} disabled />);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
    it("disabled일 때 onClick을 호출하지 않아야 한다", () => {
      render(<Button text="비활성" onClick={mockOnClick} disabled />);
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });
  describe("isLoading 상태", () => {
    it("isLoading일 때 ClipLoader를 렌더링해야 한다", () => {
      render(<Button text="로딩" onClick={mockOnClick} isLoading />);
      expect(screen.getByTestId("clip-loader")).toBeInTheDocument();
      expect(screen.queryByText("로딩")).not.toBeInTheDocument();
    });
    it("isLoading일 때 onClick을 호출하지 않아야 한다", () => {
      render(<Button text="로딩" onClick={mockOnClick} isLoading />);
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(mockOnClick).not.toHaveBeenCalled();
    });
    it("isLoading일 때 disabled 속성이 있어야 한다", () => {
      render(<Button text="로딩" onClick={mockOnClick} isLoading />);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });
  describe("icon prop", () => {
    it("icon을 렌더링해야 한다", () => {
      const icon = <span data-testid="test-icon">🎨</span>;
      render(<Button text="아이콘" onClick={mockOnClick} icon={icon} />);
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
      expect(screen.getByText("아이콘")).toBeInTheDocument();
    });
    it("icon만 렌더링 가능해야 한다", () => {
      const icon = <span data-testid="test-icon">🎨</span>;
      render(<Button onClick={mockOnClick} icon={icon} />);
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });
  });
  describe("스타일 props", () => {
    it("width를 number로 전달 시 px 단위로 적용되어야 한다", () => {
      render(<Button text="너비" onClick={mockOnClick} width={200} />);
      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ width: "200px" });
    });
    it("width를 string으로 전달 시 그대로 적용되어야 한다", () => {
      render(<Button text="너비" onClick={mockOnClick} width="50%" />);
      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ width: "50%" });
    });
    it("height를 number로 전달 시 px 단위로 적용되어야 한다", () => {
      render(<Button text="높이" onClick={mockOnClick} height={100} />);
      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ height: "100px" });
    });
    it("height를 string으로 전달 시 그대로 적용되어야 한다", () => {
      render(<Button text="높이" onClick={mockOnClick} height="auto" />);
      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ height: "auto" });
    });
    it("fontSize를 적용해야 한다", () => {
      render(<Button text="폰트" onClick={mockOnClick} fontSize="20px" />);
      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ fontSize: "20px" });
    });
    it("커스텀 style을 적용해야 한다", () => {
      render(
        <Button
          text="스타일"
          onClick={mockOnClick}
          style={{ padding: "10px", marginTop: "5px" }}
        />,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ padding: "10px", marginTop: "5px" });
    });
    it("기본 width, height, fontSize 값을 사용해야 한다", () => {
      render(<Button text="기본" onClick={mockOnClick} />);
      const button = screen.getByRole("button");
      expect(button).toHaveStyle({
        width: "fit-content",
        height: "fit-content",
        fontSize: "13px",
      });
    });
  });
  describe("bold prop", () => {
    it("bold일 때 outline 클래스를 적용해야 한다", () => {
      render(<Button text="굵게" onClick={mockOnClick} bold />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("outline");
      expect(button).toHaveClass("outline-gray-800");
    });
    it("bold가 false일 때 outline 클래스가 없어야 한다", () => {
      render(<Button text="일반" onClick={mockOnClick} bold={false} />);
      const button = screen.getByRole("button");
      expect(button).not.toHaveClass("outline");
    });
  });
  describe("마우스 인터랙션", () => {
    it("mouseDown 시 스타일이 변경되어야 한다", () => {
      render(<Button text="마우스" onClick={mockOnClick} />);
      const button = screen.getByRole("button");
      fireEvent.mouseDown(button);
      expect(button).toHaveClass("border-gray-500");
      expect(button).toHaveClass("border-r-gray-100");
      expect(button).toHaveClass("border-b-gray-100");
      expect(button).toHaveClass("p-0.5");
    });
    it("mouseUp 시 스타일이 원래대로 돌아와야 한다", () => {
      render(<Button text="마우스" onClick={mockOnClick} />);
      const button = screen.getByRole("button");
      fireEvent.mouseDown(button);
      fireEvent.mouseUp(button);
      expect(button).toHaveClass("border-gray-100");
      expect(button).toHaveClass("border-r-gray-500");
      expect(button).toHaveClass("border-b-gray-500");
      expect(button).not.toHaveClass("p-0.5");
    });
    it("mouseLeave 시 스타일이 원래대로 돌아와야 한다", () => {
      render(<Button text="마우스" onClick={mockOnClick} />);
      const button = screen.getByRole("button");
      fireEvent.mouseDown(button);
      fireEvent.mouseLeave(button);
      expect(button).toHaveClass("border-gray-100");
      expect(button).toHaveClass("border-r-gray-500");
      expect(button).toHaveClass("border-b-gray-500");
    });
  });
  describe("추가 HTML 속성", () => {
    it("rest props를 전달해야 한다", () => {
      render(
        <Button
          text="데이터"
          onClick={mockOnClick}
          data-testid="custom-button"
          aria-label="커스텀 버튼"
        />,
      );
      const button = screen.getByTestId("custom-button");
      expect(button).toHaveAttribute("aria-label", "커스텀 버튼");
    });
    it("tabIndex가 -1이어야 한다", () => {
      render(<Button text="탭" onClick={mockOnClick} />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("tabIndex", "-1");
    });
  });
});
