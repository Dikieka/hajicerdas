// Checklist perlengkapan Haji — tampilan kategori berbentuk accordion/card.
(function () {
  "use strict";

  var state = {
    jenis: "haji",
    gender: "wanita",
    wave: "1",
    bag: "semua",
    open: {}
  };

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function getData() {
    if (!window.HCChecklistData) return [];
    return state.jenis === "haji" ? window.HCChecklistData.haji[state.gender] : window.HCChecklistData.umrah;
  }

  function noteFor(item) {
    if (item.note && typeof item.note === "object") return item.note[state.wave] || "";
    return item.note || "";
  }

  function isVisible(item) {
    if (state.jenis !== "haji") return true;
    return !item.wave || item.wave === state.wave;
  }

  function bagLabel(bag) {
    return bag === "kecil" ? "🎒 Tas kecil" : "🧳 Koper besar";
  }

  function renderItem(gi, ii, item, cat) {
    var note = noteFor(item);
    return '<article class="hc-item-card" data-gi="' + gi + '" data-ii="' + ii + '">' +
      '<div class="hc-item-main">' +
        '<div class="hc-item-check"><i class="bi bi-check2"></i></div>' +
        '<div class="hc-item-copy">' +
          '<div class="hc-item-title"><span>' + escapeHtml(item.n) + '</span>' + (item.q ? '<b>' + escapeHtml(item.q) + '</b>' : '') + '</div>' +
          (note ? '<p>' + escapeHtml(note) + '</p>' : '') +
        '</div>' +
      '</div>' +
      '<div class="hc-item-meta"><span class="hc-bag ' + (item.bag === "kecil" ? "small-bag" : "large-bag") + '">' + bagLabel(item.bag) + '</span>' +
      (item.wave === "2" ? '<span class="hc-wave">Khusus Gelombang 2</span>' : '') + '</div>' +
    '</article>';
  }

  function render(container) {
    var data = getData();
    var html = "";
    data.forEach(function (group, gi) {
      var rows = group.items.map(function (item, ii) { return { item: item, ii: ii }; })
        .filter(function (o) { return isVisible(o.item) && (state.bag === "semua" || o.item.bag === state.bag); });
      if (!rows.length) return;

      var key = state.gender + "-" + gi;
      var isOpen = state.open[key] === true;
      var icon = (window.HCChecklistData.icons && window.HCChecklistData.icons[group.cat]) || "bi-bag";
      html += '<section class="hc-category-card ' + (isOpen ? "is-open" : "") + '" data-category-key="' + key + '">' +
        '<button type="button" class="hc-category-header" data-category-toggle aria-expanded="' + isOpen + '">' +
          '<span class="hc-category-icon"><i class="bi ' + icon + '"></i></span>' +
          '<span class="hc-category-title"><small>' + rows.length + ' barang</small><strong>' + escapeHtml(group.cat) + '</strong></span>' +
          '<span class="hc-category-chevron"><i class="bi bi-chevron-down"></i></span>' +
        '</button>' +
        '<div class="hc-category-body" ' + (isOpen ? '' : 'hidden') + '>' +
          rows.map(function (o) { return renderItem(gi, o.ii, o.item, group.cat); }).join("") +
        '</div>' +
      '</section>';
    });
    container.innerHTML = html || '<div class="surface p-4 text-center lead-muted">Tidak ada barang yang sesuai dengan filter.</div>';
    bindCategoryToggles(container);
    updateSummary(data);
    updateCurrentLabel();
  }

  function bindCategoryToggles(container) {
    container.querySelectorAll("[data-category-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var card = btn.closest(".hc-category-card");
        var key = card.getAttribute("data-category-key");
        var open = card.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        var body = card.querySelector(".hc-category-body");
        if (open) body.removeAttribute("hidden"); else body.setAttribute("hidden", "");
        state.open[key] = open;
      });
    });
  }

  function updateSummary(data) {
    var kecil = 0, besar = 0, total = 0, kategori = 0;
    data.forEach(function (group) {
      var count = 0;
      group.items.forEach(function (item) {
        if (!isVisible(item)) return;
        if (state.bag !== "semua" && item.bag !== state.bag) return;
        count++; total++;
        if (item.bag === "kecil") kecil++; else besar++;
      });
      if (count) kategori++;
    });
    var set = function (sel, val) { var el = document.querySelector(sel); if (el) el.textContent = val; };
    set("[data-sum-kategori]", kategori); set("[data-sum-total]", total);
    set("[data-sum-kecil]", kecil); set("[data-sum-besar]", besar);
  }

  function updateCurrentLabel() {
    var el = document.querySelector("[data-current-label]");
    if (!el) return;
    var gender = state.gender === "wanita" ? "Wanita" : "Pria";
    el.textContent = gender + " · Gelombang " + state.wave;
  }

  function updateActiveButtons() {
    document.querySelectorAll("[data-gender-btn]").forEach(function (b) { b.classList.toggle("active", b.dataset.genderBtn === state.gender); });
    document.querySelectorAll("[data-wave-btn]").forEach(function (b) { b.classList.toggle("active", b.dataset.waveBtn === state.wave); });
    var select = document.querySelector("[data-bag-filter]"); if (select) select.value = state.bag;
  }

  function updateWaveInfo() {
    var el = document.querySelector("[data-wave-info]");
    if (!el || !window.HCChecklistData || !window.HCChecklistData.waveInfo) return;
    el.innerHTML = '<i class="bi bi-lightbulb"></i><div>' + window.HCChecklistData.waveInfo[state.wave] + '</div>';
  }

  function renderAll() {
    var container = document.querySelector("[data-checklist]");
    if (!container || !window.HCChecklistData) return;
    updateActiveButtons(); updateWaveInfo(); render(container);
  }

  function bindExpandAll() {
    var btn = document.querySelector("[data-expand-all]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var cards = document.querySelectorAll(".hc-category-card");
      var shouldOpen = Array.from(cards).some(function (c) { return !c.classList.contains("is-open"); });
      cards.forEach(function (card) {
        var key = card.getAttribute("data-category-key");
        var toggle = card.querySelector("[data-category-toggle]");
        var body = card.querySelector(".hc-category-body");
        card.classList.toggle("is-open", shouldOpen);
        toggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
        if (shouldOpen) body.removeAttribute("hidden"); else body.setAttribute("hidden", "");
        state.open[key] = shouldOpen;
      });
      btn.innerHTML = shouldOpen ? '<i class="bi bi-arrows-collapse"></i> Tutup semua' : '<i class="bi bi-arrows-expand"></i> Buka semua';
    });
  }

  function renderChecklist(jenis) {
    state.jenis = jenis === "umrah" ? "umrah" : "haji";
    document.querySelectorAll("[data-gender-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () { state.gender = btn.dataset.genderBtn; state.open = {}; renderAll(); });
    });
    document.querySelectorAll("[data-wave-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () { state.wave = btn.dataset.waveBtn; renderAll(); });
    });
    var select = document.querySelector("[data-bag-filter]");
    if (select) select.addEventListener("change", function () { state.bag = select.value; renderAll(); });
    bindExpandAll();
    renderAll();
  }

  window.renderChecklist = renderChecklist;
})();
