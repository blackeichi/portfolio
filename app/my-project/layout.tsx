import MyProjectTemplate from "@/components/template/myProjectTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "사이드 프로젝트",
};

export default function MyProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MyProjectTemplate>{children}</MyProjectTemplate>;
}
