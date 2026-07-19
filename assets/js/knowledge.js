const renderTermCards = async () => {
  const target = document.querySelector("[data-terms]");
  if (!target) return;
  const params = new URLSearchParams(location.search);
  const category = params.get("kategori");
  const allTerms = await HCApi.getTerms();
  const terms = category ? allTerms.filter((item) => item.category.toLowerCase() === category.toLowerCase()) : allTerms;
  target.innerHTML = terms.map((term) => `
    <div class="col-md-6 col-lg-4">
      <article class="category-card p-4 fade-up">
        <span class="badge-soft mb-3">${term.category}</span>
        <h2 class="h5 article-title">${term.title}</h2>
        <p class="lead-muted">${term.summary}</p>
        <a class="btn btn-outline-primary" href="istilah-detail.html?slug=${term.slug}">Baca Detail</a>
      </article>
    </div>
  `).join("");
  HCUtils?.initAnimations?.();
};

const renderTermDetail = async () => {
  const target = document.querySelector("[data-term-detail]");
  if (!target) return;
  const slug = new URLSearchParams(location.search).get("slug") || "apa-itu-haji";
  const allTerms = await HCApi.getTerms();
  const term = allTerms.find((item) => item.slug === slug) || allTerms[0];
  document.title = `${term.title} | HajiCerdas`;
  const isi = term.isi || `
      <h2>Penjelasan Ringkas</h2>
      <p>${term.summary}</p>
      <h2>Catatan untuk Jamaah</h2>
      <p>Gunakan penjelasan ini sebagai pengantar. Untuk keputusan ibadah, ikuti bimbingan pembimbing manasik, regulasi resmi, dan arahan petugas di lapangan.</p>
      <h2>Pengembangan Data</h2>
      <p>Istilah ini dapat dipindahkan ke Google Spreadsheet pada sheet <strong>Istilah</strong> agar admin bisa memperbarui konten tanpa mengubah kode.</p>
  `;
  target.innerHTML = `
    <nav aria-label="Breadcrumb" class="mb-4"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="index.html">Beranda</a></li><li class="breadcrumb-item"><a href="istilah.html">Kamus</a></li><li class="breadcrumb-item active">${term.title}</li></ol></nav>
    <span class="badge-soft mb-3">${term.category}</span>
    <h1 class="display-5 fw-bold">${term.title}</h1>
    <p class="lead lead-muted">${term.summary}</p>
    <div class="article-content surface p-4 mt-4">${isi}</div>
    ${term.source ? `
    <div class="surface p-3 p-md-4 mt-3">
      <p class="small fw-bold mb-1"><i class="bi bi-journal-check"></i> Rujukan &amp; catatan sumber</p>
      <p class="small lead-muted mb-0">${term.source}</p>
    </div>` : ""}
  `;
};

const renderAlphaTerms = async () => {
  const target = document.querySelector("[data-alpha-terms]");
  if (!target) return;
  const allTerms = await HCApi.getTerms();
  const grouped = allTerms.reduce((acc, term) => {
    const letter = term.title[0].toUpperCase();
    acc[letter] = acc[letter] || [];
    acc[letter].push(term);
    return acc;
  }, {});
  target.innerHTML = Object.keys(grouped).sort().map((letter) => `
    <section id="huruf-${letter}" class="mb-4">
      <h2 class="h3 fw-bold">${letter}</h2>
      <div class="info-list">${grouped[letter].map((term) => `<a class="info-item text-reset" href="istilah-detail.html?slug=${term.slug}"><strong>${term.title}</strong><br><span class="lead-muted">${term.summary}</span></a>`).join("")}</div>
    </section>
  `).join("");
};

const renderGenericList = async () => {
  const targets = document.querySelectorAll("[data-content-list]");
  for (const target of targets) {
    const key = target.dataset.contentList;
    let data = window.HCContent ? window.HCContent[key] || [] : [];
    if (key === "worshipDurations") {
      data = await HCApi.getPanduanWaktu();
    }
    target.innerHTML = data.map((item) => {
      const title = Array.isArray(item) ? item[0] : item;
      const desc = Array.isArray(item) ? item[1] : "Informasi ini bersifat panduan umum dan dapat diperbarui melalui Spreadsheet.";
      return `<div class="info-item fade-up"><h2 class="h5 fw-bold">${title}</h2><p class="lead-muted mb-0">${desc}</p></div>`;
    }).join("");
  }
};

const renderPrep = async () => {
  const target = document.querySelector("[data-prep]");
  if (!target) return;
  const [prep, prepTimeline] = await Promise.all([HCApi.getPersiapan(), HCApi.getPersiapanTimeline()]);
  target.innerHTML = Object.entries(prep).map(([category, items]) => `
    <section class="surface p-4 mb-4">
      <h2 class="h4 fw-bold">${category}</h2>
      <div class="row g-2">${items.map((item) => `<div class="col-md-6 col-lg-4"><div class="info-item"><i class="bi bi-check2-circle text-primary"></i> ${item}</div></div>`).join("")}</div>
    </section>
  `).join("") + `
    <section class="surface p-4">
      <h2 class="h4 fw-bold">Timeline Persiapan</h2>
      <div class="info-list">${prepTimeline.map(([time, desc]) => `<div class="info-item"><strong>${time}</strong><p class="lead-muted mb-0">${desc}</p></div>`).join("")}</div>
    </section>
  `;
};

const INFOGRAFIS_FALLBACK = ["Alur Haji", "Alur Umrah", "Checklist", "Barang Bawaan", "Larangan", "Doa", "Rute", "Tips Hemat", "Kesehatan", "Timeline Persiapan"].map((judul) => ({ judul, gambar: "", deskripsi: "" }));

