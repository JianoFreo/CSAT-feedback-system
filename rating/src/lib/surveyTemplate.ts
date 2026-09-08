const FEEDBACK_BASE = import.meta.env.VITE_WEB_FORM_URL;

export function buildSurveyTemplate(agentName: string) {
  const trimmedAgent = agentName.trim();
  const isGeneral = trimmedAgent.length === 0;
  const encodedAgent = encodeURIComponent(trimmedAgent);

  const query = isGeneral ? "" : `?agent=${encodedAgent}`;

  const heading = isGeneral
    ? "How satisfied are you with CloudConsole's service?"
    : `How satisfied are you with ${trimmedAgent}'s service?`;

  // Keep HTML tag attributes on a single line for Outlook compatibility.
  return `
    <div style="margin:0;padding:15px 8px;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td align="center">
            <table role="presentation" width="360" cellspacing="0" cellpadding="0" border="0" style="max-width:360px;background:#ffffff;border-radius:8px;">
              <tr>
                <td align="center" style="padding:20px;">
                  <h2 style="margin:0 0 18px 0;color:#222222;font-size:18px;line-height:1.3;font-weight:bold;text-align:center;">
                    ${heading}
                  </h2>

                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tr>
                      <td align="center" valign="middle" style="padding:0 6px;">
                        <a href="${FEEDBACK_BASE}/awesome${query}" style="display:inline-block;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#14355D;background-color:#B4E5DA;border-radius:999px;padding:10px 18px;white-space:nowrap;">
                          Very Good
                        </a>
                      </td>

                      <td align="center" valign="middle" style="padding:0 6px;">
                        <a href="${FEEDBACK_BASE}/just-okay${query}" style="display:inline-block;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#14355D;background-color:#FDDBB5;border-radius:999px;padding:10px 18px;white-space:nowrap;">
                          Just Okay
                        </a>
                      </td>

                      <td align="center" valign="middle" style="padding:0 6px;">
                        <a href="${FEEDBACK_BASE}/not-good${query}" style="display:inline-block;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#14355D;background-color:#FFD0D6;border-radius:999px;padding:10px 18px;white-space:nowrap;">
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