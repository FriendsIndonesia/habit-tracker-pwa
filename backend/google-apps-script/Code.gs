const SPREADSHEET_NAME = "Habit Tracker Backend";
const OWNER_EMAIL = "friendsindonesia28@gmail.com";
const TABLES = ["users", "goals", "systems", "habits", "habit_logs", "snapshots", "state_saved", "password_recovery_requested", "otp_whatsapp_requested", "user_registered_otp_verified"];

function doGet() {
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

    if (body.action === "otp_whatsapp_requested") {
      notifyOwnerForWhatsAppOtp(body.payload || {});
    }

    return jsonResponse({ ok: true, action: body.action || "state_saved" });
  } catch (error) {
    return jsonResponse({ ok: false, error: error.message });
  }
}

function notifyOwnerForWhatsAppOtp(payload) {
  if (!payload.phone || !payload.otpCode) return;
  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: "OTP WhatsApp Habit Tracker",
    body:
      "Permintaan OTP WhatsApp baru.\n\n" +
      "Nomor WhatsApp: " + payload.phone + "\n" +
      "Email: " + (payload.email || "-") + "\n" +
      "Kode OTP: " + payload.otpCode + "\n\n" +
      "Catatan: hubungkan Apps Script ke provider WhatsApp Business API agar OTP terkirim otomatis ke pengguna."
  });
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
      sheet.appendRow(["created_at", "workspace_account", "source", "active_route", "action", "menu_items_json", "payload_json"]);
    }
  });
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

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
