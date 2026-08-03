type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search agents..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      />
    </div>
  );
}