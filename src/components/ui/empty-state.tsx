export interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  illustrationSrc?: string;
  illustrationAlt?: string;
}

export const EmptyState = ({
  title,
  description,
  actionText = "Get Started",
  actionHref = "/",
  illustrationSrc,
  illustrationAlt = "Illustration",
}: EmptyStateProps) => {
  return (
    <div className="col-span-full text-center py-12">
      {/* Illustration */}
      {illustrationSrc && (
        <div className="mx-auto mb-6 max-w-64">
          <img
            src={illustrationSrc}
            alt={illustrationAlt}
            className="h-24 w-auto"
          />
        </div>
      )}

      {/* Title */}
      <h3 className="text-2xl font-bold text-[#062D25] mb-2">{title}</h3>

      {/* Description */}
      <p className="text-[#64748B] text-sm mb-6">{description}</p>

      {/* Action button */}
      {actionText && actionHref && (
        <a
          href={actionHref}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-emerald-500"
        >
          {actionText}
        </a>
      )}
    </div>
  );
};