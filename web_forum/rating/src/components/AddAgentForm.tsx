import { useState } from "react";

type Props = {
  onAdd: (name: string) => void;
  isAdding: boolean;
};

export function AddAgentForm({ onAdd, isAdding }: Props) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };

  return (
    <div className="mb-6 flex gap-2">
      <input
        type="text"
        placeholder="Enter agent name..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      />

      <button
        onClick={handleAdd}
        disabled={isAdding || !value.trim()}
        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isAdding ? "Adding..." : "Add"}
      </button>
    </div>
  );
}