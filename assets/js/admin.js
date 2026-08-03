// Daftar kategori bersama dipakai oleh field "Kategori" (Artikel, Pengalaman,
// Video/Short, dll) di form Admin. Isinya SEKARANG dimuat otomatis dari sheet
// "Kategori" lewat loadDynamicCategories() setiap admin membuka panel /
// berpindah menu (lihat fungsi di bawah). Array kosong di bawah cuma dipakai
// sebagai fallback sementara sebelum data dari sheet selesai dimuat, atau
// kalau pemanggilan ke sheet Kategori gagal (mis. koneksi terputus).
const CONTENT_CATEGORIES = [
  "Haji",
  "Umrah",
  "Manasik",
  "Persiapan",
  "Doa",
  "Kesehatan",
  "Transportasi",
  "Hotel",
  "Kuliner",
  "Belanja",
  "Budget",
  "Adab",
  "Ziarah",
  "Tips Hemat",
  "Fikih",
  "Regulasi & Keuangan",
  "Wakaf & Sosial",
  "Karier Petugas",
];

// Ambil daftar kategori terbaru dari sheet "Kategori" lewat HCApi, lalu isi
// ulang isi array CONTENT_CATEGORIES di tempat (bukan bikin array baru) --
// supaya semua field yang sudah menyimpan referensi ke CONTENT_CATEGORIES
// (options: CONTENT_CATEGORIES) otomatis ikut ter-update tanpa perlu
// membangun ulang ADMIN_SCHEMA. Kalau gagal atau sheet kosong, daftar bawaan
// di atas tetap dipakai supaya form tidak pernah kosong sama sekali.
const loadDynamicCategories = async () => {
  try {
    const categories = await HCApi.getCategories();
    const names = (categories || [])
      .map((item) => (item && item.nama ? String(item.nama).trim() : ""))
      .filter(Boolean);
    if (names.length) {
      CONTENT_CATEGORIES.length = 0;
      names.forEach((name) => CONTENT_CATEGORIES.push(name));
    }
  } catch (error) {
    console.info(
      "Gagal memuat kategori dari sheet Kategori, memakai daftar bawaan:",
      error.message,
    );
  }
};

