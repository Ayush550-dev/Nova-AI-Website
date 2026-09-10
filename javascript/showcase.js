export function initShowcaseCarousel() {
  const cards = document.querySelectorAll(".showcase-card");
  if (!cards.length) return;

  const nextButton = document.querySelector(".carousel-next");
  const prevButton = document.querySelector(".carousel-prev");
  const progressCurrent = document.querySelector(".progress-current");
  const progressBar = document.querySelector(".progress-bar span");
  const track = document.querySelector(".showcase-track");

  let currentFeature = 0;

  function update() {
    cards.forEach((card, index) => {
      card.classList.remove("is-active", "is-prev", "is-next", "is-hidden-left", "is-hidden-right");

      const previousIndex = (currentFeature - 1 + cards.length) % cards.length;
      const nextIndex = (currentFeature + 1) % cards.length;

      if (index === currentFeature) {
        card.classList.add("is-active");
      } else if (index === previousIndex) {
        card.classList.add("is-prev");
      } else if (index === nextIndex) {
        card.classList.add("is-next");
      } else {
        const distance = (index - currentFeature + cards.length) % cards.length;
        card.classList.add(distance <= cards.length / 2 ? "is-hidden-right" : "is-hidden-left");
      }
    });

    if (progressCurrent) {
      progressCurrent.textContent = String(currentFeature + 1).padStart(2, "0");
    }

    if (progressBar) {
      progressBar.style.width = `${((currentFeature + 1) / cards.length) * 100}%`;
    }
  }

  function next() {
    currentFeature = (currentFeature + 1) % cards.length;
    update();
  }

  function previous() {
    currentFeature = (currentFeature - 1 + cards.length) % cards.length;
    update();
  }

  nextButton?.addEventListener("click", next);
  prevButton?.addEventListener("click", previous);

  document.addEventListener("keydown", (event) => {
    const active = document.activeElement;
    if (active.tagName === "INPUT" || active.tagName === "TEXTAREA") return;

    if (event.key === "ArrowRight") next();
    if (event.key === "ArrowLeft") previous();
  });

  let touchStartX = 0;

  track?.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].screenX;
    },
    { passive: true }
  );

  track?.addEventListener(
    "touchend",
    (event) => {
      const touchEndX = event.changedTouches[0].screenX;
      const distance = touchEndX - touchStartX;

      if (Math.abs(distance) < 50) return;
      distance < 0 ? next() : previous();
    },
    { passive: true }
  );

  update();
}