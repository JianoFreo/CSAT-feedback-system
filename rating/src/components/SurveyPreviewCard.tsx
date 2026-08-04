import { useState } from "react";
import { buildSurveyTemplate } from "../lib/surveyTemplate";

type Props = {
  agentName: string;
  onClose: () => void;
};

export function SurveyPreviewCard({ agentName, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  const html = buildSurveyTemplate(agentName);

  const handleCopy = async () => {
    try {
      const blob = new Blob([html], {
        type: "text/html",
      });

      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": blob,
        }),
      ]);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy template:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Survey Preview - Copy the template below to paste via email
            </h2>
            <p className="mt-0.5 text-xs text-gray-500">
              {agentName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-lg text-gray-400 transition hover:text-gray-700"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Email preview */}
        <div className="bg-gray-100 p-3">
          <iframe
            title={`survey-preview-${agentName}`}
            srcDoc={html}
            className="block h-[210px] w-full border-0"
            sandbox=""
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 border-t border-gray-200 px-5 py-3">
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
          >
            Close
          </button>

          <button
            onClick={handleCopy}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            {copied ? "✓ Copied" : "Copy template"}
          </button>
        </div>
      </div>
    </div>
  );
}