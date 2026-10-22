
import Link from "next/link";
import React from "react";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories"
  );

  const data: Category[] = await res.json();

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-8 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        {data.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category?.slug}`}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap text-base font-semibold text-gray-800 transition-colors hover:text-green-700"
          >
            <span className="text-xl">{category.icon}</span>

            <span>{category.nameBn}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavLinks;