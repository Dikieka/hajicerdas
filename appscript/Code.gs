// === Sesi login multi-role (super admin / penulis / member) ===
// Ini SATU-SATUNYA sistem login di seluruh situs (dulu ada 2: sistem
// password admin tunggal di sini + sistem role di Users. Sekarang sistem
// password tunggal sudah dihapus total). Semua login -- publik (navbar,
// login.html) maupun Admin Panel (admin.html) -- lewat action
// user_login/user_register di sheet Users, dibedakan lewat kolom "role".
// Sama seperti password admin di atas, "kunci" untuk menandatangani sesi
// login (token) TIDAK ditulis langsung di kode, tapi disimpan di Script
// Properties supaya tidak ikut kelihatan/ter-copy kalau file ini dibagikan.
//
// CARA SET (cukup sekali):
//   1. Buka project Apps Script ini di script.google.com
//   2. Di dropdown pilihan fungsi pilih "setSessionSecret"
//   3. Isi SECRET_BARU di fungsi setSessionSecret() paling bawah file ini
//      dengan string acak yang panjang (misal 32+ karakter bebas).
//   4. Klik Run sekali, lalu kosongkan lagi nilainya.
function getSessionSecret_() {
  const secret =
    PropertiesService.getScriptProperties().getProperty("SESSION_SECRET");
  if (!secret) {
    throw new Error(
      "Session secret belum diset. Jalankan fungsi setSessionSecret() sekali dari editor Apps Script.",
    );
  }
  return secret;
}

function setSessionSecret() {
  const SECRET_BARU = ""; // <-- isi sementara dengan string acak panjang, lalu Run, lalu kosongkan lagi
  if (!SECRET_BARU || SECRET_BARU.length < 20) {
    throw new Error(
      "Isi SECRET_BARU dengan string acak minimal 20 karakter sebelum Run.",
    );
  }
  PropertiesService.getScriptProperties().setProperty(
    "SESSION_SECRET",
    SECRET_BARU,
  );
  Logger.log("Session secret berhasil disimpan.");
}

// Hash password dengan salt acak (bukan plain text) memakai SHA-256 bawaan
// Apps Script. Format tersimpan: "<salt>$<hex digest>".
function hashPassword_(password, salt) {
  const usedSalt = salt || Utilities.getUuid();
  const digestBytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    usedSalt + ":" + password,
  );
  const hex = digestBytes
    .map(function (b) {
      const v = (b < 0 ? b + 256 : b).toString(16);
      return v.length === 1 ? "0" + v : v;
    })
    .join("");
  return usedSalt + "$" + hex;
}

function verifyPassword_(password, stored) {
  if (!stored || String(stored).indexOf("$") === -1) return false;
  const salt = String(stored).split("$")[0];
  return hashPassword_(password, salt) === stored;
}

// Token sesi sederhana ala JWT: base64url(payload JSON) + "." +
// base64url(HMAC-SHA256(payload, SESSION_SECRET)). Tidak terenkripsi (jangan
// taruh data rahasia di payload), tapi tidak bisa dipalsukan tanpa tahu
// SESSION_SECRET, dan punya masa berlaku (exp) supaya sesi lama otomatis basi.
function signToken_(payloadObj) {
  const payloadB64 = Utilities.base64EncodeWebSafe(
    JSON.stringify(payloadObj),
  ).replace(/=+$/, "");
  const signatureBytes = Utilities.computeHmacSha256Signature(
    payloadB64,
    getSessionSecret_(),
  );
  const signatureB64 = Utilities.base64EncodeWebSafe(signatureBytes).replace(
    /=+$/,
    "",
  );
  return payloadB64 + "." + signatureB64;
}

function verifyToken_(token) {
  if (!token || typeof token !== "string" || token.indexOf(".") === -1) {
    throw new Error("Token tidak valid. Silakan login kembali.");
  }
  const parts = token.split(".");
  const payloadB64 = parts[0];
  const signatureB64 = parts[1];
  const expectedSigBytes = Utilities.computeHmacSha256Signature(
    payloadB64,
    getSessionSecret_(),
  );
  const expectedSigB64 = Utilities.base64EncodeWebSafe(
    expectedSigBytes,
  ).replace(/=+$/, "");
  if (expectedSigB64 !== signatureB64) {
    throw new Error("Token tidak valid atau telah diubah.");
  }
  let payload;
  try {
    payload = JSON.parse(
      Utilities.newBlob(
        Utilities.base64DecodeWebSafe(payloadB64),
      ).getDataAsString(),
    );
  } catch (e) {
    throw new Error("Token tidak valid.");
  }
  if (!payload.exp || Date.now() > payload.exp) {
    throw new Error("Sesi telah berakhir, silakan login kembali.");
  }
  return payload;
}

const SHEETS = {
  artikel: "Artikel",
  pengalaman: "Pengalaman",
  kategori: "Kategori",
  istilah: "Istilah",
  layanan: "Layanan",
  faq: "FAQ",
  peta: "Peta",
  download: "Download",
  video: "Video",
  panduanWaktu: "PanduanWaktu",
  persiapan: "Persiapan",
  persiapanTimeline: "PersiapanTimeline",
  tataCara: "TataCara",
  doaKategori: "DoaKategori",
  doaPutaran: "DoaPutaran",
  doaList: "DoaList",
  users: "Users",
  petugasBadal: "PetugasBadal",
};

// Sheet "Users" SENGAJA tidak dimasukkan ke MANAGED_SHEETS (generic CRUD
// admin_list/create/update/delete di bawah), supaya password_hash tidak
// pernah ikut terkirim ke frontend lewat aksi generik itu. Semua akses ke
// sheet Users lewat aksi khusus (user_register, user_login, users_list,
// users_create, users_update, users_delete) di bagian bawah file ini.
const USERS_HEADERS = [
  "id",
  "nama",
  "email",
  "whatsapp",
  "password_hash",
  "role", // super_admin | penulis | member
  "status", // aktif | nonaktif
  "tanggal_daftar",
  "foto", // URL foto profil / avatar penulis, tampil di seluruh kartu & detail artikel
];

// Sheet "Pesanan" untuk menyimpan order dari member dashboard
const PESANAN_HEADERS = [
  "id",
  "user_id",
  "layanan", // badal_umroh | wakaf_quran | panitia_haji
  "nama_pemesan",
  "whatsapp_pemesan",
  "data_pesanan", // JSON string berisi field tambahan
  "status", // pending | diproses | selesai | ditolak
  "catatan_admin",
  "tanggal_pesan",
  "petugas_badal_id", // diisi admin: id petugas dari sheet PetugasBadal (khusus layanan badal_umroh)
  "tanggal_pelaksanaan_hijri", // diisi admin: tanggal pelaksanaan badal, format bebas mis. "12 Rabiul Awal 1448 H"
];

