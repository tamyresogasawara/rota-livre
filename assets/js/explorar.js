/* Rota Livre — listagem de rotas com busca, filtros e ordenação. */
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));
  }

  function routeCard(route, isFav) {
    const tags = (route.tags || []).slice(0, 3).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("");
    const href = `rota.html?id=${encodeURIComponent(route.id)}`;
    return `
      <article class="card" aria-labelledby="card-${escapeHtml(route.id)}-title">
        <div class="card-media">
          <a href="${href}" aria-label="Ver detalhes de ${escapeHtml(route.title)}">
            <img src="${route.hero}" alt="Paisagem de ${escapeHtml(route.title)}" loading="lazy" />
          </a>
          <button
            class="fav-button"
            type="button"
            data-fav="${escapeHtml(route.id)}"
            aria-pressed="${isFav ? "true" : "false"}"
            aria-label="${isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}: ${escapeHtml(route.title)}"
          >
            <i data-lucide="heart"></i>
          </button>
        </div>
        <div class="card-body">
          <span class="card-region">${escapeHtml(route.region)} · ${escapeHtml(route.state)}</span>
          <a class="card-title" id="card-${escapeHtml(route.id)}-title" href="${href}">${escapeHtml(route.title)}</a>
          <p style="color: var(--color-muted); font-size: .92rem; margin: 4px 0 8px;">${escapeHtml(route.summary)}</p>
          <div class="tags">${tags}</div>
          <div class="card-meta">
            <span><i data-lucide="clock"></i> ${escapeHtml(route.duration)}</span>
            <span><i data-lucide="trending-up"></i> ${escapeHtml(route.difficulty)}</span>
            <span><i data-lucide="heart"></i> ${route.likes}</span>
          </div>
        </div>
      </article>
    `;
  }

  function compare(a, b, sortKey) {
    if (sortKey === "likes") return (b.likes || 0) - (a.likes || 0);
    return new Date(b.date) - new Date(a.date);
  }

  function applyFilters(routes, { q, region, duration, difficulty, sort }) {
    const ql = (q || "").trim().toLowerCase();
    return routes
      .filter((r) => {
        if (region && region !== "todos" && r.region !== region) return false;
        if (duration && duration !== "todas" && r.durationBucket !== duration) return false;
        if (difficulty && difficulty !== "todos" && r.difficulty !== difficulty) return false;
        if (!ql) return true;
        const hay = [r.title, r.summary, r.region, r.state, ...(r.tags || [])].join(" ").toLowerCase();
        return hay.includes(ql);
      })
      .sort((a, b) => compare(a, b, sort));
  }

  function render(grid, results, meta) {
    if (!results.length) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <p><strong>Nenhuma rota encontrada.</strong></p>
          <p>Tente outra palavra, mude a região ou limpe os filtros.</p>
        </div>
      `;
    } else {
      grid.innerHTML = results.map((r) => routeCard(r, window.RL.isFavorited(r.id))).join("");
    }
    meta.textContent = `${results.length} ${results.length === 1 ? "rota" : "rotas"} encontradas`;
    window.lucide?.createIcons();
  }

  ready(() => {
    const grid = document.querySelector("[data-routes-grid]");
    if (!grid) return;
    const meta = document.querySelector("[data-routes-count]");
    const form = document.querySelector("[data-routes-toolbar]");
    const clear = document.querySelector("[data-clear-filters]");

    const all = window.RL.allRoutes();
    const state = { q: "", region: "todos", duration: "todas", difficulty: "todos", sort: "recent" };

    function update() {
      const results = applyFilters(all, state);
      render(grid, results, meta);
    }

    form.addEventListener("input", (e) => {
      const t = e.target;
      if (!t.name) return;
      state[t.name] = t.value;
      update();
    });
    form.addEventListener("change", (e) => {
      const t = e.target;
      if (!t.name) return;
      state[t.name] = t.value;
      update();
    });
    form.addEventListener("submit", (e) => e.preventDefault());

    clear?.addEventListener("click", () => {
      form.reset();
      Object.assign(state, { q: "", region: "todos", duration: "todas", difficulty: "todos", sort: "recent" });
      update();
    });

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-fav]");
      if (!btn) return;
      const id = btn.dataset.fav;
      const fav = window.RL.toggleFavorite(id);
      btn.setAttribute("aria-pressed", String(fav));
      const route = all.find((r) => r.id === id);
      btn.setAttribute(
        "aria-label",
        `${fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}: ${route ? route.title : ""}`
      );
      window.RL.toast(fav ? "Adicionado aos favoritos" : "Removido dos favoritos");
    });

    update();
  });
})();
