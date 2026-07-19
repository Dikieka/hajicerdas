# HajiCerdas

HajiCerdas adalah website statis untuk portal informasi Haji dan Umrah Indonesia. Frontend dibuat dengan HTML5, CSS3, Bootstrap 5, Bootstrap Icons, Poppins, dan Vanilla JavaScript ES6. Backend sederhana memakai Google Spreadsheet dan Google Apps Script tanpa MySQL.

Versi terbaru juga menambahkan modul **Knowledge Center** untuk pengetahuan umum, kamus istilah, waktu Indonesia-Arab Saudi, jadwal shalat, panduan durasi ibadah, infografis, panduan persiapan, budget planner, konverter mata uang, transportasi, hotel, kuliner, belanja, peta, download center, video, dan FAQ 200 pertanyaan.

## Struktur Project

```text
hajicerdas/
  index.html
  artikel.html
  detail.html
  kategori.html
  pengalaman.html
  tentang.html
  kontak.html
  kirim.html
  faq.html
  pengetahuan.html
  istilah.html
  istilah-detail.html
  waktu.html
  jadwal-shalat.html     (redirect ke waktu.html, digabung sejak update ini)
  panduan-waktu.html
  infografis.html
  persiapan.html
  budget.html
  kurs.html
  peta.html
  download.html          (redirect ke infografis.html, digabung sejak update ini)
  video.html
  404.html
  assets/css/style.css
  assets/css/responsive.css
  assets/css/animation.css
  assets/js/app.js
  assets/js/api.js
  assets/js/search.js
  assets/js/darkmode.js
  assets/js/article.js
  assets/js/content-data.js
  assets/js/knowledge.js
  assets/js/tools.js
  assets/js/faq-data.js
  assets/images/hero-haji.svg
  assets/images/article-placeholder.svg
  assets/icons/favicon.svg
  appscript/Code.gs
  appscript/appsscript.json
  robots.txt
  sitemap.xml
  manifest.json
  README.md
```

## Cara Membuat Google Spreadsheet

1. Buka Google Sheets dan buat spreadsheet baru bernama `HajiCerdas Database`.
2. Buat sheet utama: `Artikel`, `Pengalaman`, dan `Kategori`.
3. Untuk Knowledge Center, siapkan juga sheet opsional: `Istilah`, `FAQ`, `Direktori`, `JadwalShalat`, `Download`, `Video`, dan `Ensiklopedia`.
4. Isi header `Artikel`: `id`, `judul`, `slug`, `kategori`, `gambar`, `ringkasan`, `isi`, `penulis`, `tanggal`, `status`.
5. Isi header `Pengalaman`: `id`, `nama`, `asal`, `judul`, `kategori`, `pengalaman`, `tips`, `foto`, `tanggal`, `like`, `status`.
6. Isi header `Kategori`: `id`, `nama`, `slug`, `icon`.
7. Isi header `Istilah`: `id`, `judul`, `slug`, `kategori`, `ringkasan`, `isi`, `status`.
8. Isi header `FAQ`: `id`, `pertanyaan`, `jawaban`, `kategori`, `status`.
9. Isi header `Direktori`: `id`, `nama`, `kategori`, `lokasi`, `deskripsi`, `rating`, `jarak`, `estimasi`, `harga`, `maps`, `gambar`, `status`.
10. Isi header `JadwalShalat`: `id`, `kota`, `subuh`, `dzuhur`, `ashar`, `maghrib`, `isya`, `tanggal`, `sumber`, `status`.
11. Isi header `Download`: `id`, `judul`, `kategori`, `deskripsi`, `file`, `status`.
12. Isi header `Video`: `id`, `judul`, `kategori`, `youtube`, `deskripsi`, `status`.
13. Gunakan status `Draft`, `Publish`, atau `Reject`. Website hanya menampilkan data dengan status `Publish`.

## Cara Membuat Google Apps Script

1. Dari spreadsheet, buka `Extensions > Apps Script`.
2. Salin isi `appscript/Code.gs` ke editor Apps Script.
3. Buka `Project Settings`, aktifkan opsi untuk melihat manifest, lalu sesuaikan manifest dengan `appscript/appsscript.json`.
4. Jalankan fungsi `setupSheets()` sekali untuk memastikan sheet dan header tersedia.
5. Berikan izin akses saat Google meminta otorisasi.

