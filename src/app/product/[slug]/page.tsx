
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
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
  markets: Market[];
}

interface ProductDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ==========================================
// GET SINGLE PRODUCT
// ==========================================

const getSingleProduct = async (
  slug: string
): Promise<Product | null> => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  const product = products.find(
    (item) => item.slug === slug
  );

  return product || null;
};

// ==========================================
// UNIT CONVERTER
// ==========================================

const getUnit = (unit: string) => {
  switch (unit) {
    case "kg":
      return "কেজি";

    case "liter":
      return "লিটার";

    case "litre":
      return "লিটার";

    case "dozen":
      return "ডজন";

    case "piece":
      return "পিস";

    default:
      return unit;
  }
};

// ==========================================
// PRODUCT DETAILS PAGE
// ==========================================

const ProductDetailsPage = async ({
  params,
}: ProductDetailsPageProps) => {
  // ========================================
  // CHECK LOGIN
  // ========================================

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  // ========================================
  // GET SLUG
  // ========================================

  const { slug } = await params;

  // ========================================
  // GET PRODUCT
  // ========================================

  const product = await getSingleProduct(slug);

  // ========================================
  // PRODUCT NOT FOUND
  // ========================================

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F1F7F3] px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">

            <h1 className="text-3xl font-bold text-gray-900">
              পণ্য পাওয়া যায়নি
            </h1>

            <p className="mt-3 text-gray-500">
              আপনি যে পণ্যটি খুঁজছেন সেটি পাওয়া যায়নি।
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-[#05893E] px-6 py-3 font-semibold text-white transition hover:bg-[#047A37]"
            >
              হোম পেজে ফিরে যান
            </Link>

          </div>
        </div>
      </main>
    );
  }

  // ========================================
  // UNIT
  // ========================================

  const unitName = getUnit(product.unit);

  // ========================================
  // PRICE CALCULATIONS
  // ========================================

  // Lowest price from all markets
  const minimumPrice = Math.min(
    ...product.markets.map(
      (market) => market.min
    )
  );

  // Highest price from all markets
  const maximumPrice = Math.max(
    ...product.markets.map(
      (market) => market.max
    )
  );

  // Get all min/max prices
  const allMarketPrices = product.markets.flatMap(
    (market) => [
      market.min,
      market.max,
    ]
  );

  // Calculate overall average
  const averagePrice =
    allMarketPrices.reduce(
      (total, price) => total + price,
      0
    ) / allMarketPrices.length;

  return (
    <main className="min-h-screen bg-[#F1F7F3] px-4 py-6 md:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* ==========================================
            BREADCRUMB
        ========================================== */}

        <div className="mb-7 flex flex-wrap items-center gap-2 text-sm text-gray-600 md:text-base">

          <Link
            href="/"
            className="transition hover:text-[#05893E]"
          >
            হোম
          </Link>

          <span className="text-gray-400">
            ›
          </span>

          <Link
            href={`/category/${product.category}`}
            className="transition hover:text-[#05893E]"
          >
            {product.categoryNameBn}
          </Link>

          <span className="text-gray-400">
            ›
          </span>

          <span className="text-gray-700">
            {product.nameBn}
          </span>

        </div>

        {/* ==========================================
            TOP PRODUCT CARD
        ========================================== */}

        <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">

          <div className="flex flex-col gap-8 p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">

            {/* LEFT SIDE */}

            <div className="flex items-center gap-5">

              {/* PRODUCT IMAGE */}

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#F1F6F2] md:h-24 md:w-24">

                <span className="text-5xl md:text-6xl">
                  {product.image}
                </span>

              </div>

              {/* PRODUCT INFO */}

              <div>

                <h1 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-base text-gray-500 md:text-lg">
                  প্রতি {unitName}

                  <span className="mx-2 text-gray-300">
                    ·
                  </span>

                  {product.categoryNameBn}
                </p>

                {/* PRICE CHANGE MESSAGE */}

                <p className="mt-2 text-sm text-gray-500 md:text-base">

                  {product.change.dir === "up" && (
                    <>
                      গতকালের তুলনায় আজ দাম{" "}

                      <span className="font-semibold text-red-600">
                        বেড়েছে
                      </span>{" "}

                      {product.change.pct.toLocaleString(
                        "bn-BD"
                      )}
                      %
                    </>
                  )}

                  {product.change.dir === "down" && (
                    <>
                      গতকালের তুলনায় আজ দাম{" "}

                      <span className="font-semibold text-green-600">
                        কমেছে
                      </span>{" "}

                      {Math.abs(
                        product.change.pct
                      ).toLocaleString("bn-BD")}
                      %
                    </>
                  )}

                  {product.change.dir === "flat" && (
                    <>
                      গতকালের তুলনায় আজকের দাম{" "}

                      <span className="font-semibold">
                        অপরিবর্তিত
                      </span>
                    </>
                  )}

                </p>

              </div>

            </div>

            {/* ======================================
                TODAY PRICE
            ====================================== */}

            <div className="min-w-[50px] rounded-xl bg-[#F1F6F2] px-6 py-5 text-left lg:text-right">

              <p className="text-sm text-gray-500">
                আজকের দাম
              </p>

              <div className="mt-1">

                <span className="text-4xl font-bold text-gray-900">
                  {product.today.toLocaleString(
                    "bn-BD"
                  )}
                </span>

              </div>

              <p className="mt-1 text-sm text-gray-500">
                টাকা / {unitName}
              </p>

              {/* CHANGE */}

              <div className="mt-2">

                {product.change.dir === "up" && (
                  <span className="font-semibold text-red-600">
                    ▲{" "}
                    {product.change.pct.toLocaleString(
                      "bn-BD"
                    )}
                    %
                  </span>
                )}

                {product.change.dir === "down" && (
                  <span className="font-semibold text-green-600">
                    ▼{" "}
                    {Math.abs(
                      product.change.pct
                    ).toLocaleString("bn-BD")}
                    %
                  </span>
                )}

                {product.change.dir === "flat" && (
                  <span className="font-semibold text-gray-500">
                    — ০.০%
                  </span>
                )}

              </div>

            </div>

          </div>

        </section>

        {/* ==========================================
            PRICE SUMMARY
        ========================================== */}

        <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            দামের সারসংক্ষেপ
          </h2>

          {/* SUMMARY CARDS */}

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* ======================================
                MINIMUM PRICE
            ====================================== */}

            <div className="rounded-2xl border border-gray-200 p-5">

              <p className="text-sm text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-2 text-3xl font-bold text-[#05893E]">

                {minimumPrice.toLocaleString(
                  "bn-BD"
                )}

                <span className="ml-2 text-base font-medium">
                  টাকা
                </span>

              </p>

              <p className="mt-1 text-sm text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>

            </div>

            {/* ======================================
                MAXIMUM PRICE
            ====================================== */}

            <div className="rounded-2xl border border-gray-200 p-5">

              <p className="text-sm text-gray-500">
                সর্বাধিক দাম
              </p>

              <p className="mt-2 text-3xl font-bold text-red-500">

                {maximumPrice.toLocaleString(
                  "bn-BD"
                )}

                <span className="ml-2 text-base font-medium">
                  টাকা
                </span>

              </p>

              <p className="mt-1 text-sm text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>

            </div>

            {/* ======================================
                AVERAGE PRICE
            ====================================== */}

            <div className="rounded-2xl border border-gray-200 p-5">

              <p className="text-sm text-gray-500">
                গড় দাম
              </p>

              <p className="mt-2 text-3xl font-bold text-[#05893E]">

                {averagePrice.toLocaleString(
                  "bn-BD",
                  {
                    // minimumFractionDigits: 2,
                    maximumFractionDigits: 0,
                  }
                )}

                <span className="ml-2 text-base font-medium">
                  টাকা
                </span>

              </p>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {unitName}-এর হিসাবে
              </p>

            </div>

          </div>

          {/* ==========================================
              MARKET PRICE TITLE
          ========================================== */}

          <div className="mt-10">

            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              বিভিন্ন বাজার অনুযায়ী আজকের দামের তথ্য
            </p>

          </div>

          {/* ==========================================
              MARKET TABLE
          ========================================== */}

          <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[750px] border-collapse text-left">

                {/* TABLE HEADER */}

                <thead>

                  <tr className="border-b border-gray-200 bg-[#F8FAF9]">

                    <th className="px-5 py-4 text-sm font-semibold text-gray-500">
                      বাজার
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-500">
                      বিভাগ
                    </th>

                    <th className="px-5 py-4 text-right text-sm font-semibold text-gray-500">
                      সর্বনিম্ন
                    </th>

                    <th className="px-5 py-4 text-right text-sm font-semibold text-gray-500">
                      সর্বাধিক
                    </th>

                    <th className="px-5 py-4 text-right text-sm font-semibold text-gray-500">
                      গড়
                    </th>

                  </tr>

                </thead>

                {/* TABLE BODY */}

                <tbody>

                  {product.markets.map(
                    (market, index) => {

                      // Calculate average for this market
                      const marketAverage =
                        (market.min + market.max) /
                        2;

                      return (

                        <tr
                          key={`${market.market}-${index}`}
                          className={
                            index % 2 === 0
                              ? "border-b border-gray-100 bg-white last:border-b-0"
                              : "border-b border-gray-100 bg-[#F1F6F3] last:border-b-0"
                          }
                        >

                          {/* MARKET */}

                          <td className="px-5 py-4">

                            <p className="font-medium text-gray-900">
                              {market.market}
                            </p>

                          </td>

                          {/* DIVISION */}

                          <td className="px-5 py-4">

                            <span className="rounded-full bg-[#EAF5ED] px-3 py-1 text-sm font-medium text-[#05893E]">
                              {market.division}
                            </span>

                          </td>

                          {/* MINIMUM */}

                          <td className="px-5 py-4 text-right">

                            <span className="font-medium text-gray-900">
                              {market.min.toLocaleString(
                                "bn-BD"
                              )}
                            </span>

                            <span className="ml-1 text-sm text-gray-500">
                              টাকা
                            </span>

                          </td>

                          {/* MAXIMUM */}

                          <td className="px-5 py-4 text-right">

                            <span className="font-medium text-gray-900">
                              {market.max.toLocaleString(
                                "bn-BD"
                              )}
                            </span>

                            <span className="ml-1 text-sm text-gray-500">
                              টাকা
                            </span>

                          </td>

                          {/* AVERAGE */}

                          <td className="px-5 py-4 text-right">

                            <span className="font-semibold text-gray-900">

                              {marketAverage.toLocaleString(
                                "bn-BD",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}

                            </span>

                            <span className="ml-1 text-sm text-gray-500">
                              টাকা
                            </span>

                          </td>

                        </tr>

                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* ==========================================
              CATEGORY BUTTON
          ========================================== */}

          <div className="mt-8 flex justify-start">

            <Link
              href={`/category/${product.category}`}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-[#E5E9E6] px-5 py-3 font-semibold text-gray-900 shadow-sm transition hover:bg-[#DCE3DE]"
            >

              <span>
                {product.categoryIcon}
              </span>

              <span>
                সব {product.categoryNameBn}
              </span>

            </Link>

          </div>

        </section>

      </div>

    </main>
  );
};

export default ProductDetailsPage;