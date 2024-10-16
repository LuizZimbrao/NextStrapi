export function ProductDetailsSkeleton() {
  return (
    <div className="p-4 w-full mx-auto">
      <div className="animate-pulse flex justify-end items-center">
        <div className="bg-slate-700 h-96 w-2/5 rounded-lg"></div>
        <div className="w-3/5 justify-center items-center space-y-6 py-1 p-5 size-full">
          <div className="flex flex-col gap-4 h-16 justify-end items-end">
            <div className="h-4 w-full max-w-44 bg-slate-700 rounded"></div>
            <div className="h-4 w-full max-w-44 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
