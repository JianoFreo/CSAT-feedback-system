const COMPANY_NAME = import.meta.env.VITE_COMPANY_NAME ?? "Your Company";

/**
 * Swap the SVG mark below for the real logo asset when available
 * (e.g. `<img src="/logo.svg" alt={COMPANY_NAME} className="h-8" />`).
 */
export function CompanyLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
        {COMPANY_NAME.charAt(0).toUpperCase()}
      </div>
      <span className="text-lg font-semibold tracking-tight text-slate-900">
        {COMPANY_NAME}
      </span>
    </div>
  );
}