// Sheet "PetugasBadal" untuk data petugas pelaksana jasa Badal Umroh, dipakai
// untuk mengisi nama & tanda tangan pada sertifikat Badal Umroh.
const PETUGAS_BADAL_HEADERS = ["id", "nama", "ttd", "status"];

// Sheet-sheet yang boleh dikelola lewat Admin Panel (create/update/delete generik).
const MANAGED_SHEETS = {
  Artikel: [
    "id",
    "judul",
    "slug",
    "kategori",
    "gambar",
    "ringkasan",
    "isi",
    "penulis",
    "tanggal",
    "sumber_referensi",
    "views",
    "status",
  ],
  Pengalaman: [
    "id",
    "nama",
    "asal",
    "judul",
    "kategori",
    "pengalaman",
    "tips",
    "tanggal",
    "like",
    "status",
  ],
  Kategori: ["id", "nama", "slug", "icon"],
  Istilah: [
    "id",
    "judul",
    "slug",
    "kategori",
    "ringkasan",
    "isi",
    "sumber_referensi",
    "status",
  ],
  Layanan: [
    "id",
    "halaman",
    "eyebrow",
    "judul",
    "ringkasan",
    "isi",
    "sumber_referensi",
    "status",
  ],
  FAQ: ["id", "pertanyaan", "jawaban", "kategori", "status"],
  Peta: [
    "id",
    "nama",
    "kategori",
    "lokasi",
    "deskripsi",
    "rating",
    "jarak",
    "estimasi",
    "harga",
    "maps",
    "gambar",
    "status",
  ],
  Download: [
    "id",
    "judul",
    "deskripsi",
    "kategori",
    "file",
    "gambar",
    "status",
  ],
  Video: [
    "id",
    "judul",
    "kategori",
    "tipe",
    "platform",
    "youtube",
    "deskripsi",
    "status",
  ],
  Pesanan: [
    "id",
    "user_id",
    "layanan",
    "nama_pemesan",
    "whatsapp_pemesan",
    "data_pesanan",
    "status",
    "catatan_admin",
    "tanggal_pesan",
    "petugas_badal_id",
    "tanggal_pelaksanaan_hijri",
  ],
  PetugasBadal: ["id", "nama", "ttd", "status"],
  PanduanWaktu: ["id", "aktivitas", "durasi", "catatan", "status"],
  Persiapan: ["id", "kategori", "item", "status"],
  PersiapanTimeline: ["id", "waktu", "deskripsi", "status"],
  TataCara: [
    "id",
    "jenis",
    "urutan",
    "judul",
    "deskripsi",
    "waktu",
    "doa_dzikir",
    "catatan",
    "status",
  ],
  // Daftar tab halaman Kumpulan Doa (mis. Tawaf, Sa'i, Arafah). "tipe"
  // menentukan tampilan: "putaran" = mode baca per putaran dengan indikator
  // angka + tombol Lanjut (dipakai Tawaf), "list" = daftar kartu doa biasa
  // dengan dropdown filter kategori doa (dipakai Sa'i, Arafah, dst).
  DoaKategori: ["id", "nama", "urutan", "tipe", "status"],
  // Isi bacaan untuk tab bertipe "putaran". Satu baris = satu bagian
  // bacaan (mis. "Doa Menuju Rukun Yamani") dalam satu putaran tertentu.
  DoaPutaran: [
    "id",
    "kategori",
    "putaran",
    "urutan",
    "judul_bagian",
    "keterangan",
    "arab",
    "latin",
    "arti",
    "status",
  ],
  // Isi bacaan untuk tab bertipe "list". "kategori_doa" dipakai untuk
  // dropdown filter (mis. "Doa Ortu", "Doa Pribadi"). Boleh dikosongkan.
  DoaList: [
    "id",
    "kategori",
    "kategori_doa",
    "judul",
    "arab",
    "latin",
    "arti",
    "status",
  ],
};

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const action = (params.action || "artikel").toLowerCase();
  try {
    if (action === "artikel")
      return jsonResponse({
        success: true,
        data: withAuthorPhotoList_(getPublishedRows(SHEETS.artikel)),
      });
    if (action === "detail")
      return jsonResponse({
        success: true,
        data: withAuthorPhoto_(getArticleDetail(params.slug)),
      });
    if (action === "pengalaman")
      return jsonResponse({
        success: true,
        data: getPublishedRows(SHEETS.pengalaman),
      });
    if (action === "kategori")
      return jsonResponse({ success: true, data: getRows(SHEETS.kategori) });
    if (action === "istilah")
      return jsonResponse({
        success: true,
        data: getPublishedRows(SHEETS.istilah),
      });
    if (action === "layanan")
      return jsonResponse({
        success: true,
        data: filterByHalaman(getPublishedRows(SHEETS.layanan), params.halaman),
      });
    if (action === "faq")
      return jsonResponse({
        success: true,
        data: getPublishedRows(SHEETS.faq),
      });
    if (action === "peta")
      return jsonResponse({
        success: true,
        data: filterByKategori(getPublishedRows(SHEETS.peta), params.kategori),
      });
    if (action === "download")
      return jsonResponse({
        success: true,
        data: getPublishedRows(SHEETS.download),
      });
    if (action === "video")
      return jsonResponse({
        success: true,
        data: getPublishedRows(SHEETS.video),
      });
    if (action === "panduanwaktu")
      return jsonResponse({
        success: true,
        data: getPublishedRows(SHEETS.panduanWaktu),
      });
    if (action === "persiapan")
      return jsonResponse({
        success: true,
        data: getPublishedRows(SHEETS.persiapan),
      });
    if (action === "persiapantimeline")
      return jsonResponse({
        success: true,
        data: getPublishedRows(SHEETS.persiapanTimeline),
      });
    if (action === "tatacara")
      return jsonResponse({
        success: true,
        data: filterByJenis(getPublishedRows(SHEETS.tataCara), params.jenis),
      });
    if (action === "doakategori")
      return jsonResponse({
        success: true,
        data: getPublishedRows(SHEETS.doaKategori).sort(function (a, b) {
          return Number(a.urutan || 0) - Number(b.urutan || 0);
        }),
      });
    if (action === "doaputaran")
      return jsonResponse({
        success: true,
        data: filterByKategori(
          getPublishedRows(SHEETS.doaPutaran),
          params.kategori,
        ).sort(function (a, b) {
          return (
            Number(a.putaran || 0) - Number(b.putaran || 0) ||
            Number(a.urutan || 0) - Number(b.urutan || 0)
          );
        }),
      });
    if (action === "doalist")
      return jsonResponse({
        success: true,
        data: filterByKategoriDoa(
          filterByKategori(getPublishedRows(SHEETS.doaList), params.kategori),
          params.kategori_doa,
        ),
      });
    if (action === "sertifikat_verify")
      return jsonResponse({
        success: true,
        data: getSertifikatPublicData(params.id),
      });
    if (action === "petugasbadal")
      return jsonResponse({
        success: true,
        data: getPublishedRows(SHEETS.petugasBadal),
      });

    // Admin_list & admin_sheets sengaja TIDAK ada di sini (GET) lagi —
    // dulu password ikut kelihatan di URL (?password=...), yang bisa
    // nyangkut di riwayat browser / log. Sekarang keduanya cuma bisa
    // diakses lewat POST, lihat doPost() di bawah.
    return jsonResponse(
      { success: false, message: "Action tidak dikenal." },
      400,
    );
  } catch (error) {
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}

