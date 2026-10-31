import { clean, type EventData } from "../events-data";

type EventOrganizer = {
  name: string;
  email: string;
  photoUrl?: string;
};

/** Everything the details page renders; extends the list-page shape. */
type EventDetailData = EventData & {
  time: string;
  endTime: string;
  highlights: string[];
  organizer: EventOrganizer;
  /** How many volunteers are going. */
  attendees: number;
  /** Headshots for the attendee avatar stack (optional). */
  attendeeAvatars: string[];
};

/* Fallback highlights per event type — used whenever the API does not send
   a "highlights" array for that event. */
const HIGHLIGHTS_BY_TYPE: Record<string, string[]> = {
  Cleanup: [
    "Clean public spaces",
    "Waste collection & recycling",
    "Awareness session on environmental care",
    "Refreshments for volunteers",
  ],
  Donation: [
    "Support families and causes in urgent need",
    "Give what you can — every contribution counts",
    "Transparent collection and distribution of donations",
    "Refreshments for volunteers",
  ],
  Plantation: [
    "Plant trees and grow a greener community",
    "Saplings, tools, and gloves provided on-site",
    "Learn basic tree-care tips from the organizers",
    "Refreshments for volunteers",
  ],
};

/* Universal fallback for any other / unknown event type */
const UNIVERSAL_HIGHLIGHTS = [
  "Open to all — no experience required",
  "Meet like-minded volunteers in your community",
  "Everything you need is provided on-site",
  "Certificate of participation for volunteers",
];

const cleanList = (values: unknown): string[] | null => {
  if (!Array.isArray(values)) return null;

  const cleaned = values.map((value) => clean(String(value))).filter(Boolean);

  return cleaned.length > 0 ? cleaned : null;
};

const normalizeEventDetail = (
  event: Partial<EventDetailData>,
): EventDetailData => {
  const { organizer, attendees } = event;
  const eventType = clean(event.eventType) || "Other";

  return {
    _id: String(event._id ?? Math.random().toString(36).slice(2)),
    title: clean(event.title),
    description: clean(event.description),
    eventType,
    thumbnailUrl: clean(event.thumbnailUrl),
    location: clean(event.location),
    eventDate: clean(event.eventDate),
    time: clean(event.time) || "08:00 AM",
    endTime: clean(event.endTime) || "12:00 PM",
    highlights:
      cleanList(event.highlights) ??
      HIGHLIGHTS_BY_TYPE[eventType] ??
      UNIVERSAL_HIGHLIGHTS,
    organizer:
      typeof organizer === "object" && organizer !== null
        ? {
            name: clean(organizer.name) || "HopeNest Organizer",
            email: clean(organizer.email),
            photoUrl: clean(organizer.photoUrl) || undefined,
          }
        : { name: "HopeNest Organizer", email: "" },
    attendees:
      typeof attendees === "number" && !Number.isNaN(attendees)
        ? attendees
        : 24,
    attendeeAvatars: cleanList(event.attendeeAvatars) ?? [],
  };
};

/* "Dec 20, 2025" style (no weekday) for the details page */
const formatDetailDate = (date: string) => {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Date to be announced";

  return parsed.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getTimeRange = (detail: EventDetailData) =>
  detail.endTime ? `${detail.time} - ${detail.endTime}` : detail.time;

/* "3 days left" computed from the event date; done here (not in the client
   component) to keep server and client renders in sync. */
const getDaysLeft = (date: string) => {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(parsed);
  target.setHours(0, 0, 0, 0);

  const days = Math.round((target.getTime() - today.getTime()) / 86_400_000);

  if (days === 0) return "Today";
  if (days < 0) return "Event ended";

  return days === 1 ? "1 day left" : `${days} days left`;
};

export { formatDetailDate, getDaysLeft, getTimeRange, normalizeEventDetail };
export type { EventDetailData, EventOrganizer };
