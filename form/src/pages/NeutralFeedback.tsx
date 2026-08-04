import { useNavigate, useSearchParams } from "react-router-dom";

type Rating = "disappointed" | "neutral" | "satisfied";

interface NeutralFeedbackProps {
  /** Called when the person switches to a different rating tab. */
  onNavigate?: (rating: Rating) => void;
  /** The Microsoft Forms embed URL for the "neutral" branch. */
  formSrc?: string;
}


const NAV_ITEMS: { id: Rating; label: string; activeClasses: string; idleClasses: string }[] = [
  {
    id: "disappointed",
    label: "Disappointed",
    activeClasses: "bg-rose-600 text-white",
    idleClasses: "bg-white text-rose-700 border border-rose-200 hover:bg-rose-50",
  },
  {
    id: "neutral",
    label: "Neutral",
    activeClasses: "bg-amber-600 text-white",
    idleClasses: "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50",
  },
  {
    id: "satisfied",
    label: "Satisfied",
    activeClasses: "bg-emerald-600 text-white",
    idleClasses: "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50",
  },
];

export default function NeutralFeedback({
  onNavigate,
}: NeutralFeedbackProps) {
  const navigate = useNavigate();
  const activeRating: Rating = "neutral";

  const handleNavigate = (rating: Rating) => {
    if (rating === activeRating) return;
    onNavigate?.(rating);
    navigate(`/${rating}`);
  };
  const [searchParams] = useSearchParams();
  const agentName = searchParams.get("agent") || "";

  const formSrc = `https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=N-0b_WRuKUCUri0p76P1ciMCgbEyRTZKn1onILstHuFUQ05TRklETVcyTU1GTDhHM0k5UFJNQ1E0Ry4u&rb172816ddc0e4f13af725c5872f51b91=${encodeURIComponent(agentName)}&r17761f2c6eaf42ab878983b1f29c8181=%22Neutral%20%F0%9F%98%90%22`


  return (
    <div className="min-h-screen bg-amber-50">
      <main className="mx-auto w-[calc(100%-2rem)] max-w-6xl py-8 pb-10">
        {/* Topbar */}
        <header className="mb-6 flex flex-col gap-4 rounded-md border border-amber-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-md bg-amber-600 text-lg font-bold text-white">
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
                className={`rounded-md px-4 py-2 text-sm font-semibold transition ${item.id === activeRating ? item.activeClasses : item.idleClasses
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
            <span className="mb-4 inline-flex items-center gap-2 rounded-md bg-amber-100 px-3 py-2 text-xs font-bold uppercase tracking-wide text-amber-800">
              Neutral
            </span>

            <div className="mb-4 grid h-20 w-20 place-items-center rounded-md bg-amber-100 text-4xl">
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
              <img src="CC-contactdetails.png" alt="Contact Details" />

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
