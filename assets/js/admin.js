// Daftar kategori bersama, sinkron dengan sheet "Kategori" + kategori khusus
// Pengalaman (Haji, Tips Hemat) supaya Artikel dan Pengalaman Jamaah memakai
// pilihan kategori yang sama persis di form admin.
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
      { key: "isi", label: "Isi Artikel (HTML)", type: "textarea", rows: 8 },
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
      { key: "isi", label: "Isi Lengkap (HTML)", type: "textarea", rows: 5 },
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
  Infografis: {
    label: "Infografis",
    icon: "bi-image",
    group: "Panduan",
    fields: [
      { key: "judul", label: "Judul", type: "text", required: true },
      { key: "kategori", label: "Kategori", type: "text" },
      {
        key: "gambar",
        label: "Gambar Infografis",
        type: "image",
        hint: "Unggah gambar infografis (JPG/PNG). Gambar ini yang akan tampil dan bisa diunduh pengunjung di halaman Infografis.",
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
  Direktori: {
    label: "Direktori Lokasi (Peta)",
    icon: "bi-geo-alt",
    group: "Info Praktis",
    fields: [
      { key: "nama", label: "Nama", type: "text", required: true },
      {
        key: "kategori",
        label: "Kategori",
        type: "select",
        options: ["Peta"],
        hint: "Saat ini hanya dipakai untuk lokasi di peta.html (Transportasi/Hotel/Kuliner/Belanja kini artikel biasa, lihat menu Artikel).",
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
      { key: "kategori", label: "Kategori", type: "text" },
      { key: "deskripsi", label: "Deskripsi", type: "textarea", rows: 2 },
      { key: "file", label: "Link File", type: "text" },
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
      { key: "kategori", label: "Kategori", type: "text" },
      {
        key: "youtube",
        label: "Link Embed YouTube",
        type: "text",
        hint: "Contoh: https://www.youtube.com/embed/VIDEO_ID",
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
};

const state = {
  password: "",
  currentSheet: null,
  rows: [],
  editingId: null,
};

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
const initLogin = () => {
  const savedUrl = localStorage.getItem("hc-admin-url");
  const savedPassword = sessionStorage.getItem("hc-admin-password");
  if (savedUrl) qs("#adminUrl").value = savedUrl;
  if (savedUrl && savedPassword) {
    window.HC_CONFIG.appsScriptUrl = savedUrl;
    HCApi.adminLogin(savedPassword)
      .then(() => {
        state.password = savedPassword;
        tryEnterApp();
      })
      .catch((error) => {
        console.warn("Sesi tersimpan tidak valid lagi:", error.message);
        sessionStorage.removeItem("hc-admin-password");
      });
  }

  qs("#loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const url = qs("#adminUrl").value.trim();
    const password = qs("#adminPassword").value.trim();
    const errorBox = qs("#loginError");
    const submitBtn = event.target.querySelector('button[type="submit"]');
    errorBox.classList.add("d-none");
    submitBtn.disabled = true;
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm"></span> Memeriksa...';
    try {
      window.HC_CONFIG.appsScriptUrl = url;
      await HCApi.adminLogin(password);
      localStorage.setItem("hc-admin-url", url);
      sessionStorage.setItem("hc-admin-password", password);
      state.password = password;
      tryEnterApp();
    } catch (error) {
      console.error("Login gagal:", error);
      errorBox.textContent =
        error.message || "Login gagal. Periksa URL dan password.";
      errorBox.classList.remove("d-none");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
  });
};

const tryEnterApp = () => {
  qs("#loginScreen").classList.add("d-none");
  qs("#adminApp").classList.remove("d-none");
  try {
    buildSidebar();
  } catch (error) {
    console.error("Gagal membangun menu admin:", error);
    showAlert(
      "Berhasil login, tetapi menu konten gagal dimuat. Coba muat ulang halaman.",
    );
  }
};

const buildSidebar = () => {
  const sidebar = qs("#adminSidebar");
  const groups = {};
  Object.entries(ADMIN_SCHEMA).forEach(([sheet, config]) => {
    groups[config.group] = groups[config.group] || [];
    groups[config.group].push({ sheet, ...config });
  });
  sidebar.innerHTML = Object.entries(groups)
    .map(
      ([group, items]) => `
    <div class="admin-sidebar-group-title">${group}</div>
    ${items.map((item) => `<button type="button" data-sheet="${item.sheet}"><i class="bi ${item.icon}"></i> ${item.label}</button>`).join("")}
  `,
    )
    .join("");
  sidebar.querySelectorAll("button[data-sheet]").forEach((button) => {
    button.addEventListener("click", () => {
      sidebar
        .querySelectorAll("button[data-sheet]")
        .forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      selectSheet(button.dataset.sheet);
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
  renderTableHead(config);
  qs("#tableBody").innerHTML =
    `<tr><td colspan="${config.fields.length + 1}" class="text-center py-5"><div class="spinner-border text-primary"></div></td></tr>`;
  try {
    state.rows = await HCApi.adminList(sheet, state.password);
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
  new bootstrap.Modal(qs("#formModal")).show();
};

const renderFieldInput = (field, row) => {
  const value = row ? (row[field.key] ?? "") : "";
  const requiredAttr = field.required ? "required" : "";
  const hint = field.hint ? `<div class="form-text">${field.hint}</div>` : "";
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
        <div class="form-text">Tempel link gambar dari internet, atau unggah file langsung dari perangkat.</div>
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
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (!file) return;
    preview.src = URL.createObjectURL(file);
    try {
      const uploadedUrl = await HCApi.adminUploadImage(file, state.password);
      urlInput.value = uploadedUrl;
      preview.src = uploadedUrl;
      showToast("Gambar berhasil diunggah.");
    } catch (error) {
      showToast(error.message || "Gagal mengunggah gambar.", "danger");
    }
  });
};

const escapeHtml = (value) => String(value ?? "").replace(/"/g, "&quot;");

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
        state.password,
      );
      showToast("Data berhasil diperbarui.");
    } else {
      await HCApi.adminCreate(state.currentSheet, payload, state.password);
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
      state.password,
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
    await HCApi.adminDelete(state.currentSheet, id, state.password);
    showToast("Data berhasil dihapus.");
    selectSheet(state.currentSheet);
  } catch (error) {
    showToast(error.message || "Gagal menghapus data.", "danger");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initLogin();

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
    sessionStorage.removeItem("hc-admin-password");
    location.reload();
  });
});
