import { useState } from 'react'
import './App.css'
import RatingSwitcher, { type RatingKey } from './components/RatingSwitcher'
import SatisfactionPage from './components/SatisfactionPage'

const formUrls = {
  disappointed:
    'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=N-0b_WRuKUCUri0p76P1ciMCgbEyRTZKn1onILstHuFUQ05TRklETVcyTU1GTDhHM0k5UFJNQ1E0Ry4u&r60cac473dc574a958ebc29c79cacff20=%22Disappointed%22',
  neutral:
    'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=N-0b_WRuKUCUri0p76P1ciMCgbEyRTZKn1onILstHuFUQ05TRklETVcyTU1GTDhHM0k5UFJNQ1E0Ry4u&r60cac473dc574a958ebc29c79cacff20=%22Neutral%22',
  satisfied:
    'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=N-0b_WRuKUCUri0p76P1ciMCgbEyRTZKn1onILstHuFUQ05TRklETVcyTU1GTDhHM0k5UFJNQ1E0Ry4u&r60cac473dc574a958ebc29c79cacff20=%22Satisfied%22',
} as const

function App() {
  const [rating, setRating] = useState<RatingKey>('neutral')

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f8', padding: '24px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', margin: '0 0 12px', color: '#222' }}>Customer satisfaction survey</h1>

        <RatingSwitcher current={rating} onChange={(k) => setRating(k)} />

        {rating === 'disappointed' && (
          <SatisfactionPage
            title="We know this missed the mark."
            description="Tell us what went wrong so we can follow up and improve."
            emoji="😞"
            formUrl={formUrls.disappointed}
            tone="disappointed"
          />
        )}

        {rating === 'neutral' && (
          <SatisfactionPage
            title="Thanks for keeping us balanced."
            description="Your feedback helps us understand what to keep doing and what to improve."
            emoji="🙂"
            formUrl={formUrls.neutral}
            tone="neutral"
          />
        )}

        {rating === 'satisfied' && (
          <SatisfactionPage
            title="Great to hear we were on track."
            description="Tell us what worked well so we can keep it up."
            emoji="😄"
            formUrl={formUrls.satisfied}
            tone="satisfied"
          />
        )}
      </div>
    </div>
  )
}

export default App