## Cara Deploy Apps Script

1. Klik `Deploy > New deployment`.
2. Pilih tipe `Web app`.
3. Set `Execute as` menjadi `Me`.
4. Set `Who has access` menjadi `Anyone`.
5. Klik `Deploy`, lalu salin URL Web App.

## Cara Menghubungkan Website dengan Apps Script

1. Buka `assets/js/api.js`.
2. Ganti nilai berikut:

```js
appsScriptUrl: "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE"
```

3. Isi dengan URL Web App dari Apps Script.
4. Jika memakai domain sendiri, ubah `siteUrl` menjadi domain final website.
5. Setelah URL terpasang, halaman artikel, detail, kategori, pengalaman, dan form kirim pengalaman akan memakai data dari Spreadsheet.

## Cara Upload ke Hosting

1. Upload seluruh isi folder `hajicerdas` ke `public_html`, `htdocs`, atau root hosting statis.
2. Pastikan file `index.html`, `robots.txt`, `sitemap.xml`, dan `manifest.json` berada di root domain.
3. Untuk Netlify, Vercel, Cloudflare Pages, atau GitHub Pages, deploy sebagai static site tanpa build command.
4. Atur halaman 404 hosting agar mengarah ke `404.html`.

## Cara Optimasi SEO

1. Ubah domain placeholder `https://www.hajicerdas.id` pada meta canonical, sitemap, dan konfigurasi JS sesuai domain final.
2. Gunakan judul artikel yang jelas, slug pendek, dan ringkasan unik.
3. Isi kolom `gambar` dengan URL gambar yang relevan dan ringan.
4. Pastikan setiap artikel memiliki heading `h2` dan `h3` yang rapi pada kolom `isi`.
5. Kompres gambar dan gunakan format WebP untuk aset produksi.
6. Audit rutin memakai Lighthouse, PageSpeed Insights, dan Google Search Console.

## Cara Submit Sitemap ke Google Search Console

1. Buka Google Search Console.
2. Tambahkan properti domain.
3. Verifikasi domain sesuai metode yang disediakan Google.
4. Masuk ke menu `Sitemaps`.
5. Submit `https://domain-anda.com/sitemap.xml`.
6. Pantau halaman terindeks, Core Web Vitals, dan masalah crawling.

## Cara Maintenance Website

1. Tambah artikel baru di sheet `Artikel` dengan status `Draft`.
2. Review judul, slug, ringkasan, gambar, isi, tanggal, dan penulis.
3. Ubah status menjadi `Publish` untuk menampilkan artikel.
4. Untuk menyembunyikan konten, ubah status menjadi `Draft` atau `Reject`.
5. Review kiriman jamaah di sheet `Pengalaman`.
6. Bersihkan data spam dan publikasi hanya cerita yang layak.
7. Backup spreadsheet secara berkala.
8. Perbarui sitemap jika menambah halaman statis baru.

## Fitur Knowledge Center

Halaman tambahan yang tersedia:

```text
pengetahuan.html       Pengetahuan umum Haji dan Umrah
istilah.html           Kamus istilah alfabetis
istilah-detail.html    Detail istilah berdasarkan slug
waktu.html             Jam WIB, Arab Saudi, Hijriah, dan jadwal shalat Mekkah/Madinah/Jakarta realtime (jadwal-shalat.html kini redirect ke sini)
panduan-waktu.html     Estimasi durasi tawaf, sa'i, tahallul, wukuf, jumrah, mabit, tawaf wada
infografis.html        Infografis sekaligus Download Center (PDF, checklist, e-book) - download.html kini redirect ke sini
persiapan.html         Panduan persiapan dokumen, ibadah, pribadi, kesehatan, keuangan
budget.html            Kalkulator estimasi biaya
kurs.html              Konverter Rupiah, Riyal, Dollar
peta.html              Peta kategori lokasi dengan pratinjau dan tombol rute
video.html             Embed video YouTube
```

Halaman `transportasi.html`, `hotel.html`, `kuliner.html`, dan `belanja.html` sudah dihapus. Kontennya kini menjadi artikel penuh pada sheet `Artikel` dengan kategori `Transportasi`, `Hotel`, `Kuliner`, dan `Belanja`, dan dapat diakses lewat `artikel.html?kategori=NamaKategori` (tautan ini dipakai di beranda dan footer).