function doPost(e) {
  try {
    const payload = JSON.parse(
      e && e.postData ? e.postData.contents || "{}" : "{}",
    );
    const action = (payload.action || "").toLowerCase();

    if (action === "pengalaman") {
      appendExperience(payload);
      return jsonResponse({
        success: true,
        message: "Pengalaman berhasil dikirim sebagai Draft.",
      });
    }
    if (action === "like_pengalaman") {
      const result = likeExperience(payload.id);
      return jsonResponse({
        success: true,
        message: "Like berhasil dicatat.",
        data: result,
        like: result.like,
      });
    }
    if (action === "unlike_pengalaman") {
      const result = unlikeExperience(payload.id);
      return jsonResponse({
        success: true,
        message: "Like berhasil dibatalkan.",
        data: result,
        like: result.like,
      });
    }
    if (action === "view_artikel") {
      const result = incrementArticleViews(payload.slug);
      return jsonResponse({
        success: true,
        message: "Views berhasil dicatat.",
        data: result,
        views: result.views,
      });
    }
    if (action === "admin_list") {
      requireRole_(payload, ["super_admin", "penulis"]);
      const sheet = requireManagedSheet(payload.sheet);
      return jsonResponse({
        success: true,
        data: getRows(sheet),
        headers: MANAGED_SHEETS[sheet],
      });
    }
    if (action === "admin_sheets") {
      requireRole_(payload, ["super_admin", "penulis"]);
      return jsonResponse({ success: true, data: MANAGED_SHEETS });
    }
    if (action === "create") {
      requireRole_(payload, ["super_admin", "penulis"]);
      const sheet = requireManagedSheet(payload.sheet);
      const row = createRow(sheet, payload.data || {});
      return jsonResponse({
        success: true,
        message: "Data berhasil ditambahkan.",
        data: row,
      });
    }
    if (action === "update") {
      requireRole_(payload, ["super_admin", "penulis"]);
      const sheet = requireManagedSheet(payload.sheet);
      const row = updateRow(sheet, payload.id, payload.data || {});
      return jsonResponse({
        success: true,
        message: "Data berhasil diperbarui.",
        data: row,
      });
    }
    if (action === "delete") {
      requireRole_(payload, ["super_admin", "penulis"]);
      const sheet = requireManagedSheet(payload.sheet);
      deleteRow(sheet, payload.id);
      return jsonResponse({ success: true, message: "Data berhasil dihapus." });
    }
    if (action === "uploadimage") {
      requireRole_(payload, ["super_admin", "penulis"]);
      const url = uploadImage(
        payload.filename,
        payload.mimeType,
        payload.base64,
      );
      return jsonResponse({ success: true, url: url });
    }
    // === Login/registrasi multi-role (navbar "Masuk", halaman daftar member) ===
    if (action === "user_register") {
      const user = registerUser_(payload);
      const session = issueSession_(user);
      return jsonResponse({
        success: true,
        message: "Pendaftaran berhasil.",
        token: session.token,
        user: session.user,
      });
    }
    if (action === "user_login") {
      const user = loginUser_(payload);
      const session = issueSession_(user);
      return jsonResponse({
        success: true,
        message: "Login berhasil.",
        token: session.token,
        user: session.user,
      });
    }
    if (action === "user_me") {
      const claims = verifyToken_(payload.token);
      const user = getUserById_(claims.id);
      if (!user || String(user.status) !== "aktif") {
        throw new Error("Sesi tidak valid, silakan login kembali.");
      }
      return jsonResponse({ success: true, user: publicUser_(user) });
    }
    // Update profil sendiri (nama, whatsapp, foto/avatar) -- dipakai oleh
    // menu "Profil Saya" di Admin Panel supaya penulis bisa mengatur foto
    // profilnya sendiri tanpa perlu akses menu "Pengguna" (khusus
    // super_admin). Beda dengan users_update: aksi ini hanya boleh mengubah
    // data akun milik diri sendiri (tidak menerima "id" dari payload sama
    // sekali, role diambil dari token), dan tidak bisa mengubah role/status.
    if (action === "user_update_profile") {
      const actor = requireRole_(payload, [
        "super_admin",
        "penulis",
        "member",
      ]);
      const sheet = getUsersSheet_();
      const headers = findHeaderRow(sheet);
      const rowIndex = findRowIndexById(sheet, headers, actor.id);
      if (rowIndex === -1) throw new Error("Pengguna tidak ditemukan.");
      if (payload.nama) {
        sheet
          .getRange(rowIndex, headers.indexOf("nama") + 1)
          .setValue(sanitize(payload.nama));
      }
      if (payload.whatsapp !== undefined) {
        sheet
          .getRange(rowIndex, headers.indexOf("whatsapp") + 1)
          .setValue(sanitizeCellValue(sanitize(payload.whatsapp)));
      }
      if (payload.foto !== undefined) {
        sheet
          .getRange(rowIndex, headers.indexOf("foto") + 1)
          .setValue(sanitizeCellValue(String(payload.foto || "").trim()));
      }
      if (payload.password) {
        if (String(payload.password).length < 8) {
          throw new Error("Password minimal 8 karakter.");
        }
        sheet
          .getRange(rowIndex, headers.indexOf("password_hash") + 1)
          .setValue(hashPassword_(payload.password));
      }
      return jsonResponse({
        success: true,
        message: "Profil berhasil diperbarui.",
        user: publicUser_(getUserById_(actor.id)),
      });
    }
    // === Manajemen pengguna (khusus role super_admin) ===
    if (action === "users_list") {
      requireRole_(payload, ["super_admin"]);
      return jsonResponse({
        success: true,
        data: getRows(SHEETS.users).map(publicUser_),
      });
    }
    if (action === "users_create") {
      requireRole_(payload, ["super_admin"]);
      const role =
        ["super_admin", "penulis", "member"].indexOf(payload.role) !== -1
          ? payload.role
          : "penulis";
      const nama = sanitize(payload.nama);
      const email = String(payload.email || "")
        .trim()
        .toLowerCase();
      const whatsapp = sanitize(payload.whatsapp);
      const password = String(payload.password || "");
      if (!nama || !email || !password) {
        throw new Error("Nama, email, dan password wajib diisi.");
      }
      if (!isValidEmail_(email)) throw new Error("Format email tidak valid.");
      if (password.length < 8) throw new Error("Password minimal 8 karakter.");
      if (getUserByEmail_(email)) throw new Error("Email sudah terdaftar.");
      const sheet = getUsersSheet_();
      const id = "usr-" + new Date().getTime();
      sheet.appendRow([
        id,
        nama,
        email,
        sanitizeCellValue(whatsapp),
        hashPassword_(password),
        role,
        "aktif",
        new Date(),
      ]);
      return jsonResponse({
        success: true,
        message: "Akun berhasil dibuat.",
        data: publicUser_(getUserByEmail_(email)),
      });
    }
    if (action === "users_update") {
      const actor = requireRole_(payload, ["super_admin"]);
      const sheet = getUsersSheet_();
      const headers = findHeaderRow(sheet);
      const rowIndex = findRowIndexById(sheet, headers, payload.id);
      if (rowIndex === -1) throw new Error("Pengguna tidak ditemukan.");
      if (payload.role !== undefined) {
        if (["super_admin", "penulis", "member"].indexOf(payload.role) === -1) {
          throw new Error("Role tidak dikenal.");
        }
        if (
          String(payload.id) === String(actor.id) &&
          payload.role !== "super_admin"
        ) {
          throw new Error("Tidak bisa mengubah role akun sendiri.");
        }
        sheet
          .getRange(rowIndex, headers.indexOf("role") + 1)
          .setValue(payload.role);
      }
      if (payload.status !== undefined) {
        if (["aktif", "nonaktif"].indexOf(payload.status) === -1) {
          throw new Error("Status tidak dikenal.");
        }
        if (String(payload.id) === String(actor.id)) {
          throw new Error("Tidak bisa menonaktifkan akun sendiri.");
        }
        sheet
          .getRange(rowIndex, headers.indexOf("status") + 1)
          .setValue(payload.status);
      }
      if (payload.nama) {
        sheet
          .getRange(rowIndex, headers.indexOf("nama") + 1)
          .setValue(sanitize(payload.nama));
      }
      if (payload.whatsapp !== undefined) {
        sheet
          .getRange(rowIndex, headers.indexOf("whatsapp") + 1)
          .setValue(sanitizeCellValue(sanitize(payload.whatsapp)));
      }
      if (payload.password) {
        if (String(payload.password).length < 8) {
          throw new Error("Password minimal 8 karakter.");
        }
        sheet
          .getRange(rowIndex, headers.indexOf("password_hash") + 1)
          .setValue(hashPassword_(payload.password));
      }
      return jsonResponse({
        success: true,
        message: "Pengguna berhasil diperbarui.",
      });
    }
    if (action === "users_delete") {
      const actor = requireRole_(payload, ["super_admin"]);
      if (String(payload.id) === String(actor.id)) {
        throw new Error("Tidak bisa menghapus akun sendiri.");
      }
      const rows = getRows(SHEETS.users);
      const target = rows.find(function (r) {
        return String(r.id) === String(payload.id);
      });
      if (!target) throw new Error("Pengguna tidak ditemukan.");
      if (target.role === "super_admin") {
        const remaining = rows.filter(function (r) {
          return (
            r.role === "super_admin" && String(r.id) !== String(payload.id)
          );
        });
        if (remaining.length === 0) {
          throw new Error("Tidak bisa menghapus super admin terakhir.");
        }
      }
      deleteRow(SHEETS.users, payload.id);
      return jsonResponse({
        success: true,
        message: "Pengguna berhasil dihapus.",
      });
    }
    // === Pesanan (order dari member dashboard) ===
    if (action === "pesanan_list") {
      requireRole_(payload, ["super_admin", "penulis", "member"]);
      const all = getRows("Pesanan");
      if (payload.user_id) {
        const filtered = all.filter(function (r) {
          return String(r.user_id) === String(payload.user_id);
        });
        return jsonResponse({ success: true, data: filtered });
      }
      return jsonResponse({ success: true, data: all });
    }
    if (action === "pesanan_create") {
      requireRole_(payload, ["super_admin", "penulis", "member"]);
      const sheet = getSpreadsheet().getSheetByName("Pesanan");
      if (!sheet) throw new Error("Sheet Pesanan tidak ditemukan.");
      const id = "psn-" + new Date().getTime();
      sheet.appendRow([
        id,
        String(payload.user_id || ""),
        String(payload.layanan || ""),
        sanitizeCellValue(sanitize(payload.nama_pemesan)),
        sanitizeCellValue(sanitize(payload.whatsapp_pemesan)),
        sanitizeCellValue(sanitize(JSON.stringify(payload.data_pesanan || {}))),
        "pending",
        "",
        new Date(),
      ]);
      return jsonResponse({
        success: true,
        message: "Pesanan berhasil dibuat.",
        data: { id: id },
      });
    }
    if (action === "pesanan_update") {
      requireRole_(payload, ["super_admin", "penulis"]);
      const sheet = getSpreadsheet().getSheetByName("Pesanan");
      if (!sheet) throw new Error("Sheet Pesanan tidak ditemukan.");
      const headers = findHeaderRow(sheet);
      const rowIndex = findRowIndexById(sheet, headers, payload.id);
      if (rowIndex === -1) throw new Error("Pesanan tidak ditemukan.");
      if (payload.status !== undefined) {
        const statusCol = headers.indexOf("status");
        if (
          ["pending", "diproses", "selesai", "ditolak"].indexOf(
            payload.status,
          ) === -1
        ) {
          throw new Error("Status tidak valid.");
        }
        sheet.getRange(rowIndex, statusCol + 1).setValue(payload.status);
      }
      if (payload.catatan_admin !== undefined) {
        const catatanCol = headers.indexOf("catatan_admin");
        sheet
          .getRange(rowIndex, catatanCol + 1)
          .setValue(sanitizeCellValue(sanitize(payload.catatan_admin)));
      }
      // Petugas pelaksana & tanggal pelaksanaan (khusus badal_umroh), dipakai
      // untuk mengisi sertifikat Badal Umroh begitu pesanan ditandai selesai.
      if (payload.petugas_badal_id !== undefined) {
        const col = headers.indexOf("petugas_badal_id");
        if (col > -1) {
          sheet
            .getRange(rowIndex, col + 1)
            .setValue(sanitizeCellValue(sanitize(payload.petugas_badal_id)));
        }
      }
      if (payload.tanggal_pelaksanaan_hijri !== undefined) {
        const col = headers.indexOf("tanggal_pelaksanaan_hijri");
        if (col > -1) {
          sheet
            .getRange(rowIndex, col + 1)
            .setValue(
              sanitizeCellValue(sanitize(payload.tanggal_pelaksanaan_hijri)),
            );
        }
      }
      return jsonResponse({
        success: true,
        message: "Pesanan berhasil diperbarui.",
      });
    }
    if (action === "oembed_proxy") {
      const platform = (payload.platform || "").toLowerCase();
      const url = String(payload.url || "").trim();
      if (!url) throw new Error("URL tidak disertakan.");
      if (platform === "instagram") {
        const result = proxyInstagramOembed(url);
        return jsonResponse({ success: true, data: result });
      }
      if (platform === "tiktok") {
        const result = proxyTiktokOembed(url);
        return jsonResponse({ success: true, data: result });
      }
      throw new Error("Platform oEmbed tidak dikenal: " + platform);
    }
    return jsonResponse(
      { success: false, message: "Action POST tidak dikenal." },
      400,
    );
  } catch (error) {
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}

function requireManagedSheet(sheetName) {
  if (!MANAGED_SHEETS[sheetName]) {
    throw new Error(
      "Sheet '" + sheetName + "' tidak dikelola lewat Admin Panel.",
    );
  }
  return sheetName;
}

function getSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getRows(sheetName) {
  const sheet = getSpreadsheet().getSheetByName(sheetName);
  if (!sheet) throw new Error("Sheet " + sheetName + " tidak ditemukan.");
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(function (header) {
    return String(header).trim();
  });
  return values
    .slice(1)
    .filter(function (row) {
      return row.some(function (cell) {
        return cell !== "";
      });
    })
    .map(function (row) {
      return headers.reduce(function (object, header, index) {
        object[header] = formatCell(row[index]);
        return object;
      }, {});
    });
}

function getPublishedRows(sheetName) {
  return getRows(sheetName).filter(function (row) {
    return row.status === "Publish";
  });
}

// Data publik untuk verifikasi sertifikat Badal Umroh lewat scan QR.
// Sengaja hanya mengembalikan field terbatas (tanpa whatsapp/email) supaya
// aman diakses publik tanpa login. Hanya pesanan badal_umroh berstatus
// "selesai" yang dianggap valid untuk diverifikasi.
function getSertifikatPublicData(id) {
  if (!id) return null;
  const rows = getRows("Pesanan");
  const row = rows.find(function (r) {
    return String(r.id) === String(id);
  });
  if (!row) return null;
  if (row.layanan !== "badal_umroh" || row.status !== "selesai") return null;

  let extra = {};
  try {
    extra = JSON.parse(row.data_pesanan || "{}");
  } catch (e) {
    extra = {};
  }

  // Cari data petugas pelaksana (nama & tanda tangan) yang ditugaskan admin
  // untuk pesanan ini, dipakai untuk mengisi sertifikat.
  let petugasNama = "";
  let petugasTtd = "";
  if (row.petugas_badal_id) {
    const petugas = getRows(SHEETS.petugasBadal).find(function (p) {
      return String(p.id) === String(row.petugas_badal_id);
    });
    if (petugas) {
      petugasNama = petugas.nama || "";
      petugasTtd = petugas.ttd || "";
    }
  }

  return {
    id: row.id,
    kode: "HC-BDL-" + String(row.id).replace(/^psn-/, ""),
    nama_pemesan: row.nama_pemesan,
    untuk: extra.untuk || "",
    tanggal_pesan: row.tanggal_pesan,
    status: row.status,
    petugas_nama: petugasNama,
    petugas_ttd: petugasTtd,
    tanggal_pelaksanaan_hijri: row.tanggal_pelaksanaan_hijri || "",
    pelaksana_badal: "HajiCerdas",
  };
}

function filterByKategori(rows, kategori) {
  if (!kategori) return rows;
  return rows.filter(function (row) {
    return (
      String(row.kategori || "").toLowerCase() ===
      String(kategori).toLowerCase()
    );
  });
}

function filterByHalaman(rows, halaman) {
  if (!halaman) return rows;
  return rows.filter(function (row) {
    return (
      String(row.halaman || "").toLowerCase() === String(halaman).toLowerCase()
    );
  });
}

function filterByKategoriDoa(rows, kategoriDoa) {
  if (!kategoriDoa) return rows;
  return rows.filter(function (row) {
    return (
      String(row.kategori_doa || "").toLowerCase() ===
      String(kategoriDoa).toLowerCase()
    );
  });
}

// Menormalkan nilai kolom "jenis" sebelum dibandingkan: trim spasi,
// lowercase, dan buang semua varian tanda kutip tunggal/apostrof (' ’ ‘ `).
// BUGFIX: baris "Tamattu" di sheet TataCara sempat diisi manual sebagai
// "Tamattu'" (menyalin ejaan dari dokumen sumber, mis. "Haji Tamattu'"),
// sehingga tidak pernah cocok dengan query jenis="Tamattu" yang dikirim
// tata-cara.js — akibatnya panel Tamattu tidak pernah menerima data baru
// dari Apps Script (Ifrad/Qiran tetap normal karena ejaannya tidak
// mengandung apostrof). Normalisasi ini membuat "Tamattu", "Tamattu'",
// " tamattu " semua dianggap sama.
function normalizeJenisValue_(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/['’‘`]/g, "");
}

function filterByJenis(rows, jenis) {
  if (!jenis) return rows;
  const target = normalizeJenisValue_(jenis);
  return rows.filter(function (row) {
    return normalizeJenisValue_(row.jenis) === target;
  });
}

function getArticleDetail(slug) {
  const article = getPublishedRows(SHEETS.artikel).find(function (row) {
    return row.slug === slug;
  });
  if (!article) throw new Error("Artikel tidak ditemukan atau belum publish.");
  return article;
}

function appendExperience(payload) {
  const sheet = getSpreadsheet().getSheetByName(SHEETS.pengalaman);
  if (!sheet) throw new Error("Sheet Pengalaman tidak ditemukan.");
  const id = "exp-" + new Date().getTime();
  sheet.appendRow([
    id,
    sanitizeCellValue(sanitize(payload.nama)),
    sanitizeCellValue(sanitize(payload.asal)),
    sanitizeCellValue(sanitize(payload.judul)),
    sanitizeCellValue(sanitize(payload.kategori)),
    sanitizeCellValue(sanitize(payload.pengalaman)),
    sanitizeCellValue(sanitize(payload.tips)),
    sanitizeCellValue(sanitize(payload.foto || "")),
    new Date(),
    0,
    "Draft",
  ]);
}

function likeExperience(id) {
  return updateExperienceLike(id, 1);
}

function unlikeExperience(id) {
  return updateExperienceLike(id, -1);
}

function updateExperienceLike(id, delta) {
  const sheet = getSpreadsheet().getSheetByName(SHEETS.pengalaman);
  if (!sheet) throw new Error("Sheet Pengalaman tidak ditemukan.");
  const headers = findHeaderRow(sheet);
  const rowIndex = findRowIndexById(sheet, headers, id);
  if (rowIndex === -1) throw new Error("Pengalaman tidak ditemukan.");
  const likeColumn = headers.indexOf("like");
  if (likeColumn === -1) throw new Error("Kolom like tidak ditemukan.");
  const statusColumn = headers.indexOf("status");
  if (statusColumn !== -1) {
    const status = sheet.getRange(rowIndex, statusColumn + 1).getValue();
    if (String(status) !== "Publish")
      throw new Error("Pengalaman belum publish.");
  }
  const cell = sheet.getRange(rowIndex, likeColumn + 1);
  const current = Number(cell.getValue()) || 0;
  const next = Math.max(0, current + Number(delta || 0));
  cell.setValue(next);
  return { id: id, like: next };
}

// Menambah 1 setiap kali artikel dibuka (dipanggil dari halaman detail.html,
// dibatasi 1x per slug per sesi browser lewat sessionStorage di frontend
// supaya refresh berulang tidak menggelembungkan angka populer secara tidak wajar).
function incrementArticleViews(slug) {
  if (!slug) throw new Error("Slug artikel tidak valid.");
  const sheet = getSpreadsheet().getSheetByName(SHEETS.artikel);
  if (!sheet) throw new Error("Sheet Artikel tidak ditemukan.");
  const headers = findHeaderRow(sheet);
  const slugColumn = headers.indexOf("slug");
  const viewsColumn = headers.indexOf("views");
  if (slugColumn === -1) throw new Error("Kolom slug tidak ditemukan.");
  if (viewsColumn === -1)
    throw new Error(
      "Kolom views belum ada di sheet Artikel. Jalankan migrateArtikelColumns() sekali dari editor Apps Script.",
    );
  const values = sheet.getDataRange().getValues();
  let rowIndex = -1;
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][slugColumn]) === String(slug)) {
      rowIndex = i + 1; // 1-indexed sheet row
      break;
    }
  }
  if (rowIndex === -1) throw new Error("Artikel tidak ditemukan.");
  const cell = sheet.getRange(rowIndex, viewsColumn + 1);
  const next = (Number(cell.getValue()) || 0) + 1;
  cell.setValue(next);
  return { slug: slug, views: next };
}

