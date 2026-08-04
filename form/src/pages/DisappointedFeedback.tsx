import { useNavigate, useSearchParams } from "react-router-dom";

type Rating = "disappointed" | "neutral" | "satisfied";

interface DisappointedFeedbackProps {
  /** Called when the person switches to a different rating tab. */
  onNavigate?: (rating: Rating) => void;
  /** The Microsoft Forms embed URL for the "disappointed" branch. */
  formSrc?: string;
}

const NAV_ITEMS: { id: Rating; label: string; activeClasses: string; idleClasses: string }[] = [
  {
    id: "disappointed",
    label: "Disappointed",
    activeClasses: "bg-gradient-to-br from-rose-600 to-rose-800 text-white",
    idleClasses: "bg-white text-rose-800 hover:bg-rose-50",
  },
  {
    id: "neutral",
    label: "Neutral",
    activeClasses: "bg-gradient-to-br from-amber-500 to-amber-700 text-white",
    idleClasses: "bg-white text-amber-700 hover:bg-amber-50",
  },
  {
    id: "satisfied",
    label: "Satisfied",
    activeClasses: "bg-gradient-to-br from-emerald-500 to-emerald-700 text-white",
    idleClasses: "bg-white text-emerald-700 hover:bg-emerald-50",
  },
];

function DisappointedFeedback({
  onNavigate,

}: DisappointedFeedbackProps) {
  const navigate = useNavigate();
  const activeRating: Rating = "disappointed";

  const handleNavigate = (rating: Rating) => {
    if (rating === activeRating) return;
    onNavigate?.(rating);
    navigate(`/${rating}`);
  };
  const [searchParams] = useSearchParams();
  const agentName = searchParams.get("agent") || "";
  const formSrc = `https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=N-0b_WRuKUCUri0p76P1ciMCgbEyRTZKn1onILstHuFUQ05TRklETVcyTU1GTDhHM0k5UFJNQ1E0Ry4u&rb172816ddc0e4f13af725c5872f51b91=${encodeURIComponent(agentName)}&r17761f2c6eaf42ab878983b1f29c8181=%22Disappointed%20%F0%9F%99%81%22`

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 via-rose-50 to-rose-100 overflow-hidden">
      {/* ambient blobs */}
      <div className="pointer-events-none absolute -top-28 -right-16 h-64 w-64 rounded-full bg-rose-300/25 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-rose-200/30 blur-2xl" />

      <main className="relative z-10 mx-auto w-[calc(100%-2rem)] max-w-6xl py-8 pb-10">
        {/* Topbar */}
        <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-rose-900/10 bg-white/60 p-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-rose-600 to-rose-800 text-lg font-bold text-white shadow-lg shadow-rose-900/25">
              !
            </div>
            <div>
              <strong className="block text-sm tracking-wide text-rose-950">Customer Feedback</strong>
            </div>
          </div>

          <nav aria-label="Satisfaction choices" className="flex flex-wrap justify-start gap-2 sm:justify-end">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`rounded-full border-none px-4 py-2 text-sm font-semibold transition-transform duration-150 hover:-translate-y-0.5 ${item.id === activeRating ? item.activeClasses : item.idleClasses
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
          <article className="relative overflow-hidden rounded-[28px] border border-rose-900/10 bg-white/85 p-7 shadow-2xl shadow-rose-900/15 backdrop-blur-lg">
            <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-rose-600/10 blur-2xl" />

            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-2 text-xs font-bold uppercase tracking-wide text-rose-800">
              Very unsatisfied
            </span>

            <div className="mb-4 grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-rose-600/15 to-rose-400/20 text-4xl">
              😞
            </div>

            <h1 className="text-4xl font-bold leading-[0.98] tracking-tight text-rose-950 sm:text-5xl">
              We know this missed the mark.
            </h1>

            <p className="mt-3 max-w-[38ch] text-base leading-relaxed text-rose-800/70">
              Tell us what went wrong so we can fix the issue, follow up properly, and make the
              next experience better.
            </p>

            <div className="mt-6 grid gap-3">
              <img src="CC-contactdetails.png" alt="Contact Details" />
            </div>
          </article>

          {/* Form panel */}
          <section
            aria-label="Feedback form"
            className="rounded-[28px] border border-rose-900/10 bg-white/85 p-3.5 shadow-2xl shadow-rose-900/15 backdrop-blur-lg"
          >

            <iframe
              src={formSrc}
              title="Customer feedback form - disappointed"
              loading="lazy"
              referrerPolicy="no-referrer"
              allowFullScreen
              className="block min-h-[760px] w-full rounded-[22px] border-0 bg-white"
            />
          </section>
        </section>
      </main>
    </div>
  );
}

export default DisappointedFeedback;