## Infografis dengan Gambar

Sheet `Infografis` sekarang punya kolom `gambar` untuk menyimpan URL gambar infografis.

1. Admin membuka `admin.html`, memilih menu `Infografis`, lalu menambah/mengedit entri.
2. Pada field `Gambar Infografis`, admin bisa mengunggah file gambar (JPG/PNG) langsung dari perangkat. Gambar otomatis tersimpan di folder Google Drive `HajiCerdas Uploads` dan URL-nya diisi otomatis ke field tersebut.
3. Setelah status diubah menjadi `Publish`, gambar tersebut akan tampil di `infografis.html` beserta tombol `Download Gambar` yang bisa dipakai pengunjung untuk mengunduh gambar tersebut ke perangkat mereka.
4. Jika field `gambar` masih kosong, halaman akan menampilkan ilustrasi placeholder sebagai gantinya.

Beberapa halaman saat ini memakai data fallback dari:

```text
assets/js/content-data.js
assets/js/faq-data.js
```

Struktur Apps Script sudah disiapkan agar data tersebut bisa dipindahkan ke Google Spreadsheet secara bertahap. Untuk pengembangan berikutnya, halaman frontend cukup diarahkan mengambil data dari action Apps Script seperti `istilah`, `faq`, `direktori`, `jadwalshalat`, `download`, dan `video`.

## Catatan Jadwal, Tarif, dan Kurs

Data jadwal shalat, tarif transportasi, harga hotel, dan kurs mata uang dapat berubah sewaktu-waktu. Jangan menuliskannya sebagai fakta tetap. Simpan data dinamis tersebut di Spreadsheet atau integrasikan dengan API resmi saat website masuk tahap produksi.

## Alur Pengambilan Data dari Spreadsheet ke HTML

Alur data HajiCerdas berjalan seperti ini:

```text
Google Spreadsheet
  -> Google Apps Script
  -> URL Web App / API JSON
  -> JavaScript fetch()
  -> Tampilan HTML
```

### 1. Data Disimpan di Google Spreadsheet

Google Spreadsheet berfungsi sebagai database sederhana. Website membaca data dari tiga sheet utama:

```text
Artikel
Pengalaman
Kategori
```

Sheet `Artikel` memiliki struktur:

```text
id | judul | slug | kategori | gambar | ringkasan | isi | penulis | tanggal | status
```

Contoh data artikel:

```text
art-001 | Checklist Persiapan Haji | checklist-persiapan-haji | Persiapan | assets/images/article-placeholder.svg | Panduan persiapan haji... | <h2>Dokumen</h2><p>Siapkan paspor...</p> | Redaksi HajiCerdas | 2026-07-14 | Publish
```

Kolom paling penting adalah `status`.

```text
Publish = tampil di website
Draft   = belum tampil
Reject  = tidak tampil
```

Jadi admin cukup mengubah status di Google Spreadsheet. Jika status artikel atau pengalaman diubah menjadi `Publish`, data tersebut akan tampil di website saat halaman dimuat ulang.

### 2. Apps Script Membaca Spreadsheet

File backend berada di:

```text
appscript/Code.gs
```

Saat website meminta data, Apps Script menerima request melalui fungsi:

```js
function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const action = (params.action || "artikel").toLowerCase();

  if (action === "artikel") {
    return jsonResponse({
      success: true,
      data: getPublishedRows(SHEETS.artikel)
    });
  }
}
```

Jika request memiliki parameter:

```text
?action=artikel
```

maka Apps Script membaca sheet `Artikel`.

### 3. Baris Spreadsheet Diubah Menjadi JSON

Apps Script membaca semua data spreadsheet dengan:

```js
function getRows(sheetName) {
  const sheet = getSpreadsheet().getSheetByName(sheetName);
  const values = sheet.getDataRange().getValues();
}
```

Baris pertama spreadsheet dianggap sebagai nama kolom. Baris berikutnya dianggap sebagai isi data.

Contoh data spreadsheet:

```text
judul: Checklist Persiapan Haji
slug: checklist-persiapan-haji
kategori: Persiapan
status: Publish
```

