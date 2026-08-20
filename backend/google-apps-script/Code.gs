const SPREADSHEET_NAME = "Habit Tracker Backend V2";
const OWNER_EMAIL = "friendsindonesia28@gmail.com";
const OWNER_EXPORT_KEY = "MDD-OWNER-PDF-2026";
const DEFAULT_INVITE_CODES = ["MARKAZ2026", "HABIT2026", "MDD-ACCESS-2026"];
const TABLES = ["users", "goals", "systems", "habits", "habit_logs", "snapshots", "state_saved", "password_recovery_requested", "invite_codes", "invite_code_checked", "user_registered_invite_verified"];

function doGet(event) {
  const params = event && event.parameter ? event.parameter : {};
  if (params.action === "validate_invite") {
    const result = validateInvitationCode(params.code || "", params.email || "");
    return jsonResponse(result, params.callback);
  }
  if (params.action === "backend_url") {
    return jsonResponse({ ok: true, url: setupHabitTrackerBackend() }, params.callback);
  }
  if (params.action === "export_users_pdf") {
    return exportUsersPdf(params);
  }
  return jsonResponse({
    ok: true,
    app: "Habit Tracker",
    owner: OWNER_EMAIL,
    message: "Google Workspace backend is active."
  });
}

function doPost(event) {
  try {
    const body = JSON.parse(event.postData.contents || "{}");
    const sheet = getOrCreateSheet(body.action || "snapshots");
    sheet.appendRow([
      new Date().toISOString(),
      body.workspaceAccount || OWNER_EMAIL,
      body.source || "habit-tracker-pwa",
      body.activeRoute || "",
      body.action || "state_saved",
      JSON.stringify(body.menuItems || []),
      JSON.stringify(body.payload || {})
    ]);

    if (body.action === "password_recovery_requested") {
      sendPasswordRecoveryEmail(body.payload || {});
    }

    return jsonResponse({ ok: true, action: body.action || "state_saved" });
  } catch (error) {
    return jsonResponse({ ok: false, error: error.message });
  }
}

function validateInvitationCode(code, email) {
  const normalizedCode = String(code || "").trim().toUpperCase();
  const validCodes = getInvitationCodes();
  const match = validCodes.find((item) => item.code === normalizedCode && item.active);
  const result = {
    ok: true,
    valid: Boolean(match),
    owner: match ? match.owner : "",
    message: match ? "Kode undangan valid." : "Kode undangan tidak valid atau tidak aktif."
  };
  getOrCreateSheet("invite_code_checked").appendRow([
    new Date().toISOString(),
    OWNER_EMAIL,
    "apps-script",
    "",
    "invite_code_checked",
    JSON.stringify([{ id: "register", label: "Register" }]),
    JSON.stringify({ email, code: normalizedCode, valid: result.valid, owner: result.owner })
  ]);
  return result;
}

function getInvitationCodes() {
  const sheet = getOrCreateSheet("invite_codes");
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["code", "active", "owner", "note"]);
  }
  if (sheet.getLastRow() === 1) {
    DEFAULT_INVITE_CODES.forEach((code) => sheet.appendRow([code, true, "Markaz Dakwah Digital", "Kode awal admin"]));
  }
  const values = sheet.getDataRange().getValues();
  const firstRow = values[0] || [];
  const headers = firstRow.map((cell) => normalizeHeader(cell));
  const hasHeader = headers.includes("code") || headers.includes("kode") || headers.includes("invite_code") || headers.includes("kode_undangan");
  const codeIndex = findColumnIndex(headers, ["code", "kode", "invite_code", "kode_undangan", "kode_personal"], 0);
  const activeIndex = findColumnIndex(headers, ["active", "aktif", "status"], hasHeader ? -1 : 1);
  const ownerIndex = findColumnIndex(headers, ["owner", "admin", "pemilik"], 2);
  const rows = hasHeader ? values.slice(1) : values;
  return rows
    .map((row) => {
      const activeValue = activeIndex >= 0 ? row[activeIndex] : "";
      return {
        code: String(row[codeIndex] || "").trim().toUpperCase(),
        active: isInviteCodeActive(activeValue),
        owner: row[ownerIndex] || "Admin"
      };
    })
    .filter((item) => item.code);
}

