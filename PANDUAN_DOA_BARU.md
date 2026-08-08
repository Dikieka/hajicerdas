# Panduan Update Halaman Kumpulan Doa

Fitur baru: halaman `doa.html` sekarang punya tab per ibadah (Tawaf, Sa'i,
Arafah, dst — bisa ditambah sendiri), dengan dua mode tampilan:

- **Tawaf, Sa'i** (mode "putaran"): dipandu per putaran, ada indikator
  angka **sticky** di bawah tab (tidak bisa diklik, cuma indikator) dengan
  garis penghubung antar nomor yang menggambarkan alur urutan, berubah
  warna + tanda centang kalau putaran itu sudah dibaca/dilewati. Tombol
  **Lanjut** sengaja diletakkan di **akhir bacaan tiap putaran** (bukan
  mengambang/sticky) supaya tidak tertekan tanpa sengaja. Tombol **Ulangi
  dari awal** baru muncul setelah SEMUA putaran selesai dibaca.
- **Arafah, dst.** (mode "list"): daftar kartu doa biasa dengan dropdown +
  chip filter kategori doa (mis. "Doa Ortu", "Umum"); di layar mobile,
  chip disembunyikan dan hanya dropdown yang tampil supaya tidak berjejal.

> Catatan Sa'i: datanya masih boleh tetap di sheet **DoaList** (kategori
> `Sa'i`, dengan `kategori_doa` berpola "Putaran 1".."Putaran 7" — sudah
> begitu adanya). `doa.js` otomatis menyusunnya jadi tampilan per-putaran
> seperti Tawaf. **Yang perlu Anda ubah manual di sheet DoaKategori:**
> ganti kolom `tipe` pada baris Sa'i dari `list` menjadi `putaran`. Baris
> `kategori_doa` yang bukan pola "Putaran N" (mis. "Doa Tambahan") otomatis
> dikumpulkan jadi 1 langkah tambahan di akhir putaran ke-7.

Semua isi bacaan (Arab, latin, arti) **diambil dari Google Sheets**, bukan
hardcode di JavaScript. File JS hanya punya fallback darurat kalau sheet
kosong (pola yang sama seperti sheet-sheet lain di situs ini).

## 1. Tambahkan 3 sheet baru ke Google Sheets Anda

Cara termudah: buka file **`HajiCerdas_Database_updated.xlsx`** yang saya
sediakan, lalu copy 3 sheet berikut ke Google Sheets database Anda yang
sudah ada (klik kanan tab sheet → Copy to → Existing spreadsheet):

- **DoaKategori** — daftar tab yang muncul di halaman (nama, urutan, dan
  `tipe`: isi `putaran` untuk mode seperti Tawaf, atau `list` untuk mode
  seperti Sa'i/Arafah). Sudah saya isi 3 baris contoh: Tawaf, Sa'i, Arafah.
- **DoaPutaran** — isi bacaan tiap putaran Tawaf (7 putaran × 2 bagian =
  14 baris), sudah saya isi lengkap dari dokumen THAWAF yang Anda kirim.
  Kalau mau menambah ibadah lain yang juga berputaran (mis. Sa'i 7 kali
  lintasan), tinggal tambah baris baru dengan `kategori` sesuai nama tab.
- **DoaList** — isi doa untuk tab mode "list" (Sa'i, Arafah). Saya isi
  contoh awal (5 baris) — silakan lengkapi sendiri, cukup tambah baris,
  tidak perlu ubah kode.

Alternatif: kalau tidak mau copy-paste manual, buka **Extensions → Apps
Script** di Google Sheets Anda, tempel isi `appscript/Code.gs` yang sudah
saya update, lalu jalankan fungsi `setupSheets()` sekali dari editor Apps
Script — ini otomatis membuat 3 sheet baru dengan header yang benar
(datanya tetap perlu Anda isi/copy manual dari file xlsx).

## 2. Update Apps Script (backend)

Ganti isi `appscript/Code.gs` di Apps Script project Anda dengan file
`appscript/Code.gs` pada paket ini (sudah menambahkan 3 sheet baru +
3 endpoint: `doakategori`, `doaputaran`, `doalist`). Setelah itu:

1. Klik **Deploy → Manage deployments**.
2. Edit deployment yang sedang aktif, pilih versi **New version**, lalu
   **Deploy** lagi (URL `.../exec` tetap sama, tidak perlu ganti di
   `assets/js/api.js`).

## 3. Upload file frontend

Upload/replace file-file berikut ke server Anda:

- `doa.html` (halaman baru, menggantikan yang lama)
- `assets/css/doa.css` (baru)
- `assets/js/doa.js` (baru)
- `assets/js/api.js` (ditambah 3 fungsi: `getDoaKategori`, `getDoaPutaran`,
  `getDoaList` — fungsi lama tidak diubah/dihapus)

## 4. Menambah tab ibadah baru (mis. "Wukuf", "Jumrah")

Tinggal tambah baris di sheet **DoaKategori**, tanpa sentuh kode:

| id | nama | urutan | tipe | status |
|---|---|---|---|---|
| kat-04 | Wukuf | 4 | list | Publish |

Kalau ibadahnya juga berbentuk "putaran/tahapan berurutan", pakai
`tipe = putaran` dan isi datanya di sheet **DoaPutaran** dengan kolom
`kategori` = nama tab tersebut.

## Catatan progres baca

Progres "sudah dibaca/dilewati" per putaran disimpan di **localStorage**
browser pengunjung (per kategori), jadi kalau reload halaman progresnya
tetap ada, tapi khusus di perangkat/browser itu saja. Ada tombol "Ulangi
dari awal" untuk reset manual.
