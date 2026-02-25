import { SectorSkeleton } from "./_ui/sectorSkeleton";

export default function ResumeLoading() {
  return (
    <div className="flex flex-col gap-10 p-2 w-full">
      {Array.from({ length: 6 }).map((_, index) => (
        <SectorSkeleton key={index} />
      ))}
    </div>
  );
}