const ADMIN_SCHEMA = {
  Artikel: {
    label: "Artikel",
    icon: "bi-newspaper",
    group: "Konten",
    fields: [
      { key: "judul", label: "Judul", type: "text", required: true },
      {
        key: "slug",
        label: "Slug (URL)",
        type: "text",
        required: true,
        hint: "Huruf kecil, pisahkan dengan tanda hubung, contoh: tips-hemat-umrah",
      },
      {
        key: "kategori",
        label: "Kategori",
        type: "select",
        options: CONTENT_CATEGORIES,
        required: true,
      },
      { key: "gambar", label: "Gambar", type: "image" },
      { key: "ringkasan", label: "Ringkasan", type: "textarea", rows: 2 },
      {
        key: "isi",
        label: "Isi Artikel (HTML)",
        type: "textarea",
        rows: 8,
        richHtml: true,
      },
      { key: "penulis", label: "Penulis", type: "text" },
      { key: "tanggal", label: "Tanggal", type: "date" },
      {
        key: "sumber_referensi",
        label: "Rujukan / Sumber",
        type: "textarea",
        rows: 2,
        hint: 'Contoh: Kemenag RI, kemenag.go.id (diakses Juli 2026). Tampil sebagai kotak "Rujukan & catatan sumber" di halaman artikel.',
      },
      {
        key: "views",
        label: "Jumlah Dibaca (Views)",
        type: "number",
        hint: "Otomatis bertambah tiap kali artikel dibuka pengunjung. Dipakai untuk menentukan Artikel Populer. Bisa disesuaikan manual bila perlu.",
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Publish", "Draft"],
      },
    ],
  },
  Pengalaman: {
    label: "Pengalaman Jamaah",
    icon: "bi-people",
    group: "Konten",
    fields: [
      { key: "nama", label: "Nama", type: "text", required: true },
      { key: "asal", label: "Asal Kota", type: "text" },
      { key: "judul", label: "Judul Cerita", type: "text", required: true },
      {
        key: "kategori",
        label: "Kategori",
        type: "select",
        options: CONTENT_CATEGORIES,
        required: true,
      },
      { key: "pengalaman", label: "Cerita", type: "textarea", rows: 5 },
      { key: "tips", label: "Tips", type: "textarea", rows: 2 },
      { key: "tanggal", label: "Tanggal", type: "date" },
      { key: "like", label: "Jumlah Like", type: "number" },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Publish", "Draft"],
      },
    ],
  },
  Kategori: {
    label: "Kategori",
    icon: "bi-tags",
    group: "Konten",
    fields: [
      { key: "nama", label: "Nama Kategori", type: "text", required: true },
      { key: "slug", label: "Slug", type: "text" },
      {
        key: "icon",
        label: "Ikon (kelas Bootstrap Icons)",
        type: "text",
        hint: "Contoh: bi-suitcase2",
      },
    ],
  },
  FAQ: {
    label: "FAQ",
    icon: "bi-question-circle",
    group: "Konten",
    fields: [
      { key: "pertanyaan", label: "Pertanyaan", type: "text", required: true },
      { key: "jawaban", label: "Jawaban", type: "textarea", rows: 4 },
      { key: "kategori", label: "Kategori", type: "text" },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Publish", "Draft"],
      },
    ],
  },
  Istilah: {
    label: "Istilah / Kamus",
    icon: "bi-journal-text",
    group: "Panduan",
    fields: [
      { key: "judul", label: "Judul Istilah", type: "text", required: true },
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "kategori", label: "Kategori", type: "text" },
      { key: "ringkasan", label: "Ringkasan", type: "textarea", rows: 2 },
      {
        key: "isi",
        label: "Isi Lengkap (HTML)",
        type: "textarea",
        rows: 5,
        richHtml: true,
      },
      {
        key: "sumber_referensi",
        label: "Rujukan / Sumber",
        type: "textarea",
        rows: 2,
        hint: 'Contoh: BPKH, bpkh.go.id (diakses Juli 2026). Tampil sebagai kotak "Rujukan & catatan sumber" di halaman istilah.',
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Publish", "Draft"],
      },
    ],
  },
  TataCara: {
    label: "Tata Cara Ibadah",
    icon: "bi-list-check",
    group: "Panduan",
    fields: [
      {
        key: "jenis",
        label: "Jenis",
        type: "select",
        options: ["Haji", "Umrah"],
        required: true,
      },
      { key: "urutan", label: "Urutan", type: "number", required: true },
      { key: "judul", label: "Judul Tahapan", type: "text", required: true },
      { key: "deskripsi", label: "Deskripsi", type: "textarea", rows: 3 },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Publish", "Draft"],
      },
    ],
  },
  Doa: {
    label: "Kumpulan Doa",
    icon: "bi-moon-stars",
    group: "Panduan",
    fields: [
      {
        key: "jenis",
        label: "Jenis",
        type: "select",
        options: ["Haji", "Umrah"],
        required: true,
      },
      { key: "judul", label: "Judul Doa", type: "text", required: true },
      { key: "arab", label: "Lafal Arab", type: "text" },
      { key: "latin", label: "Latin", type: "textarea", rows: 2 },
      { key: "arti", label: "Arti", type: "textarea", rows: 2 },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Publish", "Draft"],
      },
    ],
  },
  PanduanWaktu: {
    label: "Panduan Waktu Ibadah",
    icon: "bi-hourglass-split",
    group: "Panduan",
    fields: [
      { key: "aktivitas", label: "Aktivitas", type: "text", required: true },
      { key: "durasi", label: "Estimasi Durasi", type: "text" },
      { key: "catatan", label: "Catatan", type: "textarea", rows: 2 },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Publish", "Draft"],
      },
    ],
  },
  Persiapan: {
    label: "Checklist Persiapan",
    icon: "bi-suitcase2",
    group: "Panduan",
    fields: [
      { key: "kategori", label: "Kategori", type: "text", required: true },
      { key: "item", label: "Item", type: "text", required: true },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Publish", "Draft"],
      },
    ],
  },
  PersiapanTimeline: {
    label: "Timeline Persiapan",
    icon: "bi-calendar-check",
    group: "Panduan",
    fields: [
      {
        key: "waktu",
        label: "Waktu (contoh: H-30)",
        type: "text",
        required: true,
      },
      { key: "deskripsi", label: "Deskripsi", type: "textarea", rows: 2 },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Publish", "Draft"],
      },
    ],
  },
  Peta: {
    label: "Peta (Lokasi Penting)",
    icon: "bi-geo-alt",
    group: "Info Praktis",
    fields: [
      { key: "nama", label: "Nama", type: "text", required: true },
      {
        key: "kategori",
        label: "Kategori",
        type: "select",
        options: ["Peta", "Ziarah", "Transportasi"],
        hint: "Semua kategori di sini tampil di halaman peta.html, dikelompokkan otomatis (Masjid/Tempat Ibadah, Ziarah, Transportasi, dst). Hotel/Kuliner/Belanja kini artikel biasa, lihat menu Artikel.",
      },
      { key: "lokasi", label: "Lokasi", type: "text" },
      { key: "deskripsi", label: "Deskripsi", type: "textarea", rows: 3 },
      { key: "rating", label: "Rating", type: "text" },
      { key: "jarak", label: "Jarak", type: "text" },
      { key: "estimasi", label: "Estimasi", type: "text" },
      { key: "harga", label: "Harga", type: "text" },
      { key: "maps", label: "Link Google Maps", type: "text" },
      { key: "gambar", label: "Gambar", type: "image" },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Publish", "Draft"],
      },
    ],
  },
  Download: {
    label: "Download Center",
    icon: "bi-download",
    group: "Info Praktis",
    fields: [
      { key: "judul", label: "Judul", type: "text", required: true },
      { key: "deskripsi", label: "Deskripsi", type: "textarea", rows: 2 },
      {
        key: "kategori",
        label: "Kategori",
        type: "select",
        options: CONTENT_CATEGORIES,
        required: true,
        hint: "Dipakai untuk filter di halaman Download Center, mis. kartu \"Transportasi\" di beranda menuju download.html?kategori=Transportasi.",
      },
      {
        key: "file",
        label: "Link File (PDF/dokumen)",
        type: "text",
        hint: "Link unduhan asli (boleh dari Google Drive, hosting PDF, atau link internet lain). Isi salah satu: Link File (dokumen) ATAU Gambar (infografis). Tidak perlu diisi dua-duanya.",
      },
      {
        key: "gambar",
        label: "Gambar (infografis)",
        type: "image",
        hint: "Untuk item berupa gambar/infografis yang bisa diunduh langsung. Kosongkan jika item ini berupa dokumen/file di atas.",
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Publish", "Draft"],
      },
    ],
  },
  Video: {
    label: "Video",
    icon: "bi-play-btn",
    group: "Info Praktis",
    fields: [
      { key: "judul", label: "Judul", type: "text", required: true },
      {
        key: "kategori",
        label: "Kategori",
        type: "select",
        options: CONTENT_CATEGORIES,
        required: true,
      },
      {
        key: "tipe",
        label: "Tipe Konten",
        type: "select",
        options: ["Video", "Short"],
        hint: '"Video" untuk video biasa (16:9). "Short" untuk konten vertikal (Reels/Shorts/TikTok, 9:16).',
      },
      {
        key: "platform",
        label: "Platform",
        type: "select",
        options: ["YouTube", "TikTok", "Instagram"],
      },
      {
        key: "youtube",
        label: "Link Video / Short",
        type: "text",
        hint: "Tempel link asli dari platform-nya, sistem otomatis mengubah ke format embed. YouTube: link watch/shorts/youtu.be apa saja. TikTok: link lengkap berisi /video/ID (contoh: tiktok.com/@akun/video/123...). Instagram: link Reel/Post (contoh: instagram.com/reel/ID/).",
      },
      { key: "deskripsi", label: "Deskripsi", type: "textarea", rows: 2 },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Publish", "Draft"],
      },
    ],
  },
  Layanan: {
    label: "Layanan (Badal, Fikih, Wakaf, Rekrutmen)",
    icon: "bi-briefcase-fill",
    group: "Layanan",
    fields: [
      {
        key: "halaman",
        label: "Halaman",
        type: "select",
        options: ["badal", "fikih", "wakaf-quran", "rekrutmen-petugas"],
        required: true,
        hint: "Menentukan halaman mana yang menampilkan konten ini: badal.html, fikih.html, wakaf-quran.html, atau rekrutmen-petugas.html.",
      },
      {
        key: "eyebrow",
        label: "Eyebrow (label kecil di atas judul)",
        type: "text",
        hint: "Contoh: Layanan · Badal Umroh",
      },
      { key: "judul", label: "Judul Halaman", type: "text", required: true },
      { key: "ringkasan", label: "Ringkasan", type: "textarea", rows: 2 },
      {
        key: "isi",
        label: "Isi Halaman (HTML)",
        type: "textarea",
        rows: 8,
        richHtml: true,
        hint: 'Konten utama halaman, termasuk section FAQ singkat di bagian bawah. Kartu "Pesan Jasa" (form ke WhatsApp admin) di badal.html/wakaf-quran.html bersifat statis dan tidak diatur dari sini.',
      },
      {
        key: "sumber_referensi",
        label: "Rujukan / Sumber",
        type: "textarea",
        rows: 2,
        hint: 'Tampil sebagai kotak "Rujukan & catatan sumber" di halaman.',
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Publish", "Draft"],
      },
    ],
  },
  Pesanan: {
    label: "Pesanan (dari Member)",
    icon: "bi-cart-check",
    group: "Layanan",
    fields: [
      {
        key: "user_id",
        label: "ID User",
        type: "text",
        hint: "ID member yang memesan",
      },
      {
        key: "layanan",
        label: "Layanan",
        type: "select",
        options: ["badal_umroh", "wakaf_quran", "panitia_haji"],
        required: true,
      },
      { key: "nama_pemesan", label: "Nama Pemesan", type: "text" },
      { key: "whatsapp_pemesan", label: "WhatsApp", type: "text" },
      {
        key: "data_pesanan",
        label: "Data Pesanan (JSON)",
        type: "textarea",
        rows: 3,
        hint: "Data tambahan pesanan dalam format JSON",
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["pending", "diproses", "selesai", "ditolak"],
      },
      {
        key: "catatan_admin",
        label: "Catatan Admin",
        type: "textarea",
        rows: 2,
      },
      { key: "tanggal_pesan", label: "Tanggal Pesan", type: "date" },
    ],
  },
};

