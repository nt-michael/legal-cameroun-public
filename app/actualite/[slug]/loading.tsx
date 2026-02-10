export default function PostLoading() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Skeleton */}
      <section className="relative py-16 lg:py-24" style={{ background: 'linear-gradient(to bottom right, #041c28, #0a3d4f, #041c28)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link skeleton */}
          <div className="h-5 w-40 bg-white/10 rounded animate-pulse mb-8" />

          {/* Category skeleton */}
          <div className="h-6 w-24 bg-white/10 rounded-full animate-pulse mb-4" />

          {/* Title skeleton */}
          <div className="space-y-3 mb-6">
            <div className="h-10 bg-white/10 rounded animate-pulse" />
            <div className="h-10 bg-white/10 rounded animate-pulse w-3/4" />
          </div>

          {/* Meta skeleton */}
          <div className="flex gap-4">
            <div className="h-8 w-8 bg-white/10 rounded-full animate-pulse" />
            <div className="h-5 w-32 bg-white/10 rounded animate-pulse" />
            <div className="h-5 w-24 bg-white/10 rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* Image Skeleton */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
      </div>

      {/* Content Skeleton */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"
              style={{ width: `${Math.random() * 40 + 60}%` }}
            />
          ))}
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-1/2 mt-8" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i + 10}
              className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"
              style={{ width: `${Math.random() * 40 + 60}%` }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
