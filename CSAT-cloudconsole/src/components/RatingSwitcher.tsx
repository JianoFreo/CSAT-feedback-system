import React from "react";

export type RatingKey = "disappointed" | "neutral" | "satisfied";

interface Props {
  current: RatingKey;
  onChange: (key: RatingKey) => void;
}

export const RatingSwitcher: React.FC<Props> = ({ current, onChange }) => {
  const buttons: { key: RatingKey; label: string; emoji: string }[] = [
    { key: "disappointed", label: "Disappointed", emoji: "😞" },
    { key: "neutral", label: "Neutral", emoji: "😐" },
    { key: "satisfied", label: "Satisfied", emoji: "😄" },
  ];

  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "20px 0" }}>
      {buttons.map((b) => (
        <a
          key={b.key}
          href={`/${b.key}`}
          onClick={(event) => {
            event.preventDefault();
            onChange(b.key);
            window.history.pushState({}, "", `/${b.key}`);
          }}
          aria-current={b.key === current ? "page" : undefined}
          style={{
            padding: "8px 12px",
            borderRadius: 999,
            border: b.key === current ? "2px solid #333" : "1px solid #ddd",
            background: b.key === current ? "#111" : "#fff",
            color: b.key === current ? "#fff" : "#111",
            cursor: "pointer",
            fontSize: 14,
            display: "flex",
            gap: 8,
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <span style={{ fontSize: 18 }}>{b.emoji}</span>
          <span>{b.label}</span>
        </a>
      ))}
    </div>
  );
};

export default RatingSwitcher;