const state = {
  token: "",
  currentUser: null,
  currentSheet: null,
  rows: [],
  editingId: null,
  users: [],
  editingUserId: null,
};

const ADMIN_ROLES = ["super_admin", "penulis"];

const els = {};
const qs = (selector) => document.querySelector(selector);

const showToast = (message, variant = "success") => {
  const container = document.querySelector(".toast-container");
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-bg-${variant} border-0`;
  toast.setAttribute("role", "alert");
  toast.innerHTML = `<div class="d-flex"><div class="toast-body">${message}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>`;
  container.appendChild(toast);
  const bsToast = new bootstrap.Toast(toast, { delay: 3200 });
  bsToast.show();
  toast.addEventListener("hidden.bs.toast", () => toast.remove());
};

const showAlert = (message, variant = "danger") => {
  const alertBox = qs("#adminAlert");
  alertBox.textContent = message;
  alertBox.className = `alert alert-${variant} py-2 small`;
};
const hideAlert = () => qs("#adminAlert")?.classList.add("d-none");

// === Login ===
// Admin Panel TIDAK lagi punya form login sendiri. Login/register memakai
// satu sistem yang sama untuk seluruh situs lewat login.html/daftar.html
// (HCAuth, assets/js/auth.js). Di sini kita hanya memeriksa sesi yang sudah
// ada: kalau belum login atau rolenya bukan super_admin/penulis, pengunjung
// diarahkan ke login.html. Setelah login di sana, dia otomatis diarahkan
// kembali ke admin.html (lihat parameter ?redirect= di login.html).
const initLogin = async () => {
  await window.HCAuth.me(); // sinkronkan sesi ke server (menolak sesi basi/nonaktif)
  const user = window.HCAuth.requireRole(
    ADMIN_ROLES,
    "login.html?redirect=admin.html",
  );
  if (!user) return; // requireRole sudah redirect ke login.html

  state.token = window.HCAuth.getToken();
  state.currentUser = user;
  tryEnterApp();
};

const tryEnterApp = async () => {
  qs("#authCheckScreen").classList.add("d-none");
  qs("#adminApp").classList.remove("d-none");
  await loadDynamicCategories();
  try {
    buildSidebar();
  } catch (error) {
    console.error("Gagal membangun menu admin:", error);
    showAlert(
      "Berhasil login, tetapi menu konten gagal dimuat. Coba muat ulang halaman.",
    );
  }
};

const showView = (view) => {
  qs("#contentView").classList.toggle("d-none", view !== "content");
  qs("#usersView").classList.toggle("d-none", view !== "users");
  qs("#profileView").classList.toggle("d-none", view !== "profile");
};

const buildSidebar = () => {
  const sidebar = qs("#adminSidebar");
  const groups = {};
  Object.entries(ADMIN_SCHEMA).forEach(([sheet, config]) => {
    groups[config.group] = groups[config.group] || [];
    groups[config.group].push({ sheet, ...config });
  });
  let html = Object.entries(groups)
    .map(
      ([group, items]) => `
    <div class="admin-sidebar-group-title">${group}</div>
    ${items.map((item) => `<button type="button" data-sheet="${item.sheet}"><i class="bi ${item.icon}"></i> ${item.label}</button>`).join("")}
  `,
    )
    .join("");
  html += `
    <div class="admin-sidebar-group-title">Akun</div>
    <button type="button" data-view="profile"><i class="bi bi-person-circle"></i> Profil Saya</button>
  `;
  // Menu "Pengguna" khusus super_admin: BUKAN bagian dari ADMIN_SCHEMA/CRUD
  // generik, karena sheet Users memang tidak dikelola lewat aksi
  // admin_list/create/update/delete di backend (supaya password_hash tidak
  // pernah ikut terkirim lewat aksi generik itu). Ditangani terpisah lewat
  // aksi users_list/users_create/users_update/users_delete.
  if (state.currentUser && state.currentUser.role === "super_admin") {
    html += `
    <div class="admin-sidebar-group-title">Manajemen</div>
    <button type="button" data-view="users"><i class="bi bi-people"></i> Pengguna</button>
  `;
  }
  sidebar.innerHTML = html;
  sidebar.querySelectorAll("button[data-sheet]").forEach((button) => {
    button.addEventListener("click", () => {
      sidebar
        .querySelectorAll("button[data-sheet], button[data-view]")
        .forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      showView("content");
      selectSheet(button.dataset.sheet);
      sidebar.classList.remove("show");
    });
  });
  sidebar.querySelectorAll("button[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      sidebar
        .querySelectorAll("button[data-sheet], button[data-view]")
        .forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      const view = button.dataset.view;
      showView(view);
      if (view === "users") loadUsers();
      if (view === "profile") loadProfile();
      sidebar.classList.remove("show");
    });
  });
};

const selectSheet = async (sheet) => {
  state.currentSheet = sheet;
  const config = ADMIN_SCHEMA[sheet];
  qs("#activeSheetLabel").textContent = config.group;
  qs("#activeSheetTitle").textContent = config.label;
  qs("#addBtn").disabled = false;
  hideAlert();
  // Muat ulang daftar kategori kalau menu ini punya field kategori dinamis,
  // supaya kategori yang baru saja ditambah/diubah di menu "Kategori"
  // langsung tersedia di dropdown tanpa perlu logout/login ulang.
  if (config.fields.some((field) => field.options === CONTENT_CATEGORIES)) {
    await loadDynamicCategories();
  }
  renderTableHead(config);
  qs("#tableBody").innerHTML =
    `<tr><td colspan="${config.fields.length + 1}" class="text-center py-5"><div class="spinner-border text-primary"></div></td></tr>`;
  try {
    state.rows = await HCApi.adminList(sheet, state.token);
    renderTableBody(config);
  } catch (error) {
    showAlert(error.message || "Gagal memuat data.");
    qs("#tableBody").innerHTML =
      `<tr><td colspan="${config.fields.length + 1}" class="text-center py-4 lead-muted">Gagal memuat data.</td></tr>`;
  }
};

const visibleFields = (config) => {
  const nonTextarea = config.fields.filter(
    (field) => field.type !== "textarea",
  );
  const statusField = nonTextarea.find((field) => field.key === "status");
  const others = nonTextarea.filter((field) => field.key !== "status");
  const trimmed = others.slice(0, statusField ? 4 : 5);
  return statusField ? [...trimmed, statusField] : trimmed;
};

const renderTableHead = (config) => {
  const fields = visibleFields(config);
  qs("#tableHeadRow").innerHTML =
    fields.map((field) => `<th>${field.label}</th>`).join("") +
    `<th class="text-end">Aksi</th>`;
};

const renderTableBody = (config, filterText = "") => {
  const fields = visibleFields(config);
  const hasStatus = config.fields.some((field) => field.key === "status");
  let rows = state.rows;
  if (filterText) {
    const keyword = filterText.toLowerCase();
    rows = rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(keyword),
      ),
    );
  }
  if (!rows.length) {
    qs("#tableBody").innerHTML =
      `<tr><td colspan="${fields.length + 1}" class="text-center py-4 lead-muted">Belum ada data. Klik "Tambah Baru" untuk mulai mengisi.</td></tr>`;
    return;
  }
  qs("#tableBody").innerHTML = rows
    .map(
      (row) => `
    <tr>
      ${fields.map((field) => `<td class="cell-truncate">${renderCellValue(row, field)}</td>`).join("")}
      <td class="text-end text-nowrap">
        ${hasStatus ? `<button class="btn btn-sm ${row.status === "Publish" ? "btn-outline-warning" : "btn-outline-success"}" type="button" data-toggle-status="${row.id}" title="${row.status === "Publish" ? "Jadikan Draft" : "Publish sekarang"}"><i class="bi ${row.status === "Publish" ? "bi-eye-slash" : "bi-check-circle"}"></i></button>` : ""}
        <button class="btn btn-sm btn-outline-primary" type="button" data-edit="${row.id}"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" type="button" data-delete="${row.id}"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
  `,
    )
    .join("");
  qs("#tableBody")
    .querySelectorAll("[data-edit]")
    .forEach((button) => {
      button.addEventListener("click", () =>
        openForm(
          config,
          state.rows.find((row) => String(row.id) === button.dataset.edit),
        ),
      );
    });
  qs("#tableBody")
    .querySelectorAll("[data-toggle-status]")
    .forEach((button) => {
      button.addEventListener("click", () =>
        handleToggleStatus(button.dataset.toggleStatus),
      );
    });
  qs("#tableBody")
    .querySelectorAll("[data-delete]")
    .forEach((button) => {
      button.addEventListener("click", () =>
        handleDelete(button.dataset.delete),
      );
    });
};

const renderCellValue = (row, field) => {
  const value = row[field.key];
  if (field.type === "image" && value) {
    return `<img class="cell-image-thumb" src="${value}" alt="" loading="lazy" onerror="this.style.opacity=0.3">`;
  }
  if (field.type === "select" && field.key === "status") {
    return `<span class="badge-soft" style="${value === "Draft" ? "background:#fef3c7;color:#92400e;border-color:#fde68a;" : ""}">${value || "-"}</span>`;
  }
  return value !== undefined && value !== ""
    ? value
    : '<span class="lead-muted">-</span>';
};

