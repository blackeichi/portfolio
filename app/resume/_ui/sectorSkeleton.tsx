export const SectorSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full animate-pulse">
      {/* Title Skeleton */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-gray-300 rounded" />
        <div className="h-6 w-32 bg-gray-300 rounded" />
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* Content Skeleton */}
      <div className="pl-4 space-y-3">
        {/* Heading */}
        <div className="h-5 w-48 bg-gray-200 rounded" />

        {/* Paragraphs */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-11/12 bg-gray-200 rounded" />
          <div className="h-4 w-10/12 bg-gray-200 rounded" />
        </div>

        {/* List items */}
        <div className="space-y-2 pl-6">
          <div className="h-3 w-5/6 bg-gray-200 rounded" />
          <div className="h-3 w-4/6 bg-gray-200 rounded" />
          <div className="h-3 w-3/6 bg-gray-200 rounded" />
        </div>

        {/* More paragraphs */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-9/12 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};
