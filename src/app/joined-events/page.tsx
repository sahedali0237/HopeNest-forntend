"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/ui/dashboard-layout";
import { EventCard } from "@/components/ui/event-card";
import { useSession } from "@/hooks/use-session";
import { toast } from "react-toastify";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Event {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  thumbnailUrl: string;
  isJoined?: boolean;
}

export default function JoinedEventsPage() {
  const { user, isLoading: sessionLoading } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Fetch user's joined events
  useEffect(() => {
    const fetchJoinedEvents = async () => {
      if (sessionLoading) return;

      if (!user) {
        router.push("/signIn");
        return;
      }

      setIsLoading(true);
      try {
        // Fetch events the current user has actually joined
        const res = await fetch("/api/events/joined", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch joined events");

        const data = await res.json();
        if (Array.isArray(data)) {
          const joinedEvents = data
            .filter((event: Event) => event.isJoined)
            .sort(
              (a, b) =>
                new Date(a.eventDate).getTime() -
                new Date(b.eventDate).getTime(),
            );
          setEvents(joinedEvents);
        }
      } catch (error) {
        console.error("Error fetching joined events:", error);
        toast.error("Failed to load joined events");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [user, sessionLoading, router]);

  if (sessionLoading) {
    return (
      <DashboardLayout sidebarTitle="Joined Events">
        <main className="pt-6">
          <div className="max-w-7xl mx-auto">
            <LoadingSkeleton />
          </div>
        </main>
      </DashboardLayout>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <DashboardLayout sidebarTitle="Joined Events" user={user}>
      <main className="pt-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <p className="text-sm text-[#64748B]">
              Events you&apos;ve joined, sorted by date (nearest upcoming first)
            </p>
          </div>

          {events.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  id={event._id}
                  title={event.title}
                  eventType={
                    event.eventType as
                      | "Cleanup"
                      | "Donation"
                      | "Plantation"
                      | "Other"
                  }
                  eventDate={event.eventDate}
                  location={event.location}
                  thumbnailUrl={event.thumbnailUrl}
                  onViewDetails={() => {
                    toast.info("Viewing event details");
                  }}
                  onEdit={() =>
                    toast.info("Edit not available for joined events")
                  }
                  onDelete={() => toast.error("Cannot delete joined events")}
                />
              ))}
            </div>
          ) : (
            <div className="col-span-full py-8 text-center">
              <p className="text-[#64748B] text-sm">
                You haven&apos;t joined any events yet.{" "}
                <Link
                  href="/events"
                  className="text-emerald-600 hover:text-emerald-400 transition-colors"
                >
                  Browse upcoming events
                </Link>{" "}
                and join one!
              </p>
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
}
