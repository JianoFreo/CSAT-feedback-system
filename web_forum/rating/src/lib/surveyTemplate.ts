const FEEDBACK_BASE = "https://csat-feedback-system.onrender.com";

export function buildSurveyTemplate(agentName: string) {
  const encodedAgent = encodeURIComponent(agentName);

  return `
    <div style="
      margin: 0;
      padding: 20px 10px;
      background: #f4f6f8;
      font-family: Arial, Helvetica, sans-serif;
    ">
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
              width="420"
              cellspacing="0"
              cellpadding="0"
              border="0"
              style="
                max-width: 420px;
                background: #ffffff;
                border-radius: 8px;
              "
            >
              <tr>
                <td
                  align="center"
                  style="padding: 25px;"
                >

                  <h2 style="
                    margin: 0 0 22px 0;
                    color: #222222;
                    font-size: 20px;
                    line-height: 1.3;
                    font-weight: bold;
                    text-align: center;
                  ">
                    How satisfied are you with ${agentName}'s service?
                  </h2>

                  <table
                    role="presentation"
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    align="center"
                  >
                    <tr>

                      <td
                        align="center"
                        valign="top"
                        style="padding: 0 12px;"
                      >
                        <a
                          href="${FEEDBACK_BASE}/disappointed?agent=${encodedAgent}"
                          style="
                            text-decoration: none;
                            font-size: 38px;
                            line-height: 1;
                          "
                        >
                          🙁
                        </a>

                        <div style="
                          margin-top: 8px;
                          font-size: 11px;
                          color: #666666;
                          text-align: center;
                        ">
                          Disappointed
                        </div>
                      </td>

                      <td
                        align="center"
                        valign="top"
                        style="padding: 0 12px;"
                      >
                        <a
                          href="${FEEDBACK_BASE}/neutral?agent=${encodedAgent}"
                          style="
                            text-decoration: none;
                            font-size: 38px;
                            line-height: 1;
                          "
                        >
                          😐
                        </a>

                        <div style="
                          margin-top: 8px;
                          font-size: 11px;
                          color: #666666;
                          text-align: center;
                        ">
                          Neutral
                        </div>
                      </td>

                      <td
                        align="center"
                        valign="top"
                        style="padding: 0 12px;"
                      >
                        <a
                          href="${FEEDBACK_BASE}/satisfied?agent=${encodedAgent}"
                          style="
                            text-decoration: none;
                            font-size: 38px;
                            line-height: 1;
                          "
                        >
                          😃
                        </a>

                        <div style="
                          margin-top: 8px;
                          font-size: 11px;
                          color: #666666;
                          text-align: center;
                        ">
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
    </div>
  `;
}