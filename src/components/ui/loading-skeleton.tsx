"use client";

export const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse bg-muted rounded-lg h-full w-full">
      {/* Skeleton pattern for event cards */}
      <div className="h-48 rounded-t-lg border-border" />
      <div className="p-4">
        <div className="h-6 rounded bg-muted" />
        <div className="h-4 rounded bg-muted" />
        <div className="h-4 rounded bg-muted" />
        <div className="h-6 rounded bg-muted" />
      </div>
    </div>
  );
};