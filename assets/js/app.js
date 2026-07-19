const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

const formatDate = (dateString) => new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric"
}).format(new Date(dateString));

// Tanggal + jam akurat, mis. "13 Juli 2026 · 09.40 WIB", dipakai sebagai
// judul (tooltip) dan sebagai teks cadangan saat data tanggal tidak valid.
const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  const datePart = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(date);
  const timePart = new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit" }).format(date);
  return `${datePart} \u00b7 ${timePart} WIB`;
};

// Waktu relatif ("5 menit lalu") dihitung ulang setiap kali dipanggil,
// bukan teks statis. Elemen yang memakai ini diberi atribut data-time-ago
// lalu diperbarui berkala lewat initRelativeTimeUpdater agar selalu akurat
// (tidak "macet" di angka lama seperti "1 menit").
const timeAgo = (dateString) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 45) return "Baru saja";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} hari lalu`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} minggu lalu`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} bulan lalu`;
  const years = Math.floor(days / 365);
  return `${years} tahun lalu`;
};

// Menjaga label "X menit lalu" tetap hidup/dinamis selama halaman terbuka.
const initRelativeTimeUpdater = () => {
  const update = () => {
    qsa("[data-time-ago]").forEach((el) => {
      const raw = el.dataset.timeAgo;
      if (!raw) return;
      el.textContent = timeAgo(raw);
      if (!el.title) el.title = formatDateTime(raw);
    });
  };
  update();
  setInterval(update, 30000);
};

const stripHtml = (html = "") => html.replace(/<[^>]*>?/gm, "");

const readingTime = (html = "") => {
  const words = stripHtml(html).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const createArticleCard = (article) => `
  <div class="col-md-6 col-lg-4">
    <article class="article-card fade-up">
      <a href="detail.html?slug=${encodeURIComponent(article.slug)}" aria-label="Baca ${article.judul}">
        <img src="${article.gambar || "assets/images/article-placeholder.svg"}" alt="${article.judul}" loading="lazy" onerror="this.src='assets/images/article-placeholder.svg'">
      </a>
      <div class="card-body-pad">
        <span class="badge-soft mb-3"><i class="bi bi-bookmark"></i>${article.kategori}</span>
        <h3 class="h5 article-title"><a class="text-reset" href="detail.html?slug=${encodeURIComponent(article.slug)}">${article.judul}</a></h3>
        <p class="lead-muted mb-3">${article.ringkasan}</p>
        <div class="meta">
          <span><i class="bi bi-person"></i> ${article.penulis || "Redaksi"}</span>
          <span><i class="bi bi-clock"></i> ${readingTime(article.isi)} menit baca</span>
        </div>
        <div class="meta mt-2 article-time" title="${formatDateTime(article.tanggal)}">
          <span><i class="bi bi-calendar3"></i> ${formatDate(article.tanggal)}</span>
          <span><i class="bi bi-clock-history"></i> <span data-time-ago="${article.tanggal}">${timeAgo(article.tanggal)}</span></span>
        </div>
      </div>
    </article>
  </div>
`;

const showToast = (message, variant = "success") => {
  const container = qs(".toast-container") || document.body.appendChild(Object.assign(document.createElement("div"), {
    className: "toast-container position-fixed top-0 end-0 p-3"
  }));
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-bg-${variant} border-0`;
  toast.setAttribute("role", "status");
  toast.innerHTML = `<div class="d-flex"><div class="toast-body">${message}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Tutup"></button></div>`;
  container.appendChild(toast);
  bootstrap.Toast.getOrCreateInstance(toast, { delay: 3500 }).show();
  toast.addEventListener("hidden.bs.toast", () => toast.remove());
};

const setActiveNav = () => {
  const current = location.pathname.split("/").pop() || "index.html";
  qsa(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) link.classList.add("active");
  });
};

const initBackToTop = () => {
  const button = qs("#backToTop");
  if (!button) return;
  window.addEventListener("scroll", () => button.classList.toggle("show", window.scrollY > 500), { passive: true });
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
};

const initAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    });
  }, { threshold: .12 });
  qsa(".fade-up").forEach((item) => observer.observe(item));
};

const renderCategories = async () => {
  const target = qs("[data-categories]");
  if (!target) return;
  const categories = await HCApi.getCategories();
  target.innerHTML = categories.map((category) => `
    <div class="col-md-6 col-lg-4">
      <a class="category-card p-4 d-block text-reset fade-up" href="kategori.html?kategori=${category.slug}">
        <i class="bi ${category.icon || "bi-grid"} fs-2 text-primary"></i>
        <h3 class="h5 mt-3 mb-1">${category.nama}</h3>
        <p class="lead-muted mb-0">Lihat panduan dan artikel ${category.nama.toLowerCase()}.</p>
      </a>
    </div>
  `).join("");
};

const initNewsletter = () => {
  const form = qs("#newsletterForm");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
    showToast("Terima kasih, email Anda sudah masuk daftar newsletter.");
  });
};

const initContactForm = () => {
  const form = qs("#contactForm");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
    showToast("Pesan berhasil disiapkan. Hubungi info@hajicerdas.id untuk tindak lanjut cepat.");
  });
};

const initNavClock = async () => {
  const target = qs("[data-nav-clock]");
  if (!target) return;
  let prayerTimes = [
    ["Subuh", "04:35"], ["Dzuhur", "12:05"], ["Ashar", "15:24"], ["Maghrib", "18:02"], ["Isya", "19:18"]
  ];
  try {
    const jadwal = await HCApi.getJadwalShalat();
    const jakarta = jadwal && jadwal.find((row) => String(row.kota).toLowerCase() === "jakarta");
    if (jakarta) {
      prayerTimes = [
        ["Subuh", jakarta.subuh], ["Dzuhur", jakarta.dzuhur], ["Ashar", jakarta.ashar], ["Maghrib", jakarta.maghrib], ["Isya", jakarta.isya]
      ];
    }
  } catch (error) {
    console.info(error.message);
  }
  const tick = () => {
    const now = new Date();
    const wib = new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit" }).format(now);
    const minutesNow = now.getHours() * 60 + now.getMinutes();
    const next = prayerTimes.find(([, time]) => {
      const [hour, minute] = time.split(":").map(Number);
      return hour * 60 + minute > minutesNow;
    }) || prayerTimes[0];
    target.innerHTML = `<strong>${wib}</strong> WIB &middot; <span class="nav-clock-next">${next[0]} ${next[1]}</span>`;
  };
  tick();
  setInterval(tick, 30000);
};

document.addEventListener("DOMContentLoaded", async () => {
  setActiveNav();
  initBackToTop();
  initNewsletter();
  initContactForm();
  await renderCategories();
  initNavClock();
  initAnimations();
  initRelativeTimeUpdater();
});

window.HCUtils = { qs, qsa, formatDate, formatDateTime, timeAgo, stripHtml, readingTime, createArticleCard, showToast, initAnimations };
