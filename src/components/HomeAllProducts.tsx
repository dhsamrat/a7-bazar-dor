"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface HomeAllProductsProps {
  products: Product[];
}

const HomeAllProducts = ({ products }: HomeAllProductsProps) => {
  const [sort, setSort] = useState("default");

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
    <section id="সব-পণ্য" className="mt-10 scroll-mt-40">
      {/* Heading + Sort */}
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            সব পণ্য
          </h2>

          <p className="mt-1 text-sm text-gray-500 md:text-base">
            মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* Sorting */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="home-sort"
            className="text-sm font-medium text-gray-600"
          >
            সাজান
          </label>

          <select
            id="home-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeAllProducts;
