"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const EVENT_TYPES = ["All Types", "Plantation", "Donation", "Cleanup"];

type Props = {
  /** Locations harvested from the events API, shown in the location dropdown. */
  locations: string[];
};

const Hero = ({ locations }: Props) => {
  const router = useRouter();
  const [location, setLocation] = useState("All Locations");
  const [eventType, setEventType] = useState("All Types");

  const exploreEvents = () => {
    const params = new URLSearchParams();

    if (eventType !== "All Types") params.set("filter", eventType);
    if (location !== "All Locations") params.set("search", location);

    const query = params.toString();
    router.push(query ? `/events?${query}` : "/events");
  };

  const selectClass =
    "w-full appearance-none rounded-lg border border-border bg-muted py-2.5 pl-4 pr-9 text-sm font-medium text-foreground outline-none transition-colors hover:border-primary focus:border-primary focus:bg-card";

  return (
    <section className="relative overflow-hidden">
      {/* Background wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/70 via-yellow-50 to-orange-100/60" />
      <div className="absolute -top-24 -left-32 size-[28rem] rounded-full bg-emerald-200/50 blur-3xl" />
      <div className="absolute top-10 right-1/3 size-80 rounded-full bg-yellow-200/50 blur-3xl" />
      <div className="absolute -bottom-40 right-0 size-[26rem] rounded-full bg-orange-200/50 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Copy + Search & Filter */}
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              Empower Your Community, Create Lasting Change
            </h1>

            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Cheerful volunteers empowering the community — site cleanups,
              donation drives and planting saplings in the field.
            </p>

            <div className="mt-8 rounded-2xl bg-card p-5 sm:p-6 shadow-xl shadow-emerald-900/10 ring-1 ring-border">
              <p className="text-sm font-bold text-foreground">
                Search & Filter
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 sm:max-w-40">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={selectClass}
                    aria-label="Filter by location"
                  >
                    <option value="All Locations">Location</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>

                <div className="relative flex-1">
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className={selectClass}
                    aria-label="Filter by event type"
                  >
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type === "All Types" ? "Event Type" : type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>

                <button
                  onClick={exploreEvents}
                  className="shrink-0 rounded-lg bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 shadow-sm shadow-emerald-900/20"
                >
                  Explore Events
                </button>
              </div>
            </div>
          </div>

          {/* Right: Photo collage */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-lg h-[24rem] sm:h-[27rem] lg:h-[30rem]">
            {/* Purple wavy blob */}
            <svg
              viewBox="0 0 220 150"
              className="absolute -bottom-2 left-2 w-56 lg:w-64 text-purple-500"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M42 132 C12 122 2 92 12 66 C22 38 58 16 90 24 C120 32 158 16 184 36 C206 52 208 84 186 104 C160 126 128 112 102 124 C80 134 62 138 42 132 Z" />
            </svg>

            {/* Grass / plant sprig */}
            <svg
              viewBox="0 0 60 40"
              className="absolute bottom-6 left-6 w-14 text-lime-600"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4 40 C10 22 18 14 30 10 C22 20 18 28 16 40 Z M18 40 C24 26 34 18 48 14 C38 24 32 30 30 40 Z M12 40 C14 30 12 24 6 18 C12 24 16 30 20 40 Z" />
            </svg>

            {/* Main photo */}
            <div className="absolute left-0 top-20 w-[62%] rotate-[-4deg] overflow-hidden rounded-2xl border-8 border-white shadow-2xl shadow-emerald-900/20">
              <Image
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=80"
                alt="Volunteers handing out donated blankets"
                width={680}
                height={480}
                className="h-auto w-full object-cover"
                priority
              />
            </div>

            {/* Top-right photo */}
            <div className="absolute right-0 top-8 w-[38%] rotate-[5deg] overflow-hidden rounded-2xl border-8 border-white shadow-2xl shadow-emerald-900/20">
              <Image
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=700&q=80"
                alt="Planting a sapling"
                width={480}
                height={360}
                className="h-auto w-full object-cover"
              />
            </div>

            {/* Bottom-right photo */}
            <div className="absolute right-4 bottom-20 w-[36%] rotate-[-3deg] overflow-hidden rounded-2xl border-8 border-white shadow-2xl shadow-emerald-900/20">
              <Image
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=700&q=80"
                alt="Community members working in the field"
                width={480}
                height={360}
                className="h-auto w-full object-cover"
              />
            </div>

            {/* Online badge */}
            <div className="absolute right-6 -top-1 inline-flex rotate-2 items-center gap-1.5 rounded-full bg-emerald-950 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg ring-1 ring-white/20">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
              Online badge
            </div>

            {/* How it Works */}
            <Link
              href="/about"
              className="absolute right-0 bottom-2 rotate-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/40 transition hover:-translate-y-0.5 hover:bg-orange-400"
            >
              How it Works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
