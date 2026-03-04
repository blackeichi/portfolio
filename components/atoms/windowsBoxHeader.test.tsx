import { render, screen, fireEvent } from "@testing-library/react";
import WindowBoxHeader from "./windowsBoxHeader";
import { COLOR_THEME } from "@/libs/utils/constants";

// Next.js Image 컴포넌트 mock
jest.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe("WindowBoxHeader", () => {
  describe("기본 렌더링", () => {
    it("헤더 요소를 렌더링해야 한다", () => {
      render(<WindowBoxHeader />);

      const header = document.getElementById("window-header");
      expect(header).toBeInTheDocument();
    });

    it("기본 배경색이 파란색이어야 한다", () => {
      render(<WindowBoxHeader />);

      const header = document.getElementById("window-header");
      expect(header).toHaveStyle({ backgroundColor: COLOR_THEME.blue });
    });

    it("기본 클래스를 가져야 한다", () => {
      render(<WindowBoxHeader />);

      const header = document.getElementById("window-header");
      expect(header).toHaveClass("flex");
      expect(header).toHaveClass("h-8");
      expect(header).toHaveClass("w-full");
      expect(header).toHaveClass("shrink-0");
      expect(header).toHaveClass("items-center");
      expect(header).toHaveClass("justify-between");
      expect(header).toHaveClass("select-none");
    });
  });

  describe("title prop", () => {
    it("title을 렌더링해야 한다", () => {
      render(<WindowBoxHeader title="테스트 제목" />);

      expect(screen.getByText("테스트 제목")).toBeInTheDocument();
    });

    it("title이 없으면 렌더링하지 않아야 한다", () => {
      const { container } = render(<WindowBoxHeader />);

      // title 영역이 렌더링되지 않음
      const titleContainer = container.querySelector(
        ".flex.items-center.gap-2",
      );
      expect(titleContainer).not.toBeInTheDocument();
    });

    it("title에 올바른 스타일이 적용되어야 한다", () => {
      render(<WindowBoxHeader title="테스트 제목" />);

      const titleElement = screen.getByText("테스트 제목");
      expect(titleElement).toHaveClass("text-xs");
      expect(titleElement).toHaveClass("font-bold");
      expect(titleElement).toHaveClass("text-white");
    });
  });

  describe("titleIcon prop", () => {
    it("titleIcon을 렌더링해야 한다", () => {
      render(
        <WindowBoxHeader title="제목" titleIcon="/images/test-icon.png" />,
      );

      const icon = screen.getByAltText("Title Icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("src", "/images/test-icon.png");
    });

    it("titleIcon이 없으면 렌더링하지 않아야 한다", () => {
      render(<WindowBoxHeader title="제목" />);

      const icon = screen.queryByAltText("Title Icon");
      expect(icon).not.toBeInTheDocument();
    });

    it("title이 없으면 titleIcon도 렌더링하지 않아야 한다", () => {
      render(<WindowBoxHeader titleIcon="/images/test-icon.png" />);

      const icon = screen.queryByAltText("Title Icon");
      expect(icon).not.toBeInTheDocument();
    });

    it("icon의 크기가 16x16이어야 한다", () => {
      render(
        <WindowBoxHeader title="제목" titleIcon="/images/test-icon.png" />,
      );

      const icon = screen.getByAltText("Title Icon");
      expect(icon).toHaveAttribute("width", "16");
      expect(icon).toHaveAttribute("height", "16");
    });
  });

  describe("headBtns prop", () => {
    it("headBtns를 렌더링해야 한다", () => {
      const buttons = (
        <>
          <button>최소화</button>
          <button>닫기</button>
        </>
      );
      render(<WindowBoxHeader headBtns={buttons} />);

      expect(screen.getByText("최소화")).toBeInTheDocument();
      expect(screen.getByText("닫기")).toBeInTheDocument();
    });

    it("headBtns가 없으면 렌더링하지 않아야 한다", () => {
      const { container } = render(<WindowBoxHeader />);

      const buttonsContainer = container.querySelector(".flex.gap-1");
      expect(buttonsContainer).not.toBeInTheDocument();
    });

    it("여러 개의 버튼을 렌더링해야 한다", () => {
      const buttons = (
        <>
          <button data-testid="btn-1">버튼1</button>
          <button data-testid="btn-2">버튼2</button>
          <button data-testid="btn-3">버튼3</button>
        </>
      );
      render(<WindowBoxHeader headBtns={buttons} />);

      expect(screen.getByTestId("btn-1")).toBeInTheDocument();
      expect(screen.getByTestId("btn-2")).toBeInTheDocument();
      expect(screen.getByTestId("btn-3")).toBeInTheDocument();
    });
  });

  describe("style prop", () => {
    it("커스텀 스타일을 적용해야 한다", () => {
      render(<WindowBoxHeader style={{ padding: "20px", margin: "10px" }} />);

      const header = document.getElementById("window-header");
      expect(header).toHaveStyle({
        padding: "20px",
        margin: "10px",
      });
    });

    it("기본 배경색을 유지하면서 커스텀 스타일을 적용해야 한다", () => {
      render(<WindowBoxHeader style={{ border: "1px solid red" }} />);

      const header = document.getElementById("window-header");
      expect(header).toHaveStyle({
        backgroundColor: COLOR_THEME.blue,
        border: "1px solid red",
      });
    });
  });

  describe("onMouseDown 핸들러", () => {
    it("isMax가 false나 undefined일 때 mouseDown 시 onMouseDown을 호출해야 한다", () => {
      const mockOnMouseDown = jest.fn();
      render(<WindowBoxHeader onMouseDown={mockOnMouseDown} isMax={false} />);

      const header = document.getElementById("window-header") as HTMLElement;
      fireEvent.mouseDown(header);

      expect(mockOnMouseDown).toHaveBeenCalledTimes(1);
    });
  });

  describe("onDoubleClick 핸들러", () => {
    it("더블 클릭 시 onDoubleClick을 호출해야 한다", () => {
      const mockOnDoubleClick = jest.fn();
      render(<WindowBoxHeader onDoubleClick={mockOnDoubleClick} />);

      const header = document.getElementById("window-header") as HTMLElement;
      fireEvent.doubleClick(header);

      expect(mockOnDoubleClick).toHaveBeenCalledTimes(1);
    });

    it("여러 번 더블 클릭해도 작동해야 한다", () => {
      const mockOnDoubleClick = jest.fn();
      render(<WindowBoxHeader onDoubleClick={mockOnDoubleClick} />);

      const header = document.getElementById("window-header") as HTMLElement;
      fireEvent.doubleClick(header);
      fireEvent.doubleClick(header);
      fireEvent.doubleClick(header);

      expect(mockOnDoubleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe("isMax가 true일 때 드래그 감지", () => {
    it("mouseDown 시 위치를 기록해야 한다", () => {
      const mockOnMouseDown = jest.fn();
      render(<WindowBoxHeader onMouseDown={mockOnMouseDown} isMax={true} />);

      const header = document.getElementById("window-header") as HTMLElement;
      fireEvent.mouseDown(header, { clientX: 100, clientY: 50 });

      // onMouseDown은 아직 호출되지 않아야 함 (드래그 감지 전)
      expect(mockOnMouseDown).not.toHaveBeenCalled();
    });

    it("충분히 드래그하면 onMouseDown을 호출해야 한다", () => {
      const mockOnMouseDown = jest.fn();
      render(<WindowBoxHeader onMouseDown={mockOnMouseDown} isMax={true} />);

      const header = document.getElementById("window-header") as HTMLElement;

      // 초기 위치에서 mouseDown
      fireEvent.mouseDown(header, { clientX: 100, clientY: 50 });

      // 6px 이상 이동 (임계값 5px 초과)
      fireEvent.mouseMove(header, { clientX: 107, clientY: 50 });

      expect(mockOnMouseDown).toHaveBeenCalledTimes(1);
    });

    it("작은 움직임은 무시해야 한다", () => {
      const mockOnMouseDown = jest.fn();
      render(<WindowBoxHeader onMouseDown={mockOnMouseDown} isMax={true} />);

      const header = document.getElementById("window-header") as HTMLElement;

      // 초기 위치에서 mouseDown
      fireEvent.mouseDown(header, { clientX: 100, clientY: 50 });

      // 3px 이동 (임계값 5px 이하)
      fireEvent.mouseMove(header, { clientX: 103, clientY: 50 });

      expect(mockOnMouseDown).not.toHaveBeenCalled();
    });

    it("mouseUp 시 position을 초기화해야 한다", () => {
      const mockOnMouseDown = jest.fn();
      render(<WindowBoxHeader onMouseDown={mockOnMouseDown} isMax={true} />);

      const header = document.getElementById("window-header") as HTMLElement;

      fireEvent.mouseDown(header, { clientX: 100, clientY: 50 });
      fireEvent.mouseUp(header);

      // position이 초기화되었으므로 mouseMove 이벤트가 무시됨
      fireEvent.mouseMove(header, { clientX: 200, clientY: 100 });

      expect(mockOnMouseDown).not.toHaveBeenCalled();
    });

    it("y축으로도 드래그 감지가 작동해야 한다", () => {
      const mockOnMouseDown = jest.fn();
      render(<WindowBoxHeader onMouseDown={mockOnMouseDown} isMax={true} />);

      const header = document.getElementById("window-header") as HTMLElement;

      fireEvent.mouseDown(header, { clientX: 100, clientY: 50 });

      // y축으로 6px 이상 이동
      fireEvent.mouseMove(header, { clientX: 100, clientY: 57 });

      expect(mockOnMouseDown).toHaveBeenCalledTimes(1);
    });

    it("대각선 드래그도 감지해야 한다", () => {
      const mockOnMouseDown = jest.fn();
      render(<WindowBoxHeader onMouseDown={mockOnMouseDown} isMax={true} />);

      const header = document.getElementById("window-header") as HTMLElement;

      fireEvent.mouseDown(header, { clientX: 100, clientY: 50 });

      // 대각선으로 이동 (x: 4px, y: 4px, 합계 > 5px)
      fireEvent.mouseMove(header, { clientX: 104, clientY: 54 });

      expect(mockOnMouseDown).toHaveBeenCalledTimes(1);
    });
  });

  describe("복합 시나리오", () => {
    it("title, titleIcon, headBtns를 모두 렌더링해야 한다", () => {
      const buttons = <button>닫기</button>;
      render(
        <WindowBoxHeader
          title="완전한 헤더"
          titleIcon="/images/icon.png"
          headBtns={buttons}
        />,
      );

      expect(screen.getByText("완전한 헤더")).toBeInTheDocument();
      expect(screen.getByAltText("Title Icon")).toBeInTheDocument();
      expect(screen.getByText("닫기")).toBeInTheDocument();
    });

    it("모든 props와 이벤트 핸들러가 함께 작동해야 한다", () => {
      const mockOnMouseDown = jest.fn();
      const mockOnDoubleClick = jest.fn();
      const buttons = <button>닫기</button>;

      render(
        <WindowBoxHeader
          title="테스트"
          titleIcon="/images/icon.png"
          headBtns={buttons}
          onMouseDown={mockOnMouseDown}
          onDoubleClick={mockOnDoubleClick}
          style={{ opacity: 0.9 }}
        />,
      );

      const header = document.getElementById("window-header") as HTMLElement;

      expect(screen.getByText("테스트")).toBeInTheDocument();
      expect(header).toHaveStyle({ opacity: 0.9 });

      fireEvent.mouseDown(header);
      expect(mockOnMouseDown).toHaveBeenCalledTimes(1);

      fireEvent.doubleClick(header);
      expect(mockOnDoubleClick).toHaveBeenCalledTimes(1);
    });

    it("onMouseDown 없이도 정상 작동해야 한다", () => {
      render(<WindowBoxHeader title="제목" />);

      const header = document.getElementById("window-header") as HTMLElement;

      // 에러 없이 실행되어야 함
      expect(() => {
        fireEvent.mouseDown(header);
        fireEvent.mouseUp(header);
      }).not.toThrow();
    });

    it("onDoubleClick 없이도 정상 작동해야 한다", () => {
      render(<WindowBoxHeader title="제목" />);

      const header = document.getElementById("window-header") as HTMLElement;

      // 에러 없이 실행되어야 함
      expect(() => {
        fireEvent.doubleClick(header);
      }).not.toThrow();
    });
  });
});
