const SPREADSHEET_NAME = "Habit Tracker Backend V2";
const OWNER_EMAIL = "friendsindonesia28@gmail.com";
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
