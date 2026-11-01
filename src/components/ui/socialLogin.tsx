"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@base-ui/react";
import { authClient } from "@/lib/auth-client";

const SocialLogIn = () => {
  const handleLogin = async (provider: "google" | "github") => {
    const callbackUrl =
      new URLSearchParams(window.location.search).get("callbackUrl") || "/";

    await authClient.signIn.social({
      provider: provider,
      callbackURL: callbackUrl,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-4">
      <Button
        type="button"
        onClick={() => handleLogin("google")}
        className="flex-1 inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
      >
        <FcGoogle className="mr-2 h-5 w-5" />
        Google
      </Button>

      <Button
        type="button"
        onClick={() => handleLogin("github")}
        className="flex-1 inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
      >
        <FaGithub className="mr-2 h-5 w-5" />
        GitHub
      </Button>
    </div>
  );
};

export default SocialLogIn;
