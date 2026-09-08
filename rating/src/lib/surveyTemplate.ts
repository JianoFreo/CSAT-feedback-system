const FEEDBACK_BASE = import.meta.env.VITE_WEB_FORM_URL;

export function buildSurveyTemplate(agentName: string) {
  const trimmedAgent = agentName.trim();
  const isGeneral = trimmedAgent.length === 0;
  const encodedAgent = encodeURIComponent(trimmedAgent);

  const query = isGeneral ? "" : `?agent=${encodedAgent}`;

  const heading = isGeneral
    ? "How satisfied are you with CloudConsole's service?"
    : `How satisfied are you with ${trimmedAgent}'s service?`;

  return `
    <div style="margin:0;padding:15px 8px;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
        <tr>
          <td align="center">
            <table role="presentation" width="360" cellspacing="0" cellpadding="0" border="0" style="width:360px;background:#ffffff;border-radius:8px;">
              <tr>
                <td align="center" width="360" style="width:360px;padding:20px;box-sizing:border-box;">

                  <h2 style="margin:0 0 18px 0;color:#222222;font-size:18px;line-height:1.3;font-weight:bold;text-align:center;width:320px;">
                    ${heading}
                  </h2>

                  <table role="presentation" width="320" cellspacing="0" cellpadding="0" border="0" align="center" style="width:320px;">
                    <tr>

                      <td align="center" valign="middle" width="106" style="width:106px;padding:0 3px;">
                        <a href="${FEEDBACK_BASE}/awesome${query}" style="display:block;width:100px;box-sizing:border-box;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#14355D;background-color:#B4E5DA;border-radius:999px;padding:10px 0;white-space:nowrap;text-align:center;">
                          Very Good
                        </a>
                      </td>

                      <td align="center" valign="middle" width="106" style="width:106px;padding:0 3px;">
                        <a href="${FEEDBACK_BASE}/just-okay${query}" style="display:block;width:100px;box-sizing:border-box;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#14355D;background-color:#FDDBB5;border-radius:999px;padding:10px 0;white-space:nowrap;text-align:center;">
                          Just Okay
                        </a>
                      </td>

                      <td align="center" valign="middle" width="106" style="width:106px;padding:0 3px;">
                        <a href="${FEEDBACK_BASE}/not-good${query}" style="display:block;width:100px;box-sizing:border-box;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#14355D;background-color:#FFD0D6;border-radius:999px;padding:10px 0;white-space:nowrap;text-align:center;">
                          Not Good
                        </a>
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