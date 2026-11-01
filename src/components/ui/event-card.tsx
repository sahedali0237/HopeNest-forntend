"use client";

import Link from "next/link";
import { CalendarDays, Trash, Edit, Eye } from "lucide-react";
import { toast } from "react-toastify";

export interface EventCardProps {
  id: string;
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  thumbnailUrl?: string;
  onViewDetails?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  deleteLabel?: string;
}

export const EventCard = ({
  id,
  title,
  eventType,
  eventDate,
  location,
  thumbnailUrl,
  onViewDetails,
  onEdit,
  onDelete,
  deleteLabel,
}: EventCardProps) => {
  const formatDate = (date: string) => {
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "Date to be announced";
    return parsed.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const typeClasses: Record<string, string> = {
    Cleanup: "bg-emerald-600 text-white",
    Donation: "bg-amber-500 text-white",
    Plantation: "bg-lime-600 text-white",
    Awareness: "bg-blue-600 text-white",
    Healthcare: "bg-red-600 text-white",
    Other: "bg-rose-600 text-white",
  };

  const badgeClass = typeClasses[eventType] ?? typeClasses.Other;

  return (
    <div className="bg-white rounded-lg border border-emerald-200 shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-emerald-300 h-full flex flex-col">
      {/* Thumbnail */}
      <div className="h-44 w-full bg-emerald-50 border-b border-emerald-200 relative">
        {thumbnailUrl ? (
          <Link
            href={`/events/${id}`}
            className="group block h-full w-full"
          >
            <img
              src={thumbnailUrl}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        ) : (
          <div className="flex items-center justify-center h-full text-emerald-400 text-sm">
            No image
          </div>
        )}

        {/* Type badge */}
        <span
          className={`absolute top-3 left-3 rounded-full px-2 py-1 text-xs font-semibold ${badgeClass}`}
        >
          {eventType}
        </span>
      </div>

      {/* Card body */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-medium text-[#1F2937] line-clamp-2 mb-2">
            <Link
              href={`/events/${id}`}
              className="hover:text-emerald-600 transition-colors"
            >
              {title}
            </Link>
          </h3>

        <p className="text-sm text-[#64748B] mb-3 line-clamp-1">
          {location || "Location to be announced"}
        </p>

        <div className="flex items-center gap-2 text-xs text-[#989898] mt-auto">
          <CalendarDays className="w-3 h-3" />
          <span>{formatDate(eventDate)}</span>
        </div>
      </div>

      {/* Action footer (on Manage Events page) */}
      {onViewDetails || onEdit || onDelete ? (
        <div className="p-4 border-t border-emerald-100">
          <div className="flex gap-2">
            {onViewDetails && (
              <Link
                href={`/events/${id}`}
                className="flex-1 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2 text-sm font-medium text-white hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-1.5"
              >
                <Eye className="w-4 h-4" />View Details
              </Link>
            )}

            {onEdit && (
              <button
                onClick={onEdit}
                className="flex-1 rounded-lg bg-white px-4 py-2 text-sm font-medium text-emerald-600 border-2 border-emerald-300 hover:bg-emerald-50 hover:border-emerald-400 hover:shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                <Edit className="w-4 h-4" />Edit
              </button>
            )}

            {onDelete && (
              <button
                onClick={onDelete}
                className="flex-1 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 text-sm font-medium text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-1.5"
              >
                <Trash className="w-4 h-4" />{deleteLabel ?? "Delete"}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};