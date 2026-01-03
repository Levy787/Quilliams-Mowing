export function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

export function paragraph(text: string) {
    return `<p style="margin:0 0 12px 0;line-height:1.6">${
        escapeHtml(text)
    }</p>`;
}

export function labelValue(label: string, value: string) {
    return `<p style="margin:0 0 8px 0"><strong>${
        escapeHtml(label)
    }:</strong> ${escapeHtml(value)}</p>`;
}

export function wrapEmailHtml(title: string, bodyHtml: string) {
    return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin:0;padding:0;background:#ffffff;color:#111827;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial">
    <div style="max-width:640px;margin:0 auto;padding:24px">
      <h1 style="margin:0 0 16px 0;font-size:20px;line-height:1.3">${
        escapeHtml(title)
    }</h1>
      ${bodyHtml}
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0" />
      <p style="margin:0;color:#6b7280;font-size:12px;line-height:1.5">This email was sent from your website contact/quote/subscription forms.</p>
    </div>
  </body>
</html>`;
}
