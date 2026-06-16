/* Rota Livre — comunidade (lista) e perfil individual. */
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

  function travelerCard(t) {
    const badges = (t.badges || []).slice(0, 2).map((b) => `<span class="badge-chip">${escapeHtml(b)}</span>`).join("");
    return `
      <a class="traveler-card" href="perfil.html?user=${encodeURIComponent(t.id)}" aria-label="Ver perfil de ${escapeHtml(t.name)}">
        <img class="avatar" src="${t.avatar}" alt="" />
        <div>
          <div class="name">${escapeHtml(t.name)}</div>
          <div class="city">${escapeHtml(t.city)}</div>
          <div class="badges">${badges}</div>
        </div>
      </a>
    `;
  }

  function renderCommunity(container) {
    const filter = document.querySelector("[data-community-filter]");
    const grid = document.querySelector("[data-community-grid]");
    if (!grid) return;
    const travelers = window.RL.travelers;

    function update() {
      const region = filter?.value || "todos";
      const list = region === "todos"
        ? travelers
        : travelers.filter((t) => t.region === region);
      grid.innerHTML = list.length
        ? list.map(travelerCard).join("")
        : `<div class="empty-state" style="grid-column: 1 / -1;">Nenhum viajante encontrado nessa região.</div>`;
    }
    filter?.addEventListener("input", update);
    update();
  }

  function profileRouteCard(route) {
    return `
      <article class="card">
        <div class="card-media">
          <a href="rota.html?id=${encodeURIComponent(route.id)}">
            <img src="${route.hero}" alt="Foto de ${escapeHtml(route.title)}" loading="lazy" />
          </a>
        </div>
        <div class="card-body">
          <span class="card-region">${escapeHtml(route.region)}</span>
          <a class="card-title" href="rota.html?id=${encodeURIComponent(route.id)}">${escapeHtml(route.title)}</a>
          <div class="card-meta">
            <span><i data-lucide="clock"></i> ${escapeHtml(route.duration)}</span>
            <span><i data-lucide="trending-up"></i> ${escapeHtml(route.difficulty)}</span>
          </div>
        </div>
      </article>
    `;
  }

  function renderProfile(container) {
    const params = new URLSearchParams(location.search);
    const id = params.get("user");
    const traveler = id ? window.RL.getTraveler(id) : null;
    if (!traveler) {
      container.innerHTML = `
        <section class="container section">
          <h1>Viajante não encontrado</h1>
          <p><a class="btn btn-primary" href="comunidade.html">Voltar para Comunidade</a></p>
        </section>`;
      return;
    }
    document.title = `${traveler.name} — Rota Livre`;

    const badges = (traveler.badges || []).map((b) => `<span class="badge-chip">${escapeHtml(b)}</span>`).join("");
    const routes = (traveler.routes || []).map((rid) => window.RL.getRoute(rid)).filter(Boolean);
    const isFollowing = window.RL.isFollowing(traveler.id);

    container.innerHTML = `
      <section class="container">
        <nav aria-label="Você está em">
          <ol class="breadcrumb">
            <li><a href="index.html">Início</a></li>
            <li><a href="comunidade.html">Comunidade</a></li>
            <li>${escapeHtml(traveler.name)}</li>
          </ol>
        </nav>

        <header class="profile-header">
          <img class="avatar avatar-lg" src="${traveler.avatar}" alt="Foto de perfil de ${escapeHtml(traveler.name)}" />
          <div>
            <span class="eyebrow">Viajante</span>
            <h1 style="margin: 4px 0 6px;">${escapeHtml(traveler.name)}</h1>
            <p style="color: var(--color-muted); margin: 0;">${escapeHtml(traveler.city)}</p>
            <p style="max-width: 560px;">${escapeHtml(traveler.bio)}</p>
            <div class="badges">${badges}</div>
            <div class="profile-stats">
              <span><strong>${traveler.stats.routes}</strong> rotas</span>
              <span><strong>${traveler.stats.regions}</strong> regiões</span>
              <span><strong>${traveler.stats.followers}</strong> seguidores</span>
            </div>
            <div style="margin-top: 18px;">
              <button class="btn btn-primary" data-follow="${escapeHtml(traveler.id)}" aria-pressed="${isFollowing}">
                <i data-lucide="user-plus"></i> ${isFollowing ? "Seguindo" : "Seguir"}
              </button>
            </div>
          </div>
        </header>

        <section class="section" style="padding-top: 16px;">
          <div class="section-head">
            <div>
              <span class="eyebrow">Rotas publicadas</span>
              <h2>Por ${escapeHtml(traveler.name.split(" ")[0])}</h2>
            </div>
          </div>
          <div class="cards-grid">${routes.map(profileRouteCard).join("") || `<div class="empty-state">Sem rotas publicadas ainda.</div>`}</div>
        </section>
      </section>
    `;

    const followBtn = container.querySelector("[data-follow]");
    followBtn?.addEventListener("click", () => {
      const f = window.RL.toggleFollow(traveler.id);
      followBtn.setAttribute("aria-pressed", String(f));
      followBtn.innerHTML = `<i data-lucide="user-plus"></i> ${f ? "Seguindo" : "Seguir"}`;
      window.lucide?.createIcons();
      window.RL.toast(f ? `Você está seguindo ${traveler.name}` : `Você deixou de seguir ${traveler.name}`);
    });

    window.lucide?.createIcons();
  }

  ready(() => {
    const community = document.querySelector("[data-community-page]");
    const profile = document.querySelector("[data-profile-page]");
    if (community) renderCommunity(community);
    if (profile) renderProfile(profile);
  });
})();
