"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/ui/dashboard-layout";
import { EventForm } from "@/components/ui/event-form";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/navigation";

interface EventFormData {
  title: string;
  description?: string;
  eventType: string;
  thumbnailUrl?: string;
  location: string;
  eventDate: string;
  creatorEmail?: string;
}

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { user, isLoading: sessionLoading } = useSession();
  const router = useRouter();

  const [eventId, setEventId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState<EventFormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (sessionLoading) return;

      if (!user) {
        router.push("/signIn");
        return;
      }

      const { id } = await params;
      setEventId(id);
      setIsLoading(true);

      try {
        const res = await fetch(`/api/events/${id}`, { cache: "no-store" });
        if (!res.ok) {
          if (res.status === 404) throw new Error("Event not found");
          throw new Error("Failed to fetch event");
        }

        const data = await res.json();

        // Verify ownership: user can only edit their own events
        if (
          data.creatorEmail?.toLowerCase() !== user.email?.toLowerCase()
        ) {
          setError(
            "You can only edit events you created yourself.",
          );
          setIsLoading(false);
          return;
        }

        setInitialData({
          title: data.title || "",
          description: data.description || "",
          eventType: data.eventType || "Other",
          thumbnailUrl: data.thumbnailUrl || "",
          location: data.location || "",
          eventDate: data.eventDate || "",
          creatorEmail: data.creatorEmail || "",
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load event",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [user, sessionLoading, router, params]);

  if (sessionLoading || isLoading) {
    return (
      <DashboardLayout sidebarTitle="Edit Event">
        <div className="pt-6 max-w-2xl mx-auto">
          <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl h-96" />
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return null; // redirected in useEffect
  }

  if (error) {
    return (
      <DashboardLayout sidebarTitle="Edit Event" user={user}>
        <div className="pt-6 max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-red-900 mb-2">
              {error}
            </h2>
            <button
              onClick={() => router.push("/manage-events")}
              className="mt-4 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-all"
            >
              Back to Manage Events
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!initialData) {
    return null;
  }

  return (
    <DashboardLayout sidebarTitle="Edit Event" user={user}>
      <div className="pt-6">
        <h1 className="text-2xl font-bold text-[#062D25] mb-6">
          Edit Event
        </h1>

        <EventForm
          initialData={initialData}
          action={`/api/events/${eventId}`}
          method="PUT"
        />
      </div>
    </DashboardLayout>
  );
}
