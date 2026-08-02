import type { Metadata } from "next";
import Link from "next/link";
import { Compass, ShieldCheck } from "lucide-react";
import LoginForm from "../_components/loginForm";

export const metadata: Metadata = {
  title: "Login | GearRental",
  description: "Login to your account to manage rentals and gear",
};

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12 transition-colors duration-200">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 blur-3xl rounded-full pointer-events-none" />

      <div className="relative w-full max-w-md space-y-6">
        {/* Brand Logo Header */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-2xl font-black text-gray-900 dark:text-white tracking-tight hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
              <Compass className="w-6 h-6" />
            </div>
            <span>
              Gear
              <span className="text-blue-600 dark:text-blue-500">Rental</span>
            </span>
          </Link>
        </div>

        {/* Card Container */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-xl shadow-gray-200/50 dark:shadow-none space-y-6">
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form */}
          <LoginForm />

          {/* Footer Navigation */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
            >
              Register here
            </Link>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-400 dark:text-gray-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Secure, 256-bit encrypted authentication</span>
        </div>
      </div>
    </div>
  );
}
