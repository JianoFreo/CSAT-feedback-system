import { CompanyLogo } from "../components/CompanyLogo";

interface InvalidLinkPageProps {
  reason: string;
}

export function InvalidLinkPage({ reason }: InvalidLinkPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mb-6 flex justify-center">
          <CompanyLogo />
        </div>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-amber-600" fill="none" aria-hidden="true">
            <path
              d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-slate-900">This link isn't valid</h1>
        <p className="mt-2 text-sm text-slate-500">{reason}</p>
        <p className="mt-4 text-xs text-slate-400">
          Please use the rating link from the original support email, or contact support if the
          problem continues.
        </p>
      </div>
    </div>
  );
}
