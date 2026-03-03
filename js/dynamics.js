export function initDynamics(){
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  // Progress bar
  const bar = document.createElement("div");
  bar.className = "progress";
  document.body.appendChild(bar);

  const updateProgress = () => {
    const doc = document.documentElement;
    const max = (doc.scrollHeight - window.innerHeight) || 1;
    const p = Math.max(0, Math.min(1, window.scrollY / max));
    bar.style.setProperty("--p", (p * 100).toFixed(2) + "%");
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive:true });
  window.addEventListener("resize", updateProgress);

  if(reduceMotion) return;

  // Cursor sparkle (subtle)
  let last = 0;
  window.addEventListener("pointermove", (e) => {
    const now = performance.now();
    if(now - last < 45) return;
    last = now;

    const s = document.createElement("div");
    s.style.position = "fixed";
    s.style.left = (e.clientX - 2) + "px";
    s.style.top  = (e.clientY - 2) + "px";
    s.style.width = "4px";
    s.style.height = "4px";
    s.style.borderRadius = "999px";
    s.style.pointerEvents = "none";
    s.style.zIndex = 9998;
    s.style.background = "rgba(200,169,90,.9)";
    s.style.boxShadow = "0 0 12px rgba(200,169,90,.55)";
    s.style.opacity = "0.85";
    s.style.transform = "translateZ(0)";

    document.body.appendChild(s);

    const dx = (Math.random() * 24 - 12);
    const dy = (Math.random() * 24 - 18);
    s.animate([
      { transform: "translate(0,0) scale(1)", opacity: 0.85 },
      { transform: `translate(${dx}px,${dy}px) scale(0)`, opacity: 0 }
    ], { duration: 520, easing: "cubic-bezier(.2,.9,.2,1)" });

    setTimeout(() => s.remove(), 540);
  }, { passive:true });
}