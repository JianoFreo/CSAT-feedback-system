type Props = {
  message: string;
};

export function ErrorBanner({ message }: Props) {
  return (
    <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
      {message}
    </div>
  );
}