// Jalankan SEKALI secara manual dari editor Apps Script (pilih fungsi ini,
// klik Run) kalau sheet "Artikel" sudah ada sebelumnya dan belum punya
// kolom "views". Fungsi ini menambahkan kolom yang belum ada di
// akhir header tanpa mengubah data lain, lalu mengisi "views" kosong = 0.
function migrateArtikelColumns() {
  const sheet = getSpreadsheet().getSheetByName(SHEETS.artikel);
  if (!sheet) throw new Error("Sheet Artikel tidak ditemukan.");
  const headers = findHeaderRow(sheet);
  const required = MANAGED_SHEETS.Artikel;
  const missing = required.filter(function (header) {
    return headers.indexOf(header) === -1;
  });
  missing.forEach(function (header) {
    sheet.getRange(1, sheet.getLastColumn() + 1).setValue(header);
  });
  if (missing.length) {
    SpreadsheetApp.flush();
    const newHeaders = findHeaderRow(sheet);
    const viewsColumn = newHeaders.indexOf("views");
    const lastRow = sheet.getLastRow();
    if (viewsColumn !== -1 && lastRow > 1) {
      const range = sheet.getRange(2, viewsColumn + 1, lastRow - 1, 1);
      const values = range.getValues().map(function (row) {
        return [row[0] === "" || row[0] === null ? 0 : row[0]];
      });
      range.setValues(values);
    }
  }
  return { added: missing };
}

