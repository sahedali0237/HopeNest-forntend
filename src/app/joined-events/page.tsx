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
  const router = useRouter();

  useEffect(() => {
    if (sessionLoading) return;

    if (!user) {
      router.push("/signIn");
      return;
    }

    let cancelled = false;

    const fetchJoinedEvents = async () => {
      try {
        const res = await fetch("/api/events/joined", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch joined events");

        const data = await res.json();
        if (Array.isArray(data) && !cancelled) {
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
        if (!cancelled) {
          console.error("Error fetching joined events:", error);
          toast.error("Failed to load joined events");
        }
      }
    };

    fetchJoinedEvents();

    return () => {
      cancelled = true;
    };
  }, [user, sessionLoading, router]);

  const handleLeaveEvent = async (eventId: string) => {
    try {
      const res = await fetch(`/api/events/${eventId}/join`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to leave event");
      }

      toast.success(data.message || "Successfully left the event");
      window.location.reload();
    } catch (error) {
      console.error("Error leaving event:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to leave event",
      );
    }
  };

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
    return null;
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
                  onDelete={() => handleLeaveEvent(event._id)}
                  deleteLabel="Leave Event"
                />
              ))}
            </div>
          ) : (
            <div className="col-span-full py-8 text-center">
              <p className="text-muted-foreground text-sm">
                You haven&apos;t joined any events yet.{" "}
                <Link
                  href="/events"
                  className="text-primary hover:text-primary/80 transition-colors"
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