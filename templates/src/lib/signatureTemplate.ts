const FEEDBACK_BASE = import.meta.env.VITE_WEB_FORM_URL;

const LOGO_URL =
  import.meta.env.VITE_SIGNATURE_LOGO_URL ||
  "https://cdn-ilejfap.nitrocdn.com/UAZTApKcXnbCLrdzEzBwRhugMTXWJJTN/assets/images/optimized/rev-e4e8604/cloudconsole.ph/wp-content/uploads/2024/05/logo-vertical-transparent-bg-585x295-1.png";

const LOGO_WIDTH = 134;
const LOGO_HEIGHT = 70;

const COMPANY = {
  phone: " +63 2 8231 2520",
  email: " support@cloudconsole.ph",
  website: " cloudconsole.ph",
  address:
    " 2nd Floor ZETA II Building #25D, 191 Salcedo St., Legaspi Village, Makati City 1229, Metro Manila, Philippines",
  disclaimer:
    " The content of this message is the proprietary and confidential property of CloudConsole. If you are not the intended recipient and have received this message in error, please delete this message from your computer system and notify me immediately by reply e-mail. Any unauthorised use or distribution of the content of this message is prohibited. Thank you. Please consider the environment before printing this email.",
};

const ACCENT = "#35EBDB";
const NAVY = "#14355D";
const VIOLET = "#7C3AED";
const TEXT = "#222222";
const MUTED = "#AAAAAA";

const PILL_WIDTH = 78;
const PILL_HEIGHT = 30;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function ratingButton(
  path: string,
  query: string,
  background: string,
  label: string
): string {
  // Pill backgrounds are solid/saturated on purpose, so they stay readable
  // in both light and dark mode without needing an override.
  return `<a href="${FEEDBACK_BASE}/${path}${query}" rel="noreferrer" style="display:block;width:${PILL_WIDTH}px;height:${PILL_HEIGHT}px;line-height:${PILL_HEIGHT}px;font-family:Arial,sans-serif;font-size:9px;font-weight:bold;color:${NAVY};background-color:${background};text-decoration:none;text-align:center;border-radius:15px;white-space:nowrap;">${label}</a>`;
}

