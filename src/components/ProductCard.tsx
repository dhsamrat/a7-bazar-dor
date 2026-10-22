import Link from "next/link";
import React from "react";

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

interface ProductCardProps {
  product: Product;
}

const getUnit = (unit: string) => {
  switch (unit) {
    case "kg":
      return "কেজি";

    case "liter":
      return "লিটার";

    case "dozen":
      return "ডজন";

    case "piece":
      return "পিস";

    default:
      return unit;
  }
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block"
    >
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#05893E] hover:shadow-md">

        {/* Product Info */}
        <div className="flex items-center gap-3">

          {/* Emoji */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F1F7F3]">
            <span className="text-3xl">
              {product.image}
            </span>
          </div>

          {/* Name + Unit */}
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-gray-900">
              {product.nameBn}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              প্রতি {getUnit(product.unit)}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="mt-6 flex items-end justify-between gap-3">

          <div>
            <p className="text-sm text-gray-500">
              আজকের দাম
            </p>

            <div className="mt-1">
              <span className="text-2xl font-bold text-gray-900">
                {product.today.toLocaleString("bn-BD")}
              </span>

              <span className="ml-1 text-sm text-gray-500">
                টাকা
              </span>
            </div>
          </div>

          {/* Change Badge */}
          {product.change.dir === "up" && (
            <span className="shrink-0 rounded-full bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-600">
              <span className="text-red-600">▲</span>{" "}
               {product.change.pct.toLocaleString("bn-BD")}%
            </span>
          )}

          {product.change.dir === "down" && (
            <span className="shrink-0 rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-600">
              ▼ {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
            </span>
          )}

          {product.change.dir === "flat" && (
            <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-500">
              — {product.change.pct.toLocaleString("bn-BD")}%
            </span>
          )}
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;