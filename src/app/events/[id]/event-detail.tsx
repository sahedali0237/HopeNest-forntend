"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Bookmark,
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  Tag,
  Users,
} from "lucide-react";
import { toast } from "react-toastify";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/navigation";
import {
  formatDetailDate,
  getTimeRange,
  type EventDetailData,
} from "./detail-data";
import Image from "next/image";

/* Soft pill colors per event type (matches the badge hues on the cards) */
const TYPE_PILLS: Record<string, string> = {
  Cleanup: "bg-emerald-100 text-emerald-800",
  Donation: "bg-orange-100 text-orange-700",
  Plantation: "bg-lime-100 text-lime-800",
};

/* Dewy avatar-stack fallbacks when the API sends no attendee headshots */
const AVATAR_FALLBACKS = [
  "bg-gradient-to-br from-emerald-300 to-emerald-600",
  "bg-gradient-to-br from-lime-300 to-lime-600",
  "bg-gradient-to-br from-orange-300 to-orange-500",
];

type Props = {
  detail: EventDetailData;
  daysLeft: string;
};

export default function EventDetail({ detail, daysLeft }: Props) {
  const [isJoined, setIsJoined] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [joinCount, setJoinCount] = useState(0);
  const { user, isLoading: sessionLoading } = useSession();
  const router = useRouter();

  const pill = TYPE_PILLS[detail.eventType] ?? "bg-stone-200 text-stone-700";

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(detail.location || "Dhaka, Bangladesh")}`;

  // Fetch the current user's join status for this event on mount
  useEffect(() => {
    if (sessionLoading) return;

    const fetchJoinStatus = async () => {
      try {
        const res = await fetch(`/api/events/${detail._id}/join`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        setIsJoined(!!data.joined);
        setJoinCount(typeof data.joinCount === "number" ? data.joinCount : 0);
      } catch {
        /* Join status is optional; fail silently */
      }
    };

    fetchJoinStatus();
  }, [sessionLoading, detail._id]);

  const handleJoin = async () => {
    if (!user) {
      toast.error("Please log in to join this event.");
      router.push("/signIn");
      return;
    }

    if (isJoined) {
      toast.info(`You've left "${detail.title}".`);
      setIsJoined(false);
      setJoinCount((prev) => Math.max(0, prev - 1));
      return;
    }

    try {
      const res = await fetch(`/api/events/${detail._id}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to join event");
      }

      toast.success(`You're going to "${detail.title}" — see you there!`);
      setIsJoined(true);
      setJoinCount(typeof data.joinCount === "number" ? data.joinCount : 0);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to join event",
      );
    }
  };

  const handleSave = () => {
    setIsSaved((saved) => {
      toast.info(
        saved
          ? `"${detail.title}" removed from your saved events.`
          : `"${detail.title}" saved for later.`,
      );

      return !saved;
    });
  };

  return (
    <>
      {/* Hero banner */}
      <div className="relative h-64 w-full sm:h-72 md:h-80">
        {detail.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={detail.thumbnailUrl}
            alt={detail.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-emerald-900" />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 pb-5">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <Link
              href="/events"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-white transition hover:text-emerald-300"
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              Back to Events
            </Link>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
          {/* Main column */}
          <main>
            {/* Title + actions */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-3xl font-bold text-[#0b3b2e] sm:text-4xl">
                  {detail.title}
                </h1>

                <span
                  className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${pill}`}
                >
                  {detail.eventType}
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={handleJoin}
                  disabled={sessionLoading}
                  className={`rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-sm transition ${
                    isJoined
                      ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-600/40 hover:bg-emerald-200"
                      : "bg-emerald-700 hover:bg-emerald-800"
                  }`}
                >
                  {isJoined ? `You're Going ✓` : `Join Event`}
                  {joinCount > 0 && (
                    <span className="ml-2 text-xs opacity-80">({joinCount})</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  aria-label={isSaved ? "Saved" : "Save event"}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-500 shadow-sm transition hover:border-emerald-600 hover:text-emerald-700"
                >
                  <Bookmark
                    size={18}
                    className={
                      isSaved ? "fill-emerald-700 text-emerald-700" : ""
                    }
                  />
                </button>
              </div>
            </div>

            {/* Meta rows */}
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-600">
              <span className="flex items-center gap-2">
                <MapPin size={16} className="shrink-0 text-emerald-700" />
                {detail.location || "Location to be announced"}
              </span>

              <span className="flex items-center gap-2">
                <CalendarDays size={16} className="shrink-0 text-emerald-700" />
                {formatDetailDate(detail.eventDate)}
              </span>

              <span className="flex items-center gap-2">
                <Clock size={16} className="shrink-0 text-emerald-700" />
                {detail.time}
              </span>
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-600">
              <span className="flex items-center gap-2">
                <Users size={16} className="shrink-0 text-emerald-700" />
                <span className="font-semibold text-[#0b3b2e]">
                  {!sessionLoading ? joinCount : detail.attendees} going
                </span>
              </span>

              {daysLeft && (
                <span className="flex items-center gap-2">
                  <Clock size={16} className="shrink-0 text-emerald-700" />
                  {daysLeft}
                </span>
              )}
            </div>

            <hr className="mt-7 border-stone-200" />

            {/* About */}
            <section className="mt-7">
              <h2 className="text-xl font-bold text-[#0b3b2e]">
                About This Event
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
                {detail.description ||
                  "More details about this event coming soon."}
              </p>
            </section>

            {/* Highlights */}
            <section className="mt-8">
              <h2 className="text-xl font-bold text-[#0b3b2e]">
                Event Highlights
              </h2>
              <ul className="mt-4 space-y-3">
                {detail.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-sm text-stone-600 sm:text-base"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>

            <hr className="mt-7 border-stone-200" />

            {/* Organizer */}
            <section className="mt-6">
              <h2 className="text-lg font-bold text-[#0b3b2e]">Organizer</h2>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {detail.organizer.photoUrl ? (
                    <Image
                      src={detail.organizer.photoUrl}
                      alt={detail.organizer.name}
                      className="h-12 w-12 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-800">
                      {detail.organizer.name.charAt(0).toUpperCase()}
                    </span>
                  )}

                  <div>
                    <p className="font-semibold text-stone-900">
                      {detail.organizer.name}
                    </p>

                    {detail.organizer.email && (
                      <p className="text-sm text-stone-500">
                        {detail.organizer.email}
                      </p>
                    )}
                  </div>
                </div>

                {detail.organizer.email ? (
                  <a
                    href={`mailto:${detail.organizer.email}`}
                    className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
                  >
                    Contact
                  </a>
                ) : (
                  <span className="rounded-lg border border-stone-200 bg-stone-50 px-5 py-2.5 text-sm font-semibold text-stone-400">
                    Contact unavailable
                  </span>
                )}
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="mt-12 lg:mt-0">
            <div className="space-y-7 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              {/* Event type */}
              <section>
                <h3 className="flex items-center gap-2 text-sm font-bold text-[#0b3b2e]">
                  <Tag size={15} className="text-emerald-700" />
                  Event Type
                </h3>
                <span
                  className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${pill}`}
                >
                  {detail.eventType}
                </span>
              </section>

              {/* Location */}
              <section>
                <h3 className="flex items-center gap-2 text-sm font-bold text-[#0b3b2e]">
                  <MapPin size={15} className="text-emerald-700" />
                  Location
                </h3>
                <p className="mt-3 text-sm text-stone-600">
                  {detail.location || "Location to be announced"}
                </p>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2.5 inline-block rounded-md border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50"
                >
                  View Map
                </a>
              </section>

              {/* Date & time */}
              <section>
                <h3 className="flex items-center gap-2 text-sm font-bold text-[#0b3b2e]">
                  <CalendarDays size={15} className="text-emerald-700" />
                  Date &amp; Time
                </h3>
                <p className="mt-3 text-sm text-stone-600">
                  {formatDetailDate(detail.eventDate)}
                </p>
                <p className="mt-1 text-sm font-semibold text-stone-700">
                  {getTimeRange(detail)}
                </p>
              </section>

              {/* Attendees */}
              <section>
                <h3 className="flex items-center gap-2 text-sm font-bold text-[#0b3b2e]">
                  <Users size={15} className="text-emerald-700" />
                  Attendees
                </h3>
                <p className="mt-3 text-sm font-semibold text-emerald-700">
                  {detail.attendees} going
                </p>

                <div className="mt-2.5 flex items-center">
                  <div className="flex -space-x-2">
                    {detail.attendeeAvatars.length > 0
                      ? detail.attendeeAvatars
                          .slice(0, 3)
                          .map((avatar) => (
                            <Image
                              key={avatar}
                              src={avatar}
                              alt="Attendee"
                              className="h-7 w-7 rounded-full object-cover ring-2 ring-white"
                            />
                          ))
                      : AVATAR_FALLBACKS.slice(0, 3).map((style, i) => (
                          <span
                            key={i}
                            className={`h-7 w-7 rounded-full ring-2 ring-white ${style}`}
                          />
                        ))}

                    <span className="ml-2 inline-flex h-7 items-center rounded-full bg-emerald-100 px-2 text-[10px] font-semibold text-emerald-800">
                      +10
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