// === Form modal (create/edit) ===
const openForm = (config, row = null) => {
  state.editingId = row ? row.id : null;
  qs("#formModalTitle").textContent = row
    ? `Edit ${config.label}`
    : `Tambah ${config.label}`;
  qs("#formFields").innerHTML = config.fields
    .map((field) => renderFieldInput(field, row))
    .join("");
  config.fields
    .filter((field) => field.type === "image")
    .forEach((field) => wireImageField(field));
  config.fields
    .filter((field) => field.type === "textarea" && field.richHtml)
    .forEach((field) => wireHtmlEditorField(field));
  new bootstrap.Modal(qs("#formModal")).show();
};

const renderFieldInput = (field, row) => {
  const value = row ? (row[field.key] ?? "") : "";
  const requiredAttr = field.required ? "required" : "";
  const hint = field.hint ? `<div class="form-text">${field.hint}</div>` : "";
  if (field.type === "textarea" && field.richHtml) {
    return `
      <div class="mb-3" data-html-editor-field="${field.key}">
        <label class="form-label small fw-bold">${field.label}</label>
        <div class="html-editor-toolbar" role="toolbar" aria-label="Format teks">
          <button class="html-editor-btn" type="button" data-html-cmd="p" title="Paragraf biasa">P</button>
          <button class="html-editor-btn html-editor-btn-heading" type="button" data-html-cmd="h2" title="Judul Bagian (H2) &mdash; bagian utama">H2</button>
          <button class="html-editor-btn html-editor-btn-heading" type="button" data-html-cmd="h3" title="Sub Bagian (H3) &mdash; turunan dari H2">H3</button>
          <button class="html-editor-btn html-editor-btn-heading" type="button" data-html-cmd="h4" title="Sub-sub Bagian (H4) &mdash; turunan dari H3">H4</button>
          <span class="html-editor-sep" aria-hidden="true"></span>
          <button class="html-editor-btn" type="button" data-html-cmd="bold" title="Tebal"><i class="bi bi-type-bold"></i></button>
          <button class="html-editor-btn" type="button" data-html-cmd="italic" title="Miring"><i class="bi bi-type-italic"></i></button>
          <button class="html-editor-btn" type="button" data-html-cmd="ul" title="Daftar bullet"><i class="bi bi-list-ul"></i></button>
          <button class="html-editor-btn" type="button" data-html-cmd="ol" title="Daftar bernomor"><i class="bi bi-list-ol"></i></button>
          <button class="html-editor-btn" type="button" data-html-cmd="quote" title="Kutipan"><i class="bi bi-quote"></i></button>
          <button class="html-editor-btn" type="button" data-html-cmd="link" title="Tautan"><i class="bi bi-link-45deg"></i></button>
        </div>
        <textarea class="form-control html-editor-textarea" name="${field.key}" rows="${field.rows || 3}" data-html-editor-input ${requiredAttr}>${escapeHtml(value)}</textarea>
        <div class="form-text">Blok (pilih) teks lalu klik <strong>H2/H3/H4</strong> untuk menandai judul bagian &mdash; tidak perlu ketik tag HTML manual. H2 = bagian utama, H3 = sub-bagian, H4 = detail terdalam, berurutan tanpa lompat level. Jangan pakai H1 di sini karena judul di atas sudah otomatis jadi H1 halaman.</div>
        <div class="html-editor-outline" data-html-editor-outline>
          <p class="small fw-bold mb-2 text-primary"><i class="bi bi-list-nested"></i> Pratinjau struktur Daftar Isi</p>
          <div data-html-editor-outline-body></div>
        </div>
        ${hint}
      </div>`;
  }
  if (field.type === "textarea") {
    return `<div class="mb-3"><label class="form-label small fw-bold">${field.label}</label><textarea class="form-control" name="${field.key}" rows="${field.rows || 3}" ${requiredAttr}>${escapeHtml(value)}</textarea>${hint}</div>`;
  }
  if (field.type === "select") {
    return `<div class="mb-3"><label class="form-label small fw-bold">${field.label}</label><select class="form-select" name="${field.key}" ${requiredAttr}>${field.options.map((option) => `<option value="${option}" ${value === option ? "selected" : ""}>${option}</option>`).join("")}</select></div>`;
  }
  if (field.type === "number") {
    return `<div class="mb-3"><label class="form-label small fw-bold">${field.label}</label><input class="form-control" type="number" name="${field.key}" value="${value}" ${requiredAttr}>${hint}</div>`;
  }
  if (field.type === "date") {
    return `<div class="mb-3"><label class="form-label small fw-bold">${field.label}</label><input class="form-control" type="date" name="${field.key}" value="${value}" ${requiredAttr}></div>`;
  }
  if (field.type === "image") {
    return `
      <div class="mb-3" data-image-field="${field.key}">
        <label class="form-label small fw-bold">${field.label}</label>
        <div class="d-flex align-items-center gap-3 flex-wrap">
          <img class="image-field-preview" src="${value || "assets/images/article-placeholder.svg"}" alt="Pratinjau">
          <div class="flex-grow-1" style="min-width:220px;">
            <input class="form-control form-control-sm mb-2" type="text" name="${field.key}" value="${escapeHtml(value)}" placeholder="Tempel link gambar (https://...)">
            <input class="form-control form-control-sm" type="file" accept="image/*" data-image-upload>
          </div>
        </div>
        <div class="form-text">Tempel link gambar dari internet (termasuk link share Google Drive), atau unggah file langsung dari perangkat.</div>
      </div>`;
  }
  return `<div class="mb-3"><label class="form-label small fw-bold">${field.label}</label><input class="form-control" type="text" name="${field.key}" value="${escapeHtml(value)}" ${requiredAttr}>${hint}</div>`;
};