const placeholderInfografisSvg = (judul, index) => `
  <svg viewBox="0 0 360 180" class="w-100 rounded-4" role="img" aria-label="Infografis ${judul}">
    <rect width="360" height="180" rx="18" fill="#ecfeff"></rect>
    <circle cx="${70 + index * 8}" cy="86" r="42" fill="#14b8a6" opacity=".85"></circle>
    <rect x="142" y="52" width="150" height="16" rx="8" fill="#0f766e"></rect>
    <rect x="142" y="82" width="120" height="12" rx="6" fill="#f59e0b"></rect>
    <rect x="142" y="110" width="170" height="12" rx="6" fill="#94a3b8"></rect>
  </svg>
`;

const infografisFilename = (judul) => `infografis-${String(judul || "hajicerdas").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}.jpg`;

const renderInfographics = async () => {
  const target = document.querySelector("[data-infographics]");
  if (!target) return;
  const items = (await HCApi.getInfografis()) || INFOGRAFIS_FALLBACK;
  target.innerHTML = items.map((item, index) => `
    <div class="col-md-6 col-lg-4">
      <div class="surface p-4 h-100 d-flex flex-column">
        <span class="badge-soft mb-3">${item.kategori || "Infografis"}</span>
        <h2 class="h5 fw-bold">${item.judul}</h2>
        ${item.gambar
          ? `<img src="${item.gambar}" alt="Infografis ${item.judul}" loading="lazy" class="w-100 rounded-4" style="object-fit:cover;aspect-ratio:2/1;">`
          : placeholderInfografisSvg(item.judul, index)}
        <p class="lead-muted mt-3 mb-3">${item.deskripsi || `Panduan visual untuk ${String(item.judul).toLowerCase()}.`}</p>
        ${item.gambar
          ? `<a class="btn btn-outline-primary mt-auto" href="${item.gambar}" download="${infografisFilename(item.judul)}"><i class="bi bi-download"></i> Download Gambar</a>`
          : `<span class="small lead-muted mt-auto"><i class="bi bi-info-circle"></i> Gambar belum diunggah admin</span>`}
      </div>
    </div>
  `).join("");
};

const renderInfografisPreview = async () => {
  const target = document.querySelector("[data-infografis-preview]");
  if (!target) return;
  const items = ((await HCApi.getInfografis()) || INFOGRAFIS_FALLBACK).slice(0, 4);
  target.innerHTML = items.map((item, index) => `
    <div class="col-6 col-lg-3">
      <a class="surface d-block p-3 text-reset h-100" href="infografis.html">
        ${item.gambar
          ? `<img src="${item.gambar}" alt="Infografis ${item.judul}" loading="lazy" class="w-100 rounded-2 mb-2" style="object-fit:cover;aspect-ratio:2/1;">`
          : `<svg viewBox="0 0 200 110" class="w-100 rounded-2 mb-2" role="img" aria-label="Infografis ${item.judul}">
              <rect width="200" height="110" rx="10" fill="#ecfeff"></rect>
              <circle cx="${45 + index * 6}" cy="55" r="26" fill="#0f4d40" opacity=".85"></circle>
              <rect x="82" y="36" width="90" height="10" rx="5" fill="#0f4d40"></rect>
              <rect x="82" y="54" width="70" height="8" rx="4" fill="#b45309"></rect>
            </svg>`}
        <span class="fw-bold small">${item.judul}</span>
      </a>
    </div>
  `).join("");
};

const renderDownloads = async () => {
  const target = document.querySelector("[data-downloads]");
  if (!target) return;
  const items = await HCApi.getDownloads();
  target.innerHTML = items.map((item) => `
    <div class="col-md-6 col-lg-4">
      <div class="download-card p-4 h-100 d-flex flex-column">
        <span class="badge-soft mb-3">${item.kategori || "Panduan"}</span>
        <i class="bi bi-file-earmark-pdf fs-2 text-primary"></i>
        <h3 class="h6 fw-bold mt-3">${item.judul}</h3>
        <p class="lead-muted small mb-3">${item.deskripsi || "Placeholder file download. Hubungkan ke file PDF/Drive saat produksi."}</p>
        ${item.file
          ? `<a class="btn btn-outline-primary mt-auto" href="${item.file}" target="_blank" rel="noopener"><i class="bi bi-download"></i> Unduh File</a>`
          : `<span class="small lead-muted mt-auto"><i class="bi bi-info-circle"></i> File belum diunggah admin</span>`}
      </div>
    </div>
  `).join("");
};

const renderVideoPreview = async () => {
  const target = document.querySelector("[data-video-preview]");
  if (!target) return;
  const items = (await HCApi.getVideos()).slice(0, 3);
  target.innerHTML = items.map(([kategori, judul, url]) => {
    const embed = url && url.startsWith("https://www.youtube.com/embed/");
    return `
      <div class="col-lg-4">
        <article class="video-card fade-up">
          ${embed
            ? `<iframe class="video-frame" src="${url}" title="${judul}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
            : `<a class="video-frame d-flex align-items-center justify-content-center text-center p-3 small lead-muted text-reset" href="video.html">Link video belum valid.<br>Lihat menu Video.</a>`}
          <div class="p-4">
            <span class="badge-soft mb-3">${kategori}</span>
            <h3 class="h6 fw-bold mb-0">${judul}</h3>
          </div>
        </article>
      </div>
    `;
  }).join("");
  HCUtils?.initAnimations?.();
};

document.addEventListener("DOMContentLoaded", () => {
  renderTermCards();
  renderTermDetail();
  renderAlphaTerms();
  renderGenericList();
  renderPrep();
  renderInfographics();
  renderInfografisPreview();
  renderDownloads();
  renderVideoPreview();
});
