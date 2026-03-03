const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

export function initGallery(galleryData){
  const grid = $("#galleryGrid");
  const tabs = $$(".tab");
  const loadMoreBtn = $("#loadMoreBtn");

  let activeTab = "engagement";
  let shown = 0;
  const perPage = galleryData.perPage || 8;

  function render(reset=false){
    if(reset){
      grid.innerHTML = "";
      shown = 0;
    }
    const items = galleryData[activeTab] || [];
    const slice = items.slice(shown, shown + perPage);

    slice.forEach(it => {
      const cell = document.createElement("div");
      cell.className = "gItem";
      cell.innerHTML = `<img loading="lazy" src="${it.src}" alt="${it.title || "photo"}">`;
      cell.addEventListener("click", () => window.__openLightbox?.(it.src, it.title));
      grid.appendChild(cell);
    });

    shown += slice.length;
    loadMoreBtn.style.opacity = shown < items.length ? "1" : ".35";
    loadMoreBtn.disabled = shown >= items.length;
  }

  tabs.forEach(t => t.addEventListener("click", () => {
    tabs.forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    activeTab = t.dataset.tab;
    render(true);
  }));

  loadMoreBtn.addEventListener("click", () => render(false));

  render(true);
}