export function buildSignatureTemplate(
  agentName: string,
  agentRole: string
): string {
  const trimmedName = agentName.trim();
  const trimmedRole = agentRole.trim();

  const isGeneral = trimmedName.length === 0;
  const encodedAgent = encodeURIComponent(trimmedName);

  const safeName = escapeHtml(trimmedName);
  const safeRole = escapeHtml(trimmedRole);

  const query = isGeneral
    ? "?ticketID={{ticket.id}}"
    : `?agent=${encodedAgent}&ticketID={{ticket.id}}`;

  const nameBlock = isGeneral
    ? ""
    : `<div style="margin:0;font-family:Calibri,sans-serif;font-size:11pt;">
<span class="cc-sig-name" style="font-family:Arial,sans-serif;color:${NAVY};">${safeName}</span>
</div>
<div style="margin:0;font-family:Calibri,sans-serif;font-size:11pt;">
<span class="cc-sig-role" style="font-family:Arial,sans-serif;font-size:9pt;color:${VIOLET};">${safeRole}</span>
</div>`;

  return `<div class="cc-sig-bg" style="background-color:#FFFFFF;margin:0;font-family:Calibri,sans-serif;font-size:11pt;">

<style>
  @media (prefers-color-scheme: dark) {
    .cc-sig-bg { background-color: #1A1A1A !important; }
    .cc-sig-fg { color: #EAEAEA !important; }
    .cc-sig-value { color: #D5D5D5 !important; }
    .cc-sig-name { color: #7FB2FF !important; }
    .cc-sig-role { color: #C9A6FF !important; }
    .cc-sig-muted { color: #8A8A8A !important; }
  }
  /* Gmail (and some webmail clients) flag dark mode with this attribute
     on an ancestor instead of using prefers-color-scheme, so this is a
     second path to the same overrides for those clients. */
  [data-ogsc] .cc-sig-bg { background-color: #1A1A1A !important; }
  [data-ogsc] .cc-sig-fg { color: #EAEAEA !important; }
  [data-ogsc] .cc-sig-value { color: #D5D5D5 !important; }
  [data-ogsc] .cc-sig-name { color: #7FB2FF !important; }
  [data-ogsc] .cc-sig-role { color: #C9A6FF !important; }
  [data-ogsc] .cc-sig-muted { color: #8A8A8A !important; }
</style>

<div class="cc-sig-bg" style="background-color:#FFFFFF;margin:0;font-family:Calibri,sans-serif;font-size:11pt;">
<span class="cc-sig-fg" style="color:#000000;"><br></span>
</div>

<div class="cc-sig-bg" style="background-color:#FFFFFF;margin:0;font-family:Calibri,sans-serif;font-size:11pt;">
<span class="cc-sig-fg" style="color:#000000;">Best Regards,</span>
</div>

<div class="cc-sig-bg" style="background-color:#FFFFFF;margin:0;font-family:Calibri,sans-serif;font-size:11pt;">
<span class="cc-sig-fg" style="color:#242424;">&nbsp;</span>
</div>

<div class="cc-sig-bg" style="background-color:#FFFFFF;margin:0;font-family:Calibri,sans-serif;font-size:11pt;">
<span class="cc-sig-fg" style="font-family:Arial,sans-serif;font-size:10pt;color:#000000;">&nbsp;</span>
</div>

<table
  border="0"
  cellpadding="0"
  cellspacing="0"
  width="100%"
  style="
    width:100%;
    border-collapse:collapse;
    border-spacing:0;
  "
>
<tbody>
<tr>

<!-- LOGO -->

<td
  width="140"
  style="
    width:140px;
    padding:0 6pt 0 0;
    vertical-align:top;
  "
  valign="top"
>
<div style="margin:0;font-family:Calibri,sans-serif;font-size:11pt;">
<span style="color:#000000;">
<img
  alt="CloudConsole IT Consulting"
  width="${LOGO_WIDTH}"
  height="${LOGO_HEIGHT}"
  style="
    width:${LOGO_WIDTH}px;
    height:${LOGO_HEIGHT}px;
    min-width:auto;
    min-height:auto;
    margin:0;
    border:0;
  "
  src="${LOGO_URL}"
>
</span>
</div>
</td>

<!-- CONTACT -->

<td
  style="
    width:auto;
    border-left:2.25pt solid ${ACCENT};
    padding:0 0 0 6pt;
    vertical-align:top;
  "
  valign="top"
>

${nameBlock}

<div style="margin:0;font-family:Calibri,sans-serif;font-size:11pt;">
<span style="font-family:Arial,sans-serif;font-size:9pt;color:${ACCENT};">T:</span><span class="cc-sig-value" style="font-family:Arial,sans-serif;font-size:9pt;color:${TEXT};">${escapeHtml(COMPANY.phone)}&nbsp;</span>
</div>

<div style="margin:0;font-family:Calibri,sans-serif;font-size:11pt;">
<span style="font-family:Arial,sans-serif;font-size:9pt;color:${ACCENT};">E:</span><span class="cc-sig-value" style="font-family:Arial,sans-serif;font-size:9pt;color:${TEXT};">${escapeHtml(COMPANY.email)}</span>
</div>

<div style="margin:0;font-family:Calibri,sans-serif;font-size:11pt;"><span style="font-family:Arial,sans-serif;font-size:9pt;color:${ACCENT};">W:</span><span style="font-family:Arial,sans-serif;font-size:9pt;color:#0563C1;"><a
      href="https://cloudconsole.ph/"
      title="https://cloudconsole.ph/"
      style="margin:0;"
      rel="noreferrer"
      target="_blank"
    >${COMPANY.website}</a></span><span class="cc-sig-value" style="font-family:Arial,sans-serif;font-size:9pt;color:${TEXT};">&nbsp;</span>
</div>

<div style="margin:0;font-family:Calibri,sans-serif;font-size:11pt;">
<span style="font-family:Arial,sans-serif;font-size:9pt;color:${ACCENT};">A:</span><span class="cc-sig-value" style="font-family:Arial,sans-serif;font-size:9pt;color:${TEXT};">${escapeHtml(COMPANY.address)}</span>
</div>

<div style="margin:0;font-family:Calibri,sans-serif;font-size:11pt;">
<span class="cc-sig-value" style="font-family:Arial,sans-serif;font-size:9pt;color:${TEXT};">&nbsp;</span>
</div>

</td>

<!-- CSAT -->

<td
  width="100"
  style="
    width:100px;
    padding:0;
    vertical-align:middle;
    text-align:center;
  "
  valign="middle"
  align="center"
>

<div class="cc-sig-fg" style="margin:0 0 8px 0;font-family:Arial,sans-serif;font-size:12px;line-height:15px;font-weight:bold;color:${TEXT};text-align:center;">
How did we do?
</div>

<table
  border="0"
  cellpadding="0"
  cellspacing="0"
  align="center"
  style="
    border-collapse:collapse;
    border-spacing:0;
    margin:0 auto;
  "
>
<tbody>

<tr>
<td style="padding:2px 0;text-align:center;">
${ratingButton("awesome", query, "#B4E5DA", "Very Good")}
</td>
</tr>

<tr>
<td style="padding:2px 0;text-align:center;">
${ratingButton("just-okay", query, "#FDDBB5", "Just Okay")}
</td>
</tr>

<tr>
<td style="padding:2px 0;text-align:center;">
${ratingButton("not-good", query, "#FFD0D6", "Not Good")}
</td>
</tr>

</tbody>
</table>

</td>

</tr>
</tbody>
</table>

<div class="cc-sig-bg" style="background-color:#FFFFFF;margin:0;font-family:Calibri,sans-serif;font-size:11pt;">
<span class="cc-sig-fg" style="font-family:Arial,sans-serif;font-size:10pt;color:#000000;">&nbsp;</span>
</div>

<div class="cc-sig-bg" style="background-color:#FFFFFF;margin:0;font-family:Calibri,sans-serif;font-size:11pt;">
<span class="cc-sig-muted" style="font-family:Arial,sans-serif;font-size:7.5pt;color:${MUTED};">${escapeHtml(COMPANY.disclaimer)}</span>
</div>

</div>`;
}