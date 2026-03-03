import { siteData } from "../assets/data/siteData.js";
import { initEnvelopeIntro } from "./envelope.js";
import { initScrollSpy, revealOnScroll } from "./scroll.js";
import { initGallery } from "./gallery.js";

const $ = (s) => document.querySelector(s);

function renderNav(){
  const nav = $("#nav");
  nav.innerHTML = "";
  siteData.nav.forEach(item => {
    const a = document.createElement("a");
    a.href = `#${item.id}`;
    a.textContent = item.label;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      nav.classList.remove("open");
    });
    nav.appendChild(a);
  });

  $("#navToggle").addEventListener("click", () => nav.classList.toggle("open"));
}

function renderBrand(){
  $("#brandName").textContent = siteData.brand.name;
  $("#brandSub").textContent = siteData.brand.sub;
}

function renderIntro(){
  $("#introEyebrow").textContent = siteData.intro.eyebrow;
  $("#introTitle").textContent = siteData.intro.title;
  $("#introQuote").textContent = siteData.intro.quote;
  $("#introMeta").textContent = siteData.intro.meta;
  $("#letterTopline").textContent = siteData.intro.letterTopline;
}

function renderHero(){
  $("#heroEyebrow").textContent = siteData.hero.eyebrow;
  $("#heroTitle").textContent = siteData.hero.title;
  $("#heroLead").textContent = siteData.hero.lead;

  $("#heroCardTitle").textContent = siteData.hero.heroCardTitle;
  $("#heroCardMeta").textContent = siteData.hero.heroCardMeta;

  const img = $("#heroImage");
  img.style.backgroundImage = `url("${siteData.hero.heroImage}")`;

  const pillRow = $("#pillRow");
  pillRow.innerHTML = "";
  siteData.hero.pills.forEach(t => {
    const p = document.createElement("div");
    p.className = "pill";
    p.textContent = t;
    pillRow.appendChild(p);
  });
}

function renderTimeline(){
  const root = $("#timeline");
  root.innerHTML = "";
  siteData.schedule.forEach(x => {
    const item = document.createElement("div");
    item.className = "tItem";
    item.innerHTML = `
      <div class="tTime">${x.time}</div>
      <div>
        <div class="tTitle">${x.title}</div>
        <div class="tDesc">${x.desc}</div>
      </div>
    `;
    root.appendChild(item);
  });
}

function renderMenu(){
  const root = $("#menuGrid");
  root.innerHTML = "";
  siteData.menu.forEach(m => {
    const card = document.createElement("div");
    card.className = "mCard";
    card.innerHTML = `<h4>${m.title}</h4><ul>${m.items.map(i => `<li>${i}</li>`).join("")}</ul>`;
    root.appendChild(card);
  });
}

function renderAccordion(){
  const root = $("#accordion");
  root.innerHTML = "";
  siteData.accordion.forEach((it, idx) => {
    const wrap = document.createElement("div");
    wrap.className = "accItem";
    wrap.innerHTML = `
      <button class="accBtn" aria-expanded="false">
        <span>${it.q}</span><span>+</span>
      </button>
      <div class="accPanel">
        <div class="accPanelInner">${it.a}</div>
      </div>
    `;
    const btn = wrap.querySelector(".accBtn");
    const panel = wrap.querySelector(".accPanel");

    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      btn.lastElementChild.textContent = open ? "+" : "–";
      panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px";
    });

    // első nyitva (opcionális, ha nem kell: töröld)
    if(idx === 0){
      btn.click();
    }

    root.appendChild(wrap);
  });
}

function main(){
  renderBrand();
  renderNav();
  renderIntro();
  renderHero();
  renderTimeline();
  renderMenu();
  renderAccordion();

  initEnvelopeIntro({
    introId: "intro",
    shellId: "shell",
    envelopeId: "envelope",
    openBtnId: "openInviteBtn",
    skipBtnId: "skipInviteBtn",
  });

  initGallery(siteData.gallery);
  initScrollSpy(siteData.nav.map(x => x.id));
  revealOnScroll();

  window.addEventListener("scroll", () => {
    initScrollSpy(siteData.nav.map(x => x.id));
    revealOnScroll();
  }, { passive:true });
}

main();