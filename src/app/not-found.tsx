
import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="text-center max-w-xl">

        {/* 404 */}
        <div className="mb-6">
          <h1 className="text-8xl sm:text-9xl font-black text-primary tracking-tight">
            ৪০৪
          </h1>
        </div>

        {/* মূল বার্তা */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
            পেজটি খুঁজে পাওয়া যায়নি
          </h2>

          <p className="text-base-content/60 max-w-md mx-auto">
            দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
            পেজটি সরিয়ে ফেলা হয়ে থাকতে পারে অথবা ঠিকানাটি ভুল হতে পারে।
          </p>
        </div>

        {/* বাটন */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link href="/" className="btn btn-primary px-8">
            হোম পেজে ফিরে যান
          </Link>

          <Link href="/products" className="btn btn-outline px-8">
            পণ্য দেখুন
          </Link>
        </div>

        {/* ব্র্যান্ড */}
        <p className="mt-10 text-sm text-base-content/40">
          বাজার দর — আপনার বিশ্বস্ত অনলাইন বাজার
        </p>

      </div>
    </main>
  );
};

export default NotFound;