akan diubah menjadi JSON:

```json
{
  "judul": "Checklist Persiapan Haji",
  "slug": "checklist-persiapan-haji",
  "kategori": "Persiapan",
  "status": "Publish"
}
```

### 4. Apps Script Memfilter Data Publish

Website hanya boleh menerima data yang statusnya `Publish`.

Proses filter dilakukan oleh fungsi:

```js
function getPublishedRows(sheetName) {
  return getRows(sheetName).filter(function (row) {
    return row.status === "Publish";
  });
}
```

Dengan begitu artikel berstatus `Draft` atau `Reject` tidak akan tampil di website.

### 5. Apps Script Mengirim Response JSON

Setelah data dibaca dan difilter, Apps Script mengirim response dalam format JSON:

```js
function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Contoh URL API artikel:

```text
https://script.google.com/macros/s/AKfycbxxxx/exec?action=artikel
```

Contoh response:

```json
{
  "success": true,
  "data": [
    {
      "id": "art-001",
      "judul": "Checklist Persiapan Haji",
      "slug": "checklist-persiapan-haji",
      "kategori": "Persiapan",
      "status": "Publish"
    }
  ]
}
```

### 6. JavaScript Website Mengambil Data dengan fetch()

File frontend yang bertugas menghubungi Apps Script adalah:

```text
assets/js/api.js
```

Di dalam file tersebut terdapat konfigurasi:

```js
const HC_CONFIG = {
  appsScriptUrl: "URL_APPS_SCRIPT_KAMU",
  siteUrl: "https://www.hajicerdas.id"
};
```

URL Apps Script dipakai oleh fungsi:

```js
const requestJson = async (params = {}, options = {}) => {
  const url = new URL(HC_CONFIG.appsScriptUrl);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url, options);
  return response.json();
};
```

Saat halaman membutuhkan artikel, JavaScript memanggil:

```js
HCApi.getArticles()
```

Fungsi tersebut akan mengambil data dari Apps Script:

```js
async getArticles() {
  const data = await requestJson({ action: "artikel" });
  return onlyPublished(data.data || data);
}
```

Browser kemudian memanggil URL:

```text
https://script.google.com/macros/s/AKfycbxxxx/exec?action=artikel
```

### 7. Data Dibentuk Menjadi Kartu Artikel

Setelah data JSON diterima, JavaScript mengubah data menjadi HTML.

Fungsi pembuat kartu artikel berada di:

```text
assets/js/app.js
```

Contoh:

```js
const createArticleCard = (article) => `
  <div class="col-md-6 col-lg-4">
    <article class="article-card fade-up">
      <a href="detail.html?slug=${encodeURIComponent(article.slug)}">
        <img src="${article.gambar}" alt="${article.judul}">
      </a>

      <div class="card-body-pad">
        <span class="badge-soft">${article.kategori}</span>
        <h3>${article.judul}</h3>
        <p>${article.ringkasan}</p>
      </div>
    </article>
  </div>
`;
```

Data dari Spreadsheet masuk ke bagian berikut:

```text
article.judul     -> judul artikel
article.slug      -> URL detail artikel
article.gambar    -> gambar artikel
article.kategori  -> label kategori
article.ringkasan -> deskripsi singkat
```

### 8. Homepage Menampilkan Artikel Terbaru

Di file:

```text
index.html
```

terdapat elemen kosong:

```html
<div class="row g-4" data-latest-articles></div>
```

Elemen ini diisi otomatis oleh JavaScript dari file:

```text
assets/js/article.js
```

Kode yang menjalankan prosesnya:

```js
const renderHomeContent = async () => {
  const latest = document.querySelector("[data-latest-articles]");
  const articles = await HCApi.getArticles();

  latest.innerHTML = articles
    .slice(0, 3)
    .map(HCUtils.createArticleCard)
    .join("");
};
```

Artinya:

```text
1. Cari elemen data-latest-articles
2. Ambil artikel dari Spreadsheet
3. Ambil 3 artikel pertama
4. Ubah setiap artikel menjadi kartu HTML
5. Masukkan hasilnya ke homepage
```

### 9. Halaman Artikel Menampilkan Semua Artikel

Di file:

```text
artikel.html
```

terdapat elemen:

```html
<div class="row g-4" data-article-list></div>
```

Elemen ini diisi oleh:

```text
assets/js/search.js
```

Alurnya:

```text
User membuka artikel.html
  -> search.js berjalan
  -> HCApi.getArticles() dipanggil
  -> fetch ke Apps Script dengan action=artikel
  -> Apps Script membaca sheet Artikel
  -> Apps Script mengirim JSON
  -> JavaScript membuat kartu artikel
  -> data-article-list terisi artikel
