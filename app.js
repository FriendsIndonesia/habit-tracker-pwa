const storageKey = "habit-tracker-phase1-state-id-islamic-v2";
const appConfig = window.HABIT_TRACKER_CONFIG || {};

const navItems = [
  ["dashboard", "Dashboard", "◇"],
  ["today", "Hari Ini", "✓"],
  ["goals", "Tujuan", "◎"],
  ["systems", "Sistem", "⬡"],
  ["habits", "Kebiasaan", "↻"],
  ["progress", "Progres", "▥"],
  ["impact", "Dampak", "◌"],
  ["reviews", "Muhasabah", "✎"],
  ["journal", "Jurnal", "□"],
  ["achievements", "Pencapaian", "★"],
  ["insights", "Insight", "✦"],
  ["profile", "Profil", "●"]
];

const lifeAreas = [
  "Ibadah & Spiritual",
  "Kesehatan",
  "Ilmu, Akhlak & Pengembangan Diri",
  "Dakwah",
  "Sekolah/Kuliah/Kerja",
  "Keluarga",
  "Bisnis & Produktivitas",
  "Kecukupan Rezeki & Keberkahan"
];

const activitySuggestions = {
  "Ibadah & Spiritual": {
    Morning: ["Shalat Subuh berjamaah/tepat waktu", "Dzikir pagi", "Tilawah 10 menit"],
    Afternoon: ["Shalat Dzuhur/Ashar tepat waktu", "Sedekah harian", "Murajaah hafalan"],
    Evening: ["Shalat Isya tepat waktu", "Dzikir petang", "Muhasabah sebelum tidur"]
  },
  Kesehatan: {
    Morning: ["Minum air putih", "Jalan kaki ringan", "Sarapan sehat"],
    Afternoon: ["Jalan Kaki 30 Menit", "Peregangan tubuh", "Kurangi gula/minuman manis"],
    Evening: ["Tidur lebih awal", "Siapkan air minum besok", "Matikan layar 30 menit sebelum tidur"]
  },
  "Ilmu, Akhlak & Pengembangan Diri": {
    Morning: ["Baca 5 halaman", "Catat 1 pelajaran", "Dengarkan kajian singkat"],
    Afternoon: ["Latihan adab dan skill 25 menit", "Review catatan", "Tulis rangkuman ilmu"],
    Evening: ["Muhasabah akhlak harian", "Membaca Ilmu Bermanfaat", "Bagikan 1 faedah"]
  },
  Keluarga: {
    Morning: ["Sapa keluarga dengan baik", "Bantu satu pekerjaan rumah", "Doakan keluarga"],
    Afternoon: ["Hubungi orang tua/keluarga", "Tunaikan janji keluarga", "Quality time singkat"],
    Evening: ["Obrolan hangat tanpa distraksi", "Maafkan dan minta maaf", "Baca doa sebelum tidur bersama"]
  },
  Dakwah: {
    Morning: ["Niatkan manfaat hari ini", "Siapkan konten/faedah", "Doakan umat"],
    Afternoon: ["Bagikan kebaikan", "Bantu satu orang", "Belajar materi dakwah"],
    Evening: ["Evaluasi adab komunikasi", "Catat ide dakwah", "Doakan penerima manfaat"]
  },
  "Sekolah/Kuliah/Kerja": {
    Morning: ["Tentukan 3 prioritas", "Rapikan agenda belajar/kerja", "Mulai tugas tersulit"],
    Afternoon: ["Fokus menunaikan amanah", "Follow up tugas penting", "Rapikan catatan/inbox"],
    Evening: ["Evaluasi amanah harian", "Siapkan agenda besok", "Catat kendala utama"]
  },
  "Bisnis & Produktivitas": {
    Morning: ["Niat & Rencana Pagi", "Blok waktu fokus", "Rapikan meja kerja"],
    Afternoon: ["Fokus Menunaikan Amanah", "Istirahat berkualitas", "Selesaikan tugas kecil"],
    Evening: ["Review pekerjaan", "Tentukan prioritas besok", "Tutup hari tanpa menunda"]
  },
  "Kecukupan Rezeki & Keberkahan": {
    Morning: ["Cek niat belanja hari ini", "Catat rencana pengeluaran", "Sisihkan sedekah"],
    Afternoon: ["Catat transaksi", "Hindari pembelian impulsif", "Review anggaran"],
    Evening: ["Rekap pengeluaran", "Doakan keberkahan rezeki", "Rencana hemat besok"]
  }
};

const demoState = {
  route: "login",
  user: null,
  pendingUser: null,
  otp: null,
  avatarUrl: "",
  onboardingDone: false,
  selectedAreas: ["Ibadah & Spiritual", "Kesehatan", "Ilmu, Akhlak & Pengembangan Diri"],
  vision: "Menjadi pribadi muslim yang lebih sehat, disiplin, amanah, dan bermanfaat.",
  goals: [
    {
      id: "goal-health",
      name: "Menjaga Kesehatan sebagai Amanah",
      area: "Kesehatan",
      why: "Agar badan lebih kuat untuk ibadah, keluarga, dakwah, dan bekerja dengan amanah.",
      target: 100,
      current: 72,
      unit: "%",
      deadline: "2026-12-31",
      status: "Active"
    },
    {
      id: "goal-productivity",
      name: "Lebih Produktif dan Tertib",
      area: "Bisnis & Produktivitas",
      why: "Menata waktu agar pekerjaan, keluarga, dan ibadah berjalan lebih seimbang.",
      target: 100,
      current: 68,
      unit: "%",
      deadline: "2026-11-30",
      status: "Active"
    },
    {
      id: "goal-learning",
      name: "Istiqamah Menuntut Ilmu",
      area: "Ilmu, Akhlak & Pengembangan Diri",
      why: "Menambah ilmu yang bermanfaat dan menguatkan amal harian.",
      target: 100,
      current: 81,
      unit: "%",
      deadline: "2026-10-31",
      status: "Active"
    }
  ],
  systems: [
    {
      id: "system-health",
      goalId: "goal-health",
      name: "Sistem Hidup Sehat",
      purpose: "Menjaga tubuh sebagai amanah melalui rutinitas kecil yang konsisten.",
      status: "Good"
    },
    {
      id: "system-productivity",
      goalId: "goal-productivity",
      name: "Sistem Amanah Harian",
      purpose: "Niatkan, rencanakan, kerjakan, lalu muhasabah.",
      status: "Good"
    }
  ],
  habits: [
    {
      id: "habit-water",
      name: "Minum Air Cukup",
      area: "Kesehatan",
      goalId: "goal-health",
      systemId: "system-health",
      time: "Morning",
      streak: 14,
      target: "8 glasses",
      completed: true
    },
    {
      id: "habit-plan",
      name: "Niat & Rencana Pagi",
      area: "Bisnis & Produktivitas",
      goalId: "goal-productivity",
      systemId: "system-productivity",
      time: "Morning",
      streak: 9,
      target: "10 minutes",
      completed: true
    },
    {
      id: "habit-walk",
      name: "Jalan Kaki 30 Menit",
      area: "Kesehatan",
      goalId: "goal-health",
      systemId: "system-health",
      time: "Afternoon",
      streak: 6,
      target: "30 minutes",
      completed: false
    },
    {
      id: "habit-reading",
      name: "Membaca Ilmu Bermanfaat",
      area: "Ilmu, Akhlak & Pengembangan Diri",
      goalId: "goal-learning",
      systemId: "system-productivity",
      time: "Evening",
      streak: 12,
      target: "20 pages",
      completed: true
    },
    {
      id: "habit-deep-work",
      name: "Fokus Menunaikan Amanah",
      area: "Bisnis & Produktivitas",
      goalId: "goal-productivity",
      systemId: "system-productivity",
      time: "Afternoon",
      streak: 7,
      target: "90 minutes",
      completed: true
    },
    {
      id: "habit-review",
      name: "Muhasabah Harian",
      area: "Ilmu, Akhlak & Pengembangan Diri",
      goalId: "goal-productivity",
      systemId: "system-productivity",
      time: "Evening",
      streak: 4,
      target: "5 minutes",
      completed: false
    }
  ],
  logs: [],
  impacts: [
    {
      title: "Energi Pagi Lebih Stabil",
      area: "Kesehatan",
      evidence: "Minum Air Cukup selesai 14 hari beruntun; skor kebiasaan pagi hari ini 100%.",
      result: "Lebih siap memulai ibadah dan pekerjaan tanpa rasa lemas."
    },
    {
      title: "Fokus Kerja Meningkat",
      area: "Bisnis & Produktivitas",
      evidence: "Fokus Menunaikan Amanah selesai hari ini dengan streak 7 hari.",
      result: "Tugas penting lebih cepat selesai sebelum sore."
    },
    {
      title: "Ilmu Lebih Terjaga",
      area: "Ilmu, Akhlak & Pengembangan Diri",
      evidence: "Membaca Ilmu Bermanfaat selesai hari ini dengan streak 12 hari.",
      result: "Ada catatan faedah baru untuk diamalkan dan dibagikan."
    }
  ],
  journalEntries: [
    {
      title: "Syukur Hari Ini",
      mood: "Tenang",
      body: "Alhamdulillah, hari ini bisa menjaga rencana pagi dan membaca ilmu bermanfaat.",
      lesson: "Kebiasaan kecil lebih mudah dijaga ketika dimulai setelah Subuh."
    },
    {
      title: "Tantangan",
      mood: "Perlu diperbaiki",
      body: "Jalan kaki sore belum selesai karena agenda kerja mundur.",
      lesson: "Aktivitas kesehatan perlu dipasang sebelum agenda sore yang padat."
    }
  ],
  achievements: [
    {
      title: "14 Hari Istiqamah Minum Air",
      type: "Streak",
      detail: "Kebiasaan Minum Air Cukup mencapai streak 14 hari.",
      earnedAt: "20 Agustus 2026"
    },
    {
      title: "Pembaca Ilmu Konsisten",
      type: "Milestone",
      detail: "Membaca Ilmu Bermanfaat mencapai streak 12 hari.",
      earnedAt: "20 Agustus 2026"
    },
    {
      title: "Amanah Harian Terjaga",
      type: "Badge",
      detail: "Fokus Menunaikan Amanah selesai hari ini dan masuk 3 habit terkuat.",
      earnedAt: "20 Agustus 2026"
    }
  ],
  insights: [
    {
      title: "Pagi adalah waktu terkuat",
      signal: "Habit pagi selesai 2 dari 2.",
      advice: "Letakkan aktivitas terpenting setelah Subuh atau awal pagi."
    },
    {
      title: "Sore perlu buffer",
      signal: "Jalan Kaki 30 Menit belum selesai.",
      advice: "Beri pengingat lebih awal atau pecah menjadi 2 sesi 15 menit."
    },
    {
      title: "Ilmu dan produktivitas saling menguatkan",
      signal: "Membaca dan fokus kerja sama-sama selesai hari ini.",
      advice: "Jaga urutan: niat pagi, fokus kerja, lalu catat faedah malam."
    }
  ],
  settingsNotes: [
    {
      title: "Backend Google Workspace aktif",
      detail: "Data tersinkron ke akun friendsindonesia28@gmail.com melalui Apps Script."
    },
    {
      title: "Mode PWA aktif",
      detail: "Aplikasi sudah dipublikasikan lewat GitHub Pages dan dapat dipasang di perangkat."
    }
  ],
  reviews: [
    {
      month: "August 2026",
      completion: 78,
      strongest: "Membaca Ilmu Bermanfaat",
      weakest: "Jalan Kaki 30 Menit",
      gratitude: "Masih diberi kesempatan memperbaiki amanah tubuh dan waktu.",
      improvement: "Jadwalkan jalan kaki sebelum pekerjaan sore menumpuk.",
      tomorrow: "Mulai dengan minum air, niat pagi, lalu 15 menit jalan kaki."
    }
  ]
};

