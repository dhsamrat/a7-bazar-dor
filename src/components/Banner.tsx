import Image from "next/image";
import React from "react";
import Hero from "../../public/bazar-hero.png";

const Banner = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <div className="flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-base-300 bg-base-100 px-5 py-8 shadow-sm sm:px-8 md:min-h-[460px] md:px-10 lg:min-h-[480px] lg:flex-row lg:px-12 xl:px-16">

                {/* Left Content */}
                <div className="w-full text-center lg:w-1/2 lg:text-left">
                    <div className="mb-4 inline-block rounded-full bg-success/10 px-4 py-2 text-sm font-medium text-[#05893E] sm:text-base">
                        {date}
                    </div>

                    <h1 className="text-3xl font-bold leading-tight text-black sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-base font-bold leading-7 text-base-content/70 sm:mt-5 sm:text-lg lg:mx-0">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
                        গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <a
                        href="#সব-পণ্য"
                        className="btn btn-success mt-6 rounded-2xl bg-green-700 px-6 font-bold text-white hover:bg-green-800 sm:mt-7"
                    >
                        সব পণ্য দেখুন
                    </a>
                </div>

                {/* Right Image */}
                <div className="mt-8 flex w-full justify-center sm:mt-10 lg:mt-0 lg:w-1/2">
                    <Image
                        src={Hero}
                        alt="Bazar Dor"
                        width={400}
                        height={300}
                        className="h-auto w-full max-w-[240px] object-contain sm:max-w-[340px] md:max-w-[380px] lg:max-w-[450px] xl:max-w-[500px]"
                        priority
                    />
                </div>

            </div>
        </section>
    );
};

export default Banner;