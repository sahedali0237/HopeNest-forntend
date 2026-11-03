"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, Layers3, ArrowRight, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SocialLogIn from "@/components/ui/socialLogin";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

type SignUpFormData = {
  fullName: string;
  email: string;
  photoUrl: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    mode: "onBlur",
  });

  const watchPassword = watch("password", "");

  const passwordRules = [
    {
      label: "8+ characters",
      valid: watchPassword.length >= 8,
    },
    {
      label: "1 uppercase",
      valid: /[A-Z]/.test(watchPassword),
    },
    {
      label: "1 lowercase",
      valid: /[a-z]/.test(watchPassword),
    },
  ];

  const handleCreateAccount = async (formData: SignUpFormData) => {
    setIsLoading(true);

    try {
      setIsLoading(true);

      const { data, error } = await authClient.signUp.email(
        {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          image: formData.photoUrl,
          callbackURL: "/",
        },
        {
          onRequest: () => {
            setIsLoading(true);
          },
          onSuccess: () => {
            setIsLoading(false);
            toast.success("Account created successfully!");

            router.push("/dashboard");
            router.refresh();
          },
          onError: (ctx) => {
            setIsLoading(false);
            toast.error(ctx.error.message || "Something went wrong!");
          },
        },
      );

      if (error) {
        setIsLoading(false);
        toast.error(error.message || "Registration failed!");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const inputClass = (hasError: boolean) =>
    cn(
      "h-11 rounded-lg bg-card border-border focus-visible:ring-primary",
      hasError && "border-red-500 focus-visible:ring-red-500",
    );

  return (
    <main className="min-h-screen bg-muted/50 flex items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
            <Layers3 size={28} strokeWidth={2} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create Your Account
          </h1>

          <p className="text-muted-foreground mt-2 text-sm">
            Join HopeNest and start making a difference.
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="bg-card border border-border shadow-xl shadow-primary/5 rounded-2xl p-6 sm:p-8">
          <form
            onSubmit={handleSubmit(handleCreateAccount)}
            className="space-y-4"
            noValidate
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-foreground mb-2"
              >
                Full Name
              </label>

              <Input
                id="fullName"
                type="text"
                autoComplete="name"
                placeholder="Sahed Ali"
                disabled={isLoading}
                aria-invalid={!!errors.fullName}
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must contain at least 2 characters",
                  },
                })}
                className={inputClass(!!errors.fullName)}
              />

              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-foreground mb-2"
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
                className={inputClass(!!errors.email)}
              />

              {errors.email && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Profile Photo URL */}
            <div>
              <label
                htmlFor="photoUrl"
                className="block text-sm font-semibold text-foreground mb-2"
              >
                Profile Photo URL
              </label>

              <Input
                id="photoUrl"
                type="url"
                placeholder="https://example.com/photo.jpg"
                disabled={isLoading}
                aria-invalid={!!errors.photoUrl}
                {...register("photoUrl", {
                  required: "Profile photo URL is required",
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: "Please enter a valid image URL",
                  },
                })}
                className={inputClass(!!errors.photoUrl)}
              />

              {errors.photoUrl && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.photoUrl.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-foreground mb-2"
              >
                Password
              </label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  disabled={isLoading}
                  aria-invalid={!!errors.password}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /(?=.*[a-z])(?=.*[A-Z])/,
                      message:
                        "Include at least one uppercase and one lowercase letter",
                    },
                  })}
                  className={cn(inputClass(!!errors.password), "pr-11")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              {/* Password Requirements */}
              {watchPassword.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {passwordRules.map((rule) => (
                    <div
                      key={rule.label}
                      className={cn(
                        "flex items-center gap-1 text-[10px] sm:text-xs",
                        rule.valid ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      <Check
                        size={13}
                        className={cn("shrink-0", !rule.valid && "opacity-30")}
                      />
                      <span>{rule.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {errors.password && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-foreground mb-2"
              >
                Confirm Password
              </label>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  disabled={isLoading}
                  aria-invalid={!!errors.confirmPassword}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watchPassword || "Passwords do not match",
                  })}
                  className={cn(inputClass(!!errors.confirmPassword), "pr-11")}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  disabled={isLoading}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.confirmPassword.message}
                </p>
              )}
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
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-4 py-1">
              <div className="flex-1 h-px bg-border" />

              <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                OR CONTINUE WITH
              </span>

              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Social Login */}
            <SocialLogIn />

            {/* Sign In Link */}
            <p className="text-center text-sm text-muted-foreground pt-2">
              Already have an account?{" "}
              <Link
                href="/signIn"
                className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Together, we can make a difference.
        </p>
      </div>
    </main>
  );
}
