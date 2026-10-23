"use client";

import Link from "next/link";
import React, { useState } from "react";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface SortProductsProps {
  products: Product[];
}

const SortProducts = ({ products }: SortProductsProps) => {
  const [sort, setSort] = useState("default");

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") {
      return a.today - b.today;
    }

    if (sort === "high") {
      return b.today - a.today;
    }

    return a.id - b.id;
  });

  return (
    <>
      {/* Product Count + Sort */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Product Count */}
        <p className="text-sm text-gray-600 md:text-base">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
        </p>

        {/* Sort Control */}
        <div className="flex items-center justify-end gap-2">
          <label
            htmlFor="sort"
            className="shrink-0 text-sm font-medium text-gray-600"
          >
            সাজান
          </label>

          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:border-[#05893E] focus:ring-1 focus:ring-[#05893E]"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="block"
          >
            <div className="h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#B8DCC4] hover:shadow-md">
              {/* Product Header */}
              <div className="flex items-center gap-3">
                {/* Product Image */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F1F7F3]">
                  <span className="text-3xl">{product.image}</span>
                </div>

                {/* Product Name */}
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-bold text-gray-900">
                    {product.nameBn}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    প্রতি{" "}
                    {product.unit === "kg"
                      ? "কেজি"
                      : product.unit}
                  </p>
                </div>
              </div>

              {/* Price + Change */}
              <div className="mt-6 flex items-end justify-between gap-3">
                {/* Price */}
                <div>
                  <p className="text-sm text-gray-500">
                    আজকের দাম
                  </p>

                  <div className="mt-1">
                    <span className="text-2xl font-bold text-gray-900">
                      ৳{product.today.toLocaleString("bn-BD")}
                    </span>

                    <span className="ml-1 text-sm text-gray-500">
                      /
                      {product.unit === "kg"
                        ? "কেজি"
                        : product.unit}
                    </span>
                  </div>
                </div>

                {/* Price Increased */}
                {product.change.dir === "up" && (
                  <span className="shrink-0 rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
                    <span className="text-green-600">
                      ▲
                    </span>{" "}
                    {product.change.pct.toLocaleString("bn-BD")}%
                  </span>
                )}

                {/* Price Decreased */}
                {product.change.dir === "down" && (
                  <span className="shrink-0 rounded-full bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700">
                    <span className="text-red-600">
                      ▼
                    </span>{" "}
                    {Math.abs(product.change.pct).toLocaleString(
                      "bn-BD"
                    )}
                    %
                  </span>
                )}

                {/* Price Unchanged */}
                {product.change.dir === "flat" && (
                  <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-500">
                    — ০%
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SortProducts;