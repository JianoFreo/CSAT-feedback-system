import { useMemo } from "react";
import type { RatingValue, TicketParams } from "../types/feedback.types";

const VALID_RATINGS: readonly number[] = [1, 2, 3, 4, 5];

type UseTicketParamsResult =
  | { status: "valid"; params: TicketParams }
  | { status: "invalid"; reason: string };

/**
 * Reads `ticket`, `rating`, and optional `subject` from the URL query
 * string (e.g. from the Freshdesk email emoji links) exactly once per URL,
 * and validates them. These values are never exposed as editable form
 * fields anywhere downstream — components only ever receive the parsed,
 * read-only result of this hook.
 */
export function useTicketParams(): UseTicketParamsResult {
  return useMemo(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const rawTicket = searchParams.get("ticket");
    const rawRating = searchParams.get("rating");
    const rawSubject = searchParams.get("subject");

    if (!rawTicket) {
      return { status: "invalid", reason: "Missing ticket reference in the link." };
    }
    if (!rawRating) {
      return { status: "invalid", reason: "Missing rating in the link." };
    }

    const ticketId = Number(rawTicket);
    if (!Number.isInteger(ticketId) || ticketId <= 0) {
      return { status: "invalid", reason: "This link's ticket reference is invalid." };
    }

    const rating = Number(rawRating);
    if (!VALID_RATINGS.includes(rating)) {
      return { status: "invalid", reason: "This link's rating value is invalid." };
    }

    // subject is decoded automatically by URLSearchParams; cap length defensively
    // since it's rendered directly (React escapes it, but keep it sane either way).
    const subject = rawSubject ? rawSubject.slice(0, 300) : null;

    return {
      status: "valid",
      params: { ticketId, rating: rating as RatingValue, subject },
    };
  }, []);
}
