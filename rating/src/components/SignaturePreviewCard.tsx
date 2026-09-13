import { useState } from "react";
import { buildSignatureTemplate } from "../lib/signatureTemplate";

type Props = {
  agentName: string;
  agentRole: string;
  onClose: () => void;
};

export function SignaturePreviewCard({ agentName, agentRole, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  let html = "";
  let configError: string | null = null;
  try {
    html = buildSignatureTemplate(agentName, agentRole);
  } catch (error) {
    configError = error instanceof Error ? error.message : String(error);
  }

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
      console.error("Failed to copy signature template:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Signature Preview - Paste this into the agent's Freshdesk signature
            </h2>
            <p className="mt-0.5 text-xs text-gray-500">
              {agentName || "General (no agent)"}
              {agentRole ? ` — ${agentRole}` : ""}
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

        {/* Signature preview */}
        {configError ? (
          <div className="m-3 rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            Couldn't build the preview: {configError}
          </div>
        ) : (
          <div className="bg-gray-100 p-3">
            <iframe
              title={`signature-preview-${agentName}`}
              srcDoc={html}
              className="block h-[260px] w-full border-0"
              sandbox=""
            />
          </div>
        )}

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
            disabled={!!configError}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copied ? "✓ Copied" : "Copy signature"}
          </button>
        </div>
      </div>
    </div>
  );
}