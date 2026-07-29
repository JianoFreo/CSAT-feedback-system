import { RATING_SCALE, type RatingValue } from "../types/feedback.types";

interface RatingBadgeProps {
  rating: RatingValue;
}

/**
 * Shows which emoji the customer already clicked in the email. Read-only —
 * changing the rating means going back to the email and clicking a
 * different emoji, not editing it here.
 */
export function RatingBadge({ rating }: RatingBadgeProps) {
  const selected = RATING_SCALE.find((r) => r.value === rating);
  if (!selected) return null;

  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-6 py-5">
      <span className="text-5xl" role="img" aria-label={selected.label}>
        {selected.emoji}
      </span>
      <span className="text-sm font-medium text-indigo-700">{selected.label}</span>
      <div className="flex gap-1" aria-hidden="true">
        {RATING_SCALE.map((r) => (
          <span
            key={r.value}
            className={`h-1.5 w-6 rounded-full ${
              r.value === rating ? "bg-indigo-600" : "bg-indigo-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
