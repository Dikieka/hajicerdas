// assets/js/navbar.js
// Navbar HajiCerdas - SATU sumber untuk semua halaman.
// Cukup taruh <script src="assets/js/navbar.js"></script> (TANPA atribut
// defer/async, biar posisinya persis di tempat navbar seharusnya muncul)
// di body, gantikan blok <nav>...</nav> yang dulu diulang di tiap file.
//
// Kalau mau ubah menu navigasi, cukup edit HTML di bawah ini SEKALI SAJA,
// otomatis berlaku ke semua halaman.
//
// Strip waktu & jadwal shalat realtime di bawah navbar cuma tampil di
// Beranda. Halaman lain yang mau menampilkannya tinggal taruh
// <script>window.HC_TOP_STRIP = true;</script> SEBELUM tag script ini.
(function () {
  var showTopStrip = window.HC_TOP_STRIP === true;

  // Beranda punya preview "Cerita Jamaah" langsung di halaman (section
  // #cerita-jemaah), jadi dari Beranda menu ini scroll ke section itu.
  // Dari halaman lain, tidak ada section itu, jadi menu mengarah ke
  // halaman penuh pengalaman.html.
  var currentPage = location.pathname.split("/").pop();
  var isHome = currentPage === "" || currentPage === "index.html";
  var ceritaJamaahHref = isHome ? "#cerita-jemaah" : "pengalaman.html";

  var topStripHtml = showTopStrip
    ? '<div class="top-strip" data-top-strip aria-label="Waktu dan jadwal shalat realtime">' +
      '<div class="container top-strip-inner">' +
      '<span class="top-strip-item"><i class="bi bi-hourglass-split"></i> Memuat waktu &amp; jadwal shalat...</span>' +
      "</div>" +
      "</div>"
    : "";

  document.write(
    '<div class="site-header fixed-top">' +
      '<nav class="navbar navbar-expand-lg" aria-label="Navigasi utama">' +
      '<div class="container">' +
      '<a class="navbar-brand d-flex align-items-center" href="index.html"><span class="brand-mark"><i class="bi bi-compass"></i></span>HajiCerdas</a>' +
      '<div class="nav-clock d-none d-lg-block" data-nav-clock><strong>--:--</strong> WIB &middot; <span class="nav-clock-next">Memuat...</span></div>' +
      '<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#mainNav" aria-controls="mainNav" aria-label="Buka navigasi"><span class="navbar-toggler-icon"></span></button>' +
      '<div class="offcanvas offcanvas-start" tabindex="-1" id="mainNav" aria-labelledby="mainNavLabel">' +
      '<div class="offcanvas-header">' +
      '<a class="navbar-brand d-flex align-items-center mb-0" id="mainNavLabel" href="index.html"><span class="brand-mark"><i class="bi bi-compass"></i></span>HajiCerdas</a>' +
      '<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Tutup navigasi"></button>' +
      "</div>" +
      '<div class="offcanvas-body">' +
      '<ul class="navbar-nav ms-lg-auto align-items-lg-center gap-lg-1">' +
      '<li class="nav-item"><a class="nav-link" href="index.html">Beranda</a></li>' +
      '<li class="nav-item"><a class="nav-link" href="artikel.html">Artikel</a></li>' +
      '<li class="nav-item"><a class="nav-link" href="index.html#panduan">Panduan</a></li>' +
      '<li class="nav-item"><a class="nav-link" href="index.html#info-praktis">Info Praktis</a></li>' +
      '<li class="nav-item dropdown">' +
      '<a class="nav-link dropdown-toggle" href="#" id="layananDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Layanan</a>' +
      '<ul class="dropdown-menu" aria-labelledby="layananDropdown">' +
      '<li><a class="dropdown-item" href="badal.html">Badal Umroh</a></li>' +
      '<li><a class="dropdown-item" href="fikih.html">Fikih Haji &amp; Umrah</a></li>' +
      "<li><a class=\"dropdown-item\" href=\"wakaf-quran.html\">Wakaf Al-Qur'an</a></li>" +
      '<li><a class="dropdown-item" href="rekrutmen-petugas.html">Rekrutmen Petugas Haji</a></li>' +
      "</ul>" +
      "</li>" +
      '<li class="nav-item"><a class="nav-link" href="pengalaman.html">Cerita Jamaah</a></li>' +
      '<li class="nav-item"><a class="nav-link" href="faq.html">FAQ</a></li>' +
      "</ul>" +
      '<ul class="navbar-nav navbar-actions ms-lg-2 align-items-lg-center gap-lg-2" id="navbarActions">' +
      '<li class="nav-item nav-item-theme"><button class="btn btn-outline-light btn-sm" type="button" data-theme-toggle aria-label="Ganti tema"><i data-theme-icon class="bi bi-moon-stars"></i><span class="navbar-actions-label d-lg-none">Ganti Tema</span></button></li>' +
      "</ul>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</nav>" +
      topStripHtml +
      "</div>",
  );

  // Halaman lain tetap otomatis dapat status "aktif" yang benar di menu,
  // karena assets/js/app.js sudah punya setActiveNav() yang jalan
  // berdasarkan URL saat ini setiap DOMContentLoaded - tidak perlu
  // hardcode class "active" di sini.

  // Di layar mobile/tablet, tutup sidebar otomatis begitu jamaah memilih
  // salah satu link menu (bukan toggle "Layanan"), biar tidak perlu
  // tap tombol X dulu sebelum lanjut ke halaman tujuan.
  document.addEventListener("DOMContentLoaded", function () {
    var offcanvasEl = document.getElementById("mainNav");
    if (!offcanvasEl || !window.bootstrap || !window.bootstrap.Offcanvas)
      return;
    offcanvasEl.addEventListener("click", function (event) {
      var link = event.target.closest("a.nav-link, a.dropdown-item");
      if (!link || link.classList.contains("dropdown-toggle")) return;
      var instance = window.bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
      if (instance) instance.hide();
    });
  });
})();
