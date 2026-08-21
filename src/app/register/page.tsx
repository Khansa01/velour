"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password = form.get("password") as string;
    const confirm = form.get("confirm") as string;

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    // nanti diganti API call ke DB
    router.push("/login");
  }

  return (
    <main className="bg-[#1a1a1a] min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm border border-[rgba(201,168,124,0.15)] rounded-xl p-8">
        <p className="text-xl tracking-[4px] text-white font-medium mb-1 text-center">VELOUR</p>
        <p className="text-[#a89a80] text-sm mb-8 text-center">Create your account</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            required
            className="bg-[#222] border border-[rgba(201,168,124,0.2)] text-white text-sm px-4 py-3 rounded-lg placeholder:text-[#a89a80] focus:outline-none focus:border-[#c9a87c]"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="bg-[#222] border border-[rgba(201,168,124,0.2)] text-white text-sm px-4 py-3 rounded-lg placeholder:text-[#a89a80] focus:outline-none focus:border-[#c9a87c]"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="bg-[#222] border border-[rgba(201,168,124,0.2)] text-white text-sm px-4 py-3 rounded-lg placeholder:text-[#a89a80] focus:outline-none focus:border-[#c9a87c]"
          />
          <input
            name="confirm"
            type="password"
            placeholder="Confirm Password"
            required
            className="bg-[#222] border border-[rgba(201,168,124,0.2)] text-white text-sm px-4 py-3 rounded-lg placeholder:text-[#a89a80] focus:outline-none focus:border-[#c9a87c]"
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            className="py-3 bg-[#c9a87c] text-[#1a1a1a] text-xs tracking-[2px] uppercase font-medium hover:bg-[#b8976b] transition-colors rounded-lg"
          >
            Create Account
          </button>
        </form>

        <p className="text-[#a89a80] text-xs text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#c9a87c] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default RegisterPage;