"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const result = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden">
        {/* Abstract pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute top-1/3 right-1/3 w-56 h-56 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <span className="text-2xl font-bold text-black">L</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">LUMINA</span>
          </Link>

          {/* Features */}
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-white leading-tight mb-8">
              Start Your Timekeeping Journey Today
            </h1>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Exclusive Drops</h3>
                  <p className="text-gray-400 text-sm">Get access to curated watch launches and limited editions</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Fast Delivery</h3>
                  <p className="text-gray-400 text-sm">Free express shipping on orders over $120</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Secure Shopping</h3>
                  <p className="text-gray-400 text-sm">100% secure checkout and warranty-backed purchases</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-12">
            <div>
              <p className="text-3xl font-bold text-white">50K+</p>
              <p className="text-gray-500 text-sm">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">1000+</p>
              <p className="text-gray-500 text-sm">Timepieces Sold</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">4.9</p>
              <p className="text-gray-500 text-sm">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md animate-fadeIn">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black">
                <span className="text-2xl font-bold text-white">L</span>
              </div>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Join us to start shopping today
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="auth-container space-y-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
          >
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="input-field w-full"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="input-field w-full"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="input-field w-full"
                placeholder="At least 8 characters"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-gray-900 hover:underline">
                Sign in
              </Link>
            </p>
          </form>

          {/* Terms */}
          <p className="mt-6 text-center text-xs text-gray-400 max-w-sm mx-auto">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-gray-600">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-gray-600">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
