import Hero from "@/components/ui/hero";
import InfoSection from "@/components/ui/info-section";
import UpcomingEvents from "@/components/ui/upcoming-events";
import { API_URL, normalizeEvent, type EventData } from "./events/events-data";

/** How far ahead the homepage carousel previews events */
const PREVIEW_LIMIT = 9;

export default async function Home() {
  let locations: string[] = [];
  let upcoming: EventData[] = [];

  try {
    const res = await fetch(API_URL, { cache: "no-store" });

    if (res.ok) {
      const data = await res.json();

      if (Array.isArray(data)) {
        const events = data.map(normalizeEvent);

        locations = [
          ...new Set(
            events
              .map((event: EventData) => event.location)
              .filter(Boolean),
          ),
        ];

        /* Only events dated today or later, soonest first */
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayTime = todayStart.getTime();

        upcoming = events
          .filter((event: EventData) => {
            const time = new Date(event.eventDate).getTime();
            return !Number.isNaN(time) && time >= todayTime;
          })
          .sort((a: EventData, b: EventData) =>
            a.eventDate.localeCompare(b.eventDate),
          )
          .slice(0, PREVIEW_LIMIT);
      }
    }
  } catch {
    /* Hero falls back to "All Locations" when the API is unreachable */
  }

  return (
    <>
      <Hero locations={locations} />
      <UpcomingEvents events={upcoming} />
      <InfoSection />
    </>
  );
}
