import { ContentBox } from "@/components/atoms/contentBox";

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full h-full flex gap-4">
      <ContentBox
        style={{
          maxWidth: "200px",
        }}
      >
        here is listbar
      </ContentBox>
      <ContentBox>{children}</ContentBox>
    </main>
  );
}
