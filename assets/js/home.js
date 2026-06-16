/* Rota Livre — Home: rotas em destaque + viajantes em destaque. */
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function routeCard(route, isFav) {
    const href = `rota.html?id=${encodeURIComponent(route.id)}`;
    return `
      <article class="card">
        <div class="card-media">
          <a href="${href}" aria-label="Ver ${escapeHtml(route.title)}">
            <img src="${route.hero}" alt="Paisagem de ${escapeHtml(route.title)}" loading="lazy" />
          </a>
          <button class="fav-button" type="button" data-fav="${escapeHtml(route.id)}"
                  aria-pressed="${isFav}" aria-label="${isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}">
            <i data-lucide="heart"></i>
          </button>
        </div>
        <div class="card-body">
          <span class="card-region">${escapeHtml(route.region)} · ${escapeHtml(route.state)}</span>
          <a class="card-title" href="${href}">${escapeHtml(route.title)}</a>
          <p style="color: var(--color-muted); font-size: .92rem;">${escapeHtml(route.summary)}</p>
          <div class="card-meta">
            <span><i data-lucide="clock"></i> ${escapeHtml(route.duration)}</span>
            <span><i data-lucide="trending-up"></i> ${escapeHtml(route.difficulty)}</span>
          </div>
        </div>
      </article>
    `;
  }

  function travelerMini(t) {
    return `
      <a class="traveler-card" href="perfil.html?user=${encodeURIComponent(t.id)}" aria-label="Ver perfil de ${escapeHtml(t.name)}">
        <img class="avatar" src="${t.avatar}" alt="" />
        <div>
          <div class="name">${escapeHtml(t.name)}</div>
          <div class="city">${escapeHtml(t.city)}</div>
        </div>
      </a>
    `;
  }

  ready(() => {
    const featured = document.querySelector("[data-featured-grid]");
    const travelers = document.querySelector("[data-featured-travelers]");
    if (featured) {
      const top4 = [...window.RL.routes].sort((a, b) => b.likes - a.likes).slice(0, 4);
      featured.innerHTML = top4.map((r) => routeCard(r, window.RL.isFavorited(r.id))).join("");
      featured.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-fav]");
        if (!btn) return;
        const id = btn.dataset.fav;
        const fav = window.RL.toggleFavorite(id);
        btn.setAttribute("aria-pressed", String(fav));
        window.RL.toast(fav ? "Adicionado aos favoritos" : "Removido dos favoritos");
      });
    }
    if (travelers) {
      const top3 = window.RL.travelers.slice(0, 3);
      travelers.innerHTML = top3.map(travelerMini).join("");
    }
    window.lucide?.createIcons();
  });
})();
