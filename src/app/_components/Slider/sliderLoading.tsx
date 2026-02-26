export function SliderSkeleton() {
  return (
    <div className="container mx-auto px-4 mt-8">
      <div className="animate-pulse rounded-2xl bg-gray-200 aspect-[16/7]" />
    </div>
  );
}

export function SliderSkeletonMain() {
  return (
    <div className="absolute inset-0 z-10 animate-pulse bg-gray-200" />
  );
}