let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return normalizeState({ ...structuredClone(demoState), ...saved });
  } catch {
    return normalizeState(structuredClone(demoState));
  }
}

function normalizeState(nextState) {
  const areaMap = {
    "Ilmu & Belajar": "Ilmu, Akhlak & Pengembangan Diri",
    Produktivitas: "Bisnis & Produktivitas",
    "Amanah Kerja": "Sekolah/Kuliah/Kerja",
    "Keuangan Berkah": "Kecukupan Rezeki & Keberkahan",
    "Akhlak & Pengembangan Diri": "Ilmu, Akhlak & Pengembangan Diri"
  };
  nextState.selectedAreas = nextState.selectedAreas?.length ? nextState.selectedAreas.map((area) => areaMap[area] || area).filter((area) => lifeAreas.includes(area)) : demoState.selectedAreas;
  if (!nextState.selectedAreas.length) nextState.selectedAreas = demoState.selectedAreas;
  [...(nextState.goals || []), ...(nextState.habits || [])].forEach((item) => {
    if (areaMap[item.area]) item.area = areaMap[item.area];
  });
  if (nextState.route === "settings") nextState.route = "dashboard";
  nextState.habits = nextState.habits?.length ? nextState.habits : structuredClone(demoState.habits);
  nextState.goals = nextState.goals?.length ? nextState.goals : structuredClone(demoState.goals);
  nextState.systems = nextState.systems?.length ? nextState.systems : structuredClone(demoState.systems);
  nextState.logs = nextState.logs || [];
  nextState.hiddenSuggestions = nextState.hiddenSuggestions || [];
  nextState.pendingUser = nextState.pendingUser || null;
  nextState.otp = nextState.otp || null;
  if (nextState.user && typeof nextState.user.otpVerified === "undefined") {
    nextState.user.otpVerified = true;
    nextState.user.registeredAt = nextState.user.registeredAt || new Date().toISOString();
  }
  nextState.impacts = nextState.impacts?.length ? nextState.impacts : structuredClone(demoState.impacts);
  nextState.reviews = nextState.reviews?.length ? nextState.reviews : structuredClone(demoState.reviews);
  nextState.journalEntries = nextState.journalEntries?.length ? nextState.journalEntries : structuredClone(demoState.journalEntries);
  nextState.achievements = nextState.achievements?.length ? nextState.achievements : structuredClone(demoState.achievements);
  nextState.insights = nextState.insights?.length ? nextState.insights : structuredClone(demoState.insights);
  nextState.settingsNotes = nextState.settingsNotes?.length ? nextState.settingsNotes : structuredClone(demoState.settingsNotes);
  nextState.avatarUrl = nextState.avatarUrl || "";
  return nextState;
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
  syncWithGoogleWorkspace("state_saved", state);
}

function syncWithGoogleWorkspace(action, payload) {
  if (!appConfig.googleAppsScriptUrl) return;
  fetch(appConfig.googleAppsScriptUrl, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      action,
      workspaceAccount: appConfig.workspaceAccount,
      source: "habit-tracker-pwa",
      activeRoute: state.route,
      menuItems: navItems.map(([id, label]) => ({ id, label })),
      payload,
      sentAt: new Date().toISOString()
    })
  }).catch(() => {});
}

function navigate(route) {
  const publicRoutes = ["login", "register", "otp"];
  if (!publicRoutes.includes(route) && !state.user?.otpVerified) {
    state.route = state.pendingUser ? "otp" : "register";
    document.body.classList.remove("mobile-nav-open");
    saveState();
    render();
    toast(state.pendingUser ? "Masukkan kode OTP terlebih dahulu." : "Daftar dan verifikasi OTP WhatsApp terlebih dahulu.");
    return;
  }
  state.route = route;
  document.body.classList.remove("mobile-nav-open");
  saveState();
  render();
}

function toggleMobileNav(force) {
  const shouldOpen = typeof force === "boolean" ? force : !document.body.classList.contains("mobile-nav-open");
  document.body.classList.toggle("mobile-nav-open", shouldOpen);
}

function toast(message) {
  const element = document.querySelector("#toast");
  element.textContent = message;
  element.classList.add("show");
  window.setTimeout(() => element.classList.remove("show"), 2200);
}

