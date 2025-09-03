
// --- Utils
function getYouTubeId(input) {
  if (!input) return null;
  // Accept bare ID or a full URL
  if (!input.includes("http")) return input.trim();
  try {
    const url = new URL(input);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.replace("/", "");
    }
    if (url.searchParams.get("v")) return url.searchParams.get("v");
    // last fallback: /embed/ID or /v/ID
    const parts = url.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] || null;
  } catch (e) {
    return null;
  }
}

function createCard(item) {
  const card = document.createElement("article");
  card.className = "card";

  const ytId = getYouTubeId(item.youtubeUrl || item.youtubeId);
  const thumb = document.createElement("div");
  thumb.className = "thumb";
  thumb.innerHTML = ytId
    ? `<iframe src="https://www.youtube.com/embed/${ytId}" title="${item.name}" loading="lazy" allowfullscreen></iframe>`
    : `<div style="padding:1rem;color:#95a1c9;text-align:center">Sin video. Agrega un link de YouTube.</div>`;

  const body = document.createElement("div");
  body.className = "card-body";
  const h3 = document.createElement("h3");
  h3.textContent = item.name;

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = item.rank || "Sin cinturón";

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = `${item.category || "Formas"} • ${item.duration || ""}`.trim();

  const actions = document.createElement("div");
  actions.className = "actions";
  const btn = document.createElement("button");
  btn.className = "btn view";
  btn.textContent = "Ver detalles";
  btn.addEventListener("click", () => openModal(item));

  actions.appendChild(btn);
  body.appendChild(h3);
  body.appendChild(badge);
  body.appendChild(meta);
  body.appendChild(actions);

  card.appendChild(thumb);
  card.appendChild(body);
  return card;
}

function render(list) {
  const cards = document.getElementById("cards");
  cards.innerHTML = "";
  if (!list.length) {
    cards.innerHTML = `<p class="meta">No hay resultados con esos filtros.</p>`;
    return;
  }
  list.forEach(item => cards.appendChild(createCard(item)));
}

function applyFilters() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  const rank = document.getElementById("rankFilter").value;
  const cat = document.getElementById("categoryFilter").value;

  const filtered = window.FORMS_DATA.filter(f => {
    const matchesQ = [f.name, f.rank, f.category]
      .filter(Boolean)
      .some(x => x.toLowerCase().includes(q));
    const matchesRank = !rank || (f.rank === rank);
    const matchesCat = !cat || (f.category === cat);
    return matchesQ && matchesRank && matchesCat;
  });
  render(filtered);
}

// --- Modal
function openModal(item) {
  const modal = document.getElementById("detailModal");
  document.getElementById("modalTitle").textContent = item.name;

  const ytId = getYouTubeId(item.youtubeUrl || item.youtubeId);
  const videoWrap = document.getElementById("videoWrap");
  videoWrap.innerHTML = ytId
    ? `<iframe src="https://www.youtube.com/embed/${ytId}" title="${item.name}" allowfullscreen></iframe>`
    : `<div style="padding:1rem;color:#95a1c9">Sin video</div>`;

  const meta = document.getElementById("meta");
  meta.innerHTML = `<p class="meta"><strong>Cinturón:</strong> ${item.rank || "-"} • <strong>Categoría:</strong> ${item.category || "-"} ${item.duration ? "• <strong>Duración:</strong> "+item.duration : ""}</p>`;

  const steps = document.getElementById("steps");
  steps.innerHTML = "";
  (item.steps || []).forEach((s, i) => {
    const li = document.createElement("li");
    li.className = "step";
    const timeLink = s.timecode ? `<a href="${(item.youtubeUrl || ('https://youtube.com/watch?v='+(ytId||'')))}&t=${s.timecode}s" target="_blank">[${s.timecode}s]</a>` : "";
    li.innerHTML = `<strong>Paso ${i+1}: ${s.title || ""}</strong> ${timeLink}<br>${s.text || ""}`;
    if (s.imageUrl) {
      const img = document.createElement("img");
      img.src = s.imageUrl;
      img.alt = s.title || `Paso ${i+1}`;
      img.style.width = "100%";
      img.style.maxHeight = "260px";
      img.style.objectFit = "cover";
      img.style.borderRadius = ".5rem";
      img.style.marginTop = ".5rem";
      img.loading = "lazy";
      li.appendChild(img);
    }
    steps.appendChild(li);
  });

  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  (item.images || []).forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    img.loading = "lazy";
    gallery.appendChild(img);
  });

  modal.showModal();
}

function closeModal() {
  document.getElementById("detailModal").close();
}

// --- Boot
async function loadData() {
  const res = await fetch("data/forms.json");
  const data = await res.json();
  window.FORMS_DATA = data;
  render(data);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchInput").addEventListener("input", applyFilters);
  document.getElementById("rankFilter").addEventListener("change", applyFilters);
  document.getElementById("categoryFilter").addEventListener("change", applyFilters);
  document.getElementById("clearFilters").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    document.getElementById("rankFilter").value = "";
    document.getElementById("categoryFilter").value = "";
    applyFilters();
  });
  document.getElementById("closeModal").addEventListener("click", closeModal);
  loadData();
});
