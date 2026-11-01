"use client";

import { DashboardLayout } from "@/components/ui/dashboard-layout";
import { EventForm } from "@/components/ui/event-form";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const { user, isLoading } = useSession();
  const router = useRouter();

  if (isLoading) {
    return (
      <DashboardLayout sidebarTitle="Create Event">
        <div className="pt-6 max-w-2xl mx-auto">
          <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl h-96" />
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    router.push("/signIn");
    return null;
  }

  return (
    <DashboardLayout sidebarTitle="Create Event" user={user}>
      <div className="pt-6">
        <h1 className="text-2xl font-bold text-[#062D25] mb-6">
          Create a New Event
        </h1>

        <EventForm
          initialData={{
            creatorEmail: user.email,
          }}
        />
      </div>
    </DashboardLayout>
  );
}
