import { useState } from "react";
import { buildSignatureTemplate } from "../lib/signatureTemplate";

function GeneralSignature() {
  const [copied, setCopied] = useState(false);

  let html = "";
  let configError: string | null = null;
  try {
    html = buildSignatureTemplate("", "");
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
      console.error("Failed to copy signature template:", error);
    }
  };

  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-gray-900">General signature</h2>
      <p className="mt-1 text-xs text-gray-500">
        Use this for shared mailboxes or when the reply isn&apos;t tied to a
        specific agent. No name or role is shown.
      </p>

      {configError ? (
        <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
          {configError}
        </div>
      ) : (
        <div className="mt-4 overflow-hidden rounded-md border border-gray-200 bg-gray-50 p-3">
          <iframe
            title="general-signature-preview"
            srcDoc={html}
            className="block h-[220px] w-full border-0"
            sandbox=""
          />
        </div>
      )}

      <button
        onClick={handleCopy}
        disabled={!!configError}
        className="mt-3 w-full rounded-md bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {copied ? "✓ Copied" : "Copy signature"}
      </button>
    </div>
  );
}

export default GeneralSignature;