const wireImageField = (field) => {
  const wrapper = qs(`[data-image-field="${field.key}"]`);
  if (!wrapper) return;
  const urlInput = wrapper.querySelector(`input[name="${field.key}"]`);
  const fileInput = wrapper.querySelector("[data-image-upload]");
  const preview = wrapper.querySelector(".image-field-preview");
  urlInput.addEventListener("input", () => {
    preview.src = urlInput.value || "assets/images/article-placeholder.svg";
  });
  urlInput.addEventListener("change", () => {
    urlInput.value = normalizeImageUrl(urlInput.value);
    preview.src = urlInput.value || "assets/images/article-placeholder.svg";
  });
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (!file) return;
    preview.src = URL.createObjectURL(file);
    try {
      const uploadedUrl = await HCApi.adminUploadImage(file, state.token);
      urlInput.value = uploadedUrl;
      preview.src = uploadedUrl;
      showToast("Gambar berhasil diunggah.");
    } catch (error) {
      showToast(error.message || "Gagal mengunggah gambar.", "danger");
    }
  });
};

// === Editor "Isi (HTML)": toolbar heading H2-H4 + pratinjau struktur TOC ===
// Textarea tetap menyimpan HTML mentah (sesuai format yang dipakai
// buildArticleTableOfContents di article.js), tapi penulis konten tidak
// perlu mengetik tag secara manual: blok teks lalu klik tombol, tag
// disisipkan otomatis di posisi kursor/seleksi.
const HTML_EDITOR_TAGS = {
  h2: { tag: "h2", placeholder: "Judul Bagian" },
  h3: { tag: "h3", placeholder: "Judul Sub Bagian" },
  h4: { tag: "h4", placeholder: "Judul Detail" },
  bold: { tag: "strong", placeholder: "teks tebal" },
  italic: { tag: "em", placeholder: "teks miring" },
  quote: { tag: "blockquote", placeholder: "Kutipan" },
};