// Jalankan SEKALI secara manual dari editor Apps Script (pilih fungsi ini,
// klik Run) kalau sheet "Video" sudah ada sebelumnya dan belum punya kolom
// "tipe" (Video/Short) dan "platform" (YouTube/TikTok/Instagram). Fungsi ini
// menambahkan kolom yang belum ada di akhir header tanpa mengubah data lain,
// lalu mengisi baris lama dengan tipe="Video" dan platform="YouTube" supaya
// video-video yang sudah ada tetap tampil seperti sebelumnya.
function migrateVideoColumns() {
  const sheet = getSpreadsheet().getSheetByName(SHEETS.video);
  if (!sheet) throw new Error("Sheet Video tidak ditemukan.");
  const headers = findHeaderRow(sheet);
  const required = MANAGED_SHEETS.Video;
  const missing = required.filter(function (header) {
    return headers.indexOf(header) === -1;
  });
  missing.forEach(function (header) {
    sheet.getRange(1, sheet.getLastColumn() + 1).setValue(header);
  });
  if (missing.length) {
    SpreadsheetApp.flush();
    const newHeaders = findHeaderRow(sheet);
    const lastRow = sheet.getLastRow();
    const tipeColumn = newHeaders.indexOf("tipe");
    const platformColumn = newHeaders.indexOf("platform");
    if (tipeColumn !== -1 && lastRow > 1) {
      const range = sheet.getRange(2, tipeColumn + 1, lastRow - 1, 1);
      const values = range.getValues().map(function (row) {
        return [row[0] === "" || row[0] === null ? "Video" : row[0]];
      });
      range.setValues(values);
    }
    if (platformColumn !== -1 && lastRow > 1) {
      const range = sheet.getRange(2, platformColumn + 1, lastRow - 1, 1);
      const values = range.getValues().map(function (row) {
        return [row[0] === "" || row[0] === null ? "YouTube" : row[0]];
      });
      range.setValues(values);
    }
  }
  return { added: missing };
}

