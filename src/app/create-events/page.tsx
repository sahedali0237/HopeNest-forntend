"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/ui/dashboard-layout";
import { EventForm } from "@/components/ui/event-form";
import { useSession } from "@/hooks/use-session";

export default function CreateEventPage() {
  const { user, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/signIn");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <DashboardLayout>
        <div className="py-6 max-w-2xl mx-auto w-full">
          {/* Header Skeleton */}
          <div className="h-8 w-56 bg-emerald-900/10 animate-pulse rounded-md mb-6" />

          {/* Form Card Skeleton */}
          <div className="rounded-xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="h-16 bg-emerald-900/5 animate-pulse rounded-md" />
              <div className="h-16 bg-emerald-900/5 animate-pulse rounded-md" />
            </div>
            <div className="h-24 bg-emerald-900/5 animate-pulse rounded-md" />
            <div className="h-16 bg-emerald-900/5 animate-pulse rounded-md" />
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="h-16 bg-emerald-900/5 animate-pulse rounded-md" />
              <div className="h-16 bg-emerald-900/5 animate-pulse rounded-md" />
            </div>
            <div className="h-11 bg-emerald-600/20 animate-pulse rounded-md mt-6" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={user}>
      <div className="py-6 max-w-2xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#062D25]">
            Create a New Event
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Fill in the details below to organize a new community event.
          </p>
        </div>

        <EventForm
          initialData={{
            creatorEmail: user.email,
          }}
        />
      </div>
    </DashboardLayout>
  );
}