// Ambil urutan H2/H3/H4 dari string HTML mentah di textarea, dipakai
// untuk menggambar pratinjau struktur Daftar Isi secara real-time.
const parseHeadingOutline = (html) => {
  try {
    const doc = new DOMParser().parseFromString(html || "", "text/html");
    return [...doc.querySelectorAll("h2, h3, h4")].map((el) => ({
      level: Number(el.tagName.slice(1)),
      text: el.textContent.trim() || "(judul kosong)",
    }));
  } catch (error) {
    return [];
  }
};

// Render daftar heading berjenjang + tandai kalau ada level yang
// "lompat" (mis. H4 muncul tanpa H3 sebelumnya, atau bagian pertama
// langsung H3/H4) supaya penulis konten sadar itu melanggar kaidah
// heading yang benar untuk SEO.
const renderHeadingOutline = (headings) => {
  if (!headings.length) {
    return `<p class="small lead-muted mb-0">Belum ada judul bagian (H2/H3/H4). Tambahkan minimal satu H2 supaya artikel punya struktur Daftar Isi yang baik.</p>`;
  }
  let lastLevel = 1; // H1 dianggap sudah dipakai oleh judul artikel/halaman
  return headings
    .map((item) => {
      const skipped = item.level > lastLevel + 1;
      lastLevel = item.level;
      const indent = (item.level - 2) * 18;
      const warning = skipped
        ? `<i class="bi bi-exclamation-triangle-fill text-warning ms-1" title="Lompat level: sebaiknya H${item.level} didahului H${item.level - 1}"></i>`
        : "";
      return `<div class="html-editor-outline-item" style="padding-left:${indent}px"><span class="badge-soft html-editor-outline-badge">H${item.level}</span> ${escapeHtml(item.text)}${warning}</div>`;
    })
    .join("");
};

// Sisipkan tag HTML di sekitar teks yang sedang diblok (atau di posisi
// kursor kalau tidak ada seleksi) menggunakan textarea.setRangeText,
// jadi kaidah H1-H4 tidak perlu diketik manual oleh penulis konten.
const applyHtmlEditorCommand = (textarea, cmd) => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.slice(start, end);
  let insert;

  if (cmd === "p") {
    insert = `<p>${selected || "Paragraf baru"}</p>`;
  } else if (cmd === "ul" || cmd === "ol") {
    const lines = (selected || "Poin pertama\nPoin kedua")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const items = lines.map((line) => `  <li>${line}</li>`).join("\n");
    insert = `<${cmd}>\n${items}\n</${cmd}>`;
  } else if (cmd === "link") {
    const url = window.prompt("Masukkan URL tautan:", "https://");
    if (url === null) return;
    insert = `<a href="${url}">${selected || "teks tautan"}</a>`;
  } else if (HTML_EDITOR_TAGS[cmd]) {
    const { tag, placeholder } = HTML_EDITOR_TAGS[cmd];
    insert = `<${tag}>${selected || placeholder}</${tag}>`;
  } else {
    return;
  }

  textarea.setRangeText(insert, start, end, "end");
  textarea.focus();
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
};

const wireHtmlEditorField = (field) => {
  const wrapper = qs(`[data-html-editor-field="${field.key}"]`);
  if (!wrapper) return;
  const textarea = wrapper.querySelector("[data-html-editor-input]");
  const outlineBody = wrapper.querySelector("[data-html-editor-outline-body]");
  if (!textarea) return;

  wrapper.querySelectorAll("[data-html-cmd]").forEach((button) => {
    button.addEventListener("click", () =>
      applyHtmlEditorCommand(textarea, button.dataset.htmlCmd),
    );
  });

  const updateOutline = () => {
    if (!outlineBody) return;
    outlineBody.innerHTML = renderHeadingOutline(
      parseHeadingOutline(textarea.value),
    );
  };
  textarea.addEventListener("input", updateOutline);
  updateOutline();
};

