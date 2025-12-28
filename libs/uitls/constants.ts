export const COLOR_THEME = {
  bgGreen: "#68888A",
  green: "#008080",
  blue: "#1C398E",
  // blue: "#3C64B1",
  red: "#FB0000",
  lightGray: "#F3F4F6",
  gray: "#D1D5DC",
  darkGray: "#6A7282",
  yellow: "#FFFF05",
};

export const FOOTER_ELEMENT = "windows_footer";

export const MENU_LIST_DATA: {
  [key: string]: {
    title: string;
    icon: string;
    function?: () => void;
    confirmMsg?: string;
  };
} = {
  "my-computer": {
    title: "내 컴퓨터",
    icon: "/images/myComputer.png",
  },
  "my-project": {
    title: "Project",
    icon: "/images/shell_window.png",
  },
  "play-game": {
    title: "Game",
    icon: "/images/joystick.png",
  },
  "full-screen": {
    title: "전체 화면",
    icon: "/images/shell_window_monitor.png",
    function:
      typeof document !== "undefined"
        ? document.fullscreenElement
          ? () => document.exitFullscreen()
          : () => document.documentElement.requestFullscreen()
        : () => console.error("no document"),
    confirmMsg: "전체 화면 모드를 실행하시겠습니까?",
  },
};

export const MENU_LIST = Object.entries(MENU_LIST_DATA).map(
  ([key, { title, icon, function: fn, confirmMsg }]) => ({
    name: title,
    icon,
    href: `/${key}`,
    function: fn,
    confirmMsg,
  })
);

export const SUB_WINDOW_LIST = {
  embed_project: {
    key: "embed_project",
    title: "프로젝트 미리보기",
    icon: "/images/daily-log-icon.png",
  },
} as const;

export const DEFAULT_WINDOW_BOX = {
  windowX: typeof window === "undefined" ? 0 : window.innerWidth / 2 - 250,
  windowY: typeof window === "undefined" ? 0 : window.innerHeight / 2 - 200,
  windowWidth: 500,
  windowHeight: 400,
};

export const DEFAULT_SUB_WINDOW_BOX = {
  x: DEFAULT_WINDOW_BOX.windowX + 50,
  y: DEFAULT_WINDOW_BOX.windowY + 50,
  width: DEFAULT_WINDOW_BOX.windowWidth,
  height: DEFAULT_WINDOW_BOX.windowHeight,
};
