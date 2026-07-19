const normalize = (value = "") => value.toString().toLowerCase().trim();

const filterArticles = (articles, query = "", category = "") => {
  const keyword = normalize(query);
  const selectedCategory = normalize(category);
  return articles.filter((article) => {
    const haystack = normalize(`${article.judul} ${article.ringkasan} ${article.kategori} ${article.penulis}`);
    const matchKeyword = !keyword || haystack.includes(keyword);
    const matchCategory = !selectedCategory || normalize(article.kategori) === selectedCategory;
    return matchKeyword && matchCategory;
  });
};

const initArticleSearch = async () => {
  const list = document.querySelector("[data-article-list]");
  if (!list) return;
  const searchInput = document.querySelector("[data-search-input]");
  const categoryInput = document.querySelector("[data-category-filter]");
  const pagination = document.querySelector("[data-pagination]");
  const count = document.querySelector("[data-result-count]");
  const perPage = 6;
  let page = 1;
  let articles = await HCApi.getArticles();
  const initialQuery = new URLSearchParams(location.search).get("q");
  if (searchInput && initialQuery) searchInput.value = initialQuery;
  const initialCategory = new URLSearchParams(location.search).get("kategori");

  const categories = [...new Set(articles.map((item) => item.kategori))];
  if (categoryInput && !categoryInput.children.length) {
    categoryInput.innerHTML = `<option value="">Semua kategori</option>${categories.map((item) => `<option value="${item}">${item}</option>`).join("")}`;
  }
  if (categoryInput && initialCategory) {
    const match = categories.find((item) => normalize(item) === normalize(initialCategory));
    if (match) categoryInput.value = match;
  }

  const render = () => {
    const results = filterArticles(articles, searchInput?.value, categoryInput?.value);
    const totalPages = Math.max(1, Math.ceil(results.length / perPage));
    page = Math.min(page, totalPages);
    const start = (page - 1) * perPage;
    const items = results.slice(start, start + perPage);
    list.innerHTML = items.length ? items.map(HCUtils.createArticleCard).join("") : `<div class="col-12"><div class="surface p-4 text-center">Artikel belum ditemukan.</div></div>`;
    if (count) count.textContent = `${results.length} artikel ditemukan`;
    if (pagination) {
      pagination.innerHTML = Array.from({ length: totalPages }, (_, index) => `
        <li class="page-item ${page === index + 1 ? "active" : ""}">
          <button class="page-link" type="button" data-page="${index + 1}" aria-label="Halaman ${index + 1}">${index + 1}</button>
        </li>
      `).join("");
    }
    HCUtils.initAnimations();
  };

  searchInput?.addEventListener("input", () => { page = 1; render(); });
  categoryInput?.addEventListener("change", () => { page = 1; render(); });
  pagination?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-page]");
    if (!button) return;
    page = Number(button.dataset.page);
    render();
  });
  render();
};

const filterExperiences = (experiences, query = "", category = "") => {
  const keyword = normalize(query);
  const selectedCategory = normalize(category);
  return experiences.filter((story) => {
    const haystack = normalize(`${story.judul} ${story.pengalaman} ${story.kategori} ${story.nama} ${story.asal} ${story.tips}`);
    const matchKeyword = !keyword || haystack.includes(keyword);
    const matchCategory = !selectedCategory || normalize(story.kategori) === selectedCategory;
    return matchKeyword && matchCategory;
  });
};

const initExperienceSearch = async () => {
  const list = document.querySelector("[data-experience-list]");
  if (!list) return;
  const searchInput = document.querySelector("[data-search-input]");
  const categoryInput = document.querySelector("[data-category-filter]");
  const count = document.querySelector("[data-result-count]");
  let experiences = await HCApi.getExperiences();
  experiences = experiences.slice().sort((a, b) => getStoryLike(b) - getStoryLike(a));

  const initialQuery = new URLSearchParams(location.search).get("q");
  if (searchInput && initialQuery) searchInput.value = initialQuery;
  const initialCategory = new URLSearchParams(location.search).get("kategori");

  const categories = [...new Set(experiences.map((item) => item.kategori).filter(Boolean))];
  if (categoryInput && !categoryInput.children.length) {
    categoryInput.innerHTML = `<option value="">Semua kategori</option>${categories.map((item) => `<option value="${item}">${item}</option>`).join("")}`;
  }
  if (categoryInput && initialCategory) {
    const match = categories.find((item) => normalize(item) === normalize(initialCategory));
    if (match) categoryInput.value = match;
  }

  const render = () => {
    const results = filterExperiences(experiences, searchInput?.value, categoryInput?.value);
    list.innerHTML = results.length
      ? results.map((story) => createStoryCard(story, { headingLevel: 2 })).join("")
      : `<div class="col-12"><div class="surface p-4 text-center">Cerita pengalaman belum ditemukan.</div></div>`;
    if (count) count.textContent = `${results.length} cerita ditemukan`;
    bindStoryActions(list);
    HCUtils.initAnimations();
  };

  searchInput?.addEventListener("input", render);
  categoryInput?.addEventListener("change", render);
  render();
};

document.addEventListener("DOMContentLoaded", () => {
  initArticleSearch();
  initExperienceSearch();
});