```

Halaman ini juga mendukung:

```text
Live search
Filter kategori
Pagination
```

### 10. Halaman Detail Artikel

Saat user klik artikel, link yang dibuka berbentuk:

```text
detail.html?slug=checklist-persiapan-haji
```

File:

```text
assets/js/article.js
```

mengambil nilai `slug` dari URL:

```js
const slug = getParam("slug");
const article = await HCApi.getArticle(slug);
```

Lalu `assets/js/api.js` memanggil Apps Script:

```js
async getArticle(slug) {
  const data = await requestJson({
    action: "detail",
    slug
  });

  return data.data || data;
}
```

URL API yang dipanggil:

```text
https://script.google.com/macros/s/AKfycbxxxx/exec?action=detail&slug=checklist-persiapan-haji
```

Apps Script mencari artikel dengan slug yang sama:

```js
function getArticleDetail(slug) {
  const article = getPublishedRows(SHEETS.artikel).find(function (row) {
    return row.slug === slug;
  });

  return article;
}
```

Jika artikel ditemukan dan statusnya `Publish`, artikel akan tampil di `detail.html`.

### 11. Alur Kirim Pengalaman Jamaah

User mengisi form di:

```text
kirim.html
```

Field yang dikirim:

```text
Nama
Judul
Kategori
Pengalaman
Foto
Persetujuan
```

Saat tombol kirim ditekan, JavaScript menjalankan:

```js
HCApi.postExperience(payload)
```

Data dikirim ke Apps Script dengan method `POST`:

```js
fetch(HC_CONFIG.appsScriptUrl, {
  method: "POST",
  body: JSON.stringify({
    action: "pengalaman",
    ...payload
  })
});
```

Apps Script menerima data melalui:

```js
function doPost(e) {
  const payload = JSON.parse(e.postData.contents || "{}");
  appendExperience(payload);
}
```

Lalu data ditambahkan ke sheet `Pengalaman`:

```js
sheet.appendRow([
  id,
  nama,
  judul,
  kategori,
  pengalaman,
  foto,
  tanggal,
  "Draft"
]);
```

Status pengalaman baru otomatis menjadi:

```text
Draft
```

Artinya cerita jamaah tidak langsung tampil. Admin harus membuka Google Spreadsheet, mengecek isi cerita, lalu mengubah status dari `Draft` menjadi `Publish`.

### 12. Ringkasan Alur Lengkap

```text
Admin mengisi Google Spreadsheet
  -> Status data dibuat Publish
  -> Apps Script membaca sheet
  -> Apps Script memfilter status Publish
  -> Apps Script mengirim JSON
  -> JavaScript fetch JSON
  -> JavaScript membuat HTML
  -> Website menampilkan artikel, kategori, dan pengalaman
```

Untuk form pengalaman:

```text
User mengisi form kirim pengalaman
  -> JavaScript mengirim POST ke Apps Script
  -> Apps Script menambah baris ke sheet Pengalaman
  -> Status otomatis Draft
  -> Admin review di Spreadsheet
  -> Admin ubah status menjadi Publish
  -> Pengalaman tampil di website
