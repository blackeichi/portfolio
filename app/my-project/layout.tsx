import MyProjectTemplate from "@/components/template/myProjectTemplate";

export default function MyProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MyProjectTemplate>{children}</MyProjectTemplate>;
}
