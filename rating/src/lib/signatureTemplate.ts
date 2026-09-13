const FEEDBACK_BASE = import.meta.env.VITE_WEB_FORM_URL;

// TODO: replace with the FINAL hosted logo URL once you have it.
// Must be a public, absolute URL — Freshdesk emails cannot load a relative
// path, a localhost URL, or anything from this app's /public folder.
// Falls back to a visible placeholder box so it's obvious what's missing.
// If your real logo isn't ~100x50px, adjust LOGO_WIDTH/LOGO_HEIGHT below too
// (fixed dimensions keep the layout from shifting or overflowing).
const LOGO_URL =
  import.meta.env.VITE_SIGNATURE_LOGO_URL ||
  "https://placehold.co/100x50/ffffff/14355D?text=LOGO";
const LOGO_WIDTH = 100;
const LOGO_HEIGHT = 50;

// Company-wide details — edit once here, every agent's signature picks it up.
const COMPANY = {
  phone: "+63 2 8231 2520",
  email: "support@cloudconsole.ph",
  website: "https://cloudconsole.ph",
  address:
    "2nd Floor ZETA II Building #25D, 191 Salcedo St., Legaspi Village, Makati City 1229, Metro Manila, Philippines",
  disclaimer:
    "The content of this message is the proprietary and confidential property of CloudConsole. If you are not the intended recipient and have received this message in error, please delete this message from your computer system and notify me immediately by reply e-mail. Any unauthorized use or distribution of the content of this message is prohibited. Thank you. Please consider the environment before printing this email.",
};

// Colors match the existing CSAT survey template/pills elsewhere in this repo
// (surveyTemplate.ts, templatefreshdesk.html) so the signature matches the
// rest of the system instead of introducing a separate look.
const CARD_BG = "#ffffff";
const CARD_BORDER = "#E5E7EB";
const ACCENT = "#5FBBA4"; // teal used for the "satisfied" state elsewhere
const NAVY = "#14355D"; // navy used as pill text color elsewhere
const TEXT_PRIMARY = "#222222";
const TEXT_SECONDARY = "#555555";
const ADDRESS_BG = "#F4F6F8"; // same light gray used as the survey card's outer bg
const DISCLAIMER_COLOR = "#9CA3AF";

// Fixed pixel budget so nothing wraps or overflows. Total = 600px.
// 600 - (16*2 outer padding) = 568 content width, split as:
//   logo(108) + divider(1) + name/contact(240) + rating(219) = 568
const TOTAL_WIDTH = 600;
const OUTER_PADDING = 16;
const LOGO_COL = 108;
const DIVIDER_COL = 1;
const INFO_COL = 240;
const RATING_COL = 219;
const PILL_WIDTH = 66;

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function ratingPill(
  path: string,
  query: string,
  bg: string,
  color: string,
  label: string
) {
  return `<a href="${FEEDBACK_BASE}/${path}${query}" style="display:block;width:${PILL_WIDTH}px;box-sizing:border-box;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;color:${color};background-color:${bg};border-radius:999px;padding:6px 0;white-space:nowrap;text-align:center;">${label}</a>`;
}

/**
 * Builds a FIXED-WIDTH (600px) email-signature block: logo + agent name/role
 * + contact details + address + disclaimer + an embedded "How did we do?"
 * rating (Very Good / Just Okay / Not Good). Every column has an explicit
 * pixel width so the layout can't wrap, shift, or overflow in Outlook/Gmail;
 * long names/roles wrap within their own column instead of breaking the grid.
 *
 * The ticket id is NOT known at copy time — this signature gets pasted once
 * into an agent's Freshdesk signature and then goes out on every reply. So,
 * same approach as templatefreshdesk.html, the {{ticket.id}} Freshdesk
 * placeholder is left verbatim in each rating link's href; Freshdesk resolves
 * it to the real ticket number when the email actually sends. The agent name
 * is safe to hardcode here instead, since each agent pastes only their own
 * generated signature.
 *
 * Pass empty strings for a generic, agent-less signature.
 */
