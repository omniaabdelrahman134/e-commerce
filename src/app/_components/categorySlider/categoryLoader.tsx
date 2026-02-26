
export function CategorySliderSkeleton() {
  return (
    <section className="container mx-auto px-4 mt-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse aspect-square rounded-2xl bg-gray-200"
          />
        ))}
      </div>
    </section>
  );
}

export function CategorySliderSkeletonOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 animate-pulse rounded-2xl bg-gray-200"
        />
      ))}
    </div>
  );
}