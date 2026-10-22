import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-4 py-6 text-center text-sm text-gray-600 sm:flex-row sm:text-left">
        <p>
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p>
          সকল দাম সম্ভাব্য; বাজারের অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;