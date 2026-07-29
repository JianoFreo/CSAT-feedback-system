interface AlertBannerProps {
  variant: "error" | "info";
  message: string;
}

export function AlertBanner({ variant, message }: AlertBannerProps) {
  const styles =
    variant === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : "border-slate-200 bg-slate-50 text-slate-700";

  return (
    <div role="alert" className={`rounded-lg border px-4 py-3 text-sm ${styles}`}>
      {message}
    </div>
  );
}
