import { Metadata } from "next";
import { sectors } from "./utils";
import { Sector } from "./_ui/sector";

export const metadata: Metadata = {
  title: "My Info",
};

export default function MyInfoPage() {
  return (
    <div className="flex flex-col gap-10 p-2 w-full">
      {sectors.map((sector) => (
        <Sector key={sector.id} sector={sector} />
      ))}
    </div>
  );
}
