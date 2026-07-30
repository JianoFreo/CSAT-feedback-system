import type { RatingValue } from "../types/feedback.types";

export interface RatingTheme {
  eyebrow: string;
  headline: string;
  lead: string;
  emoji: string;
  pageClass: string;
  panelClass: string;
  accentSoftClass: string;
  accentTextClass: string;
  accentClass: string;
  fieldClass: string;
  fieldFocusClass: string;
  buttonClass: string;
  buttonHoverClass: string;
  badgeOuterClass: string;
  badgeTextClass: string;
  barActiveClass: string;
  barInactiveClass: string;
}

const ratingThemes: Record<RatingValue, RatingTheme> = {
  1: {
    eyebrow: "Needs attention",
    headline: "We know this fell short.",
    lead: "The whole page shifts into a sharper, more urgent tone so it feels appropriate for a bad experience.",
    emoji: "😠",
    pageClass: "from-rose-50 via-amber-50 to-rose-100",
    panelClass: "border-rose-200/80 bg-white/90 shadow-[0_28px_80px_rgba(244,63,94,0.14)]",
    accentSoftClass: "bg-rose-50",
    accentTextClass: "text-rose-700",
    accentClass: "bg-rose-600 text-white",
    fieldClass: "border-rose-200 bg-white text-slate-900 placeholder:text-rose-300",
    fieldFocusClass: "focus:border-rose-500 focus:ring-rose-500/25",
    buttonClass: "bg-rose-600 text-white shadow-[0_18px_40px_rgba(225,29,72,0.2)]",
    buttonHoverClass: "hover:bg-rose-500",
    badgeOuterClass: "border-rose-200 bg-rose-50",
    badgeTextClass: "text-rose-700",
    barActiveClass: "bg-rose-600",
    barInactiveClass: "bg-rose-200",
  },
  2: {
    eyebrow: "Unhappy path",
    headline: "We can still make this better.",
    lead: "This version keeps the tone calm but direct, which fits feedback that is negative but not severe.",
    emoji: "🙁",
    pageClass: "from-orange-50 via-amber-50 to-orange-100",
    panelClass: "border-orange-200/80 bg-white/90 shadow-[0_28px_80px_rgba(249,115,22,0.12)]",
    accentSoftClass: "bg-orange-50",
    accentTextClass: "text-orange-700",
    accentClass: "bg-orange-600 text-white",
    fieldClass: "border-orange-200 bg-white text-slate-900 placeholder:text-orange-300",
    fieldFocusClass: "focus:border-orange-500 focus:ring-orange-500/25",
    buttonClass: "bg-orange-600 text-white shadow-[0_18px_40px_rgba(234,88,12,0.18)]",
    buttonHoverClass: "hover:bg-orange-500",
    badgeOuterClass: "border-orange-200 bg-orange-50",
    badgeTextClass: "text-orange-700",
    barActiveClass: "bg-orange-600",
    barInactiveClass: "bg-orange-200",
  },
  3: {
    eyebrow: "Balanced feedback",
    headline: "Thanks for the honest middle ground.",
    lead: "The palette settles into a neutral gold so the page feels measured, not overly positive or negative.",
    emoji: "😐",
    pageClass: "from-amber-50 via-stone-50 to-yellow-100",
    panelClass: "border-amber-200/80 bg-white/92 shadow-[0_28px_80px_rgba(217,119,6,0.12)]",
    accentSoftClass: "bg-amber-50",
    accentTextClass: "text-amber-700",
    accentClass: "bg-amber-600 text-white",
    fieldClass: "border-amber-200 bg-white text-slate-900 placeholder:text-amber-300",
    fieldFocusClass: "focus:border-amber-500 focus:ring-amber-500/25",
    buttonClass: "bg-amber-600 text-white shadow-[0_18px_40px_rgba(217,119,6,0.18)]",
    buttonHoverClass: "hover:bg-amber-500",
    badgeOuterClass: "border-amber-200 bg-amber-50",
    badgeTextClass: "text-amber-700",
    barActiveClass: "bg-amber-600",
    barInactiveClass: "bg-amber-200",
  },
  4: {
    eyebrow: "Positive signal",
    headline: "Good to hear things were working.",
    lead: "This layout gets lighter and cleaner, matching a customer who had a mostly good experience.",
    emoji: "🙂",
    pageClass: "from-emerald-50 via-teal-50 to-emerald-100",
    panelClass: "border-emerald-200/80 bg-white/90 shadow-[0_28px_80px_rgba(16,185,129,0.12)]",
    accentSoftClass: "bg-emerald-50",
    accentTextClass: "text-emerald-700",
    accentClass: "bg-emerald-600 text-white",
    fieldClass: "border-emerald-200 bg-white text-slate-900 placeholder:text-emerald-300",
    fieldFocusClass: "focus:border-emerald-500 focus:ring-emerald-500/25",
    buttonClass: "bg-emerald-600 text-white shadow-[0_18px_40px_rgba(5,150,105,0.18)]",
    buttonHoverClass: "hover:bg-emerald-500",
    badgeOuterClass: "border-emerald-200 bg-emerald-50",
    badgeTextClass: "text-emerald-700",
    barActiveClass: "bg-emerald-600",
    barInactiveClass: "bg-emerald-200",
  },
  5: {
    eyebrow: "Great outcome",
    headline: "We’re glad this worked well for you.",
    lead: "The page leans into the strongest success tone with brighter color and a more celebratory feel.",
    emoji: "😄",
    pageClass: "from-cyan-50 via-emerald-50 to-teal-100",
    panelClass: "border-teal-200/80 bg-white/92 shadow-[0_28px_80px_rgba(20,184,166,0.12)]",
    accentSoftClass: "bg-teal-50",
    accentTextClass: "text-teal-700",
    accentClass: "bg-teal-600 text-white",
    fieldClass: "border-teal-200 bg-white text-slate-900 placeholder:text-teal-300",
    fieldFocusClass: "focus:border-teal-500 focus:ring-teal-500/25",
    buttonClass: "bg-teal-600 text-white shadow-[0_18px_40px_rgba(13,148,136,0.18)]",
    buttonHoverClass: "hover:bg-teal-500",
    badgeOuterClass: "border-teal-200 bg-teal-50",
    badgeTextClass: "text-teal-700",
    barActiveClass: "bg-teal-600",
    barInactiveClass: "bg-teal-200",
  },
};

export function getRatingTheme(rating: RatingValue): RatingTheme {
  return ratingThemes[rating];
}