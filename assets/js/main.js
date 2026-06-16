/* Rota Livre — comportamentos compartilhados:
 * - menu mobile + acessibilidade
 * - toggle de tema (persistente)
 * - ano dinâmico no rodapé
 * - toast pós-redirect
 * - favoritar (compartilhado entre páginas)
 */
(function () {
  const STORAGE_FAVS = "rotaLivre.favorites";
  const STORAGE_FOLLOWS = "rotaLivre.follows";
  const STORAGE_THEME = "rotaLivre.theme";

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_THEME);
    if (saved) applyTheme(saved);
    else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) applyTheme("dark");

    const btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(STORAGE_THEME, next);
      btn.setAttribute("aria-label", next === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro");
    });
  }

  function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const list = document.querySelector(".nav-list");
    if (!toggle || !list) return;
    toggle.addEventListener("click", () => {
      const open = list.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    list.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        list.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  function initFooterYear() {
    const el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  function initFlash() {
    try {
      const msg = sessionStorage.getItem("rotaLivre.flash");
      if (msg) {
        sessionStorage.removeItem("rotaLivre.flash");
        window.RL.toast(msg);
      }
    } catch (_e) { /* noop */ }
  }

  function favorites() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_FAVS) || "[]");
    } catch (_e) {
      return [];
    }
  }
  function isFavorited(id) { return favorites().includes(id); }
  function toggleFavorite(id) {
    const list = favorites();
    const idx = list.indexOf(id);
    if (idx >= 0) list.splice(idx, 1);
    else list.push(id);
    localStorage.setItem(STORAGE_FAVS, JSON.stringify(list));
    return idx < 0;
  }

  function follows() {
    try { return JSON.parse(localStorage.getItem(STORAGE_FOLLOWS) || "[]"); }
    catch (_e) { return []; }
  }
  function toggleFollow(id) {
    const list = follows();
    const idx = list.indexOf(id);
    if (idx >= 0) list.splice(idx, 1);
    else list.push(id);
    localStorage.setItem(STORAGE_FOLLOWS, JSON.stringify(list));
    return idx < 0;
  }
  function isFollowing(id) { return follows().includes(id); }

  function toast(message, ms = 3200) {
    let node = document.querySelector(".toast");
    if (!node) {
      node = document.createElement("div");
      node.className = "toast";
      node.setAttribute("role", "status");
      node.setAttribute("aria-live", "polite");
      document.body.appendChild(node);
    }
    node.textContent = message;
    requestAnimationFrame(() => node.classList.add("show"));
    clearTimeout(node._t);
    node._t = setTimeout(() => node.classList.remove("show"), ms);
  }

  function setActiveNav() {
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-list a").forEach((a) => {
      const target = a.getAttribute("href");
      if (!target) return;
      if (target === path) a.setAttribute("aria-current", "page");
    });
  }

  // Public API
  window.RL = Object.assign(window.RL || {}, {
    favorites, isFavorited, toggleFavorite,
    follows, toggleFollow, isFollowing,
    toast, applyTheme
  });

  ready(() => {
    initTheme();
    initMenu();
    initFooterYear();
    initFlash();
    setActiveNav();
    if (window.lucide?.createIcons) window.lucide.createIcons();
  });
})();
