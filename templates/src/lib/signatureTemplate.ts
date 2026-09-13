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

const TEXT = "#14355D";
const LINK = "#2563A6";
const ACCENT = "#159E95";
const MUTED = "#667085";

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
  return `<a
  href="${FEEDBACK_BASE}/${path}${query}"
  rel="noreferrer"
  style="
    display:block;
    width:${PILL_WIDTH}px;
    height:${PILL_HEIGHT}px;
    line-height:${PILL_HEIGHT}px;
    font-family:Arial,sans-serif;
    font-size:9px;
    font-weight:bold;
    color:${TEXT};
    background-color:${background};
    text-decoration:none;
    text-align:center;
    border-radius:15px;
    white-space:nowrap;
  "
>${label}</a>`;
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
    : `<div
  style="
    margin:0;
    padding:0;
    font-family:Arial,sans-serif;
    font-size:11pt;
    line-height:normal;
    color:${TEXT};
  "
>
<span
  style="
    font-family:Arial,sans-serif;
    font-size:11pt;
    color:${TEXT};
  "
>${safeName}</span>
</div>

<div
  style="
    margin:0;
    padding:0;
    font-family:Arial,sans-serif;
    font-size:9pt;
    line-height:normal;
    color:${LINK};
  "
>
<span
  style="
    font-family:Arial,sans-serif;
    font-size:9pt;
    color:${LINK};
  "
>${safeRole}</span>
</div>`;

  return `<table
  border="0"
  cellpadding="0"
  cellspacing="0"
  width="100%"
  style="
    width:100%;
    border-collapse:collapse;
    border-spacing:0;
    font-family:Arial,sans-serif;
  "
>
<tbody>
<tr>

<!-- LOGO -->

<td
  width="140"
  style="
    width:140px;
    padding:0 10px 0 0;
    vertical-align:top;
  "
  valign="top"
>

<img
  alt="CloudConsole IT Consulting"
  width="${LOGO_WIDTH}"
  height="${LOGO_HEIGHT}"
  style="
    display:block;
    width:${LOGO_WIDTH}px;
    height:${LOGO_HEIGHT}px;
    min-width:${LOGO_WIDTH}px;
    min-height:${LOGO_HEIGHT}px;
    margin:0;
    padding:0;
    border:0;
  "
  src="${LOGO_URL}"
>

</td>

<!-- CONTACT -->

<td
  style="
    width:auto;
    border-left:2.25pt solid ${ACCENT};
    padding:0 12px 0 10px;
    vertical-align:top;
  "
  valign="top"
>

${nameBlock}

<div
  style="
    margin:4px 0 0 0;
    padding:0;
    font-family:Arial,sans-serif;
    font-size:9pt;
    line-height:14px;
    white-space:nowrap;
    color:${TEXT};
  "
>
<span
  style="
    font-family:Arial,sans-serif;
    font-size:9pt;
    color:${ACCENT};
  "
>T:</span>
<span
  style="
    font-family:Arial,sans-serif;
    font-size:9pt;
    color:${TEXT};
  "
>${escapeHtml(COMPANY.phone)}&nbsp;</span>
</div>

<div
  style="
    margin:0;
    padding:0;
    font-family:Arial,sans-serif;
    font-size:9pt;
    line-height:14px;
    white-space:nowrap;
    color:${TEXT};
  "
>
<span
  style="
    font-family:Arial,sans-serif;
    font-size:9pt;
    color:${ACCENT};
  "
>E:</span>
<span
  style="
    font-family:Arial,sans-serif;
    font-size:9pt;
    color:${TEXT};
  "
>${escapeHtml(COMPANY.email)}</span>
</div>

<div
  style="
    margin:0;
    padding:0;
    font-family:Arial,sans-serif;
    font-size:9pt;
    line-height:14px;
    white-space:nowrap;
    color:${LINK};
  "
>
<span
  style="
    font-family:Arial,sans-serif;
    font-size:9pt;
    color:${ACCENT};
  "
>W:</span>
<span
  style="
    font-family:Arial,sans-serif;
    font-size:9pt;
    color:${LINK};
  "
>
<a
  href="https://cloudconsole.ph/"
  title="https://cloudconsole.ph/"
  style="
    margin:0;
    padding:0;
    font-family:Arial,sans-serif;
    font-size:9pt;
    color:${LINK};
    text-decoration:underline;
  "
  rel="noreferrer"
  target="_blank"
>${COMPANY.website}</a>
</span>
</div>

<div
  style="
    margin:0;
    padding:0;
    font-family:Arial,sans-serif;
    font-size:9pt;
    line-height:14px;
    color:${TEXT};
  "
>
<span
  style="
    font-family:Arial,sans-serif;
    font-size:9pt;
    color:${ACCENT};
  "
>A:</span>
<span
  style="
    font-family:Arial,sans-serif;
    font-size:9pt;
    color:${TEXT};
  "
>${escapeHtml(COMPANY.address)}</span>
</div>

<div
  style="
    margin:0;
    padding:0;
    font-family:Arial,sans-serif;
    font-size:9pt;
    line-height:14px;
    color:${TEXT};
  "
>
<span
  style="
    font-family:Arial,sans-serif;
    font-size:9pt;
    color:${TEXT};
  "
>&nbsp;</span>
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

<div
  style="
    margin:0 0 8px 0;
    padding:0;
    font-family:Arial,sans-serif;
    font-size:12px;
    line-height:15px;
    font-weight:bold;
    color:${TEXT};
    text-align:center;
  "
>
<span
  style="
    font-family:Arial,sans-serif;
    font-size:12px;
    color:${TEXT};
  "
>How did we do?</span>
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
<td style="
  padding:2px 0;
  text-align:center;
">
${ratingButton(
  "awesome",
  query,
  "#B4E5DA",
  "Very Good"
)}
</td>
</tr>

<tr>
<td style="
  padding:2px 0;
  text-align:center;
">
${ratingButton(
  "just-okay",
  query,
  "#FDDBB5",
  "Just Okay"
)}
</td>
</tr>

<tr>
<td style="
  padding:2px 0;
  text-align:center;
">
${ratingButton(
  "not-good",
  query,
  "#FFD0D6",
  "Not Good"
)}
</td>
</tr>

</tbody>
</table>

</td>

</tr>
</tbody>
</table>

<div
  style="
    margin:10px 0 0 0;
    padding:0;
    font-family:Arial,sans-serif;
    font-size:7.5pt;
    line-height:11px;
    color:${MUTED};
  "
>
<span
  style="
    font-family:Arial,sans-serif;
    font-size:7.5pt;
    color:${MUTED};
  "
>${escapeHtml(COMPANY.disclaimer)}</span>
</div>

</td>

</tr>
</tbody>
</table>`;
}