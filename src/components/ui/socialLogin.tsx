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
        className="flex-1 inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg border border-border bg-card hover:bg-primary/10 text-sm font-medium text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <FcGoogle className="mr-2 h-5 w-5" />
        Google
      </Button>

      <Button
        type="button"
        onClick={() => handleLogin("github")}
        className="flex-1 inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg border border-border bg-card hover:bg-primary/10 text-sm font-medium text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <FaGithub className="mr-2 h-5 w-5" />
        GitHub
      </Button>
    </div>
  );
};

export default SocialLogIn;
