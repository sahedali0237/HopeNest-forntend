import { notFound } from "next/navigation";
import EventDetail from "./event-detail";
import { getEventDocument } from "../events-db";
import {
  getDaysLeft,
  normalizeEventDetail,
  type EventDetailData,
} from "./detail-data";

/* Rendered per request — the event is read straight from MongoDB instead of
   fetching `/api/events/:id` with a relative URL (which Node's fetch rejects). */
export const dynamic = "force-dynamic";

export default async function EventDetailPage({
  params,
}: PageProps<"/events/[id]">) {
  const { id } = await params;

  let doc: Awaited<ReturnType<typeof getEventDocument>> = null;

  try {
    // One lookup covers both the old detail endpoint and the list fallback:
    // invalid ids return null without hitting the database.
    doc = await getEventDocument(id);
  } catch (error) {
    console.error(
      `[event-detail] Failed to load event ${id}:`,
      error instanceof Error ? error.stack : error,
    );
  }

  if (!doc) notFound();

  const detail = normalizeEventDetail(doc as Partial<EventDetailData>);

  return <EventDetail detail={detail} daysLeft={getDaysLeft(detail.eventDate)} />;
}
