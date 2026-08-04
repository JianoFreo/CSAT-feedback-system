import { useState } from "react";
import type { Agent } from "../hooks/useAgents";
import { SurveyPreviewCard } from "./SurveyPreviewCard";

type Props = {
  agent: Agent;
  isDeleting: boolean;
  onDelete: (id: number) => void;
};

export function AgentRow({ agent, isDeleting, onDelete }: Props) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div>
        <p className="font-medium text-gray-900">{agent.agents}</p>
        <p className="text-xs text-gray-400">
          Added {new Date(agent.created_at).toLocaleString()}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
          #{agent.id}
        </span>

        <button
          onClick={() => setShowPreview(true)}
          className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
        >
          Preview Survey
        </button>

        <button
          onClick={() => onDelete(agent.id)}
          className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      {showPreview && (
        <SurveyPreviewCard
          agentName={agent.agents}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}