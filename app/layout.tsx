import type { Metadata } from "next";
import { COLOR_THEME } from "@/libs/utils/constants";
import SnackbarProvider from "@/libs/snackbarProvider";
import { SnackbarComponent } from "@/components/organisms/snackbarComponent";
import { RootTemplate } from "@/components/template/rootTemplate";
import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";

export const metadata: Metadata = {
  title: {
    template: "%s - 정우의 포트폴리오",
    default: "정우의 포트폴리오",
  },
  description: "정우님의 포트폴리오 사이트입니다.",
};

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
});

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
