import { siteData } from "../assets/data/siteData.js";
import { initScroll, setActiveNavOnScroll, smoothScrollToHash, revealOnScroll, parallaxTick } from "./scroll.js";
import { initGallery } from "./gallery.js";

const $ = (sel) => document.querySelector(sel);

function renderNav() {
  const nav = $("#nav");
  nav.innerHTML = "";
  siteData.nav.forEach(item => {
    const a = document.createElement("a");
    a.href = `#${item.id}`;
    a.textContent = item.label;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      smoothScrollToHash(item.id);
      nav.classList.remove("open");
    });
    nav.appendChild(a);
  });

  $("#navToggle").addEventListener("click", () => nav.classList.toggle("open"));
}

function renderHero() {
  $("#coupleNames").textContent = siteData.couple.names;

  const chips = $("#chips");
  chips.innerHTML = "";
  siteData.couple.chips.forEach(t => {
    const c = document.createElement("div");
    c.className = "chip";
    c.innerHTML = `<span class="dot"></span>${t}`;
    chips.appendChild(c);
  });

  $("#heroPhoto").style.backgroundImage = `url("${siteData.media.heroImageSrc}")`;
}

function renderIntroMedia() {
  const media = $("#introMedia");

  if (siteData.media.useIntroVideo) {
    const v = document.createElement("video");
    v.src = siteData.media.introVideoSrc;
    v.autoplay = true;
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.preload = "metadata";
    v.addEventListener("error", () => {
      media.style.backgroundImage = `url("${siteData.media.introImageFallback}")`;
    });
    media.appendChild(v);
  } else {
    media.style.backgroundImage = `url("${siteData.media.introImageFallback}")`;
  }
}

function renderTimeline() {
  const root = $("#timeline");
  root.innerHTML = "";
  siteData.schedule.forEach((x) => {
    const item = document.createElement("div");
    item.className = "tItem reveal";
    item.innerHTML = `
      <div class="tTime">${x.time}</div>
      <div>
        <p class="tTitle">${x.title}</p>
        <p class="tDesc">${x.desc}</p>
      </div>
    `;
    root.appendChild(item);
  });
}

function renderMenu() {
  const root = $("#menuGrid");
  root.innerHTML = "";
  siteData.menu.forEach(m => {
    const card = document.createElement("div");
    card.className = "mCard reveal";
    card.innerHTML = `<h3>${m.title}</h3><ul>${m.items.map(i => `<li>${i}</li>`).join("")}</ul>`;
    root.appendChild(card);
  });
}

function renderAccordion() {
  const root = $("#accordion");
  root.innerHTML = "";
  siteData.accordion.forEach((it, idx) => {
    const wrap = document.createElement("div");
    wrap.className = "accItem reveal";
    wrap.innerHTML = `
      <button class="accBtn" aria-expanded="false">
        <span>${it.q}</span>
        <span>⌄</span>
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
      panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px";
    });
    root.appendChild(wrap);

    // első nyitva (opcionális)
    if(idx === 0){
      btn.setAttribute("aria-expanded", "true");
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

function initAmbient() {
  const ambient = $("#ambient");
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  if (reduceMotion) return;

  const rand = (a,b)=>Math.random()*(b-a)+a;

  // fireflies
  for(let i=0;i<10;i++){
    const f = document.createElement("div");
    f.className = "firefly";
    f.style.cssText = `
      position:absolute;width:6px;height:6px;border-radius:999px;
      background: rgba(200,169,90,.9);
      box-shadow: 0 0 14px rgba(200,169,90,.75), 0 0 30px rgba(200,169,90,.35);
      left:${rand(0,100)}vw; top:${rand(0,100)}vh; opacity:0;
      animation: fly ${rand(9,16)}s linear ${rand(0,8)}s infinite;
      --x0:${rand(-10,110)}vw; --y0:${rand(-10,110)}vh; --x1:${rand(-10,110)}vw; --y1:${rand(-10,110)}vh;
    `;
    ambient.appendChild(f);
  }

  // leaves
  for(let i=0;i<7;i++){
    const l = document.createElement("div");
    l.className = "leaf";
    l.style.cssText = `
      position:absolute;width:16px;height:10px;border-radius:12px 12px 12px 2px;
      background: rgba(43,53,39,.45);
      border: 1px solid rgba(200,169,90,.22);
      box-shadow: 0 12px 30px rgba(0,0,0,.22);
      left:${rand(0,100)}vw; top:${rand(0,100)}vh; opacity:0;
      animation: leaf ${rand(12,20)}s linear ${rand(0,10)}s infinite;
      --lx0:${rand(-20,120)}vw; --ly0:${rand(-20,120)}vh; --lx1:${rand(-20,120)}vw; --ly1:${rand(-20,120)}vh;
      --r0:${rand(-40,40)}deg; --r1:${rand(-220,220)}deg;
    `;
    ambient.appendChild(l);
  }
}

function initIntro() {
  const intro = $("#intro");
  const shell = $("#shell");
  const scroll = $("#scroll");

  const open = () => {
    scroll.classList.add("open");
    setTimeout(() => {
      intro.classList.add("hidden");
      shell.classList.add("ready");
      revealOnScroll(); // trigger initial
      parallaxTick();
    }, 900);
  };

  $("#openBtn").addEventListener("click", open);
  $("#skipBtn").addEventListener("click", () => {
    intro.classList.add("hidden");
    shell.classList.add("ready");
    revealOnScroll();
    parallaxTick();
  });

  scroll.addEventListener("click", open);
  scroll.addEventListener("keydown", (e) => {
    if(e.key === "Enter" || e.key === " ") open();
  });
}

function initLightbox() {
  const lb = $("#lightbox");
  const img = $("#lbImg");
  const title = $("#lbTitle");
  const close = () => { lb.classList.remove("open"); img.src = ""; };

  $("#lbClose").addEventListener("click", close);
  lb.addEventListener("click", (e) => { if(e.target === lb) close(); });
  window.addEventListener("keydown", (e) => { if(e.key === "Escape") close(); });

  // expose
  window.__openLightbox = (src, t) => {
    img.src = src;
    title.textContent = t || "Lorem";
    lb.classList.add("open");
  };
}

function initTimelineDraw() {
  // amikor a timeline elemek belépnek, kapjanak "on" class-t (CSS sáv anim)
  const items = Array.from(document.querySelectorAll(".tItem"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if(en.isIntersecting) en.target.classList.add("on"); });
  }, { threshold: 0.2 });

  items.forEach(i => io.observe(i));
}

function main() {
  renderIntroMedia();
  renderNav();
  renderHero();
  renderTimeline();
  renderMenu();
  renderAccordion();
  initAmbient();

  initScroll();
  initIntro();
  initLightbox();

  initGallery(siteData.gallery);
  initTimelineDraw();

  // initial
  setActiveNavOnScroll(siteData.nav.map(x => x.id));
  revealOnScroll();
  parallaxTick();

  // wire scroll handlers
  window.addEventListener("scroll", () => {
    setActiveNavOnScroll(siteData.nav.map(x => x.id));
    revealOnScroll();
    parallaxTick();
  }, { passive:true });

  window.addEventListener("hashchange", () => {
    const id = location.hash.replace("#","");
    if(id) smoothScrollToHash(id);
  });
}

main();