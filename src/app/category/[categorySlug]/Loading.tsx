import React from "react";

const Loading = () => {
  return (
    <main className="min-h-screen bg-[#F3F8F4] px-4 py-8 md:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Category Header Skeleton */}
        <div className="mb-7 flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm">
          <div className="h-14 w-14 animate-pulse rounded-xl bg-gray-200" />

          <div>
            <div className="h-7 w-40 animate-pulse rounded-lg bg-gray-200" />

            <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        {/* Sort Skeleton */}
        <div className="mb-5 flex justify-end">
          <div className="h-10 w-48 animate-pulse rounded-xl bg-gray-200" />
        </div>

        {/* Product Skeletons */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="h-[180px] animate-pulse rounded-2xl border border-gray-200 bg-white p-5"
            >
              {/* Product image + name */}
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-xl bg-gray-200" />

                <div className="flex-1">
                  <div className="h-5 w-3/4 rounded bg-gray-200" />
                  <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
                </div>
              </div>

              {/* Price */}
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <div className="h-4 w-20 rounded bg-gray-200" />
                  <div className="mt-2 h-7 w-24 rounded bg-gray-200" />
                </div>

                <div className="h-8 w-16 rounded-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
};

export default Loading;