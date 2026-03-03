const $ = (s) => document.querySelector(s);

export function initEnvelopeIntro(cfg){
  const intro = $("#" + cfg.introId);
  const shell = $("#" + cfg.shellId);
  const envelope = $("#" + cfg.envelopeId);
  const openBtn = $("#" + cfg.openBtnId);
  const skipBtn = $("#" + cfg.skipBtnId);

  const open = () => {
    if(envelope.classList.contains("open")) return;
    envelope.classList.add("open");
    setTimeout(() => {
      intro.classList.add("hidden");
      shell.classList.add("ready");
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 900);
  };

  const skip = () => {
    intro.classList.add("hidden");
    shell.classList.add("ready");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  envelope.addEventListener("click", open);
  envelope.addEventListener("keydown", (e) => {
    if(e.key === "Enter" || e.key === " ") open();
  });

  openBtn.addEventListener("click", open);
  skipBtn.addEventListener("click", skip);
}