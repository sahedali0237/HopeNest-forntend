import Hero from "@/components/ui/hero";
import { API_URL, normalizeEvent, type EventData } from "./events/events-data";

export default async function Home() {
  let locations: string[] = [];

  try {
    const res = await fetch(API_URL, { cache: "no-store" });

    if (res.ok) {
      const data = await res.json();

      if (Array.isArray(data)) {
        locations = [
          ...new Set(
            data
              .map(normalizeEvent)
              .map((event: EventData) => event.location)
              .filter(Boolean),
          ),
        ];
      }
    }
  } catch {
    /* Hero falls back to "All Locations" when the API is unreachable */
  }

  return <Hero locations={locations} />;
}
