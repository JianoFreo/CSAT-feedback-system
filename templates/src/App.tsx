import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import {
  buildSignatureTemplate,
  buildSignatureTemplateStacked,
} from "./lib/signatureTemplate";

function App() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [copiedSide, setCopiedSide] = useState(false);
  const [copiedStacked, setCopiedStacked] = useState(false);

  const htmlSide = useMemo(
    () => buildSignatureTemplate(name, role),
    [name, role]
  );

  const htmlStacked = useMemo(
    () => buildSignatureTemplateStacked(name, role),
    [name, role]
  );

  const copyHtml = async (
    html: string,
    onDone: (copied: boolean) => void
  ) => {
    try {
      const blob = new Blob([html], { type: "text/html" });

      await navigator.clipboard.write([
        new ClipboardItem({ "text/html": blob }),
      ]);

      onDone(true);
      setTimeout(() => onDone(false), 2000);
    } catch (error) {
      console.error("Failed to copy signature template:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Signature Generator
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Type an agent's name and role to generate their Freshdesk
              signature. Leave both blank to generate the general signature.
            </p>
          </div>

          {/* Inputs */}
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                placeholder="e.g. Juan Dela Cruz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Role
              </label>
              <input
                type="text"
                placeholder="e.g. Software Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Previews */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* CSAT on the side */}
            <div>
              <div className="mb-2 text-xs font-medium text-gray-600">
                CSAT on the side
              </div>
              <div className="mb-3 overflow-hidden rounded-md border border-gray-200 bg-gray-50 p-3">
                <iframe
                  title="signature-preview-side"
                  srcDoc={htmlSide}
                  className="block h-[220px] w-full border-0"
                  sandbox=""
                />
              </div>
              <button
                onClick={() => copyHtml(htmlSide, setCopiedSide)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                {copiedSide ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy signature
                  </>
                )}
              </button>
            </div>

            {/* CSAT below */}
            <div>
              <div className="mb-2 text-xs font-medium text-gray-600">
                CSAT below
              </div>
              <div className="mb-3 overflow-hidden rounded-md border border-gray-200 bg-gray-50 p-3">
                <iframe
                  title="signature-preview-stacked"
                  srcDoc={htmlStacked}
                  className="block h-[270px] w-full border-0"
                  sandbox=""
                />
              </div>
              <button
                onClick={() => copyHtml(htmlStacked, setCopiedStacked)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                {copiedStacked ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy signature
                  </>
                )}
              </button>
            </div>

          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            Paste either one directly into the agent's Freshdesk signature
            settings.
          </p>

        </div>
      </div>
    </main>
  );
}

export default App;