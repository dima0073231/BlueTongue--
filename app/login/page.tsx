"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/signup/language"); 
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
       
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Blue Tongue Logo" className="w-24 h-24" />
        </div>

        <h1 className="text-lg font-medium text-gray-700 mb-6">
          Create an account
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200"
            required
          />
          <input
            type="Confirm password"
            placeholder="Confirm password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-gray-100 rounded-xl font-medium"
          >
            Next
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600">
          Already heve an account?{" "}
          <span
            className="text-green-600 cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
}