function normalizeHeader(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

function findColumnIndex(headers, names, fallback) {
  const index = names
    .map((name) => headers.indexOf(name))
    .find((item) => item >= 0);
  return index >= 0 ? index : fallback;
}

function isInviteCodeActive(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (!normalized) return true;
  return ["true", "active", "aktif", "ya", "yes", "y", "1", "valid", "tersedia", "available"].includes(normalized);
}

function exportUsersPdf(params) {
  if (!isOwnerExportAuthorized(params.owner_key || "")) {
    return HtmlService.createHtmlOutput(
      "<h1>Akses ditolak</h1><p>Kode owner tidak valid. Silakan minta kode export kepada owner aplikasi.</p>"
    );
  }

  const users = collectUserDatabase();
  const html = buildUsersPdfHtml(users);
  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd-HHmmss");
  const blob = Utilities
    .newBlob(html, "text/html", "database-pengguna-habit-tracker.html")
    .getAs(MimeType.PDF)
    .setName("Database Pengguna Habit Tracker " + timestamp + ".pdf");
  const file = DriveApp.createFile(blob);
  file.setDescription("Export database pengguna Habit Tracker pada " + new Date().toISOString());

  const downloadUrl = "https://drive.google.com/uc?export=download&id=" + file.getId();
  return HtmlService.createHtmlOutput(
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<style>body{font-family:Arial,sans-serif;padding:32px;line-height:1.5}a{display:inline-block;background:#0b63ce;color:white;padding:12px 16px;border-radius:8px;text-decoration:none}</style>' +
    "<h1>Database Pengguna Siap Diunduh</h1>" +
    "<p>File PDF sudah dibuat di Google Drive owner.</p>" +
    '<p><a href="' + downloadUrl + '" target="_blank" rel="noopener">Download PDF</a></p>' +
    '<p><a href="' + file.getUrl() + '" target="_blank" rel="noopener">Buka di Google Drive</a></p>'
  );
}

function collectUserDatabase() {
  const usersByKey = {};
  collectUsersFromActionSheet("user_registered_invite_verified", usersByKey);
  collectUsersFromActionSheet("state_saved", usersByKey);
  return Object.keys(usersByKey)
    .map((key) => usersByKey[key])
    .sort((a, b) => String(a.registeredAt || "").localeCompare(String(b.registeredAt || "")));
}

function collectUsersFromActionSheet(sheetName, usersByKey) {
  const sheet = getOrCreateSheet(sheetName);
  const rows = sheet.getDataRange().getValues().slice(1);
  rows.forEach((row) => {
    const createdAt = row[0] || "";
    const payload = parseJson(row[6]);
    const user = payload.user || payload;
    const email = String(user.email || payload.email || "").trim();
    const whatsapp = String(user.whatsapp || payload.whatsapp || "").trim();
    if (!email && !whatsapp) return;
    const key = (email || whatsapp).toLowerCase();
    usersByKey[key] = Object.assign(usersByKey[key] || {}, {
      name: user.name || payload.name || usersByKey[key]?.name || "",
      email: email || usersByKey[key]?.email || "",
      whatsapp: whatsapp || usersByKey[key]?.whatsapp || "",
      inviteCode: user.inviteCode || payload.inviteCode || usersByKey[key]?.inviteCode || "",
      registeredAt: user.registeredAt || payload.validatedAt || createdAt || usersByKey[key]?.registeredAt || "",
      owner: payload.owner || user.registeredBy || usersByKey[key]?.owner || "Admin"
    });
  });
}

function buildUsersPdfHtml(users) {
  const generatedAt = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd MMMM yyyy HH:mm");
  const rows = users.length
    ? users.map((user, index) =>
        "<tr>" +
        "<td>" + (index + 1) + "</td>" +
        "<td>" + escapeHtml(user.name || "-") + "</td>" +
        "<td>" + escapeHtml(user.email || "-") + "</td>" +
        "<td>" + escapeHtml(user.whatsapp || "-") + "</td>" +
        "<td>" + escapeHtml(user.inviteCode || "-") + "</td>" +
        "<td>" + escapeHtml(formatDateForPdf(user.registeredAt)) + "</td>" +
        "</tr>"
      ).join("")
    : '<tr><td colspan="6">Belum ada data pengguna.</td></tr>';

  return '<!doctype html><html><head><meta charset="UTF-8">' +
    "<style>" +
    "body{font-family:Arial,sans-serif;color:#111827;padding:24px}" +
    "h1{margin:0 0 6px;font-size:22px}p{margin:0 0 14px;color:#4b5563}" +
    "table{width:100%;border-collapse:collapse;font-size:11px}" +
    "th{background:#0b1f3a;color:#fff;text-align:left}" +
    "th,td{border:1px solid #d1d5db;padding:7px;vertical-align:top}" +
    ".meta{margin-bottom:18px}.footer{margin-top:18px;font-size:10px;color:#6b7280}" +
    "</style></head><body>" +
    "<h1>Database Pengguna Habit Tracker</h1>" +
    '<p class="meta">Owner: ' + escapeHtml(OWNER_EMAIL) + " | Dibuat: " + escapeHtml(generatedAt) + " | Total pengguna: " + users.length + "</p>" +
    "<table><thead><tr><th>No</th><th>Nama</th><th>Email</th><th>No. Whatsapp</th><th>Kode Undangan</th><th>Terdaftar</th></tr></thead><tbody>" +
    rows +
    "</tbody></table>" +
    '<p class="footer">Developed by Markaz Dakwah Digital</p>' +
    "</body></html>";
}

function setupOwnerExportKey() {
  const key = "MDD-" + Utilities.getUuid().replace(/-/g, "").slice(0, 20).toUpperCase();
  PropertiesService.getScriptProperties().setProperty("OWNER_EXPORT_KEY", key);
  Logger.log("OWNER_EXPORT_KEY: " + key);
  return key;
}

function isOwnerExportAuthorized(key) {
  let savedKey = OWNER_EXPORT_KEY;
  try {
    savedKey = PropertiesService.getScriptProperties().getProperty("OWNER_EXPORT_KEY") || OWNER_EXPORT_KEY;
  } catch (error) {
    savedKey = OWNER_EXPORT_KEY;
  }
  return Boolean(savedKey) && String(key || "").trim() === savedKey;
}

function parseJson(value) {
  try {
    return JSON.parse(value || "{}");
  } catch (error) {
    return {};
  }
}

function formatDateForPdf(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (isNaN(date.getTime())) return String(value);
  return Utilities.formatDate(date, Session.getScriptTimeZone(), "dd MMM yyyy HH:mm");
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sendPasswordRecoveryEmail(payload) {
  const email = payload.email;
  if (!email) return;
  const code = Utilities.getUuid().slice(0, 8).toUpperCase();
  MailApp.sendEmail({
    to: email,
    subject: "Pemulihan Password Habit Tracker",
    body:
      "Assalamu'alaikum.\n\n" +
      "Kami menerima permintaan pemulihan password untuk akun Habit Tracker kamu.\n\n" +
      "Kode pemulihan sementara: " + code + "\n\n" +
      "Jika kamu tidak meminta pemulihan ini, abaikan email ini.\n\n" +
      "Developed by Markaz Dakwah Digital"
  });
}

function setupHabitTrackerBackend() {
  const spreadsheet = getOrCreateSpreadsheet();
  TABLES.forEach((name) => {
    const sheet = getOrCreateSheet(name);
    if (sheet.getLastRow() === 0) {
      if (name === "invite_codes") {
        sheet.appendRow(["code", "active", "owner", "note"]);
        DEFAULT_INVITE_CODES.forEach((code) => sheet.appendRow([code, true, "Markaz Dakwah Digital", "Kode awal admin"]));
      } else {
        sheet.appendRow(["created_at", "workspace_account", "source", "active_route", "action", "menu_items_json", "payload_json"]);
      }
    }
  });
  Logger.log(spreadsheet.getUrl());
  return spreadsheet.getUrl();
}

function getOrCreateSpreadsheet() {
  const files = DriveApp.getFilesByName(SPREADSHEET_NAME);
  if (files.hasNext()) {
    return SpreadsheetApp.open(files.next());
  }
  return SpreadsheetApp.create(SPREADSHEET_NAME);
}

function getOrCreateSheet(name) {
  const spreadsheet = getOrCreateSpreadsheet();
  const safeName = TABLES.includes(name) ? name : "snapshots";
  return spreadsheet.getSheetByName(safeName) || spreadsheet.insertSheet(safeName);
}

function jsonResponse(data, callback) {
  const json = JSON.stringify(data);
  if (callback) {
    return ContentService
      .createTextOutput(callback + "(" + json + ");")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}
