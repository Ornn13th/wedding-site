const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const $ = (sel) => document.querySelector(sel);

export function initScroll() {
  // nothing heavy here, hooks are in app.js
}

export function smoothScrollToHash(id){
  const el = document.getElementById(id);
  if(!el) return;

  const topbar = document.getElementById("topbar");
  const offset = topbar ? topbar.getBoundingClientRect().height + 14 : 80;
  const y = window.scrollY + el.getBoundingClientRect().top - offset;

  window.history.replaceState(null, "", `#${id}`);
  window.scrollTo({ top: y, behavior: "smooth" });
}

export function setActiveNavOnScroll(sectionIds){
  const topbar = document.getElementById("topbar");
  const offset = topbar ? topbar.getBoundingClientRect().height + 30 : 110;

  let active = sectionIds[0];
  for(const id of sectionIds){
    const el = document.getElementById(id);
    if(!el) continue;
    const top = el.getBoundingClientRect().top;
    if(top - offset <= 0) active = id;
  }

  const links = $$("#nav a");
  links.forEach(a => {
    const id = a.getAttribute("href")?.replace("#","");
    a.classList.toggle("active", id === active);
  });
}

export function revealOnScroll(){
  const els = $$(".reveal");
  els.forEach(el => {
    const r = el.getBoundingClientRect();
    if(r.top < window.innerHeight * 0.90) el.classList.add("on");
  });
}

export function parallaxTick(){
  const map = $("#map");
  const hero = $("#heroPhoto");
  const y = window.scrollY || 0;
  if(map) map.style.transform = `translate3d(0, ${Math.min(20, y*0.05)}px, 0)`;
  if(hero) hero.style.transform = `translate3d(0, ${Math.min(10, y*0.02)}px, 0)`;
}