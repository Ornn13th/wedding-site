const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

export function initGallery(galleryData){
  const grid = $("#galleryGrid");
  const tabs = $$(".tab");
  const loadMoreBtn = $("#loadMoreBtn");

  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbTitle = $("#lbTitle");
  const lbClose = $("#lbClose");

  let activeTab = "engagement";
  let shown = 0;
  const perPage = galleryData.perPage || 8;

  function openLightbox(src, title){
    lbImg.src = src;
    lbTitle.textContent = title || "Photo";
    lb.classList.add("open");
  }
  function closeLightbox(){
    lb.classList.remove("open");
    lbImg.src = "";
  }

  lbClose.addEventListener("click", closeLightbox);
  lb.addEventListener("click", (e) => { if(e.target === lb) closeLightbox(); });
  window.addEventListener("keydown", (e) => { if(e.key === "Escape") closeLightbox(); });

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
      cell.addEventListener("click", () => openLightbox(it.src, it.title));
      grid.appendChild(cell);
    });

    shown += slice.length;
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