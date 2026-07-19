const getParam = (name) => new URLSearchParams(location.search).get(name);

const safeText = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;"
}[char]));

const getStoryId = (story) => String(story.id || story.judul || "").trim();
const getStoryLike = (story) => Number(story.like || 0);
const getLikedStories = () => {
  try {
    return JSON.parse(localStorage.getItem("hajicerdas-liked-stories") || "[]");
  } catch (error) {
    return [];
  }
};
const setLikedStory = (id) => {
  try {
    const liked = new Set(getLikedStories());
    liked.add(id);
    localStorage.setItem("hajicerdas-liked-stories", JSON.stringify([...liked]));
  } catch (error) {
    console.info(error.message);
  }
};
const unsetLikedStory = (id) => {
  try {
    const liked = new Set(getLikedStories());
    liked.delete(id);
    localStorage.setItem("hajicerdas-liked-stories", JSON.stringify([...liked]));
  } catch (error) {
    console.info(error.message);
  }
};
const hasLikedStory = (id) => getLikedStories().includes(id);

const getAbsoluteUrl = (path = location.href) => {
  try {
    return new URL(path, location.href).href;
  } catch (error) {
    return location.href;
  }
};

const copyText = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.left = "-9999px";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
};

const shareContent = async ({ title, text = "", url = location.href }) => {
  const shareData = {
    title: String(title || "HajiCerdas").slice(0, 120),
    text: String(text || "").replace(/\s+/g, " ").trim().slice(0, 180),
    url: getAbsoluteUrl(url)
  };
  try {
    const mobileBrowser = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "");
    if (navigator.share && window.isSecureContext && mobileBrowser) {
      await navigator.share(shareData);
      return;
    }
    await copyText(shareData.url);
    HCUtils.showToast("Link berhasil disalin.");
  } catch (error) {
    if (error.name === "AbortError") return;
    await copyText(shareData.url);
    HCUtils.showToast("Link berhasil disalin.");
  }
};

const getStoryShareUrl = (id) => getAbsoluteUrl(`pengalaman.html#${encodeURIComponent(id)}`);

const createStoryCard = (story, { headingLevel = 3, compact = false } = {}) => {
  const id = getStoryId(story);
  const liked = hasLikedStory(id);
  const Heading = `h${headingLevel}`;
  return `
    <div class="${compact ? "col-md-6 col-xl-4" : "col-md-6"}" id="${safeText(id)}">
      <article class="story-card p-4 fade-up">
        <span class="badge-soft mb-3"><i class="bi bi-chat-heart"></i>${safeText(story.kategori || "Cerita Jamaah")}</span>
        <${Heading} class="${compact ? "h5" : "h4"} article-title">${safeText(story.judul)}</${Heading}>
        <p class="lead-muted">${safeText(story.pengalaman)}</p>
        <p class="small"><strong>Tips:</strong> ${safeText(story.tips || "Ikuti arahan pembimbing dan simpan kontak rombongan.")}</p>
        <div class="meta">
          <span><i class="bi bi-person"></i> ${safeText(story.nama)}${story.asal ? `, ${safeText(story.asal)}` : ""}</span>
          <span><i class="bi bi-calendar3"></i> ${HCUtils.formatDate(story.tanggal)}</span>
        </div>
        <div class="d-flex flex-wrap gap-2 mt-3">
          <button class="btn btn-sm ${liked ? "btn-primary" : "btn-outline-primary"} story-like-btn" type="button" data-like-story="${safeText(id)}" aria-pressed="${liked}" title="${liked ? "Batalkan suka" : "Sukai cerita"}">
            <i class="bi ${liked ? "bi-heart-fill" : "bi-heart"}"></i> <span data-like-label>${liked ? "Disukai" : "Suka"}</span> <span data-like-count>${getStoryLike(story)}</span>
          </button>
          <button class="btn btn-sm btn-outline-primary" type="button" data-share-story="${safeText(id)}" data-share-title="${safeText(story.judul)}" data-share-text="${safeText(story.pengalaman)}">
            <i class="bi bi-share"></i> Bagikan
          </button>
        </div>
      </article>
    </div>
  `;
};

