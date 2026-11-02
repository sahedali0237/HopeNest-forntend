"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, Layers3, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SocialLogIn from "@/components/ui/socialLogin";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);

    const callbackUrl =
      new URLSearchParams(window.location.search).get("callbackUrl") || "/";

    try {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: callbackUrl,
        },
        {
          onRequest: () => {
            setIsLoading(true);
          },

          onSuccess: () => {
            setIsLoading(false);
            toast.success("Welcome back! Sign in successful.");

            router.push(callbackUrl);
            router.refresh();
          },

          onError: (ctx) => {
            setIsLoading(false);
            toast.error(ctx.error.message || "Invalid email or password.");
          },
        },
      );
    } catch (error) {
      setIsLoading(false);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-yellow-50 flex items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 mb-4">
            <Layers3 size={28} strokeWidth={2} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </h1>

          <p className="text-slate-500 mt-2 text-sm">
            Sign in to continue making a difference.
          </p>
        </div>

        {/* Sign In Card */}
        <div className="bg-white border border-yellow-100 shadow-xl shadow-yellow-900/5 rounded-2xl p-6 sm:p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Email Address
              </label>

              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                disabled={isLoading}
                aria-invalid={!!errors.email}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className={cn(
                  "h-11 rounded-lg bg-white border-slate-200 focus-visible:ring-emerald-500",
                  errors.email && "border-red-500 focus-visible:ring-red-500",
                )}
              />

              {errors.email && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  disabled={isLoading}
                  aria-invalid={!!errors.password}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className={cn(
                    "h-11 rounded-lg pr-11 bg-white border-slate-200 focus-visible:ring-emerald-500",
                    errors.password &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end -mt-2">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all shadow-md shadow-emerald-600/10"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-4 py-1">
              <div className="flex-1 h-px bg-slate-200" />

              <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
                OR CONTINUE WITH
              </span>

              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Social Login */}
            <SocialLogIn />

            {/* Register Link */}
            <p className="text-center text-sm text-slate-500 pt-2">
              New to HopeNest?{" "}
              <Link
                href="/signUp"
                className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Together, we can make a difference.
        </p>
      </div>
    </main>
  );
}
