/* Rota Livre — formulário de novo relato com validação acessível. */
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function slugify(str) {
    return String(str)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function validate(form) {
    const fields = form.querySelectorAll("[data-required]");
    let firstInvalid = null;
    fields.forEach((field) => {
      const row = field.closest(".form-row");
      const min = Number(field.dataset.minlen || 0);
      const val = (field.value || "").trim();
      const bad = !val || val.length < min;
      row.dataset.invalid = bad ? "true" : "false";
      if (bad && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      const live = form.querySelector("[data-form-error]");
      if (live) live.textContent = "Confira os campos destacados antes de enviar.";
    } else {
      const live = form.querySelector("[data-form-error]");
      if (live) live.textContent = "";
    }
    return !firstInvalid;
  }

  function readForm(form) {
    const fd = new FormData(form);
    return {
      title: String(fd.get("title") || "").trim(),
      region: String(fd.get("region") || "").trim(),
      state: String(fd.get("state") || "").trim(),
      duration: String(fd.get("duration") || "").trim(),
      durationBucket: String(fd.get("durationBucket") || "medium"),
      difficulty: String(fd.get("difficulty") || "").trim(),
      bestSeason: String(fd.get("bestSeason") || "").trim(),
      cost: String(fd.get("cost") || "").trim() || "A combinar",
      summary: String(fd.get("summary") || "").trim(),
      itinerary: String(fd.get("itinerary") || "").trim(),
      tags: String(fd.get("tags") || "")
        .split(",").map((s) => s.trim().toLowerCase()).filter(Boolean)
    };
  }

  function buildRoute(data, photoDataUrl) {
    const id = `${slugify(data.title)}-${Date.now().toString(36)}`;
    const fallback = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=70";
    const hero = photoDataUrl || fallback;
    const itineraryItems = data.itinerary
      .split(/\n+/)
      .filter(Boolean)
      .map((line, i) => {
        const [title, ...rest] = line.split(":");
        return {
          day: i + 1,
          title: rest.length ? title.trim() : `Dia ${i + 1}`,
          body: (rest.length ? rest.join(":") : title).trim()
        };
      });
    return {
      id,
      title: data.title,
      region: data.region,
      state: data.state || "",
      summary: data.summary,
      hero,
      gallery: [hero],
      duration: data.duration,
      durationBucket: data.durationBucket,
      cost: data.cost,
      difficulty: data.difficulty,
      bestSeason: data.bestSeason,
      tags: data.tags,
      author: "voce",
      date: new Date().toISOString().slice(0, 10),
      likes: 0,
      itinerary: itineraryItems.length ? itineraryItems : [{ day: 1, title: "Dia 1", body: data.summary }],
      tips: []
    };
  }

  function persist(route) {
    const list = window.RL.userRoutes();
    list.unshift(route);
    localStorage.setItem("rotaLivre.userRoutes", JSON.stringify(list));
  }

  function initPhotoPreview(form) {
    const input = form.querySelector("[name='photo']");
    const preview = form.querySelector("[data-photo-preview]");
    let dataUrl = null;
    if (!input) return () => null;
    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if (!file) { preview.innerHTML = "Pré-visualização aparecerá aqui."; dataUrl = null; return; }
      const reader = new FileReader();
      reader.onload = () => {
        dataUrl = String(reader.result);
        preview.innerHTML = `<img src="${dataUrl}" alt="Pré-visualização da foto enviada" />`;
      };
      reader.readAsDataURL(file);
    });
    return () => dataUrl;
  }

  ready(() => {
    const form = document.querySelector("[data-route-form]");
    if (!form) return;
    const getPhoto = initPhotoPreview(form);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate(form)) return;
      const data = readForm(form);
      const route = buildRoute(data, getPhoto());
      persist(route);
      sessionStorage.setItem("rotaLivre.flash", `Relato publicado: ${route.title}`);
      location.href = `rota.html?id=${encodeURIComponent(route.id)}`;
    });

    form.addEventListener("input", (e) => {
      const row = e.target.closest(".form-row");
      if (row?.dataset.invalid === "true") {
        const min = Number(e.target.dataset.minlen || 0);
        const val = (e.target.value || "").trim();
        if (val && val.length >= min) row.dataset.invalid = "false";
      }
    });
  });
})();
