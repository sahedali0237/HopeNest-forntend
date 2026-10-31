import Link from "next/link";

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F0] px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-[3px] text-emerald-800">
          HopeNest Community
        </p>

        <h1 className="text-3xl font-semibold text-stone-900">
          Upcoming Community Events
        </h1>

        <p className="mt-3 text-sm text-stone-600">
          No upcoming events have been added yet. Be the first to organize one.
        </p>

        <Link
          href="/create-events"
          className="mt-8 inline-block rounded-md bg-emerald-800 px-5 py-3 font-medium text-white transition hover:bg-emerald-900"
        >
          Create Event
        </Link>
      </div>
    </main>
  );
}