const escapeHtml = (value) => String(value ?? "").replace(/"/g, "&quot;");

// Link Google Drive hasil "Share" (mis. .../file/d/FILE_ID/view?usp=sharing
// atau ...open?id=FILE_ID) tidak bisa langsung dipakai sebagai src gambar --
// perlu diubah ke format "uc?export=view&id=FILE_ID" supaya tampil sebagai
// gambar biasa. Dipakai setiap ada field tempel-link gambar (termasuk foto
// profil penulis) supaya admin tinggal tempel link Drive apa adanya.
const normalizeImageUrl = (url) => {
  const value = String(url || "").trim();
  if (!value || !/drive\.google\.com/.test(value)) return value;
  const fileMatch = value.match(/\/file\/d\/([^/]+)/);
  const idParamMatch = value.match(/[?&]id=([^&]+)/);
  const fileId = fileMatch ? fileMatch[1] : idParamMatch ? idParamMatch[1] : "";
  if (!fileId) return value;
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
};

qs("#entryForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const config = ADMIN_SCHEMA[state.currentSheet];
  const formData = new FormData(event.target);
  const payload = {};
  config.fields.forEach((field) => {
    payload[field.key] = formData.get(field.key) || "";
  });
  const submitBtn = qs("#formSubmitBtn");
  submitBtn.disabled = true;
  submitBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm"></span> Menyimpan...';
  try {
    if (state.editingId) {
      await HCApi.adminUpdate(
        state.currentSheet,
        state.editingId,
        payload,
        state.token,
      );
      showToast("Data berhasil diperbarui.");
    } else {
      await HCApi.adminCreate(state.currentSheet, payload, state.token);
      showToast("Data berhasil ditambahkan.");
    }
    bootstrap.Modal.getInstance(qs("#formModal")).hide();
    selectSheet(state.currentSheet);
  } catch (error) {
    showToast(error.message || "Gagal menyimpan data.", "danger");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="bi bi-check2"></i> Simpan';
  }
});

const handleToggleStatus = async (id) => {
  const row = state.rows.find((item) => String(item.id) === String(id));
  if (!row) return;
  const nextStatus = row.status === "Publish" ? "Draft" : "Publish";
  try {
    await HCApi.adminUpdate(
      state.currentSheet,
      id,
      { ...row, status: nextStatus },
      state.token,
    );
    showToast(
      nextStatus === "Publish" ? "Data dipublish." : "Data dijadikan draft.",
    );
    selectSheet(state.currentSheet);
  } catch (error) {
    showToast(error.message || "Gagal mengubah status.", "danger");
  }
};

const handleDelete = async (id) => {
  if (!confirm("Hapus data ini? Tindakan tidak bisa dibatalkan.")) return;
  try {
    await HCApi.adminDelete(state.currentSheet, id, state.token);
    showToast("Data berhasil dihapus.");
    selectSheet(state.currentSheet);
  } catch (error) {
    showToast(error.message || "Gagal menghapus data.", "danger");
  }
};

// === Panel Profil Saya (penulis & super_admin mengatur avatar sendiri) ===
const loadProfile = () => {
  const user = state.currentUser;
  qs("#profileAlert").classList.add("d-none");
  qs("#profileNama").value = user.nama || "";
  qs("#profileWhatsapp").value = user.whatsapp || "";
  qs("#profileFotoUrl").value = user.foto || "";
  qs("#profilePassword").value = "";
  qs("#profileAvatarPreview").src =
    user.foto || "assets/images/article-placeholder.svg";
  qs("#profileRoleBadge").textContent = roleLabel(user.role);
};

const wireProfileImageField = () => {
  const urlInput = qs("#profileFotoUrl");
  const fileInput = qs("#profileFotoUpload");
  const preview = qs("#profileAvatarPreview");
  if (!urlInput || !fileInput || !preview) return;
  urlInput.addEventListener("input", () => {
    preview.src = urlInput.value || "assets/images/article-placeholder.svg";
  });
  urlInput.addEventListener("change", () => {
    urlInput.value = normalizeImageUrl(urlInput.value);
    preview.src = urlInput.value || "assets/images/article-placeholder.svg";
  });
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (!file) return;
    preview.src = URL.createObjectURL(file);
    try {
      const uploadedUrl = await HCApi.adminUploadImage(file, state.token);
      urlInput.value = uploadedUrl;
      preview.src = uploadedUrl;
      showToast("Foto profil berhasil diunggah.");
    } catch (error) {
      showToast(error.message || "Gagal mengunggah foto.", "danger");
    }
  });
};

qs("#profileForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const alertBox = qs("#profileAlert");
  alertBox.classList.add("d-none");
  const submitBtn = qs("#profileSubmitBtn");
  submitBtn.disabled = true;
  submitBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm"></span> Menyimpan...';
  try {
    const password = qs("#profilePassword").value;
    const updatedUser = await HCApi.updateProfile(
      {
        nama: qs("#profileNama").value.trim(),
        whatsapp: qs("#profileWhatsapp").value.trim(),
        foto: normalizeImageUrl(qs("#profileFotoUrl").value.trim()),
        password: password || undefined,
      },
      state.token,
    );
    // Sinkronkan sesi lokal (localStorage) supaya nama/foto terbaru langsung
    // terpakai di navbar & tidak tertimpa balik oleh data lama saat reload.
    window.HCAuth.setSession({ token: state.token, user: updatedUser });
    state.currentUser = updatedUser;
    window.hcAuthRenderNav();
    showToast("Profil berhasil diperbarui.");
    loadProfile();
  } catch (error) {
    alertBox.textContent = error.message || "Gagal memperbarui profil.";
    alertBox.classList.remove("d-none");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="bi bi-check2"></i> Simpan Profil';
  }
});

