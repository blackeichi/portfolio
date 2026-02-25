export default function ProjectPageLoading() {
  return (
    <div className="text-xs sm:text-sm leading-relaxed w-full h-fit p-6 justify-center flex box-border">
      <div className="w-full max-w-200 space-y-4 animate-pulse">
        {/* Title */}
        <div className="h-6 w-48 bg-gray-300 rounded" />

        {/* Paragraphs */}
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-11/12 bg-gray-200 rounded" />
            <div className="h-4 w-10/12 bg-gray-200 rounded" />
          </div>

          <div className="h-5 w-40 bg-gray-200 rounded" />

          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-9/12 bg-gray-200 rounded" />
          </div>

          {/* List items */}
          <div className="space-y-2 pl-6">
            <div className="h-3 w-5/6 bg-gray-200 rounded" />
            <div className="h-3 w-4/6 bg-gray-200 rounded" />
            <div className="h-3 w-5/6 bg-gray-200 rounded" />
            <div className="h-3 w-3/6 bg-gray-200 rounded" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-10/12 bg-gray-200 rounded" />
            <div className="h-4 w-11/12 bg-gray-200 rounded" />
          </div>

          <div className="h-5 w-40 bg-gray-200 rounded" />

          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-9/12 bg-gray-200 rounded" />
            <div className="h-4 w-8/12 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
