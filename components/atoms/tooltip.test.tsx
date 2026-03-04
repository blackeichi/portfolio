import { render, screen, fireEvent } from "@testing-library/react";
import Tooltip from "./tooltip";

// window 크기 mock
beforeAll(() => {
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

describe("Tooltip", () => {
  const testChild = <button>테스트 버튼</button>;

  describe("기본 렌더링", () => {
    it("children을 렌더링해야 한다", () => {
      render(<Tooltip>{testChild}</Tooltip>);

      expect(
        screen.getByRole("button", { name: "테스트 버튼" }),
      ).toBeInTheDocument();
    });

    it("tooltip이 없으면 초기에 툴팁이 표시되지 않아야 한다", () => {
      render(<Tooltip>{testChild}</Tooltip>);

      const tooltip = document.getElementById("tooltip-content");
      expect(tooltip).not.toBeInTheDocument();
    });

    it("tooltip이 있어도 초기에는 표시되지 않아야 한다", () => {
      render(<Tooltip tooltip="도움말 텍스트">{testChild}</Tooltip>);

      const tooltip = document.getElementById("tooltip-content");
      expect(tooltip).not.toBeInTheDocument();
    });
  });

  describe("tooltip prop이 없을 때", () => {
    it("hover 해도 아무것도 표시되지 않아야 한다", () => {
      render(<Tooltip>{testChild}</Tooltip>);

      const wrapper = document.getElementById("tooltip-wrapper") as HTMLElement;
      fireEvent.mouseEnter(wrapper);

      const tooltip = document.getElementById("tooltip-content");
      expect(tooltip).not.toBeInTheDocument();
    });
  });

  describe("tooltip prop이 있을 때", () => {
    it("mouseEnter 시 tooltip을 표시해야 한다", () => {
      render(<Tooltip tooltip="도움말 텍스트">{testChild}</Tooltip>);

      const wrapper = document.getElementById("tooltip-wrapper") as HTMLElement;

      // getBoundingClientRect mock
      jest.spyOn(wrapper, "getBoundingClientRect").mockReturnValue({
        x: 100,
        y: 100,
        width: 200,
        height: 50,
        top: 100,
        right: 300,
        bottom: 150,
        left: 100,
        toJSON: () => ({}),
      } as DOMRect);

      fireEvent.mouseEnter(wrapper);

      const tooltip = document.getElementById("tooltip-content");
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent("도움말 텍스트");
    });

    it("mouseLeave 시 tooltip을 숨겨야 한다", () => {
      render(<Tooltip tooltip="도움말 텍스트">{testChild}</Tooltip>);

      const wrapper = document.getElementById("tooltip-wrapper") as HTMLElement;

      jest.spyOn(wrapper, "getBoundingClientRect").mockReturnValue({
        x: 100,
        y: 100,
        width: 200,
        height: 50,
        top: 100,
        right: 300,
        bottom: 150,
        left: 100,
        toJSON: () => ({}),
      } as DOMRect);

      fireEvent.mouseEnter(wrapper);
      let tooltip = document.getElementById("tooltip-content");
      expect(tooltip).toBeInTheDocument();

      fireEvent.mouseLeave(wrapper);
      tooltip = document.getElementById("tooltip-content");
      expect(tooltip).not.toBeInTheDocument();
    });

    it("여러 번 hover 해도 정상 작동해야 한다", () => {
      render(<Tooltip tooltip="도움말 텍스트">{testChild}</Tooltip>);

      const wrapper = document.getElementById("tooltip-wrapper") as HTMLElement;

      jest.spyOn(wrapper, "getBoundingClientRect").mockReturnValue({
        x: 100,
        y: 100,
        width: 200,
        height: 50,
        top: 100,
        right: 300,
        bottom: 150,
        left: 100,
        toJSON: () => ({}),
      } as DOMRect);

      // 첫 번째 hover
      fireEvent.mouseEnter(wrapper);
      let tooltip = document.getElementById("tooltip-content");
      expect(tooltip).toBeInTheDocument();
      fireEvent.mouseLeave(wrapper);
      tooltip = document.getElementById("tooltip-content");
      expect(tooltip).not.toBeInTheDocument();

      // 두 번째 hover
      fireEvent.mouseEnter(wrapper);
      tooltip = document.getElementById("tooltip-content");
      expect(tooltip).toBeInTheDocument();
      fireEvent.mouseLeave(wrapper);
      tooltip = document.getElementById("tooltip-content");
      expect(tooltip).not.toBeInTheDocument();
    });
  });

  describe("복합 시나리오", () => {
    it("tooltip과 children이 모두 정상 작동해야 한다", () => {
      render(
        <Tooltip tooltip="클릭하세요">
          <button onClick={() => {}}>액션 버튼</button>
        </Tooltip>,
      );

      const wrapper = document.getElementById("tooltip-wrapper") as HTMLElement;
      const button = screen.getByRole("button", { name: "액션 버튼" });

      // 버튼 클릭 가능
      expect(button).toBeInTheDocument();

      // getBoundingClientRect mock
      jest.spyOn(wrapper, "getBoundingClientRect").mockReturnValue({
        x: 100,
        y: 100,
        width: 200,
        height: 50,
        top: 100,
        right: 300,
        bottom: 150,
        left: 100,
        toJSON: () => ({}),
      } as DOMRect);

      // hover 시 tooltip 표시
      fireEvent.mouseEnter(wrapper);
      let tooltip = document.getElementById("tooltip-content");
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent("클릭하세요");

      // leave 시 tooltip 숨김
      fireEvent.mouseLeave(wrapper);
      tooltip = document.getElementById("tooltip-content");
      expect(tooltip).not.toBeInTheDocument();
    });
  });
});
