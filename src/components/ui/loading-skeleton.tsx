"use client";

interface LoadingSkeletonProps {
  count?: number;
}

export const LoadingSkeleton = ({
  count = 6,
}: LoadingSkeletonProps = {}) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-card rounded-lg border border-border shadow-sm overflow-hidden h-full flex flex-col"
        >
          <div className="h-44 w-full bg-muted border-b border-border relative">
            <span
              className="absolute top-3 left-3 rounded-full px-2 py-1 text-xs font-semibold bg-muted"
            />
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <div className="h-6 rounded bg-muted mb-2" />
            <div className="h-4 rounded bg-muted mb-3" />
            <div className="h-4 rounded bg-muted mt-auto" />
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <div className="flex-1 h-10 rounded bg-muted" />
              <div className="flex-1 h-10 rounded bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
