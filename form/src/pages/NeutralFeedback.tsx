import { useNavigate, useSearchParams } from "react-router-dom";
import { ENV } from "../lib/env.config";
import { MapPin, Contact, Phone } from "lucide-react";
import { RATING_PATH, type Rating } from "../lib/ratingPaths";

interface NeutralFeedbackProps {
  /** Called when the person switches to a different rating tab. */
  onNavigate?: (rating: Rating) => void;
  /** The Microsoft Forms embed URL for the "neutral" branch. */
  formSrc?: string;
}


const NAV_ITEMS: { id: Rating; label: string; activeClasses: string; idleClasses: string }[] = [
  {
    id: "satisfied",
    label: "Awesome",
    activeClasses: "bg-[#B4E5DA] text-[#14355D] ring-2 ring-[#5FBBA4]",
    idleClasses: "bg-[#B4E5DA]/50 text-[#14355D]/70 hover:bg-[#B4E5DA]",
  },
  {
    id: "neutral",
    label: "Just Okay",
    activeClasses: "bg-[#FDDBB5] text-[#14355D] ring-2 ring-[#E8A85C]",
    idleClasses: "bg-[#FDDBB5]/50 text-[#14355D]/70 hover:bg-[#FDDBB5]",
  },
  {
    id: "disappointed",
    label: "Not Good",
    activeClasses: "bg-[#FFD0D6] text-[#14355D] ring-2 ring-[#F08CA0]",
    idleClasses: "bg-[#FFD0D6]/50 text-[#14355D]/70 hover:bg-[#FFD0D6]",
  },
];

export default function NeutralFeedback({
  onNavigate,
}: NeutralFeedbackProps) {
  const navigate = useNavigate();
  const activeRating: Rating = "neutral";
  const [searchParams] = useSearchParams();
  const agentName = searchParams.get("agent") || "";

  const handleNavigate = (rating: Rating) => {
    if (rating === activeRating) return;
    onNavigate?.(rating);
    navigate(`/${RATING_PATH[rating]}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`);
  };
  const formSrc = ENV.FORM_URL
    ? `${ENV.FORM_URL}&rb172816ddc0e4f13af725c5872f51b91=${encodeURIComponent(agentName)}&r17761f2c6eaf42ab878983b1f29c8181=${encodeURIComponent('"Just Okay"')}`
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF6EA] via-[#FFFAF2] to-[#FDE7C7]">
      <main className="mx-auto w-[calc(100%-2rem)] max-w-6xl py-8 pb-10">
        {/* Topbar */}
        <header className="mb-6 flex flex-col gap-4 rounded-md border border-amber-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-md bg-[#E8A85C] text-lg font-bold text-white">
              ~
            </div>
            <div>
              <strong className="block text-sm tracking-wide text-amber-950">Customer Feedback</strong>
            </div>
          </div>

          <nav aria-label="Satisfaction choices" className="flex flex-wrap justify-start gap-2 sm:justify-end">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${item.id === activeRating ? item.activeClasses : item.idleClasses
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </header>

        {/* Hero */}
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Summary panel */}
          <article className="rounded-md border border-amber-200 bg-white p-7 shadow-sm">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#FDDBB5] px-3 py-2 text-xs font-bold uppercase tracking-wide text-[#14355D]">
              Just Okay
            </span>

            <div className="mb-4 grid h-20 w-20 place-items-center rounded-md bg-[#FDDBB5] text-4xl">
              😐
            </div>

            <h1 className="text-4xl font-bold leading-[0.98] tracking-tight text-amber-950 sm:text-5xl">
              Thanks for keeping us balanced.
            </h1>

            <p className="mt-3 max-w-[38ch] text-base leading-relaxed text-amber-800/70">
              Your experience sits in the middle, so this layout asks for just enough detail to
              understand what worked and what could improve.
            </p>

            <div className="mt-6 grid gap-3">
              <div>
                <img
                  src="CC-form-logo.png"
                  alt="Contact Details"
                  className="w-70 mb-10 mt-10"
                />

                <div className="flex flex-col gap-2">
                  {/* Contact Details */}
                  <div className="flex items-center gap-2">
                    <Contact className="w-5 h-5 text-gray-600 shrink-0" />
                    <p className="text-xl font-bold">Contact Details</p>
                  </div>

                  {/* Address */}
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-600 shrink-0" />
                    <p className="text-xl">
                      25D Zeta Bldg. Salcedo St. Makati City MNL PH
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-600 shrink-0" />
                    <p className="text-xl">+63 282312520</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Form panel */}
          <section
            aria-label="Feedback form"
            className="rounded-md border border-amber-200 bg-white p-3.5 shadow-sm"
          >

            <iframe
              src={formSrc}
              title="Customer feedback form - neutral"
              loading="lazy"
              referrerPolicy="no-referrer"
              allowFullScreen
              className="block min-h-[760px] w-full rounded-md border-0 bg-white"
            />
          </section>
        </section>
      </main>
    </div>
  );
}
