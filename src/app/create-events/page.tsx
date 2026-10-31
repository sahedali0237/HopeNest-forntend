"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Awareness",
  "Healthcare",
];

const getToday = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const inputStyle =
  "block w-full rounded-md border border-stone-200 bg-white px-4 py-2.5 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800 outline-none transition";

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "",
    thumbnailUrl: "",
    location: "",
    eventDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/create-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save data");
      toast.success("Event created successfully!");
      router.push("/events");
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create event",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl">
        {/* Page Heading */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[3px] text-emerald-800">
            HopeNest Community
          </p>

          <h1 className="text-3xl font-semibold text-stone-900">
            Create an Event
          </h1>

          <p className="mt-3 text-sm text-stone-600">
            Bring people together and make a positive difference.
          </p>
        </div>

        {/* Event Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-9"
        >
          {/* Event Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">
              Event Title
            </label>

            <input
              required
              type="text"
              placeholder="Enter event title"
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">
              Description
            </label>

            <textarea
              required
              rows={4}
              placeholder="Describe your event..."
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">
              Event Type
            </label>

            <select
              required
              value={formData.eventType}
              onChange={(e) => updateField("eventType", e.target.value)}
              className={inputStyle}
            >
              <option value="">Select event type</option>

              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">
              Thumbnail Image URL
            </label>

            <input
              required
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.thumbnailUrl}
              onChange={(e) => updateField("thumbnailUrl", e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* Location and Date */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Location
              </label>

              <input
                required
                type="text"
                placeholder="Enter location"
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
                className={inputStyle}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Event Date
              </label>

              <input
                required
                type="date"
                min={getToday()}
                value={formData.eventDate}
                onChange={(e) => updateField("eventDate", e.target.value)}
                className={inputStyle}
              />

              <p className="mt-2 text-xs text-stone-500">
                You can select today or a future date.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-emerald-800 px-5 py-3.5 font-medium text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating Event..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}
