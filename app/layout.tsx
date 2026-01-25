import type { Metadata } from "next";
import { notoSans } from "@/libs/uitls/fonts";
import { COLOR_THEME } from "@/libs/uitls/constants";
import SnackbarProvider from "@/libs/snackbarProvider";
import { SnackbarComponent } from "@/components/organisms/snackbarComponent";
import { RootTemplate } from "@/components/template/rootTemplate";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s - 정우의 포트폴리오",
    default: "정우의 포트폴리오",
  }  ,
  description: "정우님의 포트폴리오 사이트입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.className} antialiased h-screen w-screen text-stone-800`}
        style={{
          backgroundColor: COLOR_THEME.bgGreen,
        }}
        suppressHydrationWarning
      >
        <SnackbarProvider>
          <SnackbarComponent />
          <RootTemplate>{children}</RootTemplate>
        </SnackbarProvider>
      </body>
    </html>
  );
}
