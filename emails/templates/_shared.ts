export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getEnvTrimmed(name: string): string | null {
  const value = process.env[name];
  const trimmed = typeof value === "string" ? value.trim() : "";
  return trimmed ? trimmed : null;
}

function escapeAttr(value: string) {
  return escapeHtml(value);
}

export function paragraph(text: string) {
  return `<p style="margin:0 0 12px 0;line-height:1.6;font-size:14px;color:#111827">${
    escapeHtml(text)
  }</p>`;
}

export function labelValue(label: string, value: string) {
  return `<p style="margin:0 0 8px 0;line-height:1.6;font-size:14px;color:#111827"><strong>${
    escapeHtml(label)
  }:</strong> ${escapeHtml(value)}</p>`;
}

export function hiddenPreheader(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return "";

  // Hidden preview text for email clients.
  return `
<div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;max-height:0;max-width:0;overflow:hidden;mso-hide:all">
  ${escapeHtml(trimmed)}
</div>
<div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;max-height:0;max-width:0;overflow:hidden;mso-hide:all">
  &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
</div>`;
}

export function multilineText(text: string) {
  const escaped = escapeHtml(text);
  return escaped.replaceAll("\n", "<br />");
}

export function textBox(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return "";

  return `
<div style="border:1px solid #e5e7eb;border-radius:12px;background:#f9fafb;padding:12px 14px;font-size:14px;line-height:1.6;color:#111827">
  ${multilineText(trimmed)}
</div>`;
}

export function codeBox(code: string) {
  const trimmed = code.trim();
  if (!trimmed) return "";

  return `
<div style="border:1px solid #d1d5db;border-radius:12px;background:#ffffff;padding:14px 16px;text-align:center">
  <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#6b7280">Offer code</div>
  <div style="margin-top:8px;font-size:22px;line-height:1.2;font-weight:700;letter-spacing:0.04em;color:#111827;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace">${
    escapeHtml(trimmed)
  }</div>
</div>`;
}

export function buttonLink(params: { href: string; label: string }) {
  const href = params.href.trim();
  const label = params.label.trim();
  if (!href || !label) return "";

  // Table-based button for email client compatibility.
  return `
<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate">
  <tr>
    <td align="center" bgcolor="#16a34a" style="border-radius:999px">
      <a href="${
    escapeAttr(href)
  }" style="display:inline-block;padding:12px 18px;font-size:14px;line-height:1.2;font-weight:600;color:#ffffff;text-decoration:none;border-radius:999px">${
    escapeHtml(label)
  }</a>
    </td>
  </tr>
</table>`;
}

export type KeyValueRow = {
  label: string;
  value: string;
};

export function keyValueTable(rows: ReadonlyArray<KeyValueRow>) {
  const safeRows = rows
    .map((r) => ({ label: r.label.trim(), value: r.value.trim() }))
    .filter((r) => r.label && r.value);

  if (safeRows.length === 0) return "";

  const body = safeRows
    .map(
      (r) => `
<tr>
  <td valign="top" style="padding:10px 0;width:160px;color:#6b7280;font-size:12px;line-height:1.4;text-transform:uppercase;letter-spacing:0.08em">${
        escapeHtml(r.label)
      }</td>
  <td valign="top" style="padding:10px 0;color:#111827;font-size:14px;line-height:1.6">${
        multilineText(r.value)
      }</td>
</tr>`,
    )
    .join("");

  return `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse">
  ${body}
</table>`;
}

export type WrapEmailHtmlOptions = {
  preheaderText?: string | null;
  brandName?: string | null;
  logoUrl?: string | null;
  siteUrl?: string | null;
};

export function wrapEmailHtml(
  title: string,
  bodyHtml: string,
  options: WrapEmailHtmlOptions = {},
) {
  const brandName = options.brandName?.trim() || "Quilliams Mowing";
  const siteUrl = options.siteUrl?.trim() || getEnvTrimmed("EMAIL_SITE_URL") ||
    "https://quilliamsmowing.co.uk";
  const logoUrl = options.logoUrl?.trim() || getEnvTrimmed("EMAIL_LOGO_URL") ||
    "";
  const preheaderText = options.preheaderText?.trim() || "";

  const headerInner = logoUrl
    ? `<a href="${
      escapeAttr(siteUrl)
    }" style="text-decoration:none;display:inline-block">
  <img src="${escapeAttr(logoUrl)}" alt="${
      escapeAttr(brandName)
    }" width="180" style="display:block;border:0;outline:none;text-decoration:none;height:auto" />
</a>`
    : `<div style="font-size:16px;line-height:1.3;font-weight:700;color:#111827">${
      escapeHtml(brandName)
    }</div>`;

  const footerLink = siteUrl
    ? `<a href="${
      escapeAttr(siteUrl)
    }" style="color:#16a34a;text-decoration:underline">${
      escapeHtml(siteUrl)
    }</a>`
    : "";

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body style="margin:0;padding:0;background:#f3f4f6">
    ${hiddenPreheader(preheaderText)}
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;background:#f3f4f6">
      <tr>
        <td align="center" style="padding:24px 12px">
          <table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;width:640px;max-width:640px">
            <tr>
              <td align="left" style="padding:0 8px 16px 8px">
                ${headerInner}
              </td>
            </tr>

            <tr>
              <td style="padding:0 8px">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px">
                  <tr>
                    <td style="padding:22px 22px 8px 22px">
                      <div style="margin:0 0 12px 0;font-size:20px;line-height:1.3;font-weight:700;color:#111827">${
    escapeHtml(title)
  }</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 22px 22px 22px">
                      ${bodyHtml}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td align="left" style="padding:16px 8px 0 8px">
                <div style="font-size:12px;line-height:1.6;color:#6b7280">
                  Sent from Quilliams website forms.${
    footerLink ? ` Visit: ${footerLink}` : ""
  }
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
