const API_URL = "http://localhost:5000/events";

type EventData = {
  _id: string;
  title: string;
  description?: string;
  eventType: string;
  thumbnailUrl: string;
  location: string;
  eventDate: string;
};

const clean = (value: string | undefined) => (value ?? "").trim();

/* The API returns some fields with stray whitespace (user-created data),
   so normalize every record once on the server/ingest side. */
const normalizeEvent = (event: Partial<EventData>): EventData => ({
  _id: String(event._id ?? Math.random().toString(36).slice(2)),
  title: clean(event.title),
  description: clean(event.description),
  eventType: clean(event.eventType) || "Other",
  thumbnailUrl: clean(event.thumbnailUrl),
  location: clean(event.location),
  eventDate: clean(event.eventDate),
});

export { API_URL, clean, normalizeEvent };
export type { EventData };
