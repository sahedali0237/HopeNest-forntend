"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
} from "lucide-react";
import { useCarousel } from "@/components/ui/carousel";
import { toast } from "react-toastify";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { EventData } from "@/app/events/events-data";
import Image from "next/image";

const TYPE_STYLES: Record<string, string> = {
  Cleanup: "bg-emerald-600",
  Donation: "bg-orange-500",
  Plantation: "bg-lime-600",
};
const OTHER_STYLE = "bg-rose-600";

const getBadgeStyle = (type: string) => TYPE_STYLES[type] ?? OTHER_STYLE;

const formatDate = (date: string) => {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Date to be announced";

  const day = parsed.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  if (parsed.getHours() === 0 && parsed.getMinutes() === 0) return day;

  const time = parsed.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${day} · ${time}`;
};

const goingCount = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) % 997;
  }
  return 12 + (hash % 38);
};

type Props = {
  events: EventData[];
};

const CarouselNav = () => {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel();

  const base =
    "absolute top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-md transition hover:border-emerald-700 hover:text-emerald-800";

  return (
    <>
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Previous events"
        className={`${base} -left-4 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Next events"
        className={`${base} -right-4 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <ChevronRight size={18} />
      </button>
    </>
  );
};

export default function UpcomingEvents({ events }: Props) {
  const [autoplay] = useState(() =>
    Autoplay({ delay: 3500, stopOnInteraction: true }),
  );

  const pause = useCallback(() => autoplay.stop(), [autoplay]);
  const play = useCallback(() => autoplay.play(), [autoplay]);

  return (
    <section className="bg-[#F5F5F0]">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0b3b2e] sm:text-3xl">
              Upcoming Events
            </h2>
            <p className="mt-1.5 text-sm text-stone-500 sm:text-base">
              Join hands near you — here&apos;s what&apos;s happening next.
            </p>
          </div>

          <Link
            href="/events"
            className="group flex shrink-0 items-center gap-1 text-sm font-semibold text-emerald-800 transition hover:text-emerald-600"
          >
            View All
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="rounded-xl border border-stone-200 bg-white px-6 py-14 text-center">
            <p className="text-lg font-semibold text-stone-900">
              No upcoming events yet
            </p>
            <p className="mt-1 text-sm text-stone-500">
              Check back soon, or head to the events page to create one.
            </p>
          </div>
        ) : (
          <Carousel
            opts={{ align: "start", loop: events.length > 2 }}
            plugins={[autoplay]}
            className="relative"
            onMouseEnter={pause}
            onMouseLeave={play}
          >
            <CarouselContent className="-ml-5">
              {events.map((event) => (
                <CarouselItem
                  key={event._id}
                  className="basis-full pl-5 sm:basis-1/2 lg:basis-1/3"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
                    <Link href={`/events/${event._id}`} className="block">
                      <div className="relative h-44 w-full bg-stone-100">
                        {event.thumbnailUrl ? (
                          <Image
                            src={event.thumbnailUrl}
                            alt={event.title}
                            width={800}
                            height={533}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-stone-400">
                            No image available
                          </div>
                        )}

                        <span
                          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm ${getBadgeStyle(event.eventType)}`}
                        >
                          {event.eventType}
                        </span>
                      </div>
                    </Link>

                    {/* Card Body */}
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <h3 className="font-semibold text-stone-900">
                        {event.title}
                      </h3>

                      <p className="mt-2.5 flex items-center gap-2 text-sm text-stone-600">
                        <MapPin
                          size={15}
                          className="shrink-0 text-emerald-700"
                        />
                        {event.location || "Location to be announced"}
                      </p>

                      <p className="mt-1.5 flex items-center gap-2 text-sm break-broken-words text-stone-600">
                        <CalendarDays
                          size={15}
                          className="shrink-0 text-emerald-700"
                        />
                        {formatDate(event.eventDate)}
                      </p>

                      <Link
                        href={`/events/${event._id}`}
                        className="mt-5 block w-full rounded-md bg-emerald-700 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-emerald-800"
                      >
                        View Event
                      </Link>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselNav />
          </Carousel>
        )}
      </div>
    </section>
  );
}