const bindStoryActions = (root = document) => {
  if (root.dataset.storyActionsBound) return;
  root.dataset.storyActionsBound = "true";
  root.addEventListener("click", async (event) => {
    const likeButton = event.target.closest("[data-like-story]");
    if (likeButton) {
      const id = likeButton.dataset.likeStory;
      if (!id) return;
      const count = likeButton.querySelector("[data-like-count]");
      const icon = likeButton.querySelector("i");
      const label = likeButton.querySelector("[data-like-label]");
      const current = Number(count?.textContent || 0);
      const liked = hasLikedStory(id);
      likeButton.disabled = true;
      likeButton.classList.add("is-loading");
      try {
        const result = liked ? await HCApi.unlikeExperience(id) : await HCApi.likeExperience(id);
        const fallbackCount = liked ? Math.max(0, current - 1) : current + 1;
        const nextCount = Number(result.like || result.data?.like || fallbackCount);
        if (count) count.textContent = nextCount;
        if (liked) {
          if (icon) icon.className = "bi bi-heart";
          if (label) label.textContent = "Suka";
          likeButton.classList.remove("btn-primary");
          likeButton.classList.add("btn-outline-primary");
          likeButton.setAttribute("aria-pressed", "false");
          likeButton.setAttribute("title", "Sukai cerita");
          unsetLikedStory(id);
          HCUtils.showToast("Like dibatalkan.");
        } else {
          if (icon) icon.className = "bi bi-heart-fill";
          if (label) label.textContent = "Disukai";
          likeButton.classList.remove("btn-outline-primary");
          likeButton.classList.add("btn-primary");
          likeButton.setAttribute("aria-pressed", "true");
          likeButton.setAttribute("title", "Batalkan suka");
          setLikedStory(id);
          HCUtils.showToast("Terima kasih, like Anda sudah tercatat.");
        }
      } catch (error) {
        HCUtils.showToast(error.message, "danger");
      } finally {
        likeButton.disabled = false;
        likeButton.classList.remove("is-loading");
      }
      return;
    }

    const shareButton = event.target.closest("[data-share-story]");
    if (shareButton) {
      const id = shareButton.dataset.shareStory;
      await shareContent({
        title: shareButton.dataset.shareTitle || "Pengalaman Jamaah",
        text: shareButton.dataset.shareText || "",
        url: getStoryShareUrl(id)
      });
    }
  });
};

const createFeaturedArticleCard = (article) => `
  <article class="featured-article-card fade-up">
    <a class="featured-article-media" href="detail.html?slug=${encodeURIComponent(article.slug)}" aria-label="Baca ${safeText(article.judul)}">
      <img src="${article.gambar || "assets/images/article-placeholder.svg"}" alt="${safeText(article.judul)}" loading="eager" onerror="this.src='assets/images/article-placeholder.svg'">
      <span class="badge-soft featured-article-badge"><i class="bi bi-bookmark"></i>${safeText(article.kategori)}</span>
    </a>
    <div class="card-body-pad">
      <h3 class="article-title mb-2"><a class="text-reset" href="detail.html?slug=${encodeURIComponent(article.slug)}">${safeText(article.judul)}</a></h3>
      <p class="lead-muted mb-3">${safeText(article.ringkasan)}</p>
      <div class="meta">
        <span><i class="bi bi-person"></i> ${safeText(article.penulis || "Redaksi")}</span>
        <span><i class="bi bi-clock"></i> ${HCUtils.readingTime(article.isi)} menit baca</span>
      </div>
      <div class="meta mt-2 article-time" title="${HCUtils.formatDateTime(article.tanggal)}">
        <span><i class="bi bi-calendar3"></i> ${HCUtils.formatDate(article.tanggal)}</span>
        <span><i class="bi bi-clock-history"></i> <span data-time-ago="${article.tanggal}">${HCUtils.timeAgo(article.tanggal)}</span></span>
      </div>
    </div>
  </article>
`;

const createArticleListItem = (article) => `
  <a class="article-list-item fade-up" href="detail.html?slug=${encodeURIComponent(article.slug)}">
    <span class="article-list-thumb">
      <img src="${article.gambar || "assets/images/article-placeholder.svg"}" alt="" loading="lazy" onerror="this.src='assets/images/article-placeholder.svg'">
    </span>
    <span class="article-list-body">
      <span class="article-list-title">${safeText(article.judul)}</span>
      <span class="article-list-date"><i class="bi bi-calendar3"></i> ${HCUtils.formatDate(article.tanggal)}</span>
    </span>
  </a>
`;

