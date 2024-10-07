export function CardItemSkeleton() {
  return (
    <div className="p-4 w-full mx-auto">
      <div className="animate-pulse flex flex-col justify-center">
        <div className="bg-slate-700 h-72 w-full rounded-t-lg"></div>
        <div className="flex-1 justify-center items-center space-y-6 py-1 shadow-sm p-5 bg-white size-full rounded-b-lg">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4 h-16 justify-center items-center">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
