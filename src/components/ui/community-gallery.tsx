import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Sprout } from "lucide-react";

/* Gallery snapshots reused from Unsplash (host whitelisted in next.config.ts) */
const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=900&auto=format&fit=crop",
    alt: "Volunteers packing food donations at a community event",
  },
  {
    src: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=800&auto=format&fit=crop",
    alt: "Volunteers distributing meals to families in need",
  },
  {
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop",
    alt: "Community members cleaning a public park together",
  },
  {
    src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=900&auto=format&fit=crop",
    alt: "Volunteers working together to support their community",
  },
];

export default function CommunityGallery() {
  return (
    <section className="bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8 lg:py-16">
        {/* Section header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="pb-1 text-2xl font-bold text-foreground sm:text-3xl">
              Community Gallery
            </h2>
            <span className="block h-1 w-24 rounded-full bg-emerald-600" />
          </div>

          <Link
            href="/events"
            className="group flex shrink-0 items-center gap-1 text-sm font-semibold text-emerald-700 transition hover:text-emerald-600"
          >
            View All
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={image.src}
              className={`group relative overflow-hidden rounded-xl bg-stone-200 shadow-sm ${
                index % 2 === 1 ? "lg:mt-6" : ""
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                loading={index > 1 ? "lazy" : "eager"}
                className="aspect-4/3 h-auto w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Newsletter callout */}
        <div className="relative mt-12 overflow-visible rounded-2xl border border-border bg-card px-6 py-10 shadow-sm sm:px-10 lg:mt-16">
          {/* Decorative leaves */}
          <Leaf
            size={44}
            aria-hidden
            className="absolute -right-4 -top-5 rotate-120 text-emerald-300"
          />
          <Leaf
            size={32}
            aria-hidden
            className="absolute -right-8 top-3 rotate-70 text-emerald-200"
          />
          <Sprout
            size={48}
            aria-hidden
            className="absolute -bottom-6 -left-3 -rotate-35 text-emerald-200"
          />

          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Copy */}
            <div className="flex max-w-md items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="h-6 w-6 text-white"
                >
                  <rect width="20" height="16" x="2" y="4" rx="3" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>

              <div>
                <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                  Stay Updated
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
                  Get the latest events, stories, and opportunities delivered to
                  your inbox.
                </p>
              </div>
            </div>

            {/* Subscribe form */}
            <form className="flex w-full max-w-md items-center gap-2">
              <div className="relative flex-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  aria-hidden
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
                >
                  <rect width="20" height="16" x="2" y="4" rx="3" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  aria-label="Enter your email address"
                  className="w-full min-w-0 rounded-lg border border-border bg-card py-3 pl-10 pr-3 text-sm text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/40"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
