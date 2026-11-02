import { notFound } from "next/navigation";
import EventDetail from "./event-detail";
import { API_URL } from "../events-data";
import {
  getDaysLeft,
  normalizeEventDetail,
  type EventDetailData,
} from "./detail-data";

/** Single-event lookup via the detail endpoint ("GET /events/:id"). */
const fetchEventById = async (id: string): Promise<EventDetailData | null> => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { cache: "no-store", credentials: "include" });

    if (!res.ok) return null;

    const data = await res.json();

    if (data && !Array.isArray(data) && typeof data === "object" && "_id" in data) {
      return normalizeEventDetail(data as EventDetailData);
    }
  } catch {
    /* Fall through to the list lookup */
  }

  return null;
};

/* Fallback lookup: the list endpoint returns full event documents, so when the
   backend has no detail route yet, match the requested _id in the response. */
const fetchEventFromList = async (
  id: string,
): Promise<EventDetailData | null> => {
  try {
    const res = await fetch(API_URL, { cache: "no-store", credentials: "include" });

    if (!res.ok) return null;

    const data = await res.json();

    if (!Array.isArray(data)) return null;

    const match = data.find(
      (event) => event && String(event._id) === id,
    );

    return match ? normalizeEventDetail(match) : null;
  } catch {
    return null;
  }
};

export default async function EventDetailPage({
  params,
}: PageProps<"/events/[id]">) {
  const { id } = await params;

  const detail = (await fetchEventById(id)) ?? (await fetchEventFromList(id));

  if (!detail) notFound();

  return <EventDetail detail={detail} daysLeft={getDaysLeft(detail.eventDate)} />;
}
