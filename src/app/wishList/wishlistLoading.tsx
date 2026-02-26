export function WishlistSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-4 w-full">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 bg-gray-200 rounded-xl p-4">
          <div className="w-16 h-16 bg-gray-300 rounded-md" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-300 rounded w-1/2" />
          </div>
          <div className="w-24 h-10 bg-gray-300 rounded-md" />
        </div>
      ))}
    </div>
  );
}