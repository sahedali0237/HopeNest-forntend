"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  RefreshCcw,
  Search,
} from "lucide-react";
import { API_URL, normalizeEvent, type EventData } from "./events-data";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import Image from "next/image";

const EVENTS_PER_PAGE = 6;

type BadgeStyle = {
  badge: string;
  chipActive: string;
};

/* Per-type badge (card) + active chip (filter) colors */
const TYPE_STYLES: Record<string, BadgeStyle> = {
  Cleanup: {
    badge: "bg-emerald-600",
    chipActive: "bg-emerald-700 border-emerald-700 text-white",
  },
  Donation: {
    badge: "bg-orange-500",
    chipActive: "bg-orange-600 border-orange-600 text-white",
  },
  Plantation: {
    badge: "bg-lime-600",
    chipActive: "bg-lime-700 border-lime-700 text-white",
  },
};

const OTHER_STYLE: BadgeStyle = {
  badge: "bg-rose-600",
  chipActive: "bg-stone-800 border-stone-800 text-white",
};

const getBadgeStyle = (type: string): BadgeStyle =>
  TYPE_STYLES[type] ?? OTHER_STYLE;

const formatDate = (date: string) => {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Date to be announced";

  return parsed.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/* Returns true when the event date has already passed (start of today). */
const isPastEvent = (eventDate: string) => {
  const parsed = new Date(eventDate);
  if (Number.isNaN(parsed.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parsed < today;
};

type Props = {
  initialEvents: EventData[];
  fetchFailed: boolean;
  initialFilter?: string;
  initialSearch?: string;
};

export default function EventsClient({
  initialEvents,
  fetchFailed,
  initialFilter,
  initialSearch,
}: Props) {
  const [refetched, setRefetched] = useState<EventData[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(
    fetchFailed
      ? "Unable to reach the events server. Please make sure it is running."
      : null,
  );

  const validFilters = ["All", "Cleanup", "Donation", "Plantation", "Other"];
  const [activeFilter, setActiveFilter] = useState(
    initialFilter && validFilters.includes(initialFilter)
      ? initialFilter
      : "All",
  );
  const [searchQuery, setSearchQuery] = useState(initialSearch ?? "");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);

  const events = useMemo(
    () => (refetched ?? initialEvents).map(normalizeEvent),
    [initialEvents, refetched],
  );

  /* Counts for the filter chips */
  const typeCounts = useMemo(() => {
    const counts = {
      total: 0,
      Cleanup: 0,
      Donation: 0,
      Plantation: 0,
      other: 0,
    };

    events.forEach((event) => {
      counts.total += 1;

      if (event.eventType in TYPE_STYLES) {
        counts[event.eventType as "Cleanup" | "Donation" | "Plantation"] += 1;
      } else {
        counts.other += 1;
      }
    });

    return counts;
  }, [events]);

  const filters = useMemo(
    () => [
      {
        name: "All",
        count: typeCounts.total,
        style: "bg-emerald-800 border-emerald-800 text-white",
      },
      {
        name: "Cleanup",
        count: typeCounts.Cleanup,
        style: TYPE_STYLES.Cleanup.chipActive,
      },
      {
        name: "Donation",
        count: typeCounts.Donation,
        style: TYPE_STYLES.Donation.chipActive,
      },
      {
        name: "Plantation",
        count: typeCounts.Plantation,
        style: TYPE_STYLES.Plantation.chipActive,
      },
      {
        name: "Other",
        count: typeCounts.other,
        style: OTHER_STYLE.chipActive,
      },
    ],
    [typeCounts],
  );

  /* Filter → search → sort chain */
  const visibleEvents = useMemo(() => {
    let result = events.filter((event) => !isPastEvent(event.eventDate));

    result = result.filter((event) => {
      if (activeFilter === "All") return true;
      if (activeFilter === "Other") return !(event.eventType in TYPE_STYLES);

      return event.eventType === activeFilter;
    });

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query),
      );
    }

    result.sort((a, b) =>
      sortBy === "latest"
        ? a.eventDate.localeCompare(b.eventDate)
        : b.eventDate.localeCompare(a.eventDate),
    );

    return result;
  }, [events, activeFilter, searchQuery, sortBy]);

  /* Pagination */
  const totalPages = Math.max(
    1,
    Math.ceil(visibleEvents.length / EVENTS_PER_PAGE),
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedEvents = useMemo(
    () =>
      visibleEvents.slice(
        (safePage - 1) * EVENTS_PER_PAGE,
        safePage * EVENTS_PER_PAGE,
      ),
    [visibleEvents, safePage],
  );

  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (safePage <= 3) {
      return [1, 2, 3, 4, "…", totalPages];
    }

    if (safePage >= totalPages - 2) {
      return [
        1,
        "…",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [1, "…", safePage, "…", totalPages];
  }, [totalPages, safePage]);

  /* Handlers reset the page directly — no effect needed */
  const applyFilter = (name: string) => {
    setActiveFilter(name);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  // Runs only from user clicks — a client-side fallback in case the
  // server-side fetch at page load failed.
  const refetchEvents = async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const res = await fetch(API_URL, { credentials: "include" });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected response from the events server");
      }

      setRefetched(data.map(normalizeEvent));
    } catch (err: unknown) {
      setLoadError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading events",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Hero Banner */}
      <section
        className="relative flex flex-col justify-end bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-emerald-950/60 via-emerald-900/40 to-emerald-950/20" />

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20">
          <p className="mb-2 text-sm font-medium uppercase tracking-[3px] text-emerald-200">
            HopeNest Community
          </p>

          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Upcoming Events
          </h1>

          <p className="mt-2 text-sm text-emerald-50/90 sm:text-base">
            Discover and join meaningful events in your community.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Filter Chips */}
        <div className="mb-6 flex flex-wrap gap-2.5">
          {filters.map((filter) => (
            <button
              key={filter.name}
              onClick={() => applyFilter(filter.name)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeFilter === filter.name
                  ? filter.style
                  : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {filter.name} ({filter.count})
            </button>
          ))}
        </div>

        {/* Search + Sort */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative sm:max-w-xs sm:flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="block w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="rounded-full border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="latest">Sort by: Latest</option>
            <option value="oldest">Sort by: Oldest</option>
          </select>
        </div>

        {/* Error State */}
        {loadError && !isLoading ? (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card px-6 py-16 text-center">
            <AlertCircle size={40} className="text-destructive" />

            <div>
              <p className="font-semibold text-foreground">
                Failed to load events
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{loadError}</p>
            </div>

            <button
              onClick={refetchEvents}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              <RefreshCcw size={15} />
              Try Again
            </button>
          </div>
        ) : isLoading ? (
          /* Loading State */
          <div className="max-w-7xl mx-auto">
            <LoadingSkeleton count={6} />
          </div>
        ) : paginatedEvents.length === 0 ? (
          /* Empty State */
          <div className="rounded-xl border border-border bg-card px-6 py-16 text-center">
            <p className="text-lg font-semibold text-foreground">
              No events found
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different filter or search term, or create your own event.
            </p>
          </div>
        ) : (
          /* Events Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedEvents.map((event) => {
              const badgeStyle = getBadgeStyle(event.eventType);

              return (
                <article
                  key={event._id}
                  className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Thumbnail + Type Badge */}
                  <div className="relative h-44 w-full bg-muted">
                    {event.thumbnailUrl ? (
                      <Link
                        href={`/events/${event._id}`}
                        aria-label={event.title}
                        className="group/img block h-full w-full"
                      >
                        <Image
                          src={event.thumbnailUrl}
                          alt={event.title}
                          width={800}
                          height={533}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-300 group-hover/img:scale-105"
                        />
                      </Link>
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No image available
                      </div>
                    )}

                    <span
                      className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm ${badgeStyle.badge}`}
                    >
                      {event.eventType}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="font-semibold text-foreground">
                      {event.title}
                    </h3>

                    <p className="mt-2.5 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={15} className="shrink-0 text-primary" />
                      {event.location || "Location to be announced"}
                    </p>

                    <p className="mt-1.5 flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays
                        size={15}
                        className="shrink-0 text-primary"
                      />
                      {formatDate(event.eventDate)}
                    </p>

                    <Link
                      href={`/events/${event._id}`}
                      className="mt-auto block pt-5"
                    >
                      <span className="block w-full rounded-md bg-emerald-700 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-emerald-800">
                        View Event
                      </span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!loadError && !isLoading && totalPages > 1 && (
          <nav className="mt-10 flex items-center justify-center gap-1.5">
            <button
              onClick={() => setCurrentPage(safePage - 1)}
              disabled={safePage === 1}
              aria-label="Previous page"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={17} />
            </button>

            {pageNumbers.map((page, index) =>
              page === "…" ? (
                <span key={`ellipsis-${index}`} className="px-1 text-muted-foreground">
                  …
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(Number(page))}
                  aria-current={safePage === page ? "page" : undefined}
                  className={`h-9 w-9 rounded-full border text-sm font-medium transition ${
                    safePage === page
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              onClick={() => setCurrentPage(safePage + 1)}
              disabled={safePage === totalPages}
              aria-label="Next page"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={17} />
            </button>
          </nav>
        )}
      </section>
    </div>
  );
}
