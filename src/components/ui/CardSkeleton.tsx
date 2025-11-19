interface CardSkeletonProps {
  rows?: number;
  hasSubtitle?: boolean;
}

export function CardSkeleton({
  rows = 5,
  hasSubtitle = false,
}: CardSkeletonProps) {
  const skeletonCards = Array(rows).fill(0);

  return (
    <div className="space-y-4">
      {skeletonCards.map((_, index) => (
        <div
          key={index}
          className="rounded-lg border border-border bg-card shadow-md p-4"
        >
          <div className="flex items-center justify-between animate-pulse">
            <div className="space-y-2">
              <div className="h-4 bg-border rounded w-32"></div>
              {hasSubtitle && (
                <div className="h-3 bg-border rounded w-24"></div>
              )}
            </div>
            <div className="h-5 w-5 bg-border rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
