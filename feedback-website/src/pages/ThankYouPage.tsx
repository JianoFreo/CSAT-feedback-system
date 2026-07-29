import { CompanyLogo } from "../components/CompanyLogo";

export function ThankYouPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mb-6 flex justify-center">
          <CompanyLogo />
        </div>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-emerald-600" fill="none" aria-hidden="true">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-slate-900">Thank you for your feedback.</h1>
        <p className="mt-2 text-sm text-slate-500">
          We've recorded your response and shared it with the support team.
        </p>
      </div>
    </div>
  );
}
