"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const EVENT_TYPES = [
  "Cleanup",
  "Donation",
  "Plantation",
  "Awareness",
  "Healthcare",
];

const Schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  eventType: z
    .string()
    .min(1, "Event type is required")
    .refine((val) => EVENT_TYPES.includes(val), {
      message: "Valid event type required",
    }),
  thumbnailUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  location: z.string().min(1, "Location is required"),
  eventDate: z
    .string()
    .min(1, "Event date is required")
    .refine(
      (val) => {
        const selected = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected >= today;
      },
      {
        message: "Date must be today or a future date",
      },
    ),
  creatorEmail: z.string().email().optional(),
});

export interface EventFormProps {
  onSuccess?: (data: z.infer<typeof Schema>) => void;
  initialData?: Partial<z.infer<typeof Schema>>;
  /** API endpoint to submit to (defaults to create-events) */
  action?: string;
  /** HTTP method: "POST" to create, "PUT" to update */
  method?: "POST" | "PUT";
}

export const EventForm = ({
  onSuccess,
  initialData,
  action = "/api/create-events",
  method = "POST",
}: EventFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const isUpdate = method === "PUT";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      eventType: initialData?.eventType || "",
      thumbnailUrl: initialData?.thumbnailUrl || "",
      location: initialData?.location || "",
      eventDate: initialData?.eventDate || "",
      creatorEmail: initialData?.creatorEmail || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(action, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to save event");
      }

      toast.success(
        isUpdate
          ? "Event updated successfully!"
          : "Event created successfully!",
      );
      onSuccess?.(data);
      router.push("/manage-events");
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : isUpdate
            ? "Failed to update event"
            : "Failed to create event",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const thumbnailUrl = watch("thumbnailUrl");
  const selectedEventType = watch("eventType");
  const currentDate = new Date();
  const today = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1,
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm max-w-2xl mx-auto"
    >
      {/* Form Grid - 2 columns on sm+ */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Event Title */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Event Title
          </label>
          <Input
            {...register("title")}
            placeholder="Enter event title"
            className={cn(
              "w-full h-11 rounded-md border border-border bg-muted px-3 py-2.5 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary outline-none transition",
              errors.title && "border-red-500 focus-visible:ring-red-500",
            )}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Event Type
          </label>
          <div className="relative">
            <select
              {...register("eventType")}
              className={cn(
                "w-full h-11 appearance-none rounded-md border border-border bg-muted px-3 pr-10 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-primary outline-none transition",
                !selectedEventType && "text-muted-foreground",
                errors.eventType && "border-red-500 focus:ring-red-500",
              )}
            >
              <option value="" disabled>
                Select event type
              </option>
              {EVENT_TYPES.map((type) => (
                <option
                  key={type}
                  value={type}
                  className="text-foreground bg-card"
                >
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
          </div>
          {errors.eventType && (
            <p className="mt-1 text-sm text-red-600">
              {errors.eventType.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={3}
            placeholder="Describe your event..."
            className={cn(
              "rounded-md border border-border bg-muted px-3 py-2.5 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary outline-none transition w-full resize-none",
              errors.description && "border-red-500 focus-visible:ring-red-500",
            )}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Thumbnail URL */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-1">
            Thumbnail Image URL
          </label>
          <Input
            type="url"
            {...register("thumbnailUrl")}
            placeholder="https://example.com/image.jpg"
            className={cn(
              "w-full h-11 rounded-md border border-border bg-muted px-3 py-2.5 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary outline-none transition",
              errors.thumbnailUrl &&
                "border-red-500 focus-visible:ring-red-500",
            )}
          />
          {errors.thumbnailUrl && (
            <p className="mt-1 text-sm text-red-600">
              {errors.thumbnailUrl.message}
            </p>
          )}
          {/* Live preview */}
          {thumbnailUrl && (
            <div className="mt-2">
              <p className="text-xs text-emerald-600 mb-1">Preview:</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnailUrl}
                alt="Preview"
                className="max-h-32 w-auto rounded border border-emerald-200 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Location
          </label>
          <Input
            {...register("location")}
            placeholder="Enter location"
            className={cn(
              "w-full h-11 rounded-md border border-border bg-muted px-3 py-2.5 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary outline-none transition",
              errors.location && "border-red-500 focus-visible:ring-red-500",
            )}
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Event Date */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Event Date
          </label>
          <Input
            type="date"
            min={today}
            {...register("eventDate")}
            className={cn(
              "w-full h-11 rounded-md border border-border bg-muted px-3 py-2.5 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary outline-none transition",
              errors.eventDate && "border-red-500 focus-visible:ring-red-500",
            )}
          />
          {errors.eventDate && (
            <p className="mt-1 text-sm text-red-600">
              {errors.eventDate.message}
            </p>
          )}
        </div>

        {/* Creator Email (read-only) */}
        {initialData?.creatorEmail && (
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">
              Creator Email
            </label>
            <Input
              {...register("creatorEmail")}
              readOnly
              className="w-full h-11 rounded-md border border-border bg-muted px-3 py-2.5 text-foreground placeholder-muted-foreground outline-none transition cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-emerald-600/80">
              Automatically set to your account email
            </p>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-6 sm:mt-8">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:opacity-50"
        >
          {isSubmitting
            ? isUpdate
              ? "Updating Event..."
              : "Creating Event..."
            : isUpdate
              ? "Update Event"
              : "Create Event"}
        </Button>
      </div>
    </form>
  );
};
