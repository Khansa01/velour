"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const password = form.get("password") as string;
    const confirm = form.get("confirm") as string;

    if (password !== confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: form.get("email") as string,
        password,
        options: {
          data: { name: form.get("name") as string },
        },
      });

      if (error) {
        if (error.status === 422) {
          setError("Email already registered");
        } else {
          setError(error.message);
        }
      } else {
        router.push("/login");
      }
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <main className="bg-[#1a1a1a] min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm border border-[rgba(201,168,124,0.15)] rounded-xl p-8">
        <p className="text-xl tracking-[4px] text-white font-medium mb-1 text-center">VELOUR</p>
        <p className="text-[#a89a80] text-sm mb-8 text-center">Create your account</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="name" type="text" placeholder="Full Name" required className="bg-[#222] border border-[rgba(201,168,124,0.2)] text-white text-sm px-4 py-3 rounded-lg placeholder:text-[#a89a80] focus:outline-none focus:border-[#c9a87c]" />
          <input name="email" type="email" placeholder="Email" required className="bg-[#222] border border-[rgba(201,168,124,0.2)] text-white text-sm px-4 py-3 rounded-lg placeholder:text-[#a89a80] focus:outline-none focus:border-[#c9a87c]" />
          <input name="password" type="password" placeholder="Password" required className="bg-[#222] border border-[rgba(201,168,124,0.2)] text-white text-sm px-4 py-3 rounded-lg placeholder:text-[#a89a80] focus:outline-none focus:border-[#c9a87c]" />
          <input name="confirm" type="password" placeholder="Confirm Password" required className="bg-[#222] border border-[rgba(201,168,124,0.2)] text-white text-sm px-4 py-3 rounded-lg placeholder:text-[#a89a80] focus:outline-none focus:border-[#c9a87c]" />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button type="submit" disabled={loading} className="py-3 bg-[#c9a87c] text-[#1a1a1a] text-xs tracking-[2px] uppercase font-medium hover:bg-[#b8976b] transition-colors disabled:opacity-50">
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-[#a89a80] text-xs text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#c9a87c] hover:underline">Sign in</Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;