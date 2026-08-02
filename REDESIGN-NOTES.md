# Haji Cerdas — Modern Islamic Minimalism Redesign

Ini adalah catatan singkat perubahan desain yang diterapkan ke seluruh 32 halaman situs (semua memakai `assets/css/style.css`, `animation.css`, `responsive.css` yang sama, jadi perubahan otomatis berlaku di semua halaman).

## Palet Warna
- **Light mode**: Primary `#7FA58A`, Secondary `#5E8F73`, Accent `#C9A86A`, Background `#F8F9F5`, Card `#FFFFFF`, Text `#2F3E34`, Muted `#5F6F64`
- **Dark mode**: Background `#16231D`, Surface `#1E3028`, Card `#24382F`, Border `#365246`, Primary `#9FD3A8`, Accent `#D6B97A`, Text `#EEF5EF`, Muted `#BFCBC3`
- Navbar tetap gelap (deep sage-emerald) di kedua mode agar identitas premium tetap konsisten.

## Tipografi
- Heading: **Cormorant Garamond** (500/600/700) — elegan, mudah dibaca di ukuran besar.
- Body: **Plus Jakarta Sans** (tidak berubah, sudah cocok dengan brief).
- Google Fonts link diganti di seluruh 32 file HTML.

## Hero Section (index.html, 404.html)
- Latar foto gelap diganti gradasi sage lembut: `#A7C4A0 → #7FA58A → #5E8F73`.
- Overlay pola geometris Islami ditambahkan dengan opasitas 5%.
- Siluet masjid minimalis (kubah + menara) ditambahkan di dasar hero, opasitas rendah.
- Cahaya radial lembut ditambahkan di belakang judul untuk kesan spiritual yang tenang.

## Komponen
- **Kartu** (artikel, kategori, cerita, tips, ensiklopedia): radius dinaikkan ke 24px, border tipis, shadow lembut, animasi hover-lift.
- **Tombol**: radius 16px, shadow lembut, efek scale halus saat hover, menghormati `prefers-reduced-motion`.
- **Navbar**: nav-link berbentuk pil membulat, status aktif emas, dropdown membulat 16px.
- **Dark mode**: seluruh token warna diselaraskan dengan palet dark yang diminta.

## Animasi
- Fade-in on scroll: sudah ada sebelumnya via Animate.css + IntersectionObserver, dipertahankan.
- Hover elevation pada kartu & tombol diperhalus.
- Utility baru `float-shape` / `float-shape-slow` untuk elemen dekoratif mengambang (opsional, belum dipasang di markup — tinggal tambahkan class ini ke elemen dekoratif jika ingin dipakai).
- Semua animasi menghormati `prefers-reduced-motion: reduce`.

## Update — Perbaikan Bug (revisi 2)
- **Konten hilang saat ganti mode terang/gelap**: ini bug rendering browser (Chromium) — elemen dengan `backdrop-filter` (search bar hero, dll) kadang tidak di-repaint saat class tema berubah di `<html>`, sehingga terlihat kosong sampai kursor diarahkan. Diperbaiki dengan memaksa repaint halus lewat JS di `assets/js/darkmode.js` (nudge opacity via `requestAnimationFrame`, tanpa flash terlihat).
- **Tekstur pola geometris di hero**: dihapus. Diganti fade transparan sederhana (`.hero::before`) dari atas ke bawah, tanpa pola berulang. Siluet masjid tipis di dasar hero tetap dipertahankan.
- **Teks tombol navbar aktif (Beranda) sulit terbaca**: sebelumnya teks emas muda ditumpuk di atas pil emas (kontras rendah). Diperbaiki lewat variabel `--bs-navbar-active-color` menjadi warna hijau gelap (`var(--header)`) agar kontras jelas di atas pil emas.

- Halaman lain di luar index.html (mis. `page-header` di halaman dalam) memakai gradasi/pola default dari variabel yang sama, tapi belum diberi siluet masjid/hero penuh — bisa ditambahkan bila mau konsisten dengan beranda.
- Preview screenshot tidak bisa dibuat di lingkungan kerja ini karena akses jaringan ke CDN (Google Fonts, Bootstrap, jsDelivr) diblokir — buka `index.html` langsung di browser Anda untuk melihat hasilnya dengan koneksi internet normal.
