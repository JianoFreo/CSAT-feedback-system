import { useState } from "react";
import type { Agent } from "../hooks/useAgents";
import { SurveyPreviewCard } from "./SurveyPreviewCard";
import { SignaturePreviewCard } from "./SignaturePreviewCard";
import { buildSurveyTemplate } from ".././lib/surveyTemplate";
import { buildSignatureTemplate } from ".././lib/signatureTemplate";

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
  const [showSurveyPreview, setShowSurveyPreview] = useState(false);
  const [showSignaturePreview, setShowSignaturePreview] = useState(false);
  const [copiedSurvey, setCopiedSurvey] = useState(false);
  const [copiedSignature, setCopiedSignature] = useState(false);

  const handleCopySurvey = async () => {
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

      setCopiedSurvey(true);

      setTimeout(() => {
        setCopiedSurvey(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy survey template:", error);
    }
  };

  const handleCopySignature = async () => {
    try {
      const template = buildSignatureTemplate(agent.name, agent.role);

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

      setCopiedSignature(true);

      setTimeout(() => {
        setCopiedSignature(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy signature template:", error);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3">

      {/* Agent information */}
      <div>
        <p className="font-medium text-gray-900">
          {agent.name}
        </p>

        {agent.role && (
          <p className="text-xs text-gray-500">
            {agent.role}
          </p>
        )}

        <p className="text-xs text-gray-400">
          Added{" "}
          {new Date(agent.created_at).toLocaleString()}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-end gap-3">

        {/* Copy Survey Template */}
        <button
          type="button"
          onClick={handleCopySurvey}
          title="Copy survey template"
          aria-label={`Copy survey template for ${agent.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
        >
          {copiedSurvey ? (
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
          onClick={() => setShowSurveyPreview(true)}
          className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
        >
          Preview Survey
        </button>

        {/* Copy Signature Template */}
        <button
          type="button"
          onClick={handleCopySignature}
          title="Copy signature template"
          aria-label={`Copy signature template for ${agent.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
        >
          {copiedSignature ? (
            <span className="text-sm text-green-600">
              ✓
            </span>
          ) : (
            <span className="text-base">
              ✎
            </span>
          )}
        </button>

        {/* Preview Signature */}
        <button
          type="button"
          onClick={() => setShowSignaturePreview(true)}
          className="rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-700 transition hover:bg-teal-100"
        >
          Preview Signature
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

      {/* Survey Preview */}
      {showSurveyPreview && (
        <SurveyPreviewCard
          agentName={agent.name}
          onClose={() => setShowSurveyPreview(false)}
        />
      )}

      {/* Signature Preview */}
      {showSignaturePreview && (
        <SignaturePreviewCard
          agentName={agent.name}
          agentRole={agent.role}
          onClose={() => setShowSignaturePreview(false)}
        />
      )}
    </div>
  );
}