// === Generic CRUD dipakai oleh Admin Panel ===

function findHeaderRow(sheet) {
  return sheet
    .getRange(1, 1, 1, sheet.getLastColumn())
    .getValues()[0]
    .map(function (header) {
      return String(header).trim();
    });
}

function findRowIndexById(sheet, headers, id) {
  const idColumn = headers.indexOf("id");
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idColumn]) === String(id)) return i + 1; // 1-indexed sheet row
  }
  return -1;
}

function createRow(sheetName, data) {
  const sheet = getSpreadsheet().getSheetByName(sheetName);
  if (!sheet) throw new Error("Sheet " + sheetName + " tidak ditemukan.");
  const headers = findHeaderRow(sheet);
  const prefix = sheetName.substring(0, 3).toLowerCase();
  const id =
    data.id && String(data.id).trim()
      ? String(data.id).trim()
      : prefix + "-" + new Date().getTime();
  const row = headers.map(function (header) {
    if (header === "id") return id;
    if (header === "status" && !data.status) return "Draft";
    if (header === "views" && (data.views === undefined || data.views === ""))
      return 0;
    return data[header] !== undefined ? sanitizeCellValue(data[header]) : "";
  });
  sheet.appendRow(row);
  return headers.reduce(function (obj, header, index) {
    obj[header] = row[index];
    return obj;
  }, {});
}

function updateRow(sheetName, id, data) {
  const sheet = getSpreadsheet().getSheetByName(sheetName);
  if (!sheet) throw new Error("Sheet " + sheetName + " tidak ditemukan.");
  const headers = findHeaderRow(sheet);
  const rowIndex = findRowIndexById(sheet, headers, id);
  if (rowIndex === -1)
    throw new Error(
      "Data dengan id '" + id + "' tidak ditemukan di " + sheetName + ".",
    );
  const current = sheet.getRange(rowIndex, 1, 1, headers.length).getValues()[0];
  const updated = headers.map(function (header, index) {
    if (header === "id") return current[index];
    return data[header] !== undefined
      ? sanitizeCellValue(data[header])
      : current[index];
  });
  sheet.getRange(rowIndex, 1, 1, headers.length).setValues([updated]);
  return headers.reduce(function (obj, header, index) {
    obj[header] = updated[index];
    return obj;
  }, {});
}

function deleteRow(sheetName, id) {
  const sheet = getSpreadsheet().getSheetByName(sheetName);
  if (!sheet) throw new Error("Sheet " + sheetName + " tidak ditemukan.");
  const headers = findHeaderRow(sheet);
  const rowIndex = findRowIndexById(sheet, headers, id);
  if (rowIndex === -1)
    throw new Error(
      "Data dengan id '" + id + "' tidak ditemukan di " + sheetName + ".",
    );
  sheet.deleteRow(rowIndex);
}

// Simpan gambar yang diunggah (base64) ke folder Drive "HajiCerdas Uploads"
// dan kembalikan URL yang bisa dipakai langsung sebagai src gambar.
function uploadImage(filename, mimeType, base64Data) {
  if (!base64Data) throw new Error("Data gambar kosong.");
  const folder = getOrCreateUploadFolder();
  const bytes = Utilities.base64Decode(base64Data);
  const blob = Utilities.newBlob(
    bytes,
    mimeType || "image/jpeg",
    filename || "upload.jpg",
  );
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return "https://drive.google.com/uc?export=view&id=" + file.getId();
}

function getOrCreateUploadFolder() {
  const name = "HajiCerdas Uploads";
  const folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(name);
}

// Proxy oEmbed Instagram: Apps Script server-to-server tidak punya
// masalah CORS, jadi bisa ambil thumbnail_url dari Instagram lewat
// endpoint oEmbed publik mereka (tanpa autentikasi).
function proxyInstagramOembed(sourceUrl) {
  const response = UrlFetchApp.fetch(
    "https://www.instagram.com/oembed?url=" + encodeURIComponent(sourceUrl),
    { muteHttpExceptions: true },
  );
  const code = response.getResponseCode();
  if (code < 200 || code >= 300) {
    throw new Error("Instagram oEmbed gagal: HTTP " + code);
  }
  const data = JSON.parse(response.getContentText());
  return {
    thumbnail_url: data.thumbnail_url || "",
    title: data.title || "",
    author_name: data.author_name || "",
  };
}

// Proxy oEmbed TikTok: sama seperti Instagram, panggil dari server
// supaya tidak terhalang CORS browser.
function proxyTiktokOembed(sourceUrl) {
  const response = UrlFetchApp.fetch(
    "https://www.tiktok.com/oembed?url=" + encodeURIComponent(sourceUrl),
    { muteHttpExceptions: true },
  );
  const code = response.getResponseCode();
  if (code < 200 || code >= 300) {
    throw new Error("TikTok oEmbed gagal: HTTP " + code);
  }
  const data = JSON.parse(response.getContentText());
  return {
    thumbnail_url: data.thumbnail_url || "",
    title: data.title || "",
    author_name: data.author_name || "",
  };
}

function sanitize(value) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .trim();
}

