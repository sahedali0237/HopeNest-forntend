import EventsClient from "./events-client";
import { normalizeEvent, type EventData } from "./events-data";
import { getEventDocuments } from "./events-db";

/* Rendered per request so the list always reflects the database — the first
   render must never serve a cached empty/failed result. */
export const dynamic = "force-dynamic";

export default async function EventsPage({
  searchParams,
}: PageProps<"/events">) {
  const { filter, search } = await searchParams;

  let fetchFailed = false;
  let events: EventData[] = [];

  try {
    // Same data source as the browser-side "Try Again" fetch (/api/events),
    // but read directly so no relative server-side fetch can fail.
    const docs = await getEventDocuments();
    events = docs.map((doc) => normalizeEvent(doc as Partial<EventData>));
  } catch (error) {
    // Full stack in the terminal so any failure prints its exact reason.
    console.error(
      "[events] Failed to load events:",
      error instanceof Error ? error.stack : error,
    );
    fetchFailed = true;
  }

  return (
    <EventsClient
      initialEvents={events}
      fetchFailed={fetchFailed}
      initialFilter={typeof filter === "string" ? filter : undefined}
      initialSearch={typeof search === "string" ? search : undefined}
    />
  );
}
