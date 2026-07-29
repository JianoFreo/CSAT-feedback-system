import { useState } from "react";
import { useTicketParams } from "../hooks/useTicketParams";
import { CompanyLogo } from "../components/CompanyLogo";
import { TicketInfo } from "../components/TicketInfo";
import { RatingBadge } from "../components/RatingBadge";
import { FeedbackForm } from "../components/FeedbackForm";
import { InvalidLinkPage } from "./InvalidLinkPage";
import { ThankYouPage } from "./ThankYouPage";

export function FeedbackPage() {
  const ticketParams = useTicketParams();
  const [submitted, setSubmitted] = useState(false);

  if (ticketParams.status === "invalid") {
    return <InvalidLinkPage reason={ticketParams.reason} />;
  }

  if (submitted) {
    return <ThankYouPage />;
  }

  const { ticketId, rating, subject } = ticketParams.params;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex justify-center">
          <CompanyLogo />
        </div>

        <p className="mb-6 text-center text-sm text-slate-500">
          Thanks for reaching out — we'd love to know how we did on this ticket.
        </p>

        <div className="mb-6">
          <RatingBadge rating={rating} />
        </div>

        <div className="mb-6">
          <TicketInfo ticketId={ticketId} subject={subject} />
        </div>

        <FeedbackForm ticketId={ticketId} rating={rating} onSubmitted={() => setSubmitted(true)} />
      </div>
    </div>
  );
}
