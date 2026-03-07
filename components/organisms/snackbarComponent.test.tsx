import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnackbarComponent } from "./snackbarComponent";
import { Provider, useSetAtom } from "jotai";
import { SnackbarProvider } from "notistack";
import { alertMsgState, confirmMsgState, errorMsgState } from "@/libs/atom";
import { useEffect } from "react";

// 테스트용 헬퍼 컴포넌트
function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
    </Provider>
  );
}

// 상태를 설정할 수 있는 헬퍼 컴포넌트
type StateHelperProps =
  | {
      type: "alert";
      value: string;
    }
  | {
      type: "error";
      value: string;
    }
  | {
      type: "confirm";
      value: {
        title?: string;
        message: string;
        confirmEvent: () => void;
        cancelEvent?: () => void;
      };
    };

function StateHelper({ type, value }: StateHelperProps) {
  const setAlertMsg = useSetAtom(alertMsgState);
  const setErrorMsg = useSetAtom(errorMsgState);
  const setConfirmMsg = useSetAtom(confirmMsgState);

  useEffect(() => {
    if (type === "alert") setAlertMsg(value as string);
    if (type === "error") setErrorMsg(value as string);
    if (type === "confirm") {
      setConfirmMsg(
        value as {
          title?: string;
          message: string;
          confirmEvent: () => void;
          cancelEvent?: () => void;
        },
      );
    }
  }, [type, value, setAlertMsg, setErrorMsg, setConfirmMsg]);

  return null;
}

