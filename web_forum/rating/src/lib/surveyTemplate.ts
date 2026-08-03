const FEEDBACK_BASE = "https://csat-feedback-system.onrender.com";

export function buildSurveyTemplate(agentName: string) {
  const encodedAgent = encodeURIComponent(agentName);

  return `
    <div style="
      margin: 0;
      padding: 40px 20px;
      background: #f4f6f8;
      font-family: Arial, Helvetica, sans-serif;
    ">
      <div style="
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 10px;
        padding: 40px;
        text-align: center;
      ">
        <h2 style="
          margin: 0 0 30px 0;
          color: #222;
          font-size: 28px;
          font-weight: bold;
        ">
          How satisfied are you with ${agentName}'s service?
        </h2>

        <div style="
          display: flex;
          justify-content: center;
          gap: 36px;
        ">

          <div style="text-align: center;">
            <a
              href="${FEEDBACK_BASE}/disappointed?agent=${encodedAgent}"
              style="
                text-decoration: none;
                font-size: 52px;
                display: block;
              "
            >
              🙁
            </a>

            <div style="
              font-size: 13px;
              color: #666;
              margin-top: 10px;
            ">
              Disappointed
            </div>
          </div>

          <div style="text-align: center;">
            <a
              href="${FEEDBACK_BASE}/neutral?agent=${encodedAgent}"
              style="
                text-decoration: none;
                font-size: 52px;
                display: block;
              "
            >
              😐
            </a>

            <div style="
              font-size: 13px;
              color: #666;
              margin-top: 10px;
            ">
              Neutral
            </div>
          </div>

          <div style="text-align: center;">
            <a
              href="${FEEDBACK_BASE}/satisfied?agent=${encodedAgent}"
              style="
                text-decoration: none;
                font-size: 52px;
                display: block;
              "
            >
              😃
            </a>

            <div style="
              font-size: 13px;
              color: #666;
              margin-top: 10px;
            ">
              Satisfied
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}