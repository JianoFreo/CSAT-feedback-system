export type Rating = "disappointed" | "neutral" | "satisfied";

/** Maps the internal rating id to its current (new) URL path segment. */
export const RATING_PATH: Record<Rating, string> = {
  disappointed: "not-good",
  neutral: "just-okay",
  satisfied: "awesome",
};
