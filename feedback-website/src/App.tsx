

import { useEffect } from "react";
import { FeedbackPage } from "./pages/FeedbackPage";

declare global {
  interface Window {
    skipDraftWarning?: boolean;
  }
}

function App() {
  // Suppress draft warnings when navigating between ratings
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (window.skipDraftWarning) {
        delete (e as any).returnValue;
        return;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return <FeedbackPage />;
}

export default App