import SortProducts from "@/components/SortProducts";
import Link from "next/link";
import React from "react";

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface CategoryProductsProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

const getCategoryProducts = async (
  categorySlug: string
): Promise<IProduct[]> => {
  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${categorySlug}`,
    {
      cache: "no-store",
    }
  );

  // if (!res.ok) {
  //   throw new Error("Failed to fetch products");
  // }

  const data = await res.json();

  return data;
};

const CategoryProducts = async ({
  params,
}: CategoryProductsProps) => {
  const { categorySlug } = await params;

  const categoryProducts =
    await getCategoryProducts(categorySlug);

  // Empty / invalid category
  if (!categoryProducts || categoryProducts.length === 0) {
    return (
      <main className="min-h-screen bg-[#F3F8F4] px-4 py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            কোনো পণ্য পাওয়া যায়নি
          </h1>

          <p className="mt-3 text-gray-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
          </p>

          <Link
            href="/"
            className="mt-6 rounded-xl bg-[#05893E] px-6 py-3 font-semibold text-white transition hover:bg-[#047A37]"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const categoryName =
    categoryProducts[0].categoryNameBn;

  const categoryIcon =
    categoryProducts[0].categoryIcon;

  return (
    <main className="min-h-screen bg-[#F3F8F4] px-4 py-8 md:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Category Header */}
        <div className="mb-7 flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F1F7F3]">
            <span className="text-3xl">
              {categoryIcon}
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {categoryName}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {categoryProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* Product Count */}
        {/* <div className="mb-2 flex items-center justify-between">
          <p className="text-sm text-gray-600 md:text-base">
            মোট {categoryProducts.length}টি পণ্য দেখানো হচ্ছে
          </p>
        </div> */}

        {/* Products + Sorting */}
        <SortProducts products={categoryProducts} />

      </div>
    </main>
  );
};

export default CategoryProducts;