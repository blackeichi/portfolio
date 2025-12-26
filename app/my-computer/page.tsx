import { ContentBox } from "@/components/atoms/contentBox";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Computer",
};

export default function MyComputerPage() {
  return <ContentBox>My Computer Page</ContentBox>;
}
