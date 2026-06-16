/* Rota Livre — detalhe de rota: hero, carrossel, favoritar, compartilhar. */
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

  function renderNotFound(container) {
    container.innerHTML = `
      <section class="container section">
        <h1>Rota não encontrada</h1>
        <p>Talvez o link esteja errado ou a rota tenha mudado de endereço.</p>
        <p><a href="explorar.html" class="btn btn-primary">Voltar para Explorar</a></p>
      </section>
    `;
  }

  function carouselTemplate(route) {
    const slides = (route.gallery || [route.hero]).map((src, i) =>
      `<img src="${src}" alt="Imagem ${i + 1} de ${escapeHtml(route.title)}" loading="lazy" />`
    ).join("");
    const dots = (route.gallery || [route.hero]).map((_s, i) =>
      `<button class="carousel-dot" type="button" data-dot="${i}" aria-label="Ir para imagem ${i + 1}" aria-current="${i === 0 ? "true" : "false"}"></button>`
    ).join("");
    return `
      <div class="carousel" data-carousel tabindex="0" aria-roledescription="carrossel" aria-label="Galeria de fotos de ${escapeHtml(route.title)}">
        <div class="carousel-track" data-carousel-track>${slides}</div>
        <button class="carousel-btn" data-dir="prev" type="button" aria-label="Foto anterior"><i data-lucide="chevron-left"></i></button>
        <button class="carousel-btn" data-dir="next" type="button" aria-label="Próxima foto"><i data-lucide="chevron-right"></i></button>
        <div class="carousel-dots" role="tablist">${dots}</div>
      </div>
    `;
  }

  function commentsTemplate() {
    const stub = [
      { name: "Lia", text: "Fiz essa rota mês passado, dica de ouro sobre os calçados.", date: "há 1 semana", avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=120&q=70" },
      { name: "Bento", text: "A parte do dia 3 foi mais puxada do que parece — vão preparados.", date: "há 3 dias", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&q=70" }
    ];
    return stub.map((c) => `
      <div class="comment">
        <img class="avatar" src="${c.avatar}" alt="" />
        <div>
          <div class="comment-name">${escapeHtml(c.name)}</div>
          <div class="comment-meta">${escapeHtml(c.date)}</div>
          <p style="margin: 8px 0 0;">${escapeHtml(c.text)}</p>
        </div>
      </div>
    `).join("");
  }

  function render(container, route) {
    const author = window.RL.getTraveler(route.author);
    const isFav = window.RL.isFavorited(route.id);
    const tagsHtml = (route.tags || []).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("");
    const itinerary = (route.itinerary || []).map((d) => `
      <li>
        <span class="itinerary-day">D${d.day}</span>
        <div>
          <h3>${escapeHtml(d.title)}</h3>
          <p style="margin: 0;">${escapeHtml(d.body)}</p>
        </div>
      </li>
    `).join("");
    const tips = (route.tips || []).map((t) => `<li>${escapeHtml(t)}</li>`).join("");

    container.innerHTML = `
      <section class="container">
        <nav aria-label="Você está em">
          <ol class="breadcrumb">
            <li><a href="index.html">Início</a></li>
            <li><a href="explorar.html">Explorar</a></li>
            <li>${escapeHtml(route.title)}</li>
          </ol>
        </nav>

        <header style="margin-bottom: 16px;">
          <span class="eyebrow">${escapeHtml(route.region)} · ${escapeHtml(route.state)}</span>
          <h1>${escapeHtml(route.title)}</h1>
          <p style="font-size: 1.05rem; color: var(--color-muted); max-width: 720px;">${escapeHtml(route.summary)}</p>
          <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 18px;">
            <button class="btn btn-primary" data-fav="${escapeHtml(route.id)}" aria-pressed="${isFav}">
              <i data-lucide="heart"></i> ${isFav ? "Salvo" : "Favoritar"}
            </button>
            <button class="btn btn-ghost" data-share>
              <i data-lucide="share-2"></i> Compartilhar
            </button>
            ${author ? `<a class="btn btn-ghost" href="perfil.html?user=${encodeURIComponent(author.id)}">
              <i data-lucide="user"></i> Por ${escapeHtml(author.name)}
            </a>` : ""}
          </div>
        </header>

        ${carouselTemplate(route)}

        <div class="route-meta">
          <div><span class="label">Duração</span><span class="value">${escapeHtml(route.duration)}</span></div>
          <div><span class="label">Dificuldade</span><span class="value">${escapeHtml(route.difficulty)}</span></div>
          <div><span class="label">Custo médio</span><span class="value">${escapeHtml(route.cost)}</span></div>
          <div><span class="label">Melhor época</span><span class="value">${escapeHtml(route.bestSeason)}</span></div>
        </div>

        <div class="tags" style="margin: 16px 0 32px;">${tagsHtml}</div>

        <section aria-labelledby="itinerary-h">
          <h2 id="itinerary-h">Itinerário dia a dia</h2>
          <ol class="itinerary-list">${itinerary}</ol>
        </section>

        <section aria-labelledby="tips-h" style="margin-top: 40px;">
          <h2 id="tips-h">Dicas de quem foi</h2>
          <ul class="tips-list">${tips}</ul>
        </section>

        <section aria-labelledby="comments-h" style="margin-top: 40px; padding-bottom: 40px;">
          <h2 id="comments-h">Conversas sobre essa rota</h2>
          <div class="comments">${commentsTemplate()}</div>
        </section>
      </section>
    `;
  }

  function initCarousel(root) {
    const car = root.querySelector("[data-carousel]");
    if (!car) return;
    const track = car.querySelector("[data-carousel-track]");
    const dots = Array.from(car.querySelectorAll("[data-dot]"));
    const slides = track.children.length;
    let idx = 0;

    function go(n) {
      idx = (n + slides) % slides;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, i) => d.setAttribute("aria-current", i === idx ? "true" : "false"));
    }

    car.addEventListener("click", (e) => {
      const dirBtn = e.target.closest("[data-dir]");
      if (dirBtn) go(idx + (dirBtn.dataset.dir === "next" ? 1 : -1));
      const dot = e.target.closest("[data-dot]");
      if (dot) go(Number(dot.dataset.dot));
    });
    car.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(idx + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(idx - 1); }
    });
  }

  function initActions(root, route) {
    const favBtn = root.querySelector("[data-fav]");
    favBtn?.addEventListener("click", () => {
      const fav = window.RL.toggleFavorite(route.id);
      favBtn.setAttribute("aria-pressed", String(fav));
      favBtn.innerHTML = `<i data-lucide="heart"></i> ${fav ? "Salvo" : "Favoritar"}`;
      window.lucide?.createIcons();
      window.RL.toast(fav ? "Rota salva nos favoritos" : "Rota removida dos favoritos");
    });

    const shareBtn = root.querySelector("[data-share]");
    shareBtn?.addEventListener("click", async () => {
      const url = location.href;
      const data = { title: route.title, text: route.summary, url };
      try {
        if (navigator.share) await navigator.share(data);
        else {
          await navigator.clipboard.writeText(url);
          window.RL.toast("Link copiado para a área de transferência");
        }
      } catch (_e) { /* user cancelled */ }
    });
  }

  ready(() => {
    const container = document.querySelector("[data-route-detail]");
    if (!container) return;
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const route = id ? window.RL.allRoutes().find((r) => r.id === id) : null;
    if (!route) return renderNotFound(container);

    document.title = `${route.title} — Rota Livre`;
    render(container, route);
    initCarousel(container);
    initActions(container, route);
    window.lucide?.createIcons();
  });
})();