```

## Pembaruan: Sheet Tambahan (Full Knowledge Center dari Spreadsheet)

Selain `Artikel`, `Pengalaman`, dan `Kategori`, spreadsheet sekarang juga memakai sheet berikut agar seluruh Knowledge Center bisa diedit tanpa menyentuh kode:

```text
Istilah            Pengetahuan Umum + Kamus Istilah (istilah.html, istilah-detail.html, pengetahuan.html)
FAQ                200 pertanyaan (faq.html)
Direktori          Transportasi, Hotel, Kuliner, Belanja, Peta (kolom kategori membedakan jenisnya)
JadwalShalat       Mekkah, Madinah, Jakarta, ditampilkan realtime di waktu.html (jadwal-shalat.html redirect ke sana)
Download           Download Center, digabung ke infografis.html#unduhan (download.html redirect ke sana)
Video              Video edukasi (video.html)
PanduanWaktu       Estimasi durasi tawaf, sa'i, wukuf, dll (panduan-waktu.html)
Persiapan          Checklist dokumen, perlengkapan, kesehatan, keuangan (persiapan.html)
PersiapanTimeline  Tips H-180 s.d. hari keberangkatan (persiapan.html)
Infografis         10 kategori infografis (infografis.html)
Kurs               Kurs Rupiah, Riyal, Dollar (kurs.html)
```

Kolom `Pengalaman` diperbarui menjadi: `id, nama, asal, judul, kategori, pengalaman, tips, foto, tanggal, like, status` (sebelumnya belum ada `asal`, `tips`, `like`) agar sesuai dengan form `kirim.html` dan `appscript/Code.gs`.

Jalankan `setupSheets()` di Apps Script untuk membuat sheet-sheet baru ini secara otomatis (headernya saja), lalu isi datanya dari `HajiCerdas_Database.xlsx` yang sudah disiapkan berisi contoh data lengkap untuk seluruh sheet.

Frontend (`assets/js/api.js`, `knowledge.js`, `tools.js`, `faq-data.js`, dan skrip di `peta.html`/`download.html`/`video.html`/`jadwal-shalat.html`) sudah diperbarui memakai pola yang sama seperti fitur Artikel: coba ambil data dari Apps Script terlebih dahulu, dan otomatis jatuh ke data fallback lokal (`content-data.js`/`faq-data.js`) bila `appsScriptUrl` belum diisi atau request gagal. Jadi tampilan tetap identik di mode demo, dan langsung memakai data spreadsheet begitu Apps Script terhubung.

## Admin Panel

Buka `admin.html` untuk mengelola seluruh konten (Artikel, Pengalaman, Istilah, FAQ, Direktori, Jadwal Shalat, Download, Video, Panduan Waktu, Persiapan, Timeline, Infografis, Kurs, Tata Cara, Doa, Kategori, Ensiklopedia) langsung dari browser tanpa membuka Google Sheets satu per satu.

**Sebelum dipakai:**
1. Deploy ulang `appscript/Code.gs` sebagai Web App (Execute as: Me, Who has access: Anyone).
2. Ganti nilai `ADMIN_PASSWORD` di baris pertama `Code.gs` dengan password yang aman, lalu deploy ulang.
3. Buka `admin.html`, isi URL Web App yang sama seperti di `assets/js/api.js`, dan masukkan password tadi.

**Fitur:**
- Tambah, edit, dan hapus data untuk setiap jenis konten (CRUD penuh) lewat tabel dan form.
- Untuk field gambar: bisa **tempel link gambar** dari internet, atau **unggah file dari perangkat** — file yang diunggah otomatis disimpan ke folder Google Drive "HajiCerdas Uploads" dan tautannya otomatis terisi.
- Pencarian cepat di setiap tabel, serta status Publish/Draft agar konten baru bisa disiapkan dulu sebelum tayang.

**Catatan keamanan:** proteksi password ini adalah proteksi dasar (dicek di sisi server lewat Apps Script), bukan sistem login penuh dengan sesi terenkripsi. Untuk keamanan lebih baik, batasi juga siapa yang tahu URL `admin.html` dan URL Web App, dan pertimbangkan menambahkan IP allowlist atau Google Sign-In jika dipakai di produksi.

## Catatan Produksi

Mode demo aktif saat `appsScriptUrl` belum diisi. Dalam mode ini website memakai data fallback lokal agar tampilan tetap bisa diuji. Untuk produksi, wajib memasang URL Apps Script dan mengganti semua placeholder domain dengan domain final.

## Changelog Rombak (2026-07-19): Positioning "Ensiklopedia"

Perubahan pada revisi ini, berangkat dari analisis kekuatan/kelemahan konten:

**1. Homepage lebih menonjolkan diferensiasi**
- Hero diganti jadi positioning "Ensiklopedia Haji & Umrah" dengan tagline yang menyebut topik yang jarang dibahas tuntas di tempat lain.
- Trust bar baru di bawah kotak pencarian hero (angka konten, sumber resmi, tanggal update konten).
- Section baru "Topik yang Jarang Dibahas Tuntas di Tempat Lain" tepat di bawah panel "Tips cepat" homepage, isinya 5 kartu menuju halaman Ensiklopedia baru.

**2. Lima halaman Ensiklopedia baru (topik yang sebelumnya kosong/setengah jalan)**
Setiap halaman memakai struktur tetap: **Definisi & rujukan resmi → Panduan praktis/akses → Saran**, plus kotak "Rujukan & catatan sumber" dan FAQ singkat:
- `badal.html` — Badal Haji & Umrah
- `tabungan-investasi.html` — Tabungan & Investasi Haji (BPKH, cara bedakan dari skema ilegal)
- `fikih.html` — Fikih Haji & Umrah (rukun, wajib, jenis haji, dam, istitha'ah)
- `wakaf-quran.html` — Wakaf Al-Qur'an Masjidil Haram
- `rekrutmen-petugas.html` — Rekrutmen Petugas Haji (PPIH)

Navigasi ke kelima halaman ini ditambahkan sebagai dropdown **"Ensiklopedia"** di nav utama, dan kolom baru di footer — konsisten di seluruh 22 halaman statis.

**3. Database (`HajiCerdas_Database_v2.xlsx`) disinkronkan**
- 4 kategori baru di sheet `Kategori`: Fikih, Regulasi & Keuangan, Wakaf & Sosial, Karier Petugas.
- 2 istilah baru di sheet `Istilah`: Wakaf Al-Qur'an, PPIH.
- 5 artikel ringkasan baru di sheet `Artikel` yang menautkan ke masing-masing halaman Ensiklopedia.
- 6 entri baru di sheet `FAQ` untuk topik-topik tersebut.
- Kolom baru **`sumber_referensi`** ditambahkan ke sheet `Artikel` dan `Istilah` agar setiap konten bisa mencantumkan rujukan sumbernya secara terstruktur (bukan cuma disebut di teks body).
- Data fallback JS (`assets/js/api.js`, `assets/js/content-data.js`) disinkronkan agar kategori/artikel/istilah baru tetap tampil walau Apps Script belum terhubung.

**4. Rekomendasi lanjutan (belum dikerjakan di revisi ini)**
- Integrasi API resmi untuk data yang sifatnya berubah cepat: kurs (Bank Indonesia), jadwal shalat (mis. Aladhan API), kalender Hijriah — saat ini `jadwalShalat` dan `Kurs` masih data statis dengan catatan "Referensi awal, sesuaikan sumber resmi".
- Data Kemenag/BPKH/Nusuk sebaiknya tetap dikutip manual dengan tanggal update jelas karena tidak ada API publik resminya — bukan di-scrape otomatis.

## Update (2026-07-19, lanjutan): Integrasi API Realtime untuk Kurs

- `waktu.html` (jadwal shalat) **sudah** memakai Aladhan API secara live sejak versi sebelumnya (`assets/js/tools.js` fungsi `fetchPrayerCity`), method kalkulasi `20` (KEMENAG Indonesia) untuk Jakarta dan `4` (Umm Al-Qura, Makkah) untuk Mekkah/Madinah — bukan data statis, kecuali API benar-benar tidak terjangkau, baru turun ke fallback Apps Script lalu data statis lokal.
- `kurs.html` **sebelumnya** hanya membaca sheet `Kurs` (harus diupdate manual) dengan fallback statis 1 SAR = Rp4.300 / 1 USD = Rp16.200. **Sekarang** memakai live rate dari **ExchangeRate-API** (`https://open.er-api.com/v6/latest/USD`, gratis, tanpa API key, update harian), dikonversi ke basis IDR untuk SAR dan USD. Urutan fallback: API realtime → sheet `Kurs` (Apps Script) → nilai default statis.
- UI kurs.html menampilkan status sumber data secara transparan (nama sumber, waktu update, nilai kurs saat ini) lewat elemen `[data-kurs-status]`, sama seperti pola yang sudah dipakai di widget jadwal shalat.
- Catatan penting: kurs dari API publik bersifat referensi (mid-market rate), **bukan** kurs jual-beli transaksi bank/money changer — sudah diberi disclaimer di halaman.