export function buildSignatureTemplate(agentName: string, agentRole: string) {
  const trimmedName = agentName.trim();
  const trimmedRole = agentRole.trim();
  const isGeneral = trimmedName.length === 0;

  const encodedAgent = encodeURIComponent(trimmedName);
  const safeName = escapeHtml(trimmedName);
  const safeRole = escapeHtml(trimmedRole);

  // {{ticket.id}} is a Freshdesk placeholder — left unencoded on purpose.
  const query = isGeneral
    ? `?ticketID={{ticket.id}}`
    : `?agent=${encodedAgent}&ticketID={{ticket.id}}`;

  const nameBlock = isGeneral
    ? ""
    : `
      <p style="margin:0 0 2px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:${NAVY};word-break:break-word;">${safeName}</p>
      <p style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;color:${ACCENT};word-break:break-word;">${safeRole}</p>
    `;

  return `
  <table role="presentation" width="${TOTAL_WIDTH}" cellspacing="0" cellpadding="0" border="0" style="width:${TOTAL_WIDTH}px;max-width:${TOTAL_WIDTH}px;table-layout:fixed;background-color:${CARD_BG};border:1px solid ${CARD_BORDER};border-radius:6px;font-family:Arial,Helvetica,sans-serif;border-collapse:collapse;">
    <tr>
      <td style="width:${TOTAL_WIDTH - OUTER_PADDING * 2}px;padding:${OUTER_PADDING}px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
          <tr>
            <!-- Logo -->
            <td width="${LOGO_COL}" valign="middle" style="width:${LOGO_COL}px;padding:0 10px 0 0;">
              <img src="${LOGO_URL}" width="${LOGO_WIDTH}" height="${LOGO_HEIGHT}" alt="CloudConsole IT Consulting" style="display:block;width:${LOGO_WIDTH}px;height:${LOGO_HEIGHT}px;border:0;" />
            </td>

            <!-- Divider -->
            <td width="${DIVIDER_COL}" bgcolor="${ACCENT}" style="width:${DIVIDER_COL}px;background-color:${ACCENT};font-size:0;line-height:0;">&nbsp;</td>

            <!-- Name / role / contact -->
            <td width="${INFO_COL}" valign="middle" style="width:${INFO_COL}px;padding-left:12px;word-break:break-word;">
              ${nameBlock}
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;width:100%;">
                <tr>
                  <td style="padding:1px 0;font-size:11px;font-family:Arial,Helvetica,sans-serif;word-break:break-word;">
                    <span style="color:${ACCENT};font-weight:bold;">T:</span>
                    <span style="color:${TEXT_SECONDARY};"> ${escapeHtml(COMPANY.phone)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:1px 0;font-size:11px;font-family:Arial,Helvetica,sans-serif;word-break:break-word;">
                    <span style="color:${ACCENT};font-weight:bold;">E:</span>
                    <span style="color:${TEXT_SECONDARY};"> ${escapeHtml(COMPANY.email)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:1px 0;font-size:11px;font-family:Arial,Helvetica,sans-serif;word-break:break-word;">
                    <span style="color:${ACCENT};font-weight:bold;">W:</span>
                    <span style="color:${TEXT_SECONDARY};"> ${escapeHtml(COMPANY.website)}</span>
                  </td>
                </tr>
              </table>
            </td>

            <!-- Rating -->
            <td width="${RATING_COL}" valign="middle" align="center" style="width:${RATING_COL}px;padding-left:12px;">
              <p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;color:${TEXT_PRIMARY};">How did we do?</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="table-layout:fixed;">
                <tr>
                  <td style="padding:0 2px;">${ratingPill("awesome", query, "#B4E5DA", NAVY, "Very Good")}</td>
                  <td style="padding:0 2px;">${ratingPill("just-okay", query, "#FDDBB5", NAVY, "Just Okay")}</td>
                  <td style="padding:0 2px;">${ratingPill("not-good", query, "#FFD0D6", NAVY, "Not Good")}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Address -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;margin-top:14px;">
          <tr>
            <td style="background-color:${ADDRESS_BG};border:1px solid ${ACCENT};border-radius:4px;padding:7px 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;color:${NAVY};text-align:center;word-break:break-word;">
              ${escapeHtml(COMPANY.address)}
            </td>
          </tr>
        </table>

        <!-- Disclaimer -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;margin-top:8px;">
          <tr>
            <td style="font-family:Arial,Helvetica,sans-serif;font-size:9px;line-height:1.4;color:${DISCLAIMER_COLOR};text-align:center;word-break:break-word;">
              ${escapeHtml(COMPANY.disclaimer)}
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
  `;
}
