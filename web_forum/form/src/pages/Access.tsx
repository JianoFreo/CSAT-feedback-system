import React, { useState } from "react";
import { Ticket, Loader2, CheckCircle2, XCircle } from "lucide-react";

type Status = "idle" | "checking" | "valid" | "invalid";

// Placeholder until a real backend check is wired up.
const MOCK_VALID_CODE = "GOLD-1234";

function Access() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;

    setStatus("checking");

    // Simulated check — swap this block out for a real API call later.
    setTimeout(() => {
      setStatus(trimmed.toUpperCase() === MOCK_VALID_CODE ? "valid" : "invalid");
    }, 700);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    if (status !== "idle" && status !== "checking") setStatus("idle");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-slate-900 text-white">
            <Ticket className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-semibold text-slate-900">Enter access code</h1>
          <p className="mt-1 text-sm text-slate-500">
            Enter the code from your ticket to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={code}
            onChange={handleChange}
            placeholder="e.g. GOLD-1234"
            autoComplete="off"
            autoCapitalize="characters"
            className={`w-full rounded-xl border px-4 py-3 text-center text-base font-medium tracking-wide text-slate-900 outline-none transition focus:ring-2 focus:ring-slate-900/20 ${
              status === "invalid"
                ? "border-red-300 bg-red-50"
                : status === "valid"
                ? "border-emerald-300 bg-emerald-50"
                : "border-slate-200"
            }`}
          />

          <button
            type="submit"
            disabled={!code.trim() || status === "checking"}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === "checking" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              "Verify access"
            )}
          </button>
        </form>

        {status === "valid" && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            <CheckCircle2 className="h-4 w-4 flex-none" />
            Access granted. Welcome in!
          </div>
        )}

        {status === "invalid" && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            <XCircle className="h-4 w-4 flex-none" />
            That code doesn't look right. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}

export default Access;