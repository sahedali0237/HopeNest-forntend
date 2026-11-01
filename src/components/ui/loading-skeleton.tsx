"use client";

export const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse bg-yellow-50 rounded-lg h-full w-full">
      {/* Skeleton pattern for event cards */}
      <div className="h-48 rounded-t-lg border-emerald-100" />
      <div className="p-4">
        <div className="h-6 rounded mb-3" />
        <div className="h-4 rounded mb-2" />
        <div className="h-4 rounded" />
        <div className="h-6 rounded" />
      </div>
    </div>
  );
};