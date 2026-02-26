export default function BrandsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="text-center mb-12">
        <div className="h-10 w-60 bg-gray-200 rounded mx-auto animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center"
          >
            <div className="w-28 h-28 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3"></div>
            <div className="h-8 w-28 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}