// Cegah "formula injection": kalau ada isian (dari admin panel MAUPUN
// form publik "Kirim Pengalaman") yang diawali =, +, -, atau @, Google
// Sheets bisa menganggapnya rumus aktif saat sheet dibuka manual —
// berpotensi menjalankan hal yang tidak diinginkan (mis. IMPORTXML ke
// server luar). Diberi awalan tanda kutip satu supaya dipaksa jadi teks
// biasa (tanda kutipnya sendiri tidak ikut tampil di sel).
function sanitizeCellValue(value) {
  if (typeof value !== "string") return value;
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function formatCell(value) {
  if (Object.prototype.toString.call(value) === "[object Date]") {
    return Utilities.formatDate(
      value,
      Session.getScriptTimeZone(),
      "yyyy-MM-dd",
    );
  }
  return value;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

// Jalankan SEKALI secara manual dari editor Apps Script untuk membuat akun
// super_admin PERTAMA (sesudah ini, akun super_admin/penulis lain dibuat
// lewat menu "Pengguna" di Admin Panel, bukan lewat fungsi ini lagi).
// Isi NAMA/EMAIL/PASSWORD_BARU di bawah dulu, pilih fungsi seedSuperAdmin
// di dropdown editor, klik Run, lalu kosongkan lagi PASSWORD_BARU.
function seedSuperAdmin() {
  const NAMA = ""; // <-- isi nama super admin
  const EMAIL = ""; // <-- isi email login super admin
  const PASSWORD_BARU = ""; // <-- isi sementara, lalu Run, lalu kosongkan lagi
  if (!NAMA || !EMAIL || !PASSWORD_BARU) {
    throw new Error("Isi NAMA, EMAIL, dan PASSWORD_BARU sebelum Run.");
  }
  if (!isValidEmail_(EMAIL)) throw new Error("Format EMAIL tidak valid.");
  if (PASSWORD_BARU.length < 8) {
    throw new Error("PASSWORD_BARU minimal 8 karakter.");
  }
  const spreadsheet = getSpreadsheet();
  createSheetIfMissing(spreadsheet, SHEETS.users, USERS_HEADERS);
  if (getUserByEmail_(EMAIL)) {
    throw new Error("Email tersebut sudah terdaftar di sheet Users.");
  }
  const sheet = getUsersSheet_();
  const id = "usr-" + new Date().getTime();
  sheet.appendRow([
    id,
    NAMA,
    EMAIL.trim().toLowerCase(),
    "",
    hashPassword_(PASSWORD_BARU),
    "super_admin",
    "aktif",
    new Date(),
  ]);
  Logger.log("Akun super_admin berhasil dibuat untuk " + EMAIL);
}

function setupSheets() {
  const spreadsheet = getSpreadsheet();
  Object.keys(MANAGED_SHEETS).forEach(function (name) {
    createSheetIfMissing(spreadsheet, name, MANAGED_SHEETS[name]);
  });
  createSheetIfMissing(spreadsheet, SHEETS.users, USERS_HEADERS);
}

// === Users: helper baca/tulis + logika login/registrasi/role ===

function getUsersSheet_() {
  const sheet = getSpreadsheet().getSheetByName(SHEETS.users);
  if (!sheet) {
    throw new Error(
      "Sheet Users belum dibuat. Jalankan setupSheets() sekali dari editor Apps Script.",
    );
  }
  return sheet;
}

function getUserByEmail_(email) {
  const sheet = getUsersSheet_();
  const headers = findHeaderRow(sheet);
  const emailCol = headers.indexOf("email");
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (
      String(values[i][emailCol]).toLowerCase() === String(email).toLowerCase()
    ) {
      return headers.reduce(function (obj, header, index) {
        obj[header] = values[i][index];
        return obj;
      }, {});
    }
  }
  return null;
}

function getUserById_(id) {
  const sheet = getUsersSheet_();
  const headers = findHeaderRow(sheet);
  const rowIndex = findRowIndexById(sheet, headers, id);
  if (rowIndex === -1) return null;
  const values = sheet.getRange(rowIndex, 1, 1, headers.length).getValues()[0];
  return headers.reduce(function (obj, header, index) {
    obj[header] = values[index];
    return obj;
  }, {});
}

// Versi user yang aman dikirim ke frontend (tanpa password_hash).
function publicUser_(user) {
  return {
    id: user.id,
    nama: user.nama,
    email: user.email,
    whatsapp: user.whatsapp,
    role: user.role,
    status: user.status,
    tanggal_daftar: formatCell(user.tanggal_daftar),
    foto: user.foto || "",
  };
}

// Peta nama penulis (huruf kecil, dirapikan spasinya) -> URL foto profil,
// dipakai supaya avatar penulis otomatis tampil di kartu/detail artikel
// hanya dengan mencocokkan kolom "penulis" (teks bebas) di sheet Artikel
// dengan kolom "nama" akun penulis/super_admin di sheet Users. Kalau nama
// penulis tidak cocok dengan akun manapun (mis. "Redaksi HajiCerdas"),
// artikel tetap tampil seperti biasa hanya tanpa foto (avatar inisial).
function getAuthorPhotoMap_() {
  const map = {};
  getRows(SHEETS.users).forEach(function (user) {
    if (!user.foto) return;
    const key = String(user.nama || "")
      .trim()
      .toLowerCase();
    if (key) map[key] = user.foto;
  });
  return map;
}

function withAuthorPhoto_(article) {
  if (!article) return article;
  const map = getAuthorPhotoMap_();
  const key = String(article.penulis || "")
    .trim()
    .toLowerCase();
  return Object.assign({}, article, { penulis_foto: map[key] || "" });
}

function withAuthorPhotoList_(articles) {
  const map = getAuthorPhotoMap_();
  return articles.map(function (article) {
    const key = String(article.penulis || "")
      .trim()
      .toLowerCase();
    return Object.assign({}, article, { penulis_foto: map[key] || "" });
  });
}

function issueSession_(user) {
  const token = signToken_({
    id: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 30, // berlaku 30 hari
  });
  return { token: token, user: publicUser_(user) };
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));
}

// Pendaftaran mandiri oleh pengunjung situs -> SELALU jadi role "member"
// (tidak bisa daftar sendiri jadi penulis/super admin lewat form publik).
function registerUser_(payload) {
  const nama = sanitize(payload.nama);
  const email = String(payload.email || "")
    .trim()
    .toLowerCase();
  const whatsapp = sanitize(payload.whatsapp);
  const password = String(payload.password || "");

  if (!nama || !email || !password) {
    throw new Error("Nama, email, dan password wajib diisi.");
  }
  if (!isValidEmail_(email)) throw new Error("Format email tidak valid.");
  if (password.length < 8) throw new Error("Password minimal 8 karakter.");

  const cache = CacheService.getScriptCache();
  const throttleKey = "register_throttle_" + email;
  if (cache.get(throttleKey)) {
    throw new Error("Mohon tunggu sebentar sebelum mencoba mendaftar lagi.");
  }

  if (getUserByEmail_(email)) {
    throw new Error("Email sudah terdaftar. Silakan login.");
  }

  cache.put(throttleKey, "1", 30);
  const sheet = getUsersSheet_();
  const id = "usr-" + new Date().getTime();
  sheet.appendRow([
    id,
    nama,
    email,
    sanitizeCellValue(whatsapp),
    hashPassword_(password),
    "member",
    "aktif",
    new Date(),
  ]);
  return getUserByEmail_(email);
}

function loginUser_(payload) {
  const email = String(payload.email || "")
    .trim()
    .toLowerCase();
  const password = String(payload.password || "");
  if (!email || !password) throw new Error("Email dan password wajib diisi.");

  const cache = CacheService.getScriptCache();
  const lockKey = "login_lockout_" + email;
  if (cache.get(lockKey)) {
    throw new Error(
      "Terlalu banyak percobaan login yang gagal. Coba lagi dalam beberapa menit.",
    );
  }

  const user = getUserByEmail_(email);
  const failKey = "login_fail_" + email;
  if (!user || !verifyPassword_(password, user.password_hash)) {
    const current = Number(cache.get(failKey) || 0) + 1;
    cache.put(failKey, String(current), 600);
    if (current >= 8) cache.put(lockKey, "1", 900);
    throw new Error("Email atau password salah.");
  }
  if (String(user.status) !== "aktif") {
    throw new Error("Akun ini sedang dinonaktifkan. Hubungi admin.");
  }
  cache.remove(failKey);
  return user;
}

// Dipakai untuk melindungi aksi admin panel (konten & manajemen pengguna).
// Satu-satunya cara: token sesi dari login berbasis role (Users) --
// tidak ada lagi fallback password admin tunggal.
function requireRole_(payload, allowedRoles) {
  if (!payload || !payload.token) {
    throw new Error("Autentikasi diperlukan. Silakan login kembali.");
  }
  const claims = verifyToken_(payload.token);
  const user = getUserById_(claims.id);
  if (!user || String(user.status) !== "aktif") {
    throw new Error("Sesi tidak valid, silakan login kembali.");
  }
  if (allowedRoles.indexOf(user.role) === -1) {
    throw new Error("Anda tidak memiliki akses untuk aksi ini.");
  }
  return user;
}

function createSheetIfMissing(spreadsheet, name, headers) {
  const sheet =
    spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
  if (sheet.getLastRow() === 0) sheet.appendRow(headers);
  sheet
    .getRange(1, 1, 1, headers.length)
    .setFontWeight("bold")
    .setBackground("#ccfbf1");
}
