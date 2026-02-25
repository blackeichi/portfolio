"use client";

import { IoIosCloseCircle, IoMdAlert } from "react-icons/io";
import { SnackbarProvider as Provider } from "notistack";
import { COLOR_THEME } from "./utils/constants";

export default function SnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider
      maxSnack={4}
      iconVariant={{
        info: (
          <IoMdAlert size={22} color={COLOR_THEME.green} className="mr-1" />
        ),
        error: (
          <IoIosCloseCircle
            size={22}
            color={COLOR_THEME.red}
            className="mr-1"
          />
        ),
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {children}
    </Provider>
  );
}
