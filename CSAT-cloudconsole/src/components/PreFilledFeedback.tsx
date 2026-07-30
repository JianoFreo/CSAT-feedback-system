import React from "react";

type Props = {
  // optional: provide custom form URLs if needed
  disappointedUrl?: string;
  neutralUrl?: string;
  satisfiedUrl?: string;
};

export default function PreFilledFeedback({
  disappointedUrl = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=N-0b_WRuKUCUri0p76P1ciMCgbEyRTZKn1onILstHuFUQ05TRklETVcyTU1GTDhHM0k5UFJNQ1E0Ry4u&r60cac473dc574a958ebc29c79cacff20=%22Disappointed%22",
  neutralUrl = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=N-0b_WRuKUCUri0p76P1ciMCgbEyRTZKn1onILstHuFUQ05TRklETVcyTU1GTDhHM0k5UFJNQ1E0Ry4u&r60cac473dc574a958ebc29c79cacff20=%22Neutral%22",
  satisfiedUrl = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=N-0b_WRuKUCUri0p76P1ciMCgbEyRTZKn1onILstHuFUQ05TRklETVcyTU1GTDhHM0k5UFJNQ1E0Ry4u&r60cac473dc574a958ebc29c79cacff20=%22Satisfied%22",
}: Props) {
  const containerStyle: React.CSSProperties = {
    margin: 0,
    padding: "40px 20px",
    background: "#f4f6f8",
    fontFamily: "Arial, Helvetica, sans-serif",
    minHeight: "100vh",
    boxSizing: "border-box",
  };

  const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    borderRadius: 10,
    padding: 40,
    width: "100%",
    maxWidth: 600,
    boxSizing: "border-box",
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    color: "#222",
    fontSize: 28,
    fontWeight: 700,
    textAlign: "center",
  };

  const leadStyle: React.CSSProperties = {
    margin: "18px 0 35px",
    color: "#666",
    fontSize: 16,
    lineHeight: "24px",
    textAlign: "center",
  };

  const hintStyle: React.CSSProperties = {
    marginTop: 40,
    fontSize: 13,
    color: "#999",
    lineHeight: "20px",
    textAlign: "center",
  };

  const emojiLinkStyle: React.CSSProperties = {
    textDecoration: "none",
    fontSize: 52,
    display: "inline-block",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
  };

  const handleNavigate = (href: string) => (e?: React.MouseEvent) => {
    // prevent any unsaved-draft browser prompts if the host app sets one
    try {
      // @ts-ignore
      if (typeof window !== "undefined") window.skipDraftWarning = true;
    } catch {}
    if (e) e.currentTarget && e.preventDefault && e.preventDefault();
    // navigate
    if (typeof window !== "undefined") window.location.href = href;
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={cardStyle}>
          <div style={{ textAlign: "center" }}>
            <h2 style={titleStyle}>How satisfied are you with our support?</h2>

            <p style={leadStyle}>
              We'd love to hear about your experience.
              <br />
              Your feedback helps us improve our service.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: 36 }}>
              <div style={{ textAlign: "center", padding: "0 18px" }}>
                <a
                  href={disappointedUrl}
                  style={emojiLinkStyle}
                  onClick={handleNavigate(disappointedUrl)}
                  aria-label="Disappointed"
                >
                  🙁
                </a>
                <div style={labelStyle}>Disappointed</div>
              </div>

              <div style={{ textAlign: "center", padding: "0 18px" }}>
                <a
                  href={neutralUrl}
                  style={emojiLinkStyle}
                  onClick={handleNavigate(neutralUrl)}
                  aria-label="Neutral"
                >
                  🙂
                </a>
                <div style={labelStyle}>Neutral</div>
              </div>

              <div style={{ textAlign: "center", padding: "0 18px" }}>
                <a
                  href={satisfiedUrl}
                  style={emojiLinkStyle}
                  onClick={handleNavigate(satisfiedUrl)}
                  aria-label="Satisfied"
                >
                  😃
                </a>
                <div style={labelStyle}>Satisfied</div>
              </div>
            </div>

            <p style={hintStyle}>This survey takes less than a minute to complete.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
