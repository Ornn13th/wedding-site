const $$ = (s) => Array.from(document.querySelectorAll(s));

export function initScrollSpy(sectionIds){
  const topbar = document.getElementById("topbar");
  const offset = (topbar?.getBoundingClientRect().height || 70) + 18;

  let active = sectionIds[0];
  for(const id of sectionIds){
    const el = document.getElementById(id);
    if(!el) continue;
    const top = el.getBoundingClientRect().top;
    if(top - offset <= 0) active = id;
  }

  $$("#nav a").forEach(a => {
    const id = a.getAttribute("href")?.replace("#","");
    a.classList.toggle("active", id === active);
  });
}

export function revealOnScroll(){
  $$(".reveal").forEach(el => {
    const r = el.getBoundingClientRect();
    if(r.top < window.innerHeight * 0.90) el.classList.add("on");
  });
}