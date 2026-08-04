import { useState } from "react";
import { SurveyPreviewCard } from "./SurveyPreviewCard";

function NoAgent() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-gray-900">General survey</h2>
      <p className="mt-1 text-xs text-gray-500">
        Use this link when feedback isn&apos;t tied to a specific agent.
      </p>

      <button
        onClick={() => setShowPreview(true)}
        className="mt-4 w-full rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
      >
        Preview survey
      </button>

      {showPreview && (
        <SurveyPreviewCard agentName="" onClose={() => setShowPreview(false)} />
      )}
    </div>
  );
}

export default NoAgent;
