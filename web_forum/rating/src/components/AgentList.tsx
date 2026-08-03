import type { Agent } from "../hooks/useAgents";
import { AgentRow } from "./AgentRow";

type Props = {
  agents: Agent[];
  search: string;
  isLoading: boolean;
  isDeleting: boolean;
  onDelete: (id: number) => void;
};

export function AgentList({
  agents,
  search,
  isLoading,
  isDeleting,
  onDelete,
}: Props) {
  if (isLoading) {
    return (
      <div className="py-8 text-center text-sm text-gray-500">
        Loading agents...
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 py-10 text-center">
        <p className="text-sm text-gray-500">
          {search ? "No agents found." : "No agents yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100 rounded-lg border border-gray-200">
      {agents.map((agent) => (
        <AgentRow
          key={agent.id}
          agent={agent}
          isDeleting={isDeleting}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}