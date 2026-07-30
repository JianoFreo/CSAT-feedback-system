import React from "react";

export type RatingKey = "disappointed" | "neutral" | "satisfied";

interface Props {
  current: RatingKey;
  onChange: (key: RatingKey) => void;
}

export const RatingSwitcher: React.FC<Props> = ({ current, onChange }) => {
  const buttons: { key: RatingKey; label: string; emoji: string }[] = [
    { key: "disappointed", label: "Disappointed", emoji: "😞" },
    { key: "neutral", label: "Neutral", emoji: "🙂" },
    { key: "satisfied", label: "Satisfied", emoji: "😄" },
  ];

  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "20px 0" }}>
      {buttons.map((b) => (
        <button
          key={b.key}
          onClick={() => onChange(b.key)}
          aria-pressed={b.key === current}
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
          }}
        >
          <span style={{ fontSize: 18 }}>{b.emoji}</span>
          <span>{b.label}</span>
        </button>
      ))}
    </div>
  );
};

export default RatingSwitcher;
