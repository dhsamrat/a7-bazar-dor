// "use client";

// import Link from "next/link";
// import React from "react";

// const HomeLink = () => {
//   const date = new Date().toLocaleDateString("bn-BD", {
//     dateStyle: "full",
//   });

//   const handleClick = () => {
//     window.scrollTo(0, 0);
//   };

//   return (
//     <Link
//       href="/"
//       onClick={handleClick}
//       className="flex items-center gap-3"
//     >
//       <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-700 text-2xl">
//         🛒
//       </div>

//       <div>
//         <h1 className="text-2xl font-bold leading-tight text-gray-900">
//           বাজার দর
//         </h1>

//         <p className="mt-1 text-sm text-gray-500">
//           {date}
//         </p>
//       </div>
//     </Link>
//   );
// };

// export default HomeLink;













"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const HomeLink = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const today = new Intl.DateTimeFormat("bn-BD", {
        timeZone: "Asia/Dhaka",
        dateStyle: "full",
      }).format(new Date());

      setDate(today);
    };

    updateDate();

    // প্রতি মিনিটে তারিখ আপডেট চেক করবে
    const timer = setInterval(updateDate, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="flex items-center gap-3"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-700 text-2xl">
        🛒
      </div>

      <div>
        <h1 className="text-2xl font-bold leading-tight text-gray-900">
          বাজার দর
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {date || "তারিখ লোড হচ্ছে..."}
        </p>
      </div>
    </Link>
  );
};

export default HomeLink;