import { useState } from "react";

type Props = {
  onAdd: (name: string, role: string) => void;
  isAdding: boolean;
};

export function AddAgentForm({ onAdd, isAdding }: Props) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd(name, role);
    setName("");
    setRole("");
  };

  return (
    <div className="mb-6 flex gap-2">
      <input
        type="text"
        placeholder="Enter agent name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      />

      <input
        type="text"
        placeholder="Role (e.g. IT Service Desk Engineer)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      />

      <button
        onClick={handleAdd}
        disabled={isAdding || !name.trim()}
        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isAdding ? "Adding..." : "Add"}
      </button>
    </div>
  );
}