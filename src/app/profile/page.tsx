
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const user = session?.user;

  const [loading, setLoading] = useState(false);

  // Update Profile
  const handleUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");

    if (typeof name !== "string" || !name.trim()) {
      toast.error("নাম লিখুন");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error("প্রোফাইল আপডেট করতে সমস্যা হয়েছে");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে");
      router.refresh();
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("প্রোফাইল আপডেট করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("সাইন আউট করতে সমস্যা হয়েছে");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    }
  };

  // Loading
  if (isPending) {
    return (
      <main className="min-h-screen bg-[#f5f9f5] px-4 py-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-gray-500">লোড হচ্ছে...</p>
        </div>
      </main>
    );
  }

  // User is not logged in
  if (!user) {
    return (
      <main className="min-h-screen bg-[#f5f9f5] px-4 py-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            আপনার অ্যাকাউন্টে লগইন করুন
          </h1>

          <p className="mt-2 text-gray-500">
            প্রোফাইল দেখতে হলে প্রথমে সাইন ইন করুন।
          </p>

          <button
            type="button"
            onClick={() => router.push("/signin")}
            className="mt-5 rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            সাইন ইন
          </button>
        </div>
      </main>
    );
  }

  const firstLetter = user.name?.charAt(0).toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-[#f5f9f5] px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Page Heading */}
        <div className="mb-7">
          <h1 className="text-3xl font-bold text-gray-900">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-gray-600">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Information Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* User Info */}
            <div className="flex min-w-0 items-center gap-4">
              {/* Avatar */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-700 text-2xl font-semibold text-white">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={64}
                    height={64}
                    unoptimized
                    referrerPolicy="no-referrer"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  firstLetter
                )}
              </div>

              {/* Name & Email */}
              <div className="min-w-0">
                <h2 className="truncate text-xl font-semibold text-gray-900">
                  {user.name}
                </h2>

                <p className="mt-1 break-all text-sm text-gray-500 sm:text-base">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Sign Out */}
            <button
              type="button"
              onClick={handleSignOut}
              className="shrink-0 rounded-lg border border-red-400 px-5 py-2.5 font-semibold text-red-500 transition hover:bg-red-50"
            >
              ↪ সাইন আউট
            </button>
          </div>
        </div>

        {/* Update Name Card */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="text-2xl font-bold text-gray-900">
            নাম হালনাগাদ করুন
          </h2>

          <form onSubmit={handleUpdateProfile} className="mt-6">
            <label
              htmlFor="name"
              className="mb-2 block text-gray-700"
            >
              নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              defaultValue={user.name || ""}
              placeholder="রহিম উদ্দিন"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 rounded-lg bg-green-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "আপডেট হচ্ছে..."
                : "নাম হালনাগাদ করুন"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;