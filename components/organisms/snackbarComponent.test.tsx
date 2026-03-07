import { render, screen } from "@testing-library/react";
import { SnackbarComponent } from "./snackbarComponent";
import { useSnackbar } from "notistack";
import { useAtom } from "jotai";

// notistack mock
jest.mock("notistack", () => ({
  useSnackbar: jest.fn(),
}));

// jotai mock
jest.mock("jotai", () => ({
  useAtom: jest.fn(),
  atom: jest.fn((value) => ({ init: value })),
}));

// atoms mock
jest.mock("@/libs/atom", () => ({
  alertMsgState: { init: null },
  confirmMsgState: { init: null },
  errorMsgState: { init: null },
}));

describe("SnackbarComponent", () => {
  const mockEnqueueSnackbar = jest.fn();
  const mockCloseSnackbar = jest.fn();
  let mockAlertMsgState: [string | null, jest.Mock];
  let mockErrorMsgState: [string | null, jest.Mock];
  let mockConfirmMsgState: [
    {
      title: string;
      message: string;
      confirmEvent: () => void;
      cancelEvent?: () => void;
    } | null,
    jest.Mock,
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    (useSnackbar as jest.Mock).mockReturnValue({
      enqueueSnackbar: mockEnqueueSnackbar,
      closeSnackbar: mockCloseSnackbar,
    });

    mockAlertMsgState = [null, jest.fn()];
    mockErrorMsgState = [null, jest.fn()];
    mockConfirmMsgState = [null, jest.fn()];

    (useAtom as jest.Mock)
      .mockReturnValueOnce(mockErrorMsgState)
      .mockReturnValueOnce(mockAlertMsgState)
      .mockReturnValueOnce(mockConfirmMsgState);
  });

  describe("초기 렌더링", () => {
    it("UI(Overlay)가 렌더링되지 않아야 한다", () => {
      const { container } = render(<SnackbarComponent />);
      expect(container).toBeInTheDocument();
      const overlay = container.querySelector("#overlay-background");
      expect(overlay).not.toBeInTheDocument();
    });
  });

  describe("alert 메시지", () => {
    it("alertMsg가 설정되면 스낵바를 표시해야 한다", () => {
      mockAlertMsgState[0] = "알림 메시지";

      (useAtom as jest.Mock)
        .mockReturnValueOnce(mockErrorMsgState)
        .mockReturnValueOnce(mockAlertMsgState)
        .mockReturnValueOnce(mockConfirmMsgState);

      render(<SnackbarComponent />);

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith(
        "알림 메시지",
        expect.objectContaining({
          variant: "info",
        }),
      );
      expect(mockAlertMsgState[1]).toHaveBeenCalledWith(null);
    });
  });

  describe("error 메시지", () => {
    it("errorMsg가 설정되면 에러 스낵바를 표시해야 한다", () => {
      mockErrorMsgState[0] = "에러 메시지";

      (useAtom as jest.Mock)
        .mockReturnValueOnce(mockErrorMsgState)
        .mockReturnValueOnce(mockAlertMsgState)
        .mockReturnValueOnce(mockConfirmMsgState);

      render(<SnackbarComponent />);

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith(
        "에러 메시지",
        expect.objectContaining({
          variant: "error",
        }),
      );
      expect(mockErrorMsgState[1]).toHaveBeenCalledWith(null);
    });
  });

  describe("confirm 다이얼로그", () => {
    it("confirmMsg가 설정되면 오버레이와 다이얼로그를 표시해야 한다", () => {
      mockConfirmMsgState[0] = {
        title: "확인",
        message: "계속하시겠습니까?",
        confirmEvent: jest.fn(),
      };

      (useAtom as jest.Mock)
        .mockReturnValueOnce(mockErrorMsgState)
        .mockReturnValueOnce(mockAlertMsgState)
        .mockReturnValueOnce(mockConfirmMsgState);

      const { container } = render(<SnackbarComponent />);

      const overlay = container.querySelector("#overlay-background");
      expect(overlay).toBeInTheDocument();
      expect(screen.getByText("확인")).toBeInTheDocument();
      expect(screen.getByText("계속하시겠습니까?")).toBeInTheDocument();
    });
  });
});
