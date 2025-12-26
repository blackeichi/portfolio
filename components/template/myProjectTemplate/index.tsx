import { ContentBox } from "@/components/atoms/contentBox";
import { ContentsList } from "./contentsList";
import { ShowProjectBtn } from "./showProjectBtn";

export default function MyProjectTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <ShowProjectBtn />
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
