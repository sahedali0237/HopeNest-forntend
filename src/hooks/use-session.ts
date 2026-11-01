"use client";

import { authClient } from "@/lib/auth-client";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export function useSession() {
  const { data, isPending } = authClient.useSession();

  return {
    user: (data?.user as User) || null,
    isLoading: isPending
  };
}