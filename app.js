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
  ["profile", "Profil", "●"],
  ["settings", "Pengaturan", "⚙"]
];

const lifeAreas = [
  "Ibadah & Spiritual",
  "Kesehatan",
  "Ilmu & Belajar",
  "Amanah Kerja",
  "Keuangan Berkah",
  "Keluarga",
  "Dakwah",
  "Produktivitas",
  "Akhlak & Pengembangan Diri"
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
  "Ilmu & Belajar": {
    Morning: ["Baca 5 halaman", "Catat 1 pelajaran", "Dengarkan kajian singkat"],
    Afternoon: ["Latihan skill 25 menit", "Review catatan", "Tulis rangkuman ilmu"],
    Evening: ["Membaca Ilmu Bermanfaat", "Rencanakan materi besok", "Bagikan 1 faedah"]
  },
  "Amanah Kerja": {
    Morning: ["Tentukan 3 prioritas", "Rapikan agenda kerja", "Mulai tugas tersulit"],
    Afternoon: ["Fokus menunaikan amanah", "Follow up pekerjaan penting", "Rapikan inbox"],
    Evening: ["Evaluasi amanah harian", "Siapkan agenda besok", "Catat kendala utama"]
  },
  "Keuangan Berkah": {
    Morning: ["Cek niat belanja hari ini", "Catat rencana pengeluaran", "Sisihkan sedekah"],
    Afternoon: ["Catat transaksi", "Hindari pembelian impulsif", "Review anggaran"],
    Evening: ["Rekap pengeluaran", "Doakan keberkahan rezeki", "Rencana hemat besok"]
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
  Produktivitas: {
    Morning: ["Niat & Rencana Pagi", "Blok waktu fokus", "Rapikan meja kerja"],
    Afternoon: ["Fokus Menunaikan Amanah", "Istirahat berkualitas", "Selesaikan tugas kecil"],
    Evening: ["Review pekerjaan", "Tentukan prioritas besok", "Tutup hari tanpa menunda"]
  },
  "Akhlak & Pengembangan Diri": {
    Morning: ["Latih sabar sejak pagi", "Baca afirmasi Islami", "Tulis niat perbaikan"],
    Afternoon: ["Jaga lisan", "Beri apresiasi", "Latih syukur"],
    Evening: ["Muhasabah Harian", "Catat 1 kesalahan dan perbaikan", "Istighfar 100x"]
  }
};

const demoState = {
  route: "login",
  user: null,
  avatarUrl: "",
  onboardingDone: false,
  selectedAreas: ["Ibadah & Spiritual", "Kesehatan", "Ilmu & Belajar"],
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
      area: "Produktivitas",
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
      area: "Ilmu & Belajar",
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
      area: "Produktivitas",
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
      area: "Ilmu & Belajar",
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
      area: "Produktivitas",
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
      area: "Akhlak & Pengembangan Diri",
      goalId: "goal-productivity",
      systemId: "system-productivity",
      time: "Evening",
      streak: 4,
      target: "5 minutes",
      completed: false
    }
  ],
  logs: [],
  reviews: [
    {
      month: "August 2026",
      completion: 78,
      strongest: "Membaca Ilmu Bermanfaat",
      weakest: "Jalan Kaki 30 Menit"
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
  nextState.selectedAreas = nextState.selectedAreas?.length ? nextState.selectedAreas : demoState.selectedAreas;
  nextState.habits = nextState.habits?.length ? nextState.habits : structuredClone(demoState.habits);
  nextState.goals = nextState.goals?.length ? nextState.goals : structuredClone(demoState.goals);
  nextState.systems = nextState.systems?.length ? nextState.systems : structuredClone(demoState.systems);
  nextState.logs = nextState.logs || [];
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
      payload,
      sentAt: new Date().toISOString()
    })
  }).catch(() => {});
}

function navigate(route) {
  state.route = route;
  saveState();
  render();
}

function toast(message) {
  const element = document.querySelector("#toast");
  element.textContent = message;
  element.classList.add("show");
  window.setTimeout(() => element.classList.remove("show"), 2200);
}

function todayScore() {
  const completed = state.habits.filter((habit) => habit.completed).length;
  return {
    completed,
    total: state.habits.length,
    score: Math.round((completed / state.habits.length) * 100)
  };
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
  state.user = {
    name: form.get("name") || "Abu Adzka",
    email: form.get("email") || "demo@habit.local"
  };
  state.route = "onboarding";
  saveState();
  render();
  toast("Bismillah. Mari bangun hari yang lebih baik.");
}

function completeOnboarding(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  state.vision = form.get("vision") || state.vision;
  state.selectedAreas = form.getAll("lifeAreas");
  if (!state.selectedAreas.length) state.selectedAreas = [form.get("area") || "Ibadah & Spiritual"];
  const goalName = form.get("goalName");
  const systemName = form.get("systemName");
  const habitName = form.get("habitName");

  if (goalName) {
    const goalId = `goal-${Date.now()}`;
    const systemId = `system-${Date.now()}`;
    state.goals.unshift({
      id: goalId,
      name: goalName,
      area: form.get("area") || "Akhlak & Pengembangan Diri",
      why: form.get("why") || "Tujuan yang bermakna untuk bertumbuh dan bermanfaat.",
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
      name: habitName || "Daily Action",
      area: form.get("area") || "Akhlak & Pengembangan Diri",
      goalId,
      systemId,
      time: "Morning",
      streak: 0,
      target: "Daily",
      completed: false
    });
  }

  state.onboardingDone = true;
  state.route = "dashboard";
  saveState();
  render();
  toast("Alhamdulillah, sistem pertama Anda sudah siap.");
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

function addQuick(type) {
  const labels = { Goal: "Tujuan", System: "Sistem", Habit: "Kebiasaan", Activity: "Aktivitas" };
  const name = prompt(`Nama ${labels[type] || type} baru`);
  if (!name) return;
  if (type === "Goal") {
    state.goals.unshift({
      id: `goal-${Date.now()}`,
      name,
      area: "Akhlak & Pengembangan Diri",
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
      area: "Akhlak & Pengembangan Diri",
      goalId: state.goals[0]?.id || "goal-health",
      systemId: state.systems[0]?.id || "system-health",
      time: "Morning",
      streak: 0,
      target: "Daily",
      completed: false
    });
  }
  saveState();
  render();
  toast(`${labels[type] || type} berhasil dibuat.`);
}

function addActivity(time) {
  const selected = state.selectedAreas?.[0] || "Ibadah & Spiritual";
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
          <h1>Personal Growth Operating System</h1>
          <p>Bantu diri bertumbuh dengan niat yang benar, sistem yang rapi, kebiasaan baik, amal harian, muhasabah, dan perbaikan berkelanjutan.</p>
        </div>
        <div>
          <p class="muted">BANGUN → CATAT → UKUR → MUHASABAH → PERBAIKI</p>
          <p class="developer-credit">Developed by Markaz Dakwah Digital</p>
        </div>
      </section>
      <section class="auth-card" aria-label="${isRegister ? "Register" : "Login"}">
        <h2>${isRegister ? "Buat akun baru" : "Assalamu'alaikum"}</h2>
        <p class="muted">${isRegister ? "Mulai dari satu tujuan yang bermakna." : "Lanjutkan ikhtiar kecil hari ini dengan lebih tertata."}</p>
        <form onsubmit="login(event)">
          ${isRegister ? '<div class="field"><label for="name">Full name</label><input id="name" name="name" required value="Abu Adzka"></div>' : ""}
          <div class="field">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" required value="friendsindonesia28@gmail.com">
          </div>
          <div class="field">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" required value="betterhabits">
          </div>
          ${isRegister ? '<div class="field"><label for="confirm">Confirm password</label><input id="confirm" type="password" required value="betterhabits"></div>' : ""}
          <div class="row-between">
            <label class="check-row"><input type="checkbox" checked> Ingat saya</label>
            <button class="link-button" type="button" onclick="toast('Pemulihan password siap dihubungkan ke backend.')">Lupa password</button>
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
          <label>Apa kehidupan yang ingin Anda bangun?</label>
          <textarea name="vision">${state.vision}</textarea>
        </div>
        <div class="grid three-grid">
          <div class="field">
            <label>Nama Tujuan</label>
            <input name="goalName" value="Menjaga Kesehatan sebagai Amanah" required>
          </div>
          <div class="field">
            <label>Mengapa Ini Penting</label>
            <input name="why" value="Agar lebih kuat beribadah, bekerja, dan bermanfaat." required>
          </div>
          <div class="field">
            <label>Deadline</label>
            <input name="deadline" type="date" value="2026-12-31" required>
          </div>
        </div>
        <div class="grid three-grid">
          <div class="field">
            <label>System</label>
            <input name="systemName" value="Sistem Hidup Sehat" required>
          </div>
          <div class="field">
            <label>Kebiasaan Pertama</label>
            <input name="habitName" value="Jalan Kaki 30 Menit" required>
          </div>
          <div class="field">
            <label>Schedule</label>
            <select name="schedule"><option>Daily</option><option>Weekdays</option><option>Specific Days</option><option>Weekly</option></select>
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
            <p class="brand-title">HABIT</p>
            <span class="brand-subtitle">Tracker</span>
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
      <nav class="mobile-nav" aria-label="Mobile navigation">
        ${[
          ["dashboard", "Home"],
          ["today", "Hari Ini"],
          ["quick", "+"],
          ["progress", "Progress"],
          ["profile", "Profil"]
        ]
          .map(([id, label]) =>
            id === "quick"
              ? `<button class="add-button" onclick="addQuick('Habit')" aria-label="Quick add">${label}</button>`
              : `<button class="${state.route === id ? "active" : ""}" onclick="navigate('${id}')">${label}</button>`
          )
          .join("")}
      </nav>
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
        <div class="flag-indonesia" aria-label="Bendera Indonesia berkibar"><span></span></div>
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
          <h2>Smart Scoring Analytics</h2>
          <p class="muted">Histogram, line chart, pie 3D, dan tabel skor langsung menjelaskan progres hari ini.</p>
        </div>
        <span class="badge badge-3d">3D Glow Active</span>
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
        <p class="muted">Anda lebih konsisten menyelesaikan kebiasaan penting setelah niat dan rencana pagi.</p>
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
          <h2>Tabel Scoring 3D</h2>
          <p class="muted">Ringkasan formula scoring yang dipakai aplikasi.</p>
        </div>
        <span class="badge badge-3d">Glossy Table</span>
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

function habitList(habits) {
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
            ${habitList(state.habits.filter((habit) => habit.time === group))}
          </section>
        `
        )
        .join("")}
    </div>
  `);
}

function suggestionList(time) {
  const areas = state.selectedAreas?.length ? state.selectedAreas : ["Ibadah & Spiritual"];
  return `
    <div class="suggestion-box">
      <p class="muted">Pilihan sesuai Life Area:</p>
      ${areas
        .flatMap((area) => (activitySuggestions[area]?.[time] || []).slice(0, 3).map((name) => ({ area, name })))
        .slice(0, 6)
        .map(
          ({ area, name }) => `
          <button class="suggestion-pill" onclick="applySuggestion('${time}', '${area}', '${name.replace(/'/g, "\\'")}')">
            <span>${name}</span>
            <small>${area}</small>
          </button>
        `
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
      <h3>Histogram Life Area</h3>
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
      <h3>Line Progress Pekanan</h3>
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
      <h3>Pie Komposisi Skor</h3>
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
      ${habitList(state.habits)}
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

function simplePage(title, body) {
  return shell(`
    <section class="panel">
      <h2>${title}</h2>
      <p class="muted">${body}</p>
      <div class="quick-add">
        <button class="btn" onclick="toast('Modul ini disiapkan untuk fase berikutnya.')">Buka</button>
        <button class="btn primary" onclick="addQuick('Habit')">Quick Add</button>
      </div>
    </section>
  `);
}

function render() {
  const app = document.querySelector("#app");
  if (state.route === "login") app.innerHTML = authView("login");
  else if (state.route === "register") app.innerHTML = authView("register");
  else if (state.route === "onboarding") app.innerHTML = onboardingView();
  else if (state.route === "dashboard") app.innerHTML = dashboardView();
  else if (state.route === "today") app.innerHTML = todayView();
  else if (state.route === "goals") app.innerHTML = goalsView();
  else if (state.route === "systems") app.innerHTML = systemsView();
  else if (state.route === "habits") app.innerHTML = habitsView();
  else if (state.route === "progress") app.innerHTML = progressView();
  else if (state.route === "impact") app.innerHTML = simplePage("Dampak", "Energi, fokus, suasana hati, produktivitas, dan korelasi kebiasaan akan tercatat di sini.");
  else if (state.route === "reviews") app.innerHTML = simplePage("Muhasabah", "Alur muhasabah pekanan dan bulanan disiapkan untuk fase berikutnya.");
  else if (state.route === "journal") app.innerHTML = simplePage("Jurnal", "Catat rasa syukur, pelajaran, tantangan, dan niat perbaikan.");
  else if (state.route === "achievements") app.innerHTML = simplePage("Pencapaian", "Momen pencapaian bernuansa gold seperti 7 hari istiqamah dan muhasabah pertama.");
  else if (state.route === "insights") app.innerHTML = simplePage("Insight", "Mesin insight rule-based disiapkan untuk pola konsistensi dan jadwal.");
  else if (state.route === "profile") app.innerHTML = simplePage("Profile", "Profil, zona waktu, bahasa, dan preferensi personal.");
  else if (state.route === "settings") app.innerHTML = simplePage("Settings", "Tema, notifikasi, privasi, ekspor data, dan kontrol akun.");
}

window.navigate = navigate;
window.login = login;
window.completeOnboarding = completeOnboarding;
window.toggleHabit = toggleHabit;
window.addQuick = addQuick;
window.addActivity = addActivity;
window.applySuggestion = applySuggestion;
window.triggerAvatarUpload = triggerAvatarUpload;
window.uploadAvatar = uploadAvatar;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}

render();