const renderHomeContent = async () => {
  const featured = document.querySelector("[data-featured-article]");
  const articleList = document.querySelector("[data-article-list]");
  const stories = document.querySelector("[data-stories]");
  if (!featured && !articleList && !stories) return;
  const [articles, experiences] = await Promise.all([HCApi.getArticles(), HCApi.getExperiences()]);
  if (featured && articles.length) featured.innerHTML = createFeaturedArticleCard(articles[0]);
  if (articleList) articleList.innerHTML = articles.slice(1, 5).map(createArticleListItem).join("");
  if (stories) {
    const mostLiked = experiences.slice().sort((a, b) => getStoryLike(b) - getStoryLike(a)).slice(0, 3);
    stories.innerHTML = mostLiked.map((story) => createStoryCard(story, { headingLevel: 3, compact: true })).join("");
    bindStoryActions(stories);
  }
  HCUtils.initAnimations();
};

const renderDetail = async () => {
  const target = document.querySelector("[data-article-detail]");
  if (!target) return;
  const slug = getParam("slug") || "checklist-persiapan-haji";
  const article = await HCApi.getArticle(slug);
  if (!article) {
    location.href = "404.html";
    return;
  }
  document.title = `${article.judul} | HajiCerdas`;
  document.querySelector("meta[name='description']")?.setAttribute("content", article.ringkasan);
  target.innerHTML = `
    <nav aria-label="Breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.html">Beranda</a></li>
        <li class="breadcrumb-item"><a href="artikel.html">Artikel</a></li>
        <li class="breadcrumb-item active" aria-current="page">${safeText(article.judul)}</li>
      </ol>
    </nav>
    <span class="badge-soft mb-3">${safeText(article.kategori)}</span>
    <h1 class="display-5 fw-bold">${safeText(article.judul)}</h1>
    <p class="lead lead-muted">${safeText(article.ringkasan)}</p>
    <div class="meta mb-4">
      <span><i class="bi bi-person"></i> ${safeText(article.penulis || "Redaksi")}</span>
      <span title="${HCUtils.formatDateTime(article.tanggal)}"><i class="bi bi-calendar3"></i> ${HCUtils.formatDate(article.tanggal)}</span>
      <span><i class="bi bi-clock-history"></i> <span data-time-ago="${article.tanggal}">${HCUtils.timeAgo(article.tanggal)}</span></span>
      <span><i class="bi bi-clock"></i> ${HCUtils.readingTime(article.isi)} menit baca</span>
    </div>
    <img class="rounded-4 mb-4 w-100" src="${article.gambar || "assets/images/article-placeholder.svg"}" alt="${safeText(article.judul)}" loading="eager" onerror="this.src='assets/images/article-placeholder.svg'">
    <div class="article-content">${article.isi}</div>
    ${article.sumber_referensi ? `
    <div class="surface p-3 p-md-4 mt-4">
      <p class="small fw-bold mb-1"><i class="bi bi-journal-check"></i> Rujukan &amp; catatan sumber</p>
      <p class="small lead-muted mb-0">${safeText(article.sumber_referensi)}</p>
    </div>` : ""}
    <div class="d-flex flex-wrap gap-2 mt-4">
      <button class="btn btn-outline-primary" type="button" data-share><i class="bi bi-share"></i> Bagikan</button>
      <a class="btn btn-primary" href="kirim.html"><i class="bi bi-pencil-square"></i> Kirim Pengalaman</a>
    </div>
  `;
  document.querySelector("[data-share]")?.addEventListener("click", () => shareContent({
    title: article.judul,
    text: article.ringkasan,
    url: location.href
  }));
};

const initExperienceForm = () => {
  const form = document.querySelector("#experienceForm");
  if (!form) return;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    const submit = form.querySelector("[type='submit']");
    submit.disabled = true;
    submit.innerHTML = "<span class='spinner-border spinner-border-sm'></span> Mengirim...";
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      await HCApi.postExperience(payload);
      form.reset();
      form.classList.remove("was-validated");
      HCUtils.showToast("Pengalaman terkirim. Admin akan meninjau sebelum publish.");
    } catch (error) {
      HCUtils.showToast(error.message, "danger");
    } finally {
      submit.disabled = false;
      submit.innerHTML = "<i class='bi bi-send'></i> Kirim Pengalaman";
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  renderHomeContent();
  renderDetail();
  initExperienceForm();
});