function downloadDashboardPdf() {
  if (state.route !== "dashboard") state.route = "dashboard";
  saveState();
  render();
  window.setTimeout(() => {
    toast("Pilih Save as PDF pada dialog print untuk menyimpan laporan dashboard.");
    window.print();
  }, 250);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function userDisplayName() {
  return state.user?.name || "Abu Adzka";
}

function primaryArea() {
  return state.selectedAreas?.[0] || "Ibadah & Spiritual";
}

function todayScore() {
  const completed = state.habits.filter((habit) => habit.completed).length;
  return {
    completed,
    total: state.habits.length,
    score: Math.round((completed / state.habits.length) * 100)
  };
}

function strongestHabit() {
  return [...state.habits].sort((a, b) => b.streak - a.streak)[0];
}

function weakestHabit() {
  return [...state.habits].sort((a, b) => a.streak - b.streak)[0];
}

function consistencyFor(habits) {
  if (!habits.length) return 0;
  return Math.round((habits.filter((habit) => habit.completed).length / habits.length) * 100);
}

function systemScore(systemId) {
  return consistencyFor(state.habits.filter((habit) => habit.systemId === systemId));
}

function systemHealth(score) {
  if (score >= 90) return "Sangat Baik";
  if (score >= 75) return "Baik";
  if (score >= 60) return "Perlu Perhatian";
  return "Kritis";
}

function timeLabel(time) {
  return { Morning: "Pagi", Afternoon: "Siang/Sore", Evening: "Malam" }[time] || time;
}

function login(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const mode = form.get("mode") || "login";
  const email = form.get("email")?.trim();
  const password = form.get("password")?.trim();
  const phone = form.get("whatsapp")?.trim();
  if (!email || !password) {
    toast("Isi email dan password terlebih dahulu.");
    return;
  }
  if (mode === "register") {
    if (!phone) {
      toast("Isi nomor WhatsApp terlebih dahulu untuk menerima OTP.");
      return;
    }
    if (form.get("confirm") !== password) {
      toast("Konfirmasi password belum sama.");
      return;
    }
    const otpCode = String(Math.floor(100000 + Math.random() * 900000));
    state.pendingUser = {
      name: form.get("name") || "Pengguna Habit Tracker",
      email,
      phone,
      passwordHint: "registered",
      registeredAt: new Date().toISOString()
    };
    state.otp = {
      code: otpCode,
      phone,
      email,
      expiresAt: Date.now() + 10 * 60 * 1000
    };
    state.route = "otp";
    saveState();
    syncWithGoogleWorkspace("otp_whatsapp_requested", {
      email,
      phone,
      otpCode,
      requestedAt: new Date().toISOString(),
      message: "Kirim kode OTP ini ke WhatsApp pengguna melalui provider WhatsApp API."
    });
    render();
    toast(`Kode OTP dikirim ke WhatsApp ${phone}. Kode demo: ${otpCode}`);
    return;
  }
  if (!state.user?.otpVerified || state.user.email !== email) {
    toast("Akun belum terdaftar atau belum verifikasi OTP WhatsApp.");
    state.route = "register";
    saveState();
    render();
    return;
  }
  state.user = {
    ...state.user,
    email
  };
  state.route = "onboarding";
  saveState();
  render();
  toast("Bismillah. Mari bangun hari yang lebih baik.");
}

function verifyOtp(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const code = form.get("otp")?.trim();
  if (!state.pendingUser || !state.otp) {
    toast("Data pendaftaran belum ditemukan. Silakan daftar ulang.");
    state.route = "register";
    saveState();
    render();
    return;
  }
  if (Date.now() > state.otp.expiresAt) {
    toast("Kode OTP sudah kedaluwarsa. Kirim ulang OTP.");
    return;
  }
  if (code !== state.otp.code) {
    toast("Kode OTP belum sesuai.");
    return;
  }
  state.user = {
    name: state.pendingUser.name,
    email: state.pendingUser.email,
    phone: state.pendingUser.phone,
    registeredAt: state.pendingUser.registeredAt,
    otpVerified: true,
    otpVerifiedAt: new Date().toISOString()
  };
  state.pendingUser = null;
  state.otp = null;
  state.route = "onboarding";
  saveState();
  syncWithGoogleWorkspace("user_registered_otp_verified", state.user);
  render();
  toast("Verifikasi OTP berhasil. Silakan susun sistem pertumbuhan pertama.");
}

function resendOtp() {
  if (!state.pendingUser) {
    toast("Silakan isi form pendaftaran terlebih dahulu.");
    state.route = "register";
    saveState();
    render();
    return;
  }
  const otpCode = String(Math.floor(100000 + Math.random() * 900000));
  state.otp = {
    code: otpCode,
    phone: state.pendingUser.phone,
    email: state.pendingUser.email,
    expiresAt: Date.now() + 10 * 60 * 1000
  };
  saveState();
  syncWithGoogleWorkspace("otp_whatsapp_requested", {
    email: state.pendingUser.email,
    phone: state.pendingUser.phone,
    otpCode,
    requestedAt: new Date().toISOString(),
    message: "Kirim ulang kode OTP ini ke WhatsApp pengguna melalui provider WhatsApp API."
  });
  toast(`OTP baru dikirim ke WhatsApp ${state.pendingUser.phone}. Kode demo: ${otpCode}`);
}

function togglePasswordVisibility(id) {
  const input = document.querySelector(`#${id}`);
  if (!input) return;
  input.type = input.type === "password" ? "text" : "password";
}

function recoverPassword() {
  const email = document.querySelector("#email")?.value?.trim();
  if (!email) {
    toast("Masukkan email terlebih dahulu untuk menerima instruksi pemulihan.");
    return;
  }
  syncWithGoogleWorkspace("password_recovery_requested", {
    email,
    requestedAt: new Date().toISOString(),
    message: "Kirim instruksi pemulihan password atau kode verifikasi ke email pengguna."
  });
  toast(`Instruksi pemulihan password dikirim ke ${email}.`);
}

function completeOnboarding(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  state.vision = form.get("vision")?.trim() || "";
  state.selectedAreas = form.getAll("lifeAreas");
  if (!state.selectedAreas.length) state.selectedAreas = [form.get("area") || "Ibadah & Spiritual"];
  const goalName = form.get("goalName")?.trim();
  const systemName = form.get("systemName")?.trim();
  const habitName = form.get("habitName")?.trim();
  const schedule = form.get("schedule") || "Daily";

  if (goalName) {
    const goalId = `goal-${Date.now()}`;
    const systemId = `system-${Date.now()}`;
    state.goals.unshift({
      id: goalId,
      name: goalName,
      area: form.get("area") || state.selectedAreas[0] || "Ibadah & Spiritual",
      why: form.get("why")?.trim() || "Tujuan pribadi yang kamu tetapkan sendiri.",
      target: 100,
      current: 10,
      unit: "%",
      deadline: form.get("deadline") || "2026-12-31",
      status: "Active"
    });
    state.systems.unshift({
      id: systemId,
      goalId,
      name: systemName || `${goalName} System`,
      purpose: "Mengubah tujuan menjadi rutinitas yang mudah dijaga.",
      status: "Needs Attention"
    });
    state.habits.unshift({
      id: `habit-${Date.now()}`,
      name: habitName || "Aksi utama harian",
      area: form.get("area") || state.selectedAreas[0] || "Ibadah & Spiritual",
      goalId,
      systemId,
      time: "Morning",
      streak: 0,
      target: schedule,
      completed: false
    });
  }

  state.onboardingDone = true;
  state.route = "dashboard";
  saveState();
  render();
  toast("Alhamdulillah, sistem pertama kamu sudah siap.");
}

function toggleHabit(id) {
  const habit = state.habits.find((item) => item.id === id);
  if (!habit) return;
  habit.completed = !habit.completed;
  habit.streak = habit.completed ? habit.streak + 1 : Math.max(0, habit.streak - 1);
  state.logs.unshift({
    habitId: id,
    date: new Date().toISOString(),
    status: habit.completed ? "Selesai" : "Terlewat hari ini. Lanjutkan besok."
  });
  saveState();
  render();
  toast(habit.completed ? `${habit.name} selesai. Amal kecil yang dijaga akan membentuk sistem besar.` : "Terlewat hari ini. Tidak apa-apa, lanjutkan besok.");
}

function deleteHabit(id) {
  const habit = state.habits.find((item) => item.id === id);
  state.habits = state.habits.filter((item) => item.id !== id);
  state.logs.unshift({
    habitId: id,
    date: new Date().toISOString(),
    status: `Dihapus: ${habit?.name || "Aktivitas"}`
  });
  saveState();
  render();
  toast(`${habit?.name || "Aktivitas"} dihapus dari daftar hari ini.`);
}

const quickAddConfig = {
  Goal: {
    label: "Tujuan",
    title: "Tujuan Baru",
    fieldLabel: "Nama tujuan",
    placeholder: "Contoh: Menjaga Shalat Tepat Waktu",
    helper: "Dipakai untuk menambah target besar yang ingin dicapai."
  },
  System: {
    label: "Sistem",
    title: "Sistem Baru",
    fieldLabel: "Nama sistem",
    placeholder: "Contoh: Sistem Ibadah Pagi",
    helper: "Dipakai untuk menambah rangkaian rutinitas pendukung tujuan."
  },
  Habit: {
    label: "Kebiasaan",
    title: "Kebiasaan Baru",
    fieldLabel: "Nama kebiasaan",
    placeholder: "Contoh: Tilawah 10 menit",
    helper: "Dipakai untuk menambah kebiasaan harian."
  },
  Activity: {
    label: "Aktivitas",
    title: "Aktivitas Hari Ini",
    fieldLabel: "Nama aktivitas",
    placeholder: "Contoh: Sedekah sebelum Maghrib",
    helper: "Dipakai untuk menambah aktivitas khusus hari ini."
  },
  Impact: {
    label: "Dampak",
    title: "Catatan Dampak Baru",
    fieldLabel: "Dampak yang terasa",
    placeholder: "Contoh: Tidur lebih nyenyak setelah mengurangi layar malam",
    helper: "Catat bukti perubahan nyata dari habit yang dijalankan."
  },
  Review: {
    label: "Muhasabah",
    title: "Catatan Muhasabah Baru",
    fieldLabel: "Isi muhasabah",
    placeholder: "Contoh: Hari ini perlu lebih menjaga waktu Ashar",
    helper: "Catat syukur, koreksi diri, dan rencana perbaikan."
  },
  Journal: {
    label: "Jurnal",
    title: "Entri Jurnal Baru",
    fieldLabel: "Catatan jurnal",
    placeholder: "Contoh: Alhamdulillah lebih tenang setelah dzikir pagi",
    helper: "Tulis pengalaman, pelajaran, rasa syukur, atau tantangan."
  },
  Achievement: {
    label: "Pencapaian",
    title: "Pencapaian Baru",
    fieldLabel: "Nama pencapaian",
    placeholder: "Contoh: 7 hari menjaga muhasabah malam",
    helper: "Catat momen keberhasilan yang patut disyukuri."
  },
  Insight: {
    label: "Insight",
    title: "Insight Baru",
    fieldLabel: "Pola yang terlihat",
    placeholder: "Contoh: Aktivitas pagi lebih konsisten daripada malam",
    helper: "Catat pola penting dari data kebiasaan."
  },
  Profile: {
    label: "Profil",
    title: "Update Profil",
    fieldLabel: "Catatan profil",
    placeholder: "Contoh: Fokus utama bulan ini adalah kesehatan dan ibadah",
    helper: "Catat preferensi atau fokus pribadi."
  }
};

function addQuick(type) {
  const config = quickAddConfig[type] || quickAddConfig.Habit;
  const existing = document.querySelector(".quick-modal-backdrop");
  if (existing) existing.remove();
  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <div class="quick-modal-backdrop" role="presentation">
        <form class="quick-modal" onsubmit="submitQuickAdd(event, '${type}')">
          <div class="quick-modal-title">
            <span class="quick-modal-user">${escapeHtml(userDisplayName())}</span>
            <strong>${escapeHtml(config.title)}</strong>
          </div>
          <label for="quick-add-name">${escapeHtml(config.fieldLabel)}</label>
          <input id="quick-add-name" name="name" type="text" required placeholder="${escapeHtml(config.placeholder)}" autocomplete="off" />
          <p class="muted">${escapeHtml(config.helper)}</p>
          <div class="quick-modal-actions">
            <button class="btn" type="button" onclick="closeQuickAdd()">Batal</button>
            <button class="btn primary" type="submit">Simpan</button>
          </div>
        </form>
      </div>
    `
  );
  document.querySelector("#quick-add-name")?.focus();
}

function closeQuickAdd() {
  document.querySelector(".quick-modal-backdrop")?.remove();
}

function submitQuickAdd(event, type) {
  event.preventDefault();
  const labels = Object.fromEntries(Object.entries(quickAddConfig).map(([key, value]) => [key, value.label]));
  const name = new FormData(event.currentTarget).get("name")?.trim();
  if (!name) return;
  if (type === "Goal") {
    state.goals.unshift({
      id: `goal-${Date.now()}`,
      name,
      area: primaryArea(),
      why: "Dibuat dari Quick Add.",
      target: 100,
      current: 0,
      unit: "%",
      deadline: "2026-12-31",
      status: "Draft"
    });
  }
  if (type === "System") {
    state.systems.unshift({
      id: `system-${Date.now()}`,
      goalId: state.goals[0]?.id || "goal-health",
      name,
      purpose: "Dibuat dari Quick Add.",
      status: "Needs Attention"
    });
  }
  if (type === "Habit" || type === "Activity") {
    state.habits.unshift({
      id: `habit-${Date.now()}`,
      name,
      area: primaryArea(),
      goalId: state.goals[0]?.id || "goal-health",
      systemId: state.systems[0]?.id || "system-health",
      time: "Morning",
      streak: 0,
      target: "Daily",
      completed: false
    });
  }
  if (type === "Impact") {
    state.impacts.unshift({
      title: name,
      area: primaryArea(),
      evidence: `Ditambahkan manual oleh ${userDisplayName()} dari Quick Add.`,
      result: "Pantau apakah dampak ini berulang setelah habit dijaga beberapa hari."
    });
  }
  if (type === "Review") {
    state.reviews.unshift({
      month: "Catatan Hari Ini",
      completion: todayScore().score,
      strongest: strongestHabit()?.name || "Belum ada",
      weakest: weakestHabit()?.name || "Belum ada",
      gratitude: name,
      improvement: "Tentukan satu perbaikan kecil untuk besok.",
      tomorrow: "Mulai dari habit yang paling mudah dijaga."
    });
  }
  if (type === "Journal") {
    state.journalEntries.unshift({
      title: "Catatan Baru",
      mood: "Reflektif",
      body: name,
      lesson: "Ambil satu pelajaran kecil dan amalkan besok."
    });
  }
  if (type === "Achievement") {
    state.achievements.unshift({
      title: name,
      type: "Manual",
      detail: `Dicatat oleh ${userDisplayName()} sebagai pencapaian yang disyukuri.`,
      earnedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
    });
  }
  if (type === "Insight") {
    state.insights.unshift({
      title: name,
      signal: "Insight manual dari pengamatan pengguna.",
      advice: "Cek lagi pola ini setelah beberapa hari data terkumpul."
    });
  }
  if (type === "Profile") {
    state.profileNote = name;
  }
  closeQuickAdd();
  saveState();
  render();
  toast(`${labels[type] || type} berhasil dibuat.`);
}

function addActivity(time) {
  const selected = primaryArea();
  const name = prompt(`Aktivitas ${timeLabel(time)} yang ingin ditambahkan`);
  if (!name) return;
  state.habits.unshift({
    id: `habit-${Date.now()}`,
    name,
    area: selected,
    goalId: state.goals[0]?.id || "goal-health",
    systemId: state.systems[0]?.id || "system-health",
    time,
    streak: 0,
    target: "Hari ini",
    completed: false,
    customToday: true
  });
  saveState();
  render();
  toast(`Aktivitas ${timeLabel(time)} berhasil ditambahkan.`);
}

function triggerAvatarUpload() {
  document.querySelector("#avatar-upload")?.click();
}

function uploadAvatar(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    toast("File harus berupa gambar.");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    state.avatarUrl = reader.result;
    saveState();
    render();
    toast("Foto profil berhasil diperbarui.");
  };
  reader.readAsDataURL(file);
}

function applySuggestion(time, area, name) {
  state.habits.unshift({
    id: `habit-${Date.now()}`,
    name,
    area,
    goalId: state.goals[0]?.id || "goal-health",
    systemId: state.systems[0]?.id || "system-health",
    time,
    streak: 0,
    target: "Hari ini",
    completed: false
  });
  saveState();
  render();
  toast(`${name} ditambahkan ke aktivitas ${timeLabel(time)}.`);
}

function suggestionKey(time, area, name) {
  return `${time}|${area}|${name}`;
}

function deleteSuggestion(time, area, name) {
  const key = suggestionKey(time, area, name);
  if (!state.hiddenSuggestions.includes(key)) state.hiddenSuggestions.push(key);
  saveState();
  render();
  toast(`Pilihan "${name}" disembunyikan dari ${timeLabel(time)}.`);
}

function authView(mode = "login") {
  const isRegister = mode === "register";
  return `
    <main class="auth-layout">
      <section class="brand-panel">
        <div class="logo-lockup">
          <img src="./assets/logo.png" alt="Habit Tracker logo">
          <div>
            <p class="brand-title">HABIT TRACKER</p>
            <span class="brand-subtitle">Better Habits, Better Life</span>
          </div>
        </div>
        <div class="brand-statement">
          <p>Bantu diri bertumbuh dengan niat yang benar, sistem yang rapi, kebiasaan baik, amal harian, muhasabah, dan perbaikan berkelanjutan.</p>
        </div>
        <div>
          <p class="growth-chain">BANGUN → CATAT → UKUR → MUHASABAH → PERBAIKI</p>
          <p class="developer-credit">Developed by Markaz Dakwah Digital</p>
        </div>
      </section>
      <section class="auth-card" aria-label="${isRegister ? "Register" : "Login"}">
        <h2>${isRegister ? "Buat akun baru" : "Assalamu'alaikum"}</h2>
        <p class="muted">${isRegister ? "Mulai dari satu tujuan yang bermakna." : "Lanjutkan ikhtiar kecil hari ini dengan lebih tertata."}</p>
        <form onsubmit="login(event)">
          <input type="hidden" name="mode" value="${isRegister ? "register" : "login"}">
          ${isRegister ? '<div class="field"><label for="name">Nama lengkap</label><input id="name" name="name" required autocomplete="name"></div>' : ""}
          ${isRegister ? '<div class="field"><label for="whatsapp">Nomor WhatsApp</label><input id="whatsapp" name="whatsapp" type="tel" required inputmode="tel" placeholder="Contoh: 6281234567890" autocomplete="tel"></div>' : ""}
          <div class="field">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" required autocomplete="email">
          </div>
          <div class="field">
            <label for="password">Password</label>
            <div class="password-field">
              <input id="password" name="password" type="password" required autocomplete="${isRegister ? "new-password" : "current-password"}">
              <button class="eye-button" type="button" onclick="togglePasswordVisibility('password')" aria-label="Tampilkan atau sembunyikan password">👁</button>
            </div>
          </div>
          ${isRegister ? '<div class="field"><label for="confirm">Konfirmasi password</label><div class="password-field"><input id="confirm" name="confirm" type="password" required autocomplete="new-password"><button class="eye-button" type="button" onclick="togglePasswordVisibility(\'confirm\')" aria-label="Tampilkan atau sembunyikan konfirmasi password">👁</button></div></div>' : ""}
          <div class="row-between">
            <label class="check-row"><input type="checkbox" checked> Ingat saya</label>
            <button class="link-button" type="button" onclick="recoverPassword()">Lupa password</button>
          </div>
          <button class="btn primary full" type="submit">${isRegister ? "Daftar" : "Masuk"}</button>
        </form>
        <p class="muted">${isRegister ? "Sudah punya akun?" : "Belum punya akun?"}
          <button class="link-button" onclick="navigate('${isRegister ? "login" : "register"}')">${isRegister ? "Masuk" : "Buat akun"}</button>
        </p>
        <p class="developer-credit auth-credit">Developed by Markaz Dakwah Digital</p>
      </section>
    </main>
  `;
}

function otpView() {
  return `
    <main class="auth-layout">
      <section class="brand-panel">
        <div class="logo-lockup">
          <img src="./assets/logo.png" alt="Habit Tracker logo">
          <div>
            <p class="brand-title">HABIT TRACKER</p>
            <span class="brand-subtitle">Better Habits, Better Life</span>
          </div>
        </div>
        <div class="brand-statement">
          <p>Verifikasi nomor WhatsApp menjaga akses dashboard hanya untuk pengguna yang sudah mendaftar.</p>
        </div>
        <p class="developer-credit">Developed by Markaz Dakwah Digital</p>
      </section>
      <section class="auth-card" aria-label="Verifikasi OTP WhatsApp">
        <h2>Verifikasi OTP WhatsApp</h2>
        <p class="muted">Masukkan kode OTP yang dikirim ke ${escapeHtml(state.pendingUser?.phone || "nomor WhatsApp kamu")}.</p>
        <form onsubmit="verifyOtp(event)">
          <div class="field">
            <label for="otp">Kode OTP</label>
            <input id="otp" name="otp" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" required placeholder="6 digit kode OTP">
          </div>
          <button class="btn primary full" type="submit">Verifikasi & Masuk</button>
        </form>
        <div class="row-between otp-actions">
          <button class="link-button" type="button" onclick="resendOtp()">Kirim ulang OTP</button>
          <button class="link-button" type="button" onclick="navigate('register')">Ganti data</button>
        </div>
        <p class="developer-credit auth-credit">Developed by Markaz Dakwah Digital</p>
      </section>
    </main>
  `;
}

function onboardingView() {
  return `
    <main class="onboarding">
      <div class="logo-lockup">
        <img src="./assets/logo.png" alt="Habit Tracker logo">
        <div>
          <p class="brand-title">HABIT TRACKER</p>
          <span class="brand-subtitle">Bismillah. Bangun sistem, jaga istiqamah.</span>
        </div>
      </div>
      <div class="step-tabs">${[1, 2, 3, 4, 5, 6, 7].map((n) => `<span class="step-dot ${n <= 7 ? "active" : ""}"></span>`).join("")}</div>
      <form class="panel" onsubmit="completeOnboarding(event)">
        <h1>Susun sistem pertumbuhan pertama</h1>
        <p class="muted">Halaman ini selalu menjadi gerbang awal setelah login, agar niat, tujuan, dan aktivitas harian tersusun sebelum masuk dashboard.</p>
        <div class="choice-grid life-choice-grid">
          ${lifeAreas
            .map(
              (area) => `
              <label class="choice ${state.selectedAreas.includes(area) ? "selected" : ""}">
                <input type="checkbox" name="lifeAreas" value="${area}" ${state.selectedAreas.includes(area) ? "checked" : ""}>
                <span>${area}</span>
              </label>
            `
            )
            .join("")}
        </div>
        <div class="field">
          <label>Life Area</label>
          <select name="area">${lifeAreas.map((area) => `<option>${area}</option>`).join("")}</select>
        </div>
        <div class="field">
          <label>Apa kehidupan yang ingin kamu bangun?</label>
          <textarea name="vision" placeholder="Tulis dengan bebas, misalnya arah hidup, niat, atau perubahan yang kamu inginkan."></textarea>
        </div>
        <div class="grid three-grid">
          <div class="field">
            <label>Nama Tujuan</label>
            <input name="goalName" placeholder="Tulis tujuanmu">
          </div>
          <div class="field">
            <label>Mengapa Ini Penting</label>
            <input name="why" placeholder="Tulis alasan utamanya">
          </div>
          <div class="field">
            <label>Deadline</label>
            <input name="deadline" type="date" value="2026-12-31" required>
          </div>
        </div>
        <div class="grid three-grid">
          <div class="field">
            <label>System</label>
            <input name="systemName" placeholder="Tulis nama sistem">
          </div>
          <div class="field">
            <label>Kebiasaan pertama & utama yang ingin dibangun</label>
            <input name="habitName" placeholder="Tulis kebiasaan utama">
          </div>
          <div class="field">
            <label>Schedule</label>
            <select name="schedule" required><option>Daily</option><option>Weekdays</option><option>Specific Days</option><option>Weekly</option></select>
          </div>
        </div>
        <div class="row-between">
          <button class="btn ghost" type="button" onclick="navigate('dashboard')">Masuk Dashboard</button>
          <button class="btn primary" type="submit">Selesai & Masuk Dashboard</button>
        </div>
      </form>
    </main>
  `;
}

function shell(content) {
  return `
    <main class="main-layout">
      <aside class="sidebar">
        <div class="logo-lockup">
          <img src="./assets/logo.png" alt="Habit Tracker logo">
          <div>
            <p class="brand-title">HABIT TRACKER</p>
            <span class="brand-subtitle">Better Habits, Better Life</span>
          </div>
        </div>
        <nav class="nav-list" aria-label="Main navigation">
          ${navItems.map(([id, label, icon]) => `<button class="nav-item ${state.route === id ? "active" : ""}" onclick="navigate('${id}')"><span>${icon}</span>${label}</button>`).join("")}
        </nav>
        <p class="developer-credit sidebar-credit">Developed by Markaz Dakwah Digital</p>
      </aside>
      <section class="main-content">
        ${topHeader()}
        ${content}
      </section>
      <button class="mobile-menu-button" onclick="toggleMobileNav()" aria-label="Buka menu navigasi"><span>☰</span> Menu</button>
      <nav class="mobile-nav" aria-label="Mobile navigation">
        <div class="mobile-nav-head">
          <img src="./assets/logo.png" alt="Habit Tracker logo">
          <div>
            <strong>Habit Tracker</strong>
            <small>Menu utama</small>
          </div>
          <button class="mobile-nav-close" onclick="toggleMobileNav(false)" aria-label="Tutup menu">×</button>
        </div>
        ${navItems
          .map(([id, label, icon]) => `<button class="${state.route === id ? "active" : ""}" onclick="navigate('${id}')"><span>${icon}</span>${label}</button>`)
          .join("")}
        <p class="developer-credit">Developed by Markaz Dakwah Digital</p>
      </nav>
      <div class="mobile-nav-scrim" onclick="toggleMobileNav(false)"></div>
    </main>
  `;
}

function topHeader() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Assalamu'alaikum, Selamat Pagi" : hour < 18 ? "Assalamu'alaikum, Selamat Siang" : "Assalamu'alaikum, Selamat Malam";
  const date = new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(new Date());
  return `
    <header class="top-header">
      <div class="page-title">
        <h1>${greeting}, ${state.user?.name || "Abu"}</h1>
        <p class="muted">Bismillah, mari jaga amanah hari ini. ${date}</p>
      </div>
      <div class="row-between">
        <button class="btn ghost" onclick="toast('Belum ada notifikasi baru.')">Notifikasi</button>
        <button class="avatar-upload" onclick="triggerAvatarUpload()" aria-label="Upload foto profil">
          ${state.avatarUrl ? `<img src="${state.avatarUrl}" alt="Foto profil">` : `<span>Foto</span>`}
        </button>
        <input id="avatar-upload" class="visually-hidden" type="file" accept="image/*" onchange="uploadAvatar(event)">
      </div>
    </header>
  `;
}

function dashboardView() {
  const score = todayScore();
  return shell(`
    <section class="panel hero-analytics-panel">
      <div class="row-between">
        <div>
          <h2>Scoring Analytics</h2>
          <p class="muted">Histogram, line chart, pie 3D, dan tabel skor langsung menjelaskan progres hari ini.</p>
        </div>
        <button class="btn primary" onclick="downloadDashboardPdf()">Download Pdf</button>
      </div>
      ${smartArt(score.score)}
      <div class="analytics-grid">
        ${histogram3d()}
        ${lineChart3d()}
        ${pieChart3d(score.score)}
      </div>
    </section>
    <div class="grid dashboard-grid">
      <section class="panel score-panel-3d">
        <div class="row-between">
          <div>
            <h2>Skor Hari Ini</h2>
            <p class="muted">${score.completed} dari ${score.total} aktivitas terselesaikan.</p>
          </div>
          <span class="badge">Istiqamah: 14 hari</span>
        </div>
        <div class="score-ring" style="--score:${score.score}%"><strong>${score.score}%</strong></div>
        <div class="quick-add">
          ${["Goal", "System", "Habit", "Activity"].map((type) => `<button class="btn" onclick="addQuick('${type}')">+ ${type}</button>`).join("")}
        </div>
      </section>
      <section class="panel insight-panel-3d">
        <h2>Insight Hari Ini</h2>
        <p class="muted">Kamu lebih konsisten menyelesaikan kebiasaan penting setelah niat dan rencana pagi.</p>
        <div class="heatmap" aria-label="Monthly consistency heatmap">
          ${Array.from({ length: 42 }, (_, index) => `<span class="heat-cell level-${(index + score.completed) % 4}"></span>`).join("")}
        </div>
      </section>
    </div>
    <div class="grid three-grid" style="margin-top:1rem">
      <section class="metric-card"><span class="muted">Skor Sistem</span><strong>${Math.round(state.systems.reduce((sum, system) => sum + systemScore(system.id), 0) / state.systems.length)}%</strong></section>
      <section class="metric-card"><span class="muted">Progres Tujuan</span><strong>${Math.round(state.goals.reduce((sum, goal) => sum + goal.current, 0) / state.goals.length)}%</strong></section>
      <section class="metric-card"><span class="muted">Progres Bulanan</span><strong>${score.score}%</strong></section>
    </div>
    <section class="panel analytics-panel" style="margin-top:1rem">
      <div class="row-between">
        <div>
          <h2>Tabel Scoring</h2>
          <p class="muted">Ringkasan formula scoring yang dipakai aplikasi.</p>
        </div>
      </div>
      ${scoreTable3d(score)}
    </section>
    <div class="grid dashboard-grid" style="margin-top:1rem">
      <section class="panel">
        <div class="row-between"><h2>Kebiasaan Hari Ini</h2><button class="link-button" onclick="navigate('today')">Lihat Semua</button></div>
        ${habitList(state.habits.slice(0, 5))}
      </section>
      <section class="panel">
        <h2>Tujuan Aktif</h2>
        ${state.goals.slice(0, 3).map(goalCard).join("")}
      </section>
    </div>
  `);
}

function habitList(habits, options = {}) {
  const { deletable = false } = options;
  return habits
    .map(
      (habit) => `
      <div class="habit-row ${habit.completed ? "completed" : ""}">
        <button class="habit-check" onclick="toggleHabit('${habit.id}')" aria-label="Toggle ${habit.name}">${habit.completed ? "✓" : ""}</button>
        <div>
          <strong>${habit.name}</strong>
          <div class="muted">${habit.area} • ${timeLabel(habit.time)} • ${habit.target}</div>
        </div>
        <span class="badge">${habit.streak} hari</span>
        ${deletable ? `<button class="delete-activity-button" onclick="deleteHabit('${habit.id}')" aria-label="Hapus ${escapeHtml(habit.name)}">&#128465;</button>` : ""}
      </div>
    `
    )
    .join("");
}

function goalCard(goal) {
  return `
    <article class="item-card" style="margin-top:.75rem">
      <div class="row-between">
        <div>
          <strong>${goal.name}</strong>
          <p class="muted">${goal.area} • Target ${goal.deadline}</p>
        </div>
        <span class="badge">${goal.status}</span>
      </div>
      <div class="progress-bar" aria-label="${goal.name} progress"><span style="width:${Math.min(goal.current, 100)}%"></span></div>
      <p class="muted">${goal.current}${goal.unit} progres. Niat: ${goal.why}</p>
    </article>
  `;
}

function todayView() {
  const groups = ["Morning", "Afternoon", "Evening"];
  const score = todayScore();
  return shell(`
    <section class="panel">
      <div class="row-between">
        <div>
          <h2>Hari Ini</h2>
          <p class="muted">${score.completed} selesai, ${score.total - score.completed} tersisa.</p>
        </div>
        <span class="badge">${score.score}% Skor Hari Ini</span>
      </div>
    </section>
    <div class="grid three-grid" style="margin-top:1rem">
      ${groups
        .map(
          (group) => `
          <section class="panel today-column">
            <div class="row-between">
              <h2>${timeLabel(group)}</h2>
              <button class="btn small" onclick="addActivity('${group}')">+ Tambahkan Aktivitas</button>
            </div>
            ${suggestionList(group)}
            ${habitList(state.habits.filter((habit) => habit.time === group), { deletable: true })}
          </section>
        `
        )
        .join("")}
    </div>
  `);
}

function suggestionList(time) {
  const areas = state.selectedAreas?.length ? state.selectedAreas : ["Ibadah & Spiritual"];
  const hidden = new Set(state.hiddenSuggestions || []);
  return `
    <div class="suggestion-box">
      <p class="muted">Pilihan sesuai Life Area:</p>
      ${areas
        .flatMap((area) => (activitySuggestions[area]?.[time] || []).slice(0, 3).map((name) => ({ area, name })))
        .filter(({ area, name }) => !hidden.has(suggestionKey(time, area, name)))
        .slice(0, 6)
        .map(
          ({ area, name }) => {
            const safeArea = area.replace(/'/g, "\\'");
            const safeName = name.replace(/'/g, "\\'");
            return `
          <div class="suggestion-pill suggestion-item">
            <button class="suggestion-add" onclick="applySuggestion('${time}', '${safeArea}', '${safeName}')">
              <span>${escapeHtml(name)}</span>
              <small>${escapeHtml(area)}</small>
            </button>
            <button class="trash-button" onclick="deleteSuggestion('${time}', '${safeArea}', '${safeName}')" aria-label="Hapus pilihan ${escapeHtml(name)}">🗑</button>
          </div>
        `
          }
        )
        .join("")}
    </div>
  `;
}

function smartArt(score) {
  return `
    <div class="smart-art" aria-label="Alur skor harian">
      ${[
        ["Niat", "Mulai dengan arah yang benar"],
        ["Amal", "Kerjakan aktivitas pilihan"],
        ["Skor", `${score}% hari ini`],
        ["Muhasabah", "Perbaiki esok hari"]
      ]
        .map((item, index) => `<div class="smart-node node-${index + 1}"><strong>${item[0]}</strong><span>${item[1]}</span></div>`)
        .join("")}
    </div>
  `;
}

function histogram3d() {
  const values = [
    ["Ibadah", 84],
    ["Sehat", 72],
    ["Ilmu", 81],
    ["Amanah", 68]
  ];
  return `
    <article class="chart-card">
      <h3>Life Area</h3>
      <div class="chart-3d" aria-label="Histogram skor life area">
      ${values
        .map(
          ([label, value]) => `
          <div class="bar-wrap">
            <div class="bar-3d" style="height:${value}%"><span>${value}%</span></div>
            <small>${label}</small>
          </div>
        `
        )
        .join("")}
      </div>
    </article>
  `;
}

function lineChart3d() {
  const points = [
    [8, 68],
    [24, 74],
    [40, 70],
    [56, 82],
    [72, 78],
    [88, 86]
  ];
  const polyline = points.map(([x, y]) => `${x},${100 - y}`).join(" ");
  return `
    <article class="chart-card">
      <h3>Progress Pekanan</h3>
      <div class="line-chart-3d" aria-label="Line chart progress pekanan">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="lineGlow" x1="0" x2="1">
              <stop offset="0%" stop-color="#0678ff" />
              <stop offset="100%" stop-color="#ffe08a" />
            </linearGradient>
          </defs>
          <polyline class="line-shadow" points="${polyline}" />
          <polyline class="line-main" points="${polyline}" />
          ${points.map(([x, y]) => `<circle cx="${x}" cy="${100 - y}" r="2.2"></circle>`).join("")}
        </svg>
        <div class="line-labels"><span>Sen</span><span>Rab</span><span>Jum</span><span>Ahad</span></div>
      </div>
    </article>
  `;
}

function pieChart3d(score) {
  const remaining = 100 - score;
  return `
    <article class="chart-card">
      <h3>Komposisi Skor</h3>
      <div class="pie-3d" style="--complete:${score * 3.6}deg" aria-label="Pie chart komposisi skor">
        <div class="pie-core">
          <strong>${score}%</strong>
          <span>Selesai</span>
        </div>
      </div>
      <div class="legend-3d">
        <span><i class="legend-gold"></i>Selesai ${score}%</span>
        <span><i class="legend-blue"></i>Tersisa ${remaining}%</span>
      </div>
    </article>
  `;
}

function scoreTable3d(score) {
  const rows = [
    ["Skor Hari Ini", `${score.score}%`, "Aktivitas selesai / total aktivitas"],
    ["Konsistensi", `${score.score}%`, "Hari terjadwal yang selesai"],
    ["Skor Sistem", "78%", "Rata-rata performa kebiasaan aktif"],
    ["Progres Tujuan", "74%", "Perbandingan target dan capaian"]
  ];
  return `
    <div class="score-table-3d" role="table" aria-label="Tabel scoring progress">
      <div role="row" class="score-table-head">
        <span>Metric</span><span>Skor</span><span>Penjelasan</span>
      </div>
      ${rows
        .map(
          (row) => `
          <div role="row" class="score-table-row">
            <span>${row[0]}</span><strong>${row[1]}</strong><span>${row[2]}</span>
          </div>
        `
        )
        .join("")}
    </div>
  `;
}

function systemsView() {
  const score = todayScore();
  return shell(`
    <section class="panel">
      <div class="row-between"><h2>Sistem</h2><button class="btn primary" onclick="addQuick('System')">+ Sistem Baru</button></div>
      <div class="analytics-grid compact-analytics">
        ${histogram3d()}
        ${pieChart3d(score.score)}
      </div>
      <div class="grid three-grid" style="margin-top:1rem">
        ${state.systems
          .map((system) => {
            const score = systemScore(system.id);
            return `
              <article class="item-card">
                <span class="badge">${systemHealth(score)}</span>
                <h3>${system.name}</h3>
                <p class="muted">${system.purpose}</p>
                <div class="progress-bar"><span style="width:${score}%"></span></div>
                <p class="muted">${score}% Skor Sistem</p>
              </article>
            `;
          })
          .join("")}
      </div>
    </section>
  `);
}

function goalsView() {
  return shell(`
    <section class="panel">
      <div class="row-between"><h2>Tujuan</h2><button class="btn primary" onclick="addQuick('Goal')">+ Tujuan Baru</button></div>
      ${state.goals.map(goalCard).join("")}
    </section>
  `);
}

function habitsView() {
  return shell(`
    <section class="panel">
      <div class="row-between"><h2>Kebiasaan</h2><button class="btn primary" onclick="addQuick('Habit')">+ Kebiasaan Baru</button></div>
      ${habitList(state.habits, { deletable: true })}
    </section>
  `);
}

function progressView() {
  const score = todayScore();
  return shell(`
    <section class="panel hero-analytics-panel">
      <div class="row-between">
        <div>
          <h2>Progres</h2>
          <p class="muted">Bulan ini dibanding bulan lalu, divisualkan dengan chart 3D.</p>
        </div>
        <span class="badge badge-3d">Progress Analytics</span>
      </div>
      <div class="grid three-grid metric-strip-3d">
        <section class="metric-card metric-cube"><span class="muted">Skor Umum</span><strong>${score.score}%</strong></section>
        <section class="metric-card metric-cube"><span class="muted">Konsistensi</span><strong>${score.score}%</strong></section>
        <section class="metric-card metric-cube"><span class="muted">Skor Dampak</span><strong>82%</strong></section>
      </div>
      <div class="analytics-grid">
        ${histogram3d()}
        ${lineChart3d()}
        ${pieChart3d(score.score)}
      </div>
      ${scoreTable3d(score)}
    </section>
  `);
}

function moduleHero(title, body, quickType, badge = "Contoh Data Aktif") {
  return `
    <section class="panel module-hero">
      <div class="row-between">
        <div>
          <h2>${title}</h2>
          <p class="muted">${body}</p>
        </div>
        <span class="badge badge-3d">${badge}</span>
      </div>
      <div class="quick-add">
        <button class="btn primary" onclick="addQuick('${quickType}')">Quick Add</button>
      </div>
    </section>
  `;
}

function impactView() {
  const score = todayScore();
  return shell(`
    ${moduleHero("Dampak", "Melihat bukti perubahan nyata dari habit: energi, fokus, ketenangan, dan manfaat harian.", "Impact", "Dampak Terukur")}
    <div class="grid three-grid" style="margin-top:1rem">
      <section class="metric-card metric-cube"><span class="muted">Habit selesai hari ini</span><strong>${score.completed}/${score.total}</strong></section>
      <section class="metric-card metric-cube"><span class="muted">Skor dampak contoh</span><strong>82%</strong></section>
      <section class="metric-card metric-cube"><span class="muted">Habit terkuat</span><strong>${escapeHtml(strongestHabit()?.streak || 0)} hari</strong></section>
    </div>
    <section class="panel module-section" style="margin-top:1rem">
      <h2>Bukti Dampak</h2>
      <div class="module-grid">
        ${state.impacts
          .map(
            (item) => `
            <article class="module-card glossy-card">
              <span class="badge">${escapeHtml(item.area)}</span>
              <h3>${escapeHtml(item.title)}</h3>
              <p><strong>Fakta:</strong> ${escapeHtml(item.evidence)}</p>
              <p class="muted"><strong>Makna:</strong> ${escapeHtml(item.result)}</p>
            </article>
          `
          )
          .join("")}
      </div>
    </section>
  `);
}

function reviewsView() {
  return shell(`
    ${moduleHero("Muhasabah", "Ruang evaluasi diri: syukur, koreksi, dan rencana perbaikan esok hari.", "Review", "Refleksi Islami")}
    <section class="panel module-section" style="margin-top:1rem">
      <h2>Catatan Muhasabah</h2>
      <div class="module-grid">
        ${state.reviews
          .map(
            (item) => `
            <article class="module-card glossy-card">
              <span class="badge">${escapeHtml(item.month)}</span>
              <h3>Skor Periode ${escapeHtml(item.completion)}%</h3>
              <p><strong>Syukur:</strong> ${escapeHtml(item.gratitude || "Alhamdulillah masih diberi kesempatan memperbaiki diri.")}</p>
              <p><strong>Perlu diperbaiki:</strong> ${escapeHtml(item.improvement || item.weakest)}</p>
              <p class="muted"><strong>Besok:</strong> ${escapeHtml(item.tomorrow || "Mulai lagi dari amal kecil yang paling mudah.")}</p>
            </article>
          `
          )
          .join("")}
      </div>
    </section>
  `);
}

function journalView() {
  return shell(`
    ${moduleHero("Jurnal", "Tempat menulis pengalaman, rasa syukur, pelajaran, tantangan, dan doa pribadi.", "Journal", "Catatan Harian")}
    <section class="panel module-section" style="margin-top:1rem">
      <h2>Entri Jurnal</h2>
      <div class="module-grid">
        ${state.journalEntries
          .map(
            (entry) => `
            <article class="module-card glossy-card">
              <span class="badge">${escapeHtml(entry.mood)}</span>
              <h3>${escapeHtml(entry.title)}</h3>
              <p>${escapeHtml(entry.body)}</p>
              <p class="muted"><strong>Pelajaran:</strong> ${escapeHtml(entry.lesson)}</p>
            </article>
          `
          )
          .join("")}
      </div>
    </section>
  `);
}

function achievementsView() {
  return shell(`
    ${moduleHero("Pencapaian", "Papan apresiasi untuk streak, milestone, dan momen kecil yang patut disyukuri.", "Achievement", "Badge Berkilau")}
    <section class="panel module-section" style="margin-top:1rem">
      <h2>Badge & Milestone</h2>
      <div class="achievement-grid">
        ${state.achievements
          .map(
            (item) => `
            <article class="achievement-card">
              <div class="medal-3d">★</div>
              <span class="badge">${escapeHtml(item.type)}</span>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.detail)}</p>
              <small>${escapeHtml(item.earnedAt)}</small>
            </article>
          `
          )
          .join("")}
      </div>
    </section>
  `);
}

function insightsView() {
  const morningScore = consistencyFor(state.habits.filter((habit) => habit.time === "Morning"));
  const afternoonScore = consistencyFor(state.habits.filter((habit) => habit.time === "Afternoon"));
  const eveningScore = consistencyFor(state.habits.filter((habit) => habit.time === "Evening"));
  return shell(`
    ${moduleHero("Insight", "Analisis pola dari data habit agar pengguna tahu waktu terkuat, titik lemah, dan langkah berikutnya.", "Insight", "Rule-Based Insight")}
    <div class="grid three-grid" style="margin-top:1rem">
      <section class="metric-card metric-cube"><span class="muted">Pagi</span><strong>${morningScore}%</strong></section>
      <section class="metric-card metric-cube"><span class="muted">Siang/Sore</span><strong>${afternoonScore}%</strong></section>
      <section class="metric-card metric-cube"><span class="muted">Malam</span><strong>${eveningScore}%</strong></section>
    </div>
    <section class="panel analytics-panel" style="margin-top:1rem">
      <div class="analytics-grid compact-analytics">
        ${histogram3d()}
        ${lineChart3d()}
      </div>
    </section>
    <section class="panel module-section" style="margin-top:1rem">
      <h2>Insight yang Bisa Ditindaklanjuti</h2>
      <div class="module-grid">
        ${state.insights
          .map(
            (item) => `
            <article class="module-card glossy-card">
              <h3>${escapeHtml(item.title)}</h3>
              <p><strong>Sinyal:</strong> ${escapeHtml(item.signal)}</p>
              <p class="muted"><strong>Saran:</strong> ${escapeHtml(item.advice)}</p>
            </article>
          `
          )
          .join("")}
      </div>
    </section>
  `);
}

function profileView() {
  const score = todayScore();
  return shell(`
    ${moduleHero("Profil", "Kelola foto profil, nama, life area, dan ringkasan progres kamu.", "Profile", "Profil Pengguna")}
    <section class="panel module-section" style="margin-top:1rem">
      <div class="profile-summary">
        <button class="avatar-upload large-avatar" onclick="triggerAvatarUpload()" aria-label="Upload foto profil">
          ${state.avatarUrl ? `<img src="${state.avatarUrl}" alt="Foto profil" />` : `<span>${escapeHtml(userDisplayName().slice(0, 1))}</span>`}
        </button>
        <div>
          <h2>${escapeHtml(userDisplayName())}</h2>
          <p>${escapeHtml(state.vision)}</p>
          <p class="muted">${escapeHtml(state.profileNote || "Fokus saat ini: menjaga amanah tubuh, ilmu, dan produktivitas dengan habit kecil yang istiqamah.")}</p>
        </div>
      </div>
      <div class="grid three-grid" style="margin-top:1rem">
        <section class="metric-card"><span class="muted">Life Area</span><strong>${state.selectedAreas.length}</strong></section>
        <section class="metric-card"><span class="muted">Habit aktif</span><strong>${state.habits.length}</strong></section>
        <section class="metric-card"><span class="muted">Skor hari ini</span><strong>${score.score}%</strong></section>
      </div>
    </section>
  `);
}

function render() {
  const app = document.querySelector("#app");
  const publicRoutes = ["login", "register", "otp"];
  if (!publicRoutes.includes(state.route) && !state.user?.otpVerified) {
    state.route = state.pendingUser ? "otp" : "register";
  }
  if (state.route === "login") app.innerHTML = authView("login");
  else if (state.route === "register") app.innerHTML = authView("register");
  else if (state.route === "otp") app.innerHTML = otpView();
  else if (state.route === "onboarding") app.innerHTML = onboardingView();
  else if (state.route === "dashboard") app.innerHTML = dashboardView();
  else if (state.route === "today") app.innerHTML = todayView();
  else if (state.route === "goals") app.innerHTML = goalsView();
  else if (state.route === "systems") app.innerHTML = systemsView();
  else if (state.route === "habits") app.innerHTML = habitsView();
  else if (state.route === "progress") app.innerHTML = progressView();
  else if (state.route === "impact") app.innerHTML = impactView();
  else if (state.route === "reviews") app.innerHTML = reviewsView();
  else if (state.route === "journal") app.innerHTML = journalView();
  else if (state.route === "achievements") app.innerHTML = achievementsView();
  else if (state.route === "insights") app.innerHTML = insightsView();
  else if (state.route === "profile") app.innerHTML = profileView();
  else app.innerHTML = dashboardView();
}

window.navigate = navigate;
window.login = login;
window.verifyOtp = verifyOtp;
window.resendOtp = resendOtp;
window.togglePasswordVisibility = togglePasswordVisibility;
window.recoverPassword = recoverPassword;
window.completeOnboarding = completeOnboarding;
window.downloadDashboardPdf = downloadDashboardPdf;
window.toggleHabit = toggleHabit;
window.deleteHabit = deleteHabit;
window.addQuick = addQuick;
window.submitQuickAdd = submitQuickAdd;
window.closeQuickAdd = closeQuickAdd;
window.addActivity = addActivity;
window.applySuggestion = applySuggestion;
window.deleteSuggestion = deleteSuggestion;
window.toggleMobileNav = toggleMobileNav;
window.triggerAvatarUpload = triggerAvatarUpload;
window.uploadAvatar = uploadAvatar;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}

render();
