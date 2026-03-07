import { render, screen } from "@testing-library/react";
import WindowsBox from "./windowsBox";

describe("WindowsBox", () => {
  describe("기본 렌더링", () => {
    it("기본 크기(200x200)로 렌더링되어야 한다", () => {
      const { container } = render(<WindowsBox />);
      const windowsContainer = container.firstChild as HTMLElement;
      expect(windowsContainer).toHaveStyle({ width: "200px", height: "200px" });
    });

    it("커스텀 크기로 렌더링되어야 한다", () => {
      const { container } = render(<WindowsBox width={400} height={300} />);
      const windowsContainer = container.firstChild as HTMLElement;
      expect(windowsContainer).toHaveStyle({ width: "400px", height: "300px" });
    });
  });

  describe("헤더", () => {
    it("제목을 렌더링해야 한다", () => {
      render(<WindowsBox title="테스트 제목" />);
      expect(screen.getByText("테스트 제목")).toBeInTheDocument();
    });

    it("제목 아이콘을 렌더링해야 한다", () => {
      render(<WindowsBox title="테스트" titleIcon="/test-icon.png" />);
      const icon = screen.getByAltText("Title Icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute(
        "src",
        expect.stringContaining("test-icon.png"),
      );
    });

    it("헤더 버튼을 렌더링해야 한다", () => {
      render(<WindowsBox title="테스트" headBtns={<button>닫기</button>} />);
      expect(screen.getByText("닫기")).toBeInTheDocument();
    });
  });

  describe("자식 컴포넌트", () => {
    it("자식 컴포넌트를 렌더링해야 한다", () => {
      render(
        <WindowsBox>
          <div>테스트 컨텐츠</div>
        </WindowsBox>,
      );
      expect(screen.getByText("테스트 컨텐츠")).toBeInTheDocument();
    });
  });

  describe("스크롤 옵션", () => {
    it("needScroll이 false일 때 overflow-hidden 클래스가 적용되어야 한다", () => {
      render(
        <WindowsBox needScroll={false}>
          <div>컨텐츠</div>
        </WindowsBox>,
      );
      const content = screen.getByText("컨텐츠").parentElement;
      expect(content).toHaveClass("overflow-hidden");
    });

    it("needScroll이 true일 때 overflow-scroll 클래스가 적용되어야 한다", () => {
      render(
        <WindowsBox needScroll={true}>
          <div>컨텐츠</div>
        </WindowsBox>,
      );
      const content = screen.getByText("컨텐츠").parentElement;
      expect(content).toHaveClass("overflow-scroll");
    });
  });

  describe("커스텀 스타일", () => {
    it("추가 스타일이 적용되어야 한다", () => {
      const { container } = render(
        <WindowsBox style={{ zIndex: 100, opacity: 0.9 }}>
          <div>컨텐츠</div>
        </WindowsBox>,
      );
      const windowsContainer = container.firstChild as HTMLElement;
      expect(windowsContainer).toHaveStyle({
        zIndex: "100",
        opacity: "0.9",
      });
    });
  });
});
