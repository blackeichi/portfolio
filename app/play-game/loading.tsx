import { COLOR_THEME } from "@/libs/utils/constants";

export default function PlayGameLoading() {
  return (
    <div
      className="w-full h-full flex justify-center overflow-hidden py-[1%]"
      style={{
        backgroundColor: COLOR_THEME.green,
      }}
    >
      <div className="w-full h-full flex justify-center items-center overflow-hidden">
        <div className="bg-white overflow-hidden relative w-[90vh] h-[90vh] max-w-full max-h-full animate-pulse">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              {/* Title skeleton */}
              <div className="h-12 w-64 bg-gray-300 rounded mx-auto" />

              {/* Menu items skeleton */}
              <div className="space-y-3 pt-8">
                <div className="flex items-center gap-4 justify-center">
                  <div className="w-12 h-12 bg-gray-200 rounded" />
                  <div className="h-10 w-40 bg-gray-200 rounded" />
                </div>
                <div className="flex items-center gap-4 justify-center">
                  <div className="w-12 h-12 bg-gray-200 rounded" />
                  <div className="h-10 w-40 bg-gray-200 rounded" />
                </div>
                <div className="flex items-center gap-4 justify-center">
                  <div className="w-12 h-12 bg-gray-200 rounded" />
                  <div className="h-10 w-40 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
