"use client";

import { authClient } from "../../lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SignInPage = () => {
  const router = useRouter();

  // Email + Password Sign In
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    // Empty field check
    if (!user.email) {
      toast.error("দয়া করে আপনার ইমেইল ঠিকানা লিখুন।");
      return;
    }

    if (!user.password) {
      toast.error("দয়া করে আপনার পাসওয়ার্ড লিখুন।");
      return;
    }

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });
     
    if (error) {
      toast.error("সাইন ইন করতে সমস্যা হয়েছে।");
      console.log(error);
      return;
    }

    if (data) {
      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
    }
  };
   
 

  // Google Sign In
  const handleGoogleSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(
        "Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
      console.log(error);
    }
  };

  // GitHub Sign In
  const handleGithubSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      toast.error(
        "GitHub দিয়ে সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-[#F1F7F3] px-4 py-10 md:py-14">
      <div className="mx-auto max-w-xl">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            সাইন ইন
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500 md:text-base">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Sign In Card */}
        <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={onSubmit}>
            {/* Email */}
            <fieldset className="fieldset">
              <label
                htmlFor="email"
                className="label text-sm font-semibold text-gray-700"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="input h-12 w-full rounded-xl border-gray-300 bg-white focus:border-[#05893E] focus:outline-none"
                placeholder="আপনার ইমেইল লিখুন"
              />
            </fieldset>

            {/* Password */}
            <fieldset className="fieldset mt-4">
              <label
                htmlFor="password"
                className="label text-sm font-semibold text-gray-700"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="input h-12 w-full rounded-xl border-gray-300 bg-white focus:border-[#05893E] focus:outline-none"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
              />
            </fieldset>

            {/* Sign In Button */}
            <button
              type="submit"
              className="btn mt-6 h-12 w-full rounded-xl border-0 bg-[#05893E] text-base font-semibold text-white shadow-sm transition hover:bg-[#047A37]"
            >
              সাইন ইন
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-sm text-gray-500">
              অথবা
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Login */}
        
<div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
  <button
    type="button"
    onClick={handleGoogleSignIn}
    className="flex h-[38px] items-center justify-center gap-1.5 rounded-[10px] border border-[#d9dee7] bg-white px-2 text-xs font-medium text-gray-800 shadow-none transition hover:bg-gray-50"
  >
    <FcGoogle size={17} />
    <span>Google দিয়ে চালিয়ে যান</span>
  </button>

  <button
    type="button"
    onClick={handleGithubSignIn}
    className="flex h-[38px] items-center justify-center gap-1.5 rounded-[10px] border border-[#d9dee7] bg-white px-2 text-xs font-medium text-gray-800 shadow-none transition hover:bg-gray-50"
  >
    <FaGithub size={17} />
    <span>GitHub দিয়ে চালিয়ে যান</span>
  </button>
</div>
          {/* Sign Up */}
          <p className="mt-6 text-center text-sm text-gray-500">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#05893E] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        {/* Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 underline transition hover:text-[#05893E]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;