"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const EVENT_TYPES = ["Cleanup", "Donation", "Plantation", "Awareness", "Healthcare"];

const Schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  eventType: z.string().refine((val) => EVENT_TYPES.includes(val), { message: "Valid event type required" }),
  thumbnailUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  location: z.string().min(1, "Location is required"),
  eventDate: z.string().refine((val) => new Date(val) >= new Date(), { message: "Date must be a future date" }),
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
    formState: { errors },
    reset,
    watch,
  } = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: initialData,
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
        isUpdate ? "Event updated successfully!" : "Event created successfully!",
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm max-w-2xl mx-auto"
    >
      {/* Form Grid - 2 columns on sm+ */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Event Title */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-1">
            Event Title
          </label>
          <Input
            {...register("title", { required: "Title is required" })}
            placeholder="Enter event title"
            className={cn(
              "rounded-md border border-emerald-200 bg-yellow-50 px-3 py-2.5 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-emerald-400 outline-none transition",
              errors.title && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-1">
            Event Type
          </label>
          <Select
            {...register("eventType", { required: "Event type is required" })}
            className={cn(
              "w-full rounded-md border border-emerald-200 bg-yellow-50 px-3 py-2.5 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-emerald-400 outline-none transition",
              errors.eventType && "border-red-500 focus-visible:ring-red-500"
            )}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.eventType && (
            <p className="mt-1 text-sm text-red-600">{errors.eventType.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[#1F2937] mb-1">
            Description
          </label>
          <textarea
            {...register("description", {})} rows={3}
            placeholder="Describe your event..."
            className={cn(
              "rounded-md border border-emerald-200 bg-yellow-50 px-3 py-2.5 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-emerald-400 outline-none transition w-full resize-none",
              errors.description && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        {/* Thumbnail URL */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[#1F2937] mb-1">
            Thumbnail Image URL
          </label>
          <Input
            type="url"
            {...register("thumbnailUrl", {})} placeholder="https://example.com/image.jpg"
            className={cn(
              "rounded-md border border-emerald-200 bg-yellow-50 px-3 py-2.5 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-emerald-400 outline-none transition w-full",
              errors.thumbnailUrl && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {errors.thumbnailUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.thumbnailUrl.message}</p>
          )}
          {/* Live preview */}
          {thumbnailUrl && (
            <div className="mt-2">
              <p className="text-xs text-emerald-600 mb-1">Preview:</p>
              <img
                src={thumbnailUrl}
                alt="Preview"
                className="max-h-32 w-auto rounded border border-emerald-200"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-1">
            Location
          </label>
          <Input
            {...register("location", { required: "Location is required" })}
            placeholder="Enter location"
            className={cn(
              "rounded-md border border-emerald-200 bg-yellow-50 px-3 py-2.5 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-emerald-400 outline-none transition w-full",
              errors.location && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        {/* Event Date */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-1">
            Event Date
          </label>
          <Input
            type="date"
            {...register("eventDate", {
              required: "Event date is required",
            })}
            className={cn(
              "rounded-md border border-emerald-200 bg-yellow-50 px-3 py-2.5 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-emerald-400 outline-none transition w-full",
              errors.eventDate && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {errors.eventDate && (
            <p className="mt-1 text-sm text-red-600">{errors.eventDate.message}</p>
          )}
        </div>

        {/* Creator Email (read-only) */}
        {initialData?.creatorEmail && (
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-[#1F2937] mb-1">
              Creator Email
            </label>
            <Input
              value={initialData.creatorEmail}
              readOnly
              className="rounded-md border border-emerald-200 bg-yellow-50 px-3 py-2.5 text-stone-900 placeholder-stone-400 outline-none transition w-full cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-emerald-500/80">
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
          className="w-full rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:opacity-50"
        >
          {isSubmitting ? "Creating Event..." : "Create Event"}
        </Button>
      </div>
    </form>
  );
};