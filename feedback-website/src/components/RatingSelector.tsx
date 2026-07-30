import { RATING_SCALE, type RatingValue } from "../types/feedback.types";
import { getRatingTheme } from "../lib/ratingTheme";

interface RatingSelectorProps {
  currentRating: RatingValue;
  onRatingChange: (newRating: RatingValue) => void;
}

export function RatingSelector({ currentRating, onRatingChange }: RatingSelectorProps) {
  const handleRatingClick = (rating: RatingValue) => {
    if (rating !== currentRating) {
      // Build new URL with updated rating parameter
      const params = new URLSearchParams(window.location.search);
      params.set("rating", String(rating));
      
      // Set flag to suppress draft warnings, then navigate
      window.skipDraftWarning = true;
      window.location.search = params.toString();
    }
  };

  const theme = getRatingTheme(currentRating);

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Want to change your rating?
      </p>
      <div className="flex flex-wrap gap-2">
        {RATING_SCALE.map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => handleRatingClick(r.value)}
            className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition ${
              r.value === currentRating
                ? theme.buttonClass
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            <span className="text-lg">{r.emoji}</span>
            <span className="text-xs">{r.value}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
