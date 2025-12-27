import { ContentBox } from "@/components/atoms/contentBox";
import { ContentsList } from "./contentsList";
import { TopContents } from "./topContents";

export default function MyProjectTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <TopContents />
      <div className="flex-1 flex gap-4 overflow-hidden">
        <ContentBox
          style={{
            maxWidth: "200px",
          }}
        >
          <ContentsList />
        </ContentBox>
        <ContentBox>{children}</ContentBox>
      </div>
    </div>
  );
}