// === Panel Pengguna (khusus super_admin) ===
const roleLabel = (role) => {
  if (role === "super_admin") return "Super Admin";
  if (role === "penulis") return "Pengelola Konten";
  return "Member";
};

const loadUsers = async () => {
  const tbody = qs("#usersTableBody");
  tbody.innerHTML =
    '<tr><td colspan="6" class="text-center py-5"><div class="spinner-border text-primary"></div></td></tr>';
  qs("#usersAlert").classList.add("d-none");
  try {
    state.users = await HCApi.usersList(state.token);
    renderUsersTable();
  } catch (error) {
    qs("#usersAlert").textContent = error.message || "Gagal memuat pengguna.";
    qs("#usersAlert").classList.remove("d-none");
    tbody.innerHTML =
      '<tr><td colspan="6" class="text-center py-4 lead-muted">Gagal memuat data.</td></tr>';
  }
};

const renderUsersTable = () => {
  const tbody = qs("#usersTableBody");
  if (!state.users.length) {
    tbody.innerHTML =
      '<tr><td colspan="6" class="text-center py-4 lead-muted">Belum ada pengguna.</td></tr>';
    return;
  }
  tbody.innerHTML = state.users
    .map(
      (user) => `
    <tr>
      <td>${escapeHtml(user.nama)}</td>
      <td>${escapeHtml(user.email)}</td>
      <td>${escapeHtml(user.whatsapp || "-")}</td>
      <td><span class="badge-soft">${roleLabel(user.role)}</span></td>
      <td><span class="badge-soft" style="${user.status === "nonaktif" ? "background:#fee2e2;color:#991b1b;border-color:#fecaca;" : ""}">${user.status}</span></td>
      <td class="text-end text-nowrap">
        <button class="btn btn-sm btn-outline-primary" type="button" data-edit-user="${user.id}"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" type="button" data-delete-user="${user.id}"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
  `,
    )
    .join("");
  tbody.querySelectorAll("[data-edit-user]").forEach((button) => {
    button.addEventListener("click", () =>
      openUserForm(
        state.users.find((user) => String(user.id) === button.dataset.editUser),
      ),
    );
  });
  tbody.querySelectorAll("[data-delete-user]").forEach((button) => {
    button.addEventListener("click", () =>
      handleDeleteUser(button.dataset.deleteUser),
    );
  });
};

const openUserForm = (user = null) => {
  state.editingUserId = user ? user.id : null;
  qs("#userFormModalTitle").textContent = user
    ? "Edit Pengguna"
    : "Tambah Pengguna";
  qs("#userFormAlert").classList.add("d-none");
  qs("#userFormId").value = user ? user.id : "";
  qs("#userFormNama").value = user ? user.nama : "";
  qs("#userFormEmail").value = user ? user.email : "";
  qs("#userFormEmail").disabled = Boolean(user); // email tidak bisa diubah setelah dibuat
  qs("#userFormWhatsapp").value = user ? user.whatsapp || "" : "";
  qs("#userFormRole").value = user ? user.role : "penulis";
  qs("#userFormPassword").value = "";
  qs("#userFormPassword").required = !user;
  qs("#userFormPasswordHint").textContent = user
    ? "Kosongkan jika tidak ingin mengubah password."
    : "Minimal 8 karakter.";
  new bootstrap.Modal(qs("#userFormModal")).show();
};

qs("#addUserBtn")?.addEventListener("click", () => openUserForm());

qs("#userEntryForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const alertBox = qs("#userFormAlert");
  alertBox.classList.add("d-none");
  const id = qs("#userFormId").value;
  const password = qs("#userFormPassword").value;
  const submitBtn = qs("#userFormSubmitBtn");
  submitBtn.disabled = true;
  submitBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm"></span> Menyimpan...';
  try {
    if (id) {
      await HCApi.usersUpdate(
        {
          id,
          nama: qs("#userFormNama").value.trim(),
          whatsapp: qs("#userFormWhatsapp").value.trim(),
          role: qs("#userFormRole").value,
          password: password || undefined,
        },
        state.token,
      );
      showToast("Pengguna berhasil diperbarui.");
    } else {
      await HCApi.usersCreate(
        {
          nama: qs("#userFormNama").value.trim(),
          email: qs("#userFormEmail").value.trim(),
          whatsapp: qs("#userFormWhatsapp").value.trim(),
          role: qs("#userFormRole").value,
          password,
        },
        state.token,
      );
      showToast("Akun berhasil dibuat.");
    }
    bootstrap.Modal.getInstance(qs("#userFormModal")).hide();
    loadUsers();
  } catch (error) {
    alertBox.textContent = error.message || "Gagal menyimpan pengguna.";
    alertBox.classList.remove("d-none");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="bi bi-check2"></i> Simpan';
  }
});

const handleDeleteUser = async (id) => {
  if (!confirm("Hapus pengguna ini? Tindakan tidak bisa dibatalkan.")) return;
  try {
    await HCApi.usersDelete(id, state.token);
    showToast("Pengguna berhasil dihapus.");
    loadUsers();
  } catch (error) {
    showToast(error.message || "Gagal menghapus pengguna.", "danger");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initLogin();
  wireProfileImageField();

  qs("#addBtn").addEventListener("click", () => {
    if (!state.currentSheet) return;
    openForm(ADMIN_SCHEMA[state.currentSheet]);
  });

  qs("#searchInput").addEventListener("input", (event) => {
    if (!state.currentSheet) return;
    renderTableBody(ADMIN_SCHEMA[state.currentSheet], event.target.value);
  });

  qs("#sidebarToggle").addEventListener("click", () =>
    qs("#adminSidebar").classList.toggle("show"),
  );

  qs("#logoutBtn").addEventListener("click", () => {
    window.HCAuth.logout();
    window.location.href = "login.html";
  });
});
