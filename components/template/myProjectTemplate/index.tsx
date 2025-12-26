import { ContentBox } from "@/components/atoms/contentBox";
import { ContentsList } from "./contentsList";

export default function MyProjectTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex gap-4 overflow-hidden">
      <ContentBox
        style={{
          maxWidth: "200px",
        }}
      >
        <ContentsList />
      </ContentBox>
      <ContentBox>{children}</ContentBox>
    </div>
  );
}
