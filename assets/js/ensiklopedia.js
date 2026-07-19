const renderEnsiklopediaPage = async () => {
  const root = document.querySelector("[data-ensiklopedia]");
  if (!root) return;
  const halaman = root.getAttribute("data-ensiklopedia");
  const page = await HCApi.getEnsiklopedia(halaman);
  // If neither Apps Script nor the local fallback returned data, keep the
  // static HTML already in the page untouched instead of blanking it out.
  if (!page) return;

  document.title = `${page.judul} | HajiCerdas`;
  document
    .querySelector("meta[name='description']")
    ?.setAttribute("content", (page.ringkasan || "").replace(/<[^>]+>/g, ""));

  const eyebrowEl = document.querySelector("[data-ensiklopedia-eyebrow]");
  const titleEl = document.querySelector("[data-ensiklopedia-title]");
  const leadEl = document.querySelector("[data-ensiklopedia-lead]");
  const crumbEl = document.querySelector("[data-ensiklopedia-crumb]");
  const sourceEl = document.querySelector("[data-ensiklopedia-source]");
  const bodyEl = document.querySelector("[data-ensiklopedia-body]");

  if (eyebrowEl && page.eyebrow) eyebrowEl.textContent = page.eyebrow;
  if (titleEl && page.judul) titleEl.textContent = page.judul;
  if (leadEl && page.ringkasan) leadEl.innerHTML = page.ringkasan;
  if (crumbEl && page.judul) crumbEl.textContent = page.judul;
  if (sourceEl && page.source) sourceEl.textContent = page.source;
  if (bodyEl && page.isi) bodyEl.innerHTML = page.isi;
};

document.addEventListener("DOMContentLoaded", renderEnsiklopediaPage);
