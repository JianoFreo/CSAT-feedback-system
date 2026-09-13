import { useState } from "react";
import type { Agent } from "../hooks/useAgents";
import { SurveyPreviewCard } from "./SurveyPreviewCard";
import { buildSurveyTemplate } from ".././lib/surveyTemplate";

type Props = {
  agent: Agent;
  isDeleting: boolean;
  onDelete: (id: number) => void;
};

export function AgentRow({
  agent,
  isDeleting,
  onDelete,
}: Props) {
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const template = buildSurveyTemplate(agent.name);

      const blob = new Blob([template], {
        type: "text/html",
      });

      const clipboardItem = new ClipboardItem({
        "text/html": blob,
        "text/plain": new Blob([template], {
          type: "text/plain",
        }),
      });

      await navigator.clipboard.write([
        clipboardItem,
      ]);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy survey template:", error);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3">

      {/* Agent information */}
      <div>
        <p className="font-medium text-gray-900">
          {agent.name}
        </p>

        <p className="text-xs text-gray-400">
          Added{" "}
          {new Date(agent.created_at).toLocaleString()}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">

        {/* Copy Survey Template */}
        <button
          type="button"
          onClick={handleCopy}
          title="Copy survey template"
          aria-label={`Copy survey template for ${agent.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
        >
          {copied ? (
            <span className="text-sm text-green-600">
              ✓
            </span>
          ) : (
            <span className="text-base">
              ⧉
            </span>
          )}
        </button>

        {/* Preview Survey */}
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
        >
          Preview Survey
        </button>

        {/* Delete */}
        <button
          type="button"
          onClick={() => onDelete(agent.id)}
          className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      {/* Preview */}
      {showPreview && (
        <SurveyPreviewCard
          agentName={agent.name}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}