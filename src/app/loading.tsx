import React from "react";

const Loading = () => {
  return (
    <main className="min-h-screen bg-[#F1F7F3] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Banner Skeleton */}
        <div className="mb-8 flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-3xl bg-white p-6 shadow-sm sm:p-8 lg:flex-row lg:p-12">
          
          {/* Banner Text */}
          <div className="w-full animate-pulse lg:w-1/2">
            <div className="h-9 w-48 rounded-full bg-gray-200" />

            <div className="mt-5 h-10 w-full max-w-xl rounded-lg bg-gray-200 sm:h-12" />

            <div className="mt-4 h-5 w-full max-w-xl rounded bg-gray-200" />
            <div className="mt-2 h-5 w-5/6 max-w-xl rounded bg-gray-200" />
            <div className="mt-2 h-5 w-4/6 max-w-xl rounded bg-gray-200" />

            <div className="mt-7 h-12 w-36 rounded-xl bg-gray-200" />
          </div>

          {/* Banner Image */}
          <div className="mt-8 flex w-full justify-center lg:mt-0 lg:w-1/2">
            <div className="h-64 w-64 animate-pulse rounded-3xl bg-gray-200 sm:h-72 sm:w-72 lg:h-80 lg:w-80" />
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-5 animate-pulse">
          <div className="h-8 w-64 rounded-lg bg-gray-200" />
          <div className="mt-2 h-4 w-80 rounded bg-gray-200" />
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="h-[180px] animate-pulse rounded-2xl border border-gray-200 bg-white p-5"
            >
              {/* Product Image + Name */}
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-200" />

                <div className="flex-1">
                  <div className="h-5 w-3/4 rounded bg-gray-200" />
                  <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
                </div>
              </div>

              {/* Price + Change */}
              <div className="mt-6 flex items-end justify-between gap-3">
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