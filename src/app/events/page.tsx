import EventsClient from "./events-client";
import { API_URL, normalizeEvent, type EventData } from "./events-data";

export default async function EventsPage({
  searchParams,
}: PageProps<"/events">) {
  const { filter, search } = await searchParams;

  let fetchFailed = false;
  let events: EventData[] = [];

  try {
    const res = await fetch(API_URL, { cache: "no-store", credentials: "include" });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Unexpected response from the events server");
    }

    events = data.map(normalizeEvent);
  } catch {
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
