import { MyInfoTemplate } from "@/components/template/myInfoTemplate";

export default function MyInfoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MyInfoTemplate>{children}</MyInfoTemplate>;
}