## Update (2026-07-19, lanjutan): Sinkronisasi Admin & Rombak Homepage

**1. Admin Panel disinkronkan ulang dengan yang tampil di frontend**
- Kolom `sumber_referensi` (Artikel, Istilah) sudah ada di database sejak update sebelumnya tapi belum ada di form admin, dan khusus Istilah malah sengaja dibuang oleh `assets/js/api.js` sebelum sampai ke halaman. Sekarang: field "Rujukan / Sumber" ditambahkan ke form Artikel & Istilah di admin, `api.js` meneruskan datanya, dan `detail.html`/`istilah-detail.html` menampilkannya sebagai kotak "Rujukan & catatan sumber" (kalau kosong, kotak tidak ditampilkan).
- `appscript/Code.gs` — `MANAGED_SHEETS.Artikel` dan `.Istilah` belum memuat `sumber_referensi`, artinya kalau `setupSheets()` dijalankan di spreadsheet baru, kolom ini tidak akan pernah dibuat. Sudah ditambahkan.
- Dropdown kategori di form Artikel/Pengalaman (`CONTENT_CATEGORIES` di `admin.js`) belum memuat 4 kategori baru (Fikih, Regulasi & Keuangan, Wakaf & Sosial, Karier Petugas) yang sudah ada di sheet `Kategori` — admin jadi tidak bisa menandai artikel baru dengan kategori ini. Sudah ditambahkan.
- Field "Kategori" di form Direktori disederhanakan: sebelumnya dropdown wajib diisi padahal isinya cuma satu pilihan tetap ("Peta"), karena Transportasi/Hotel/Kuliner/Belanja sudah pindah jadi Artikel biasa.