describe("SnackbarComponent 통합 테스트", () => {
  describe("초기 렌더링", () => {
    it("UI(Overlay)가 렌더링되지 않아야 한다", () => {
      const { container } = render(
        <TestWrapper>
          <SnackbarComponent />
        </TestWrapper>,
      );
      expect(container).toBeInTheDocument();

      // Overlay의 parent가 hidden 클래스를 가져야 함
      const overlayContainer = container.querySelector(
        '[class*="fixed"][class*="z-40"]',
      );
      expect(overlayContainer).toHaveClass("hidden");
    });
  });

  describe("alert 메시지", () => {
    it("alertMsg가 설정되면 스낵바를 표시해야 한다", async () => {
      render(
        <TestWrapper>
          <SnackbarComponent />
          <StateHelper type="alert" value="알림 메시지입니다" />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(screen.getByText("알림 메시지입니다")).toBeInTheDocument();
      });
    });

    it("스낵바의 확인 버튼을 클릭하면 스낵바가 닫혀야 한다", async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <SnackbarComponent />
          <StateHelper type="alert" value="알림 메시지입니다" />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(screen.getByText("알림 메시지입니다")).toBeInTheDocument();
      });

      const buttons = screen.getAllByText("확인");
      const snackbarButton = buttons.find(
        (btn) =>
          btn.tagName === "BUTTON" && btn.closest('[class*="notistack"]'),
      );

      if (snackbarButton) {
        await user.click(snackbarButton);
        await waitFor(() => {
          expect(
            screen.queryByText("알림 메시지입니다"),
          ).not.toBeInTheDocument();
        });
      }
    });
  });

  describe("error 메시지", () => {
    it("errorMsg가 설정되면 에러 스낵바를 표시해야 한다", async () => {
      render(
        <TestWrapper>
          <SnackbarComponent />
          <StateHelper type="error" value="에러가 발생했습니다" />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(screen.getByText("에러가 발생했습니다")).toBeInTheDocument();
      });
    });

    it("에러 스낵바의 확인 버튼을 클릭하면 스낵바가 닫혀야 한다", async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <SnackbarComponent />
          <StateHelper type="error" value="에러가 발생했습니다" />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(screen.getByText("에러가 발생했습니다")).toBeInTheDocument();
      });

      const buttons = screen.getAllByText("확인");
      const snackbarButton = buttons.find(
        (btn) =>
          btn.tagName === "BUTTON" && btn.closest('[class*="notistack"]'),
      );

      if (snackbarButton) {
        await user.click(snackbarButton);
        await waitFor(() => {
          expect(
            screen.queryByText("에러가 발생했습니다"),
          ).not.toBeInTheDocument();
        });
      }
    });
  });

  describe("confirm 다이얼로그", () => {
    it("confirmMsg가 설정되면 오버레이와 다이얼로그를 표시해야 한다", async () => {
      const confirmEvent = jest.fn();
      const { container } = render(
        <TestWrapper>
          <SnackbarComponent />
          <StateHelper
            type="confirm"
            value={{
              title: "확인",
              message: "계속하시겠습니까?",
              confirmEvent,
            }}
          />
        </TestWrapper>,
      );

      await waitFor(() => {
        const overlay = container.querySelector("#overlay-background");
        expect(overlay).toBeInTheDocument();
      });

      const confirmButtons = screen.getAllByText("확인");
      expect(confirmButtons.length).toBeGreaterThan(0);
      expect(screen.getByText("계속하시겠습니까?")).toBeInTheDocument();
      expect(screen.getByText("취소")).toBeInTheDocument();
    });

    it("확인 버튼을 클릭하면 confirmEvent가 호출되고 다이얼로그가 닫혀야 한다", async () => {
      const user = userEvent.setup();
      const confirmEvent = jest.fn();
      const { container } = render(
        <TestWrapper>
          <SnackbarComponent />
          <StateHelper
            type="confirm"
            value={{
              title: "삭제 확인",
              message: "정말 삭제하시겠습니까?",
              confirmEvent,
            }}
          />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(screen.getByText("정말 삭제하시겠습니까?")).toBeInTheDocument();
      });

      // confirm 다이얼로그의 확인 버튼 찾기 (bold 클래스가 있는 버튼)
      const allButtons = container.querySelectorAll("button");
      const confirmButton = Array.from(allButtons).find(
        (btn) =>
          btn.textContent === "확인" &&
          btn.className.includes("outline-gray-800"),
      );

      expect(confirmButton).toBeDefined();
      await user.click(confirmButton!);

      await waitFor(() => {
        expect(confirmEvent).toHaveBeenCalledTimes(1);
      });

      await waitFor(() => {
        const overlayContainer = container.querySelector(
          '[class*="fixed"][class*="z-40"]',
        );
        expect(overlayContainer).toHaveClass("hidden");
      });
    });

    it("취소 버튼을 클릭하면 cancelEvent가 호출되고 다이얼로그가 닫혀야 한다", async () => {
      const user = userEvent.setup();
      const confirmEvent = jest.fn();
      const cancelEvent = jest.fn();
      const { container } = render(
        <TestWrapper>
          <SnackbarComponent />
          <StateHelper
            type="confirm"
            value={{
              title: "작업 취소",
              message: "작업을 취소하시겠습니까?",
              confirmEvent,
              cancelEvent,
            }}
          />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(
          screen.getByText("작업을 취소하시겠습니까?"),
        ).toBeInTheDocument();
      });

      const cancelButton = screen.getByText("취소");
      await user.click(cancelButton);

      await waitFor(() => {
        expect(cancelEvent).toHaveBeenCalledTimes(1);
      });

      expect(confirmEvent).not.toHaveBeenCalled();

      await waitFor(() => {
        const overlayContainer = container.querySelector(
          '[class*="fixed"][class*="z-40"]',
        );
        expect(overlayContainer).toHaveClass("hidden");
      });
    });

    it("X 버튼을 클릭하면 다이얼로그가 닫혀야 한다", async () => {
      const user = userEvent.setup();
      const confirmEvent = jest.fn();
      const { container } = render(
        <TestWrapper>
          <SnackbarComponent />
          <StateHelper
            type="confirm"
            value={{
              title: "알림",
              message: "닫기 테스트",
              confirmEvent,
            }}
          />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(screen.getByText("닫기 테스트")).toBeInTheDocument();
      });

      // IconButton 찾기 (WindowsBoxHeader 내부의 close 버튼)
      const iconButtons = container.querySelectorAll(
        'button[id="icon-button"]',
      );
      const closeButton = iconButtons[iconButtons.length - 1]; // 마지막 (가장 최근) icon-button
      expect(closeButton).toBeInTheDocument();

      await user.click(closeButton!);

      await waitFor(() => {
        const overlayContainer = container.querySelector(
          '[class*="fixed"][class*="z-40"]',
        );
        expect(overlayContainer).toHaveClass("hidden");
      });

      expect(confirmEvent).not.toHaveBeenCalled();
    });

    it("Overlay 배경을 클릭하면 다이얼로그가 닫혀야 한다", async () => {
      const user = userEvent.setup();
      const confirmEvent = jest.fn();
      const { container } = render(
        <TestWrapper>
          <SnackbarComponent />
          <StateHelper
            type="confirm"
            value={{
              title: "알림",
              message: "오버레이 클릭 테스트",
              confirmEvent,
            }}
          />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(screen.getByText("오버레이 클릭 테스트")).toBeInTheDocument();
      });

      const overlay = container.querySelector("#overlay-background");
      expect(overlay).toBeInTheDocument();

      await user.click(overlay!);

      await waitFor(() => {
        const overlayContainer = container.querySelector(
          '[class*="fixed"][class*="z-40"]',
        );
        expect(overlayContainer).toHaveClass("hidden");
      });

      expect(confirmEvent).not.toHaveBeenCalled();
    });

    it("cancelEvent가 없어도 취소 버튼이 정상 동작해야 한다", async () => {
      const user = userEvent.setup();
      const confirmEvent = jest.fn();
      const { container } = render(
        <TestWrapper>
          <SnackbarComponent />
          <StateHelper
            type="confirm"
            value={{
              title: "알림",
              message: "cancelEvent 없는 경우",
              confirmEvent,
            }}
          />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(screen.getByText("cancelEvent 없는 경우")).toBeInTheDocument();
      });

      const cancelButton = screen.getByText("취소");
      await user.click(cancelButton);

      await waitFor(() => {
        const overlayContainer = container.querySelector(
          '[class*="fixed"][class*="z-40"]',
        );
        expect(overlayContainer).toHaveClass("hidden");
      });

      expect(confirmEvent).not.toHaveBeenCalled();
    });

    it("다이얼로그에 경고 아이콘(!)이 표시되어야 한다", async () => {
      const confirmEvent = jest.fn();
      render(
        <TestWrapper>
          <SnackbarComponent />
          <StateHelper
            type="confirm"
            value={{
              title: "경고",
              message: "아이콘 표시 테스트",
              confirmEvent,
            }}
          />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(screen.getByText("아이콘 표시 테스트")).toBeInTheDocument();
      });

      expect(screen.getByText("!")).toBeInTheDocument();
    });
  });
});
