"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate a brief loading delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (email === "admin@addy.com" && password === "admin123") {
      document.cookie = "addy_admin=true; path=/; max-age=86400; SameSite=Lax";
      router.push("/admin");
    } else {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[color:var(--color-line-2)] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        {/* ADDY Branding */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center mb-3">
            <span className="text-white font-black text-xl">A</span>
          </div>
          <h1 className="text-2xl font-black text-ink tracking-tight">ADDY</h1>
          <p className="text-xs text-ink-3 mt-0.5">Wear Your Story</p>
          <p className="text-sm text-ink-3 mt-3 font-medium">Admin Portal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-ink mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@addy.com"
              className="w-full border border-[color:var(--color-line)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-ink mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-[color:var(--color-line)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-2.5 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Signing in…" : "Login to Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
