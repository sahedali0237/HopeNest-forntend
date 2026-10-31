import EventsClient from "./events-client";
import { API_URL, normalizeEvent, type EventData } from "./events-data";

export default async function EventsPage() {
  let fetchFailed = false;
  let events: EventData[] = [];

  try {
    const res = await fetch(API_URL);

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

  return <EventsClient initialEvents={events} fetchFailed={fetchFailed} />;
}
