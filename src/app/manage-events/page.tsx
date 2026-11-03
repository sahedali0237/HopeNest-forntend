"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/ui/dashboard-layout";
import { EventCard } from "@/components/ui/event-card";
import { useSession } from "@/hooks/use-session";
import { toast } from "react-toastify";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface Event {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  thumbnailUrl: string;
  creatorEmail: string;
}

export default function ManageEventsPage() {
  const { user, isLoading: sessionLoading } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      if (sessionLoading) return;
      
      if (!user) {
        router.push("/signIn");
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        
        const data = await res.json();
        if (Array.isArray(data)) {
          // Filter events created by the current user
          const userEvents = data.filter((event: Event) => 
            event.creatorEmail?.toLowerCase() === user.email?.toLowerCase()
          );
          setEvents(userEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("Failed to load events");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [user, sessionLoading, router]);

  const handleDelete = (eventId: string) => {
    setEventToDelete(eventId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;
    
    try {
      const res = await fetch(`/api/events/${eventToDelete}`, {
        method: "DELETE",
      });
      
      if (!res.ok) throw new Error("Failed to delete event");
      
      setEvents(events.filter((e) => e._id !== eventToDelete));
      toast.success("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    } finally {
      setShowDeleteDialog(false);
      setEventToDelete(null);
    }
  };

  const handleEdit = (event: Event) => {
    // Navigate to edit page or open edit modal
    router.push(`/edit-event/${event._id}`);
  };

  if (sessionLoading) {
    return (
      <DashboardLayout sidebarTitle="Manage Events">
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

  const upcomingEvents = events.filter(
    (e) => new Date(e.eventDate) >= new Date()
  );
  const pastEvents = events.filter(
    (e) => new Date(e.eventDate) < new Date()
  );

  const currentEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <DashboardLayout sidebarTitle="Manage Events" user={user}>
      <main className="pt-6">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-border mb-3">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`tab-btn py-2 px-4 border-b-2 text-sm font-medium transition-all ${
                  activeTab === "upcoming"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-primary"
                }`}
              >
                Upcoming <span className="text-sm font-medium">({upcomingEvents.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`tab-btn py-2 px-4 border-b-2 text-sm font-medium transition-all ml-6 ${
                  activeTab === "past"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-primary"
                }`}
              >
                Past <span className="text-sm font-medium">({pastEvents.length})</span>
              </button>
            </div>
          </div>

          {/* Events Grid */}
          {currentEvents.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {currentEvents.map((event) => (
                <EventCard
                  key={event._id}
                  id={event._id}
                  title={event.title}
                  eventType={event.eventType as "Cleanup" | "Donation" | "Plantation" | "Other"}
                  eventDate={event.eventDate}
                  location={event.location}
                  thumbnailUrl={event.thumbnailUrl}
                  onViewDetails={() => {
                    toast.info("Viewing event details");
                  }}
                  onEdit={() => handleEdit(event)}
                  onDelete={() => handleDelete(event._id)}
                />
              ))}
            </div>
          ) : (
            <div className="col-span-full py-8 text-center">
              <p className="text-muted-foreground text-sm">
                {activeTab === "upcoming" 
                  ? "No upcoming events found. Create your first event!"
                  : "No past events found."
                }
              </p>
              {activeTab === "upcoming" && (
                <a
                  href="/create-events"
                  className="mt-3 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                >
                  Create Event
                </a>
              )}
            </div>
          )}

          {showDeleteDialog && eventToDelete && (
            <ConfirmDialog
              isOpen={showDeleteDialog}
              title="Delete Event"
              text="Are you sure you want to delete this event? This action cannot be undone."
              onConfirm={confirmDelete}
              onCancel={() => {
                setShowDeleteDialog(false);
                setEventToDelete(null);
              }}
              confirmText="Delete"
              cancelText="Cancel"
            />
          )}
        </div>
      </main>
    </DashboardLayout>
  );
}