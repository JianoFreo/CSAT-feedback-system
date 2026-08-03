const FEEDBACK_BASE = "https://csat-feedback-system.onrender.com";

export function buildSurveyTemplate(agentName: string) {
  const encodedAgent = encodeURIComponent(agentName);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Customer Satisfaction Survey</title>
  </head>

  <body
    style="
      margin: 0;
      padding: 40px 20px;
      background: #f4f6f8;
      font-family: Arial, Helvetica, sans-serif;
    "
  >
    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
    >
      <tr>
        <td align="center">
          <table
            role="presentation"
            width="600"
            cellspacing="0"
            cellpadding="0"
            border="0"
            style="background: #ffffff; border-radius: 10px; padding: 40px"
          >
            <tr>
              <td align="center">
                <h2
                  style="
                    margin: 0;
                    color: #222;
                    font-size: 28px;
                    font-weight: bold;
                  "
                >
                  How satisfied are you with ${agentName}'s service?
                </h2>

                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                >
                  <tr>
                    <td align="center" style="padding: 0 18px">
                      
                        href="${FEEDBACK_BASE}/disappointed?agent=${encodedAgent}"
                        style="text-decoration: none; font-size: 52px"
                      >
                        🙁
                      </a>
                      <div
                        style="font-size: 13px; color: #666; margin-top: 10px"
                      >
                        Disappointed
                      </div>
                    </td>

                    <td align="center" style="padding: 0 18px">
                      
                        href="${FEEDBACK_BASE}/neutral?agent=${encodedAgent}"
                        style="text-decoration: none; font-size: 52px"
                      >
                        😐
                      </a>
                      <div
                        style="font-size: 13px; color: #666; margin-top: 10px"
                      >
                        Neutral
                      </div>
                    </td>

                    <td align="center" style="padding: 0 18px">
                      
                        href="${FEEDBACK_BASE}/satisfied?agent=${encodedAgent}"
                        style="text-decoration: none; font-size: 52px"
                      >
                        😃
                      </a>
                      <div
                        style="font-size: 13px; color: #666; margin-top: 10px"
                      >
                        Satisfied
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}
