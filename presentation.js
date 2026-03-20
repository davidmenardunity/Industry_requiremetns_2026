(function () {
  const deck = document.querySelector(".deck");
  if (!deck) return;

  const slides = [...deck.querySelectorAll(".slide")];
  const counterEl = document.querySelector("[data-slide-counter]");

  function currentIndex() {
    const mid = deck.scrollTop + deck.clientHeight * 0.15;
    for (let i = slides.length - 1; i >= 0; i--) {
      if (slides[i].offsetTop <= mid) return i;
    }
    return 0;
  }

  function updateCounter() {
    if (!counterEl || !slides.length) return;
    counterEl.textContent = `${currentIndex() + 1} / ${slides.length}`;
  }

  function go(delta) {
    const i = Math.max(0, Math.min(slides.length - 1, currentIndex() + delta));
    slides[i].scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.addEventListener("keydown", function (e) {
    if (e.target.closest("input, textarea, select, [contenteditable]")) return;
    if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
      e.preventDefault();
      go(1);
    }
    if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
      e.preventDefault();
      go(-1);
    }
    if (e.key === "Home") {
      e.preventDefault();
      slides[0].scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (e.key === "End") {
      e.preventDefault();
      slides[slides.length - 1].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  deck.addEventListener("scroll", updateCounter, { passive: true });
  updateCounter();
})();
