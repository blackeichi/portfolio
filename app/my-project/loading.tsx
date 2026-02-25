export default function MyProjectLoading() {
  return (
    <div className="flex p-6 w-full h-fit justify-center">
      <div className="max-w-200 w-full flex flex-col gap-4 animate-pulse">
        {/* Header: Icon + Title */}
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded" />
          <div className="h-8 w-48 bg-gray-300 rounded" />
        </div>

        {/* Description Text + Button */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-64 bg-gray-200 rounded" />
          <div className="w-8 h-8 bg-gray-200 rounded" />
        </div>

        {/* Function Description */}
        <div className="my-5 space-y-3">
          <div className="h-5 w-48 bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-11/12 bg-gray-200 rounded" />
            <div className="h-4 w-10/12 bg-gray-200 rounded" />
          </div>
          <div className="space-y-2 pl-6">
            <div className="h-3 w-5/6 bg-gray-200 rounded" />
            <div className="h-3 w-4/6 bg-gray-200 rounded" />
            <div className="h-3 w-3/6 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Stack Component */}
        <div className="space-y-4">
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Frontend */}
            <div className="border-3 border-gray-300 bg-gray-50 p-4 space-y-3">
              <div className="h-5 w-24 bg-gray-200 rounded" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-200 rounded" />
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="border-3 border-gray-300 bg-gray-50 p-4 space-y-3">
              <div className="h-5 w-24 bg-gray-200 rounded" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-200 rounded" />
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
