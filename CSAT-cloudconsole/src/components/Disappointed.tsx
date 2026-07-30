import React from "react";

export type FormUrls = {
  disappointed?: string;
};

const defaultUrl =
  "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=N-0b_WRuKUCUri0p76P1ciMCgbEyRTZKn1onILstHuFUQ05TRklETVcyTU1GTDhHM0k5UFJNQ1E0Ry4u&r60cac473dc574a958ebc29c79cacff20=%22Disappointed%22";

export const Disappointed: React.FC<FormUrls> = ({ disappointed = defaultUrl }) => {
  const handleNavigate = (href: string) => (e?: React.MouseEvent) => {
    try {
      // allow host to suppress draft warnings
      // @ts-ignore
      if (typeof window !== "undefined") window.skipDraftWarning = true;
    } catch {}
    if (e) e.preventDefault();
    if (typeof window !== "undefined") window.location.href = href;
  };

  return (
    <div style={{ padding: 20 }}>
      <article style={{ maxWidth: 720, margin: "0 auto", background: "#fff", borderRadius: 10, padding: 32 }}>
        <h2 style={{ margin: 0, color: "#222", fontSize: 28 }}>We know this missed the mark.</h2>
        <p style={{ color: "#666", marginTop: 14 }}>Tell us what went wrong so we can follow up and improve.</p>

        <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 28 }}>
          <a href={disappointed} aria-label="Disappointed" onClick={handleNavigate(disappointed)} style={{ fontSize: 48 }}>
            😞
          </a>
        </div>

        <p style={{ color: "#999", marginTop: 28 }}>This survey takes less than a minute to complete.</p>
      </article>
    </div>
  );
};

export default Disappointed;
