import React from 'react';

export interface SatisfactionPageProps {
  title: string;
  description: string;
  emoji: string;
  formUrl: string;
  tone: 'disappointed' | 'neutral' | 'satisfied';
}

const tones = {
  disappointed: {
    border: '#fbc7d0',
    text: '#9f1239',
  },
  neutral: {
    border: '#f7d8a3',
    text: '#b45309',
  },
  satisfied: {
    border: '#bcefd0',
    text: '#047857',
  },
} as const;

export const SatisfactionPage: React.FC<SatisfactionPageProps> = ({
  title,
  description,
  emoji,
  formUrl,
  tone,
}) => {
  const color = tones[tone];

  const handleNavigate = (href: string) => (event?: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      // @ts-ignore
      if (typeof window !== 'undefined') window.skipDraftWarning = true;
    } catch {}
    if (event) event.preventDefault();
    if (typeof window !== 'undefined') window.location.href = href;
  };

  return (
    <div style={{ padding: '40px 20px', background: '#f4f6f8', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div
        style={{
          maxWidth: 600,
          margin: '0 auto',
          background: '#ffffff',
          borderRadius: 10,
          padding: '40px 24px',
          border: `2px solid ${color.border}`,
          textAlign: 'center',
          boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)',
        }}
      >
        <h2 style={{ margin: 0, color: '#222', fontSize: 28, fontWeight: 'bold' }}>{title}</h2>
        <p style={{ margin: '18px 0 35px', color: '#666', fontSize: 16, lineHeight: 1.6 }}>{description}</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
          <a
            href={formUrl}
            onClick={handleNavigate(formUrl)}
            style={{ textDecoration: 'none', fontSize: 52, color: color.text }}
            aria-label={title}
          >
            {emoji}
          </a>
        </div>

        <p style={{ marginTop: 40, fontSize: 13, color: '#999', lineHeight: 1.6 }}>
          This survey takes less than a minute to complete.
        </p>
      </div>
    </div>
  );
};

export default SatisfactionPage;
