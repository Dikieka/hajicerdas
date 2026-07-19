// GANTI password ini sebelum deploy ke produksi.
const ADMIN_PASSWORD = "hajicerdas-admin";

const SHEETS = {
  artikel: "Artikel",
  pengalaman: "Pengalaman",
  kategori: "Kategori",
  istilah: "Istilah",
  ensiklopedia: "Ensiklopedia",
  faq: "FAQ",
  direktori: "Direktori",
  jadwalShalat: "JadwalShalat",
  download: "Download",
  video: "Video",
  panduanWaktu: "PanduanWaktu",
  persiapan: "Persiapan",
  persiapanTimeline: "PersiapanTimeline",
  infografis: "Infografis",
  kurs: "Kurs",
  tataCara: "TataCara",
  doa: "Doa",
};

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
    "foto",
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
  Ensiklopedia: [
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
  Direktori: [
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
  Download: ["id", "judul", "kategori", "deskripsi", "file", "status"],
  Video: ["id", "judul", "kategori", "youtube", "deskripsi", "status"],
  PanduanWaktu: ["id", "aktivitas", "durasi", "catatan", "status"],
  Persiapan: ["id", "kategori", "item", "status"],
  PersiapanTimeline: ["id", "waktu", "deskripsi", "status"],
  Infografis: ["id", "judul", "kategori", "gambar", "deskripsi", "status"],
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
  Doa: ["id", "jenis", "judul", "arab", "latin", "arti", "status"],
};

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const action = (params.action || "artikel").toLowerCase();
  try {
    if (action === "artikel")
      return jsonResponse({
        success: true,
        data: getPublishedRows(SHEETS.artikel),
      });
    if (action === "detail")
      return jsonResponse({
        success: true,
        data: getArticleDetail(params.slug),
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
    if (action === "ensiklopedia")
      return jsonResponse({
        success: true,
        data: filterByHalaman(
          getPublishedRows(SHEETS.ensiklopedia),
          params.halaman,
        ),
      });
    if (action === "faq")
      return jsonResponse({
        success: true,
        data: getPublishedRows(SHEETS.faq),
      });
    if (action === "direktori")
      return jsonResponse({
        success: true,
        data: filterByKategori(
          getPublishedRows(SHEETS.direktori),
          params.kategori,
        ),
      });
    if (action === "jadwalshalat")
      return jsonResponse({
        success: true,
        data: getPublishedRows(SHEETS.jadwalShalat),
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
    if (action === "infografis")
      return jsonResponse({
        success: true,
        data: getPublishedRows(SHEETS.infografis),
      });
    if (action === "kurs")
      return jsonResponse({
        success: true,
        data: getPublishedRows(SHEETS.kurs),
      });
    if (action === "tatacara")
      return jsonResponse({
        success: true,
        data: filterByJenis(getPublishedRows(SHEETS.tataCara), params.jenis),
      });
    if (action === "doa")
      return jsonResponse({
        success: true,
        data: filterByJenis(getPublishedRows(SHEETS.doa), params.jenis),
      });

    // === Admin: lihat SEMUA baris (termasuk Draft) untuk satu sheet ===
    if (action === "admin_list") {
      requireAdmin(params.password);
      const sheet = requireManagedSheet(params.sheet);
      return jsonResponse({
        success: true,
        data: getRows(sheet),
        headers: MANAGED_SHEETS[sheet],
      });
    }
    if (action === "admin_sheets") {
      requireAdmin(params.password);
      return jsonResponse({ success: true, data: MANAGED_SHEETS });
    }
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
    if (action === "login") {
      requireAdmin(payload.password);
      return jsonResponse({ success: true, message: "Login berhasil." });
    }
    if (action === "create") {
      requireAdmin(payload.password);
      const sheet = requireManagedSheet(payload.sheet);
      const row = createRow(sheet, payload.data || {});
      return jsonResponse({
        success: true,
        message: "Data berhasil ditambahkan.",
        data: row,
      });
    }
    if (action === "update") {
      requireAdmin(payload.password);
      const sheet = requireManagedSheet(payload.sheet);
      const row = updateRow(sheet, payload.id, payload.data || {});
      return jsonResponse({
        success: true,
        message: "Data berhasil diperbarui.",
        data: row,
      });
    }
    if (action === "delete") {
      requireAdmin(payload.password);
      const sheet = requireManagedSheet(payload.sheet);
      deleteRow(sheet, payload.id);
      return jsonResponse({ success: true, message: "Data berhasil dihapus." });
    }
    if (action === "uploadimage") {
      requireAdmin(payload.password);
      const url = uploadImage(
        payload.filename,
        payload.mimeType,
        payload.base64,
      );
      return jsonResponse({ success: true, url: url });
    }
    return jsonResponse(
      { success: false, message: "Action POST tidak dikenal." },
      400,
    );
  } catch (error) {
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}

function requireAdmin(password) {
  if (String(password || "") !== ADMIN_PASSWORD) {
    throw new Error("Password admin salah atau belum diisi.");
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
      String(row.halaman || "").toLowerCase() ===
      String(halaman).toLowerCase()
    );
  });
}

function filterByJenis(rows, jenis) {
  if (!jenis) return rows;
  return rows.filter(function (row) {
    return (
      String(row.jenis || "").toLowerCase() === String(jenis).toLowerCase()
    );
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
    sanitize(payload.nama),
    sanitize(payload.asal),
    sanitize(payload.judul),
    sanitize(payload.kategori),
    sanitize(payload.pengalaman),
    sanitize(payload.tips),
    sanitize(payload.foto || ""),
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
    return data[header] !== undefined ? data[header] : "";
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
    return data[header] !== undefined ? data[header] : current[index];
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

function sanitize(value) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .trim();
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

function setupSheets() {
  const spreadsheet = getSpreadsheet();
  Object.keys(MANAGED_SHEETS).forEach(function (name) {
    createSheetIfMissing(spreadsheet, name, MANAGED_SHEETS[name]);
  });
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
