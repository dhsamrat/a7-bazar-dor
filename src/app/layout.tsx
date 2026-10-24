import type { Metadata } from "next";
import { Noto_Serif_Bengali} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
//import Marquee from "@/components/Marquee";
import { Toaster } from "react-hot-toast";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});
export const metadata: Metadata = {
  title: "বাজার দর",
  description: "আপনার দৈনন্দিন বাজারের পণ্য ও দাম",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        

        {children}
        <Footer />
         <Toaster position="top-center" />
        </body>
    </html>
  );
}





