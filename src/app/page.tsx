import Hero from "@/components/ui/hero";
import InfoSection from "@/components/ui/info-section";
import CommunityGallery from "@/components/ui/community-gallery";
import UpcomingEvents from "@/components/ui/upcoming-events";
import { normalizeEvent, type EventData } from "./events/events-data";
import { getEventDocuments } from "./events/events-db";

/** How far ahead the homepage carousel previews events */
const PREVIEW_LIMIT = 9;

/* Events are read from MongoDB per request — never prerendered, so a failed
   or empty first render can't be cached into the page. */
export const dynamic = "force-dynamic";

export default async function Home() {
  let locations: string[] = [];
  let upcoming: EventData[] = [];

  try {
    const docs = await getEventDocuments();
    const events = docs.map((doc) => normalizeEvent(doc as Partial<EventData>));

    locations = [
      ...new Set(events.map((event) => event.location).filter(Boolean)),
    ];

    /* Only events dated today or later, soonest first */
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayTime = todayStart.getTime();

    upcoming = events
      .filter((event) => {
        const time = new Date(event.eventDate).getTime();
        return !Number.isNaN(time) && time >= todayTime;
      })
      .sort((a, b) => a.eventDate.localeCompare(b.eventDate))
      .slice(0, PREVIEW_LIMIT);
  } catch (error) {
    // Full stack in the terminal so an empty carousel always shows its cause.
    console.error(
      "[home] Failed to load upcoming events:",
      error instanceof Error ? error.stack : error,
    );
  }

  return (
    <>
      <Hero locations={locations} />
      <UpcomingEvents events={upcoming} />
      <InfoSection />
      <CommunityGallery />
    </>
  );
}
