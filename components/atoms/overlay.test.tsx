import { render, screen, fireEvent } from "@testing-library/react";
import Overlay from "./overlay";

describe("Overlay", () => {
  const mockOnClick = jest.fn();
  const testContent = <div data-testid="overlay-content">테스트 콘텐츠</div>;

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  describe("기본 렌더링", () => {
    it("children을 렌더링해야 한다", () => {
      render(<Overlay onClick={mockOnClick}>{testContent}</Overlay>);

      expect(screen.getByTestId("overlay-content")).toBeInTheDocument();
      expect(screen.getByText("테스트 콘텐츠")).toBeInTheDocument();
    });

    it("기본값으로 isOpen이 true여야 한다", () => {
      const { container } = render(
        <Overlay onClick={mockOnClick}>{testContent}</Overlay>,
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass("flex");
      expect(wrapper).not.toHaveClass("hidden");
    });

    it("배경 오버레이 요소가 렌더링되어야 한다", () => {
      render(<Overlay onClick={mockOnClick}>{testContent}</Overlay>);

      const background = document.getElementById("overlay-background");
      expect(background).toBeInTheDocument();
    });
  });

  describe("isOpen prop", () => {
    it("isOpen이 true일 때 표시되어야 한다", () => {
      const { container } = render(
        <Overlay onClick={mockOnClick} isOpen={true}>
          {testContent}
        </Overlay>,
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass("flex");
      expect(wrapper).not.toHaveClass("hidden");
    });

    it("isOpen이 false일 때 숨겨져야 한다", () => {
      const { container } = render(
        <Overlay onClick={mockOnClick} isOpen={false}>
          {testContent}
        </Overlay>,
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass("hidden");
      expect(wrapper).not.toHaveClass("flex");
    });
  });

  describe("onClick 동작", () => {
    it("배경 클릭 시 onClick 핸들러를 호출해야 한다", () => {
      render(<Overlay onClick={mockOnClick}>{testContent}</Overlay>);

      const background = document.getElementById(
        "overlay-background",
      ) as HTMLElement;

      fireEvent.click(background);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("배경을 여러 번 클릭 시 onClick을 여러 번 호출해야 한다", () => {
      render(<Overlay onClick={mockOnClick}>{testContent}</Overlay>);

      const background = document.getElementById(
        "overlay-background",
      ) as HTMLElement;

      fireEvent.click(background);
      fireEvent.click(background);
      fireEvent.click(background);

      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });

    it("콘텐츠 영역 클릭 시 onClick이 호출되지 않아야 한다", () => {
      render(<Overlay onClick={mockOnClick}>{testContent}</Overlay>);

      const content = screen.getByTestId("overlay-content");
      fireEvent.click(content);

      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe("style prop", () => {
    it("커스텀 스타일을 콘텐츠 컨테이너에 적용해야 한다", () => {
      const customStyle = {
        maxWidth: "600px",
        padding: "20px",
      };

      render(
        <Overlay onClick={mockOnClick} style={customStyle}>
          {testContent}
        </Overlay>,
      );

      const contentContainer = document.getElementById(
        "overlay-content-container",
      ) as HTMLElement;

      expect(contentContainer).toHaveStyle({
        maxWidth: "600px",
        padding: "20px",
      });
    });
  });

  describe("접근성", () => {
    it("콘텐츠 컨테이너에 tabIndex가 -1이어야 한다", () => {
      render(<Overlay onClick={mockOnClick}>{testContent}</Overlay>);

      const contentContainer = document.getElementById(
        "overlay-content-container",
      ) as HTMLElement;
      expect(contentContainer).toHaveAttribute("tabIndex", "-1");
    });
  });

  describe("레이아웃 클래스", () => {
    it("전체 화면 고정 위치 클래스가 있어야 한다", () => {
      const { container } = render(
        <Overlay onClick={mockOnClick}>{testContent}</Overlay>,
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass("fixed");
      expect(wrapper).toHaveClass("top-0");
      expect(wrapper).toHaveClass("left-0");
      expect(wrapper).toHaveClass("z-40");
      expect(wrapper).toHaveClass("h-screen");
      expect(wrapper).toHaveClass("w-screen");
    });

    it("배경이 전체 영역을 덮어야 한다", () => {
      render(<Overlay onClick={mockOnClick}>{testContent}</Overlay>);

      const background = document.getElementById(
        "overlay-background",
      ) as HTMLElement;

      expect(background).toHaveClass("absolute");
      expect(background).toHaveClass("top-0");
      expect(background).toHaveClass("left-0");
      expect(background).toHaveClass("h-full");
      expect(background).toHaveClass("w-full");
    });

    it("콘텐츠가 중앙에 위치하고 z-index가 높아야 한다", () => {
      render(<Overlay onClick={mockOnClick}>{testContent}</Overlay>);

      const contentContainer = document.getElementById(
        "overlay-content-container",
      ) as HTMLElement;

      expect(contentContainer).toHaveClass("absolute");
      expect(contentContainer).toHaveClass("z-10");
      expect(contentContainer).toHaveClass("mx-auto");
      expect(contentContainer).toHaveClass("my-0");
      expect(contentContainer).toHaveClass("mb-20");
    });
  });
});
