export const COLOR_THEME = {
  bgGreen: "#68888A",
  green: "#008080",
  blue: "#1C398E",
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
  };
} = {
  "/my-computer": {
    title: "내 컴퓨터",
    icon: "/images/myComputer.png",
  },
};

export const MENU_LIST = Object.entries(MENU_LIST_DATA).map(
  ([key, { title, icon }]) => ({
    name: title,
    href: key,
    icon,
  })
);