**2. Lima halaman Ensiklopedia kini bisa dikelola dari Admin Panel**
- Sheet baru **`Ensiklopedia`** (`id, halaman, eyebrow, judul, ringkasan, isi, sumber_referensi, status`) menyimpan konten `badal.html`, `tabungan-investasi.html`, `fikih.html`, `wakaf-quran.html`, dan `rekrutmen-petugas.html`, yang sebelumnya HTML statis dan tidak bisa diedit tanpa menyentuh kode.
- Menu admin baru "Ensiklopedia" (grup tersendiri di sidebar) memakai pola yang sama seperti Artikel: field `isi` berupa HTML bebas untuk seluruh isi halaman (termasuk section FAQ singkat), plus field terpisah untuk judul, eyebrow, ringkasan, dan rujukan/sumber.
- Kelima halaman ditandai `data-ensiklopedia="..."` dan diambil lewat `assets/js/ensiklopedia.js` menggunakan action baru `ensiklopedia` di Apps Script. Sama seperti fitur lain di situs ini: HTML asli tetap ada sebagai fallback statis di dalam file, dan hanya ditimpa kalau data dari Apps Script (atau fallback lokal `HCEnsiklopedia` di `content-data.js`) berhasil diambil — jadi tampilan tetap identik di mode demo maupun kalau Apps Script gagal diakses.
- `HajiCerdas_Database_v3.xlsx` (pembaruan dari `_v2`) sudah memuat sheet `Ensiklopedia` terisi 5 baris sesuai konten asli kelima halaman, siap diimpor ke Google Sheets.

**3. Perbaikan homepage (`index.html`)**
- Section "Tips Cepat" dihapus karena 3 kartunya (Cek Dokumen, Pengetahuan, Atur Budget) 100% duplikat dari kartu yang sudah ada di section "Panduan Ibadah" dan "Info Praktis Jamaah".
- Section "Info Praktis Jamaah" dirampingkan dari 12 ke 8 kartu: kartu "Jadwal Shalat & Waktu" dan "Jam & Hijriah" dibuang (selain duplikat widget realtime di atasnya, anchor `#jadwal-shalat` dan `#jam-hijriah` yang dipakai ternyata tidak ada di `waktu.html` — link mati), begitu juga kartu "Infografis & Download" dan "Video" (duplikat section preview masing-masing).
- Ditambahkan subjudul singkat di "Info Praktis Jamaah" agar cakupannya (biaya, kurs, transportasi, akomodasi, lokasi, istilah) jelas berbeda dari "Panduan Ibadah".
