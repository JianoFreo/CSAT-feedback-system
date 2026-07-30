import { useState } from "react";
import { useTicketParams } from "../hooks/useTicketParams";
import { CompanyLogo } from "../components/CompanyLogo";
import { TicketInfo } from "../components/TicketInfo";
import { RatingBadge } from "../components/RatingBadge";
import { FeedbackForm } from "../components/FeedbackForm";
import { RatingSelector } from "../components/RatingSelector";
import { InvalidLinkPage } from "./InvalidLinkPage";
import { ThankYouPage } from "./ThankYouPage";
import { getRatingTheme } from "../lib/ratingTheme";

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
  const theme = getRatingTheme(rating);

  return (
    <div className={`relative min-h-screen overflow-hidden bg-gradient-to-br ${theme.pageClass} px-4 py-8 sm:px-6 lg:px-8`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.8),transparent_36%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.5),transparent_30%)]" />
      <div className="pointer-events-none absolute -left-20 top-20 h-56 w-56 rounded-full bg-white/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-32 h-64 w-64 rounded-full bg-white/25 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className={`rounded-[32px] border p-8 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl ${theme.panelClass}`}>
          <div className={`mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${theme.accentSoftClass} ${theme.accentTextClass}`}>
            {theme.eyebrow}
          </div>

          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/80 text-5xl shadow-lg">
            {theme.emoji}
          </div>

          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {theme.headline}
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            {theme.lead}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Rating received
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{theme.eyebrow}</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Next step
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Share the details below</p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-6 text-slate-500">
            Switching the rating link changes the whole page theme, so each satisfaction level feels distinct instead of reusing one neutral layout.
          </p>
        </section>

        <section className={`rounded-[32px] border p-8 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl ${theme.panelClass}`}>
          <div className="flex justify-center">
            <CompanyLogo />
          </div>

          <div className="mt-6">
            <RatingBadge rating={rating} />
          </div>

          <div className="mt-6">
            <TicketInfo ticketId={ticketId} subject={subject} />
          </div>

          <div className="mt-6">
            <FeedbackForm ticketId={ticketId} rating={rating} onSubmitted={() => setSubmitted(true)} />
          </div>

          <RatingSelector currentRating={rating} onRatingChange={() => {}} />
        </section>
      </div>
    </div>
  );
}
