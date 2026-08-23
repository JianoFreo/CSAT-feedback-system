import { useState } from "react";
import { buildSurveyTemplate } from "../lib/surveyTemplate";

function NoAgent() {
  const [copied, setCopied] = useState(false);

  let html = "";
  let configError: string | null = null;
  try {
    html = buildSurveyTemplate("");
  } catch (error) {
    configError = error instanceof Error ? error.message : String(error);
  }

  const handleCopy = async () => {
    try {
      const blob = new Blob([html], { type: "text/html" });

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
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-gray-900">General survey</h2>
      <p className="mt-1 text-xs text-gray-500">
        Use this link when feedback isn&apos;t tied to a specific agent.
      </p>

      {configError ? (
        <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
          {configError}
        </div>
      ) : (
        <div className="mt-4 rounded-md border border-gray-200 bg-gray-50 p-4 text-center">
          <p className="text-sm font-bold text-gray-900">
            How satisfied are you with CloudConsole&apos;s service?
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-[#B4E5DA] px-4 py-2 text-xs font-bold text-[#14355D]">
              Awesome
            </span>
            <span className="rounded-full bg-[#FDDBB5] px-4 py-2 text-xs font-bold text-[#14355D]">
              Just Okay
            </span>
            <span className="rounded-full bg-[#FFD0D6] px-4 py-2 text-xs font-bold text-[#14355D]">
              Not Good
            </span>
          </div>
        </div>
      )}

      <button
        onClick={handleCopy}
        disabled={!!configError}
        className="mt-3 w-full rounded-md bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {copied ? "✓ Copied" : "Copy template"}
      </button>
    </div>
  );
}

export default NoAgent;