export function initHowItWorks() {
  const section = document.querySelector(".sticky");
  const cardContainer = document.querySelector(".card-container");
  const stickyHeader = document.querySelector(".sticky-header h1");

  if (!section || !cardContainer || !stickyHeader) return;

  let isGapAnimationCompleted = false;
  let isFlipAnimationCompleted = false;

  const mm = gsap.matchMedia();

  mm.add("(max-width: 999px)", () => {
    document
      .querySelectorAll(".card, .card-container, .sticky-header h1")
      .forEach((el) => (el.style = ""));
  });

  mm.add("(min-width: 1000px)", () => {
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${window.innerHeight * 4}`,
      scrub: 1,
      pin: true,
      pinSpacing: true,

      onUpdate: (self) => {
        const progress = self.progress;

        if (progress >= 0.1 && progress <= 0.25) {
          const headerProgress = gsap.utils.mapRange(
            0.1,
            0.25,
            0,
            1,
            progress
          );

          gsap.set(stickyHeader, {
            y: gsap.utils.mapRange(0, 1, 40, 0, headerProgress),
            opacity: gsap.utils.mapRange(0, 1, 0, 1, headerProgress),
          });
        } else if (progress < 0.1) {
          gsap.set(stickyHeader, {
            y: 40,
            opacity: 0,
          });
        } else {
          gsap.set(stickyHeader, {
            y: 0,
            opacity: 1,
          });
        }

        if (progress <= 0.25) {
          gsap.set(cardContainer, {
            width: `${gsap.utils.mapRange(
              0,
              0.25,
              75,
              60,
              progress
            )}%`,
          });
        } else {
          gsap.set(cardContainer, {
            width: "60%",
          });
        }

        if (progress >= 0.35 && !isGapAnimationCompleted) {
          gsap.to(cardContainer, {
            gap: "20px",
            duration: 0.5,
            ease: "power3.out",
          });

          gsap.to(["#card-1", "#card-2", "#card-3"], {
            borderRadius: "20px",
            duration: 0.5,
            ease: "power3.out",
          });

          isGapAnimationCompleted = true;
        } else if (progress < 0.35 && isGapAnimationCompleted) {
          gsap.to(cardContainer, {
            gap: "0px",
            duration: 0.5,
            ease: "power3.out",
          });

          gsap.to("#card-1", {
            borderRadius: "20px 0 0 20px",
            duration: 0.5,
            ease: "power3.out",
          });

          gsap.to("#card-2", {
            borderRadius: "0px",
            duration: 0.5,
            ease: "power3.out",
          });

          gsap.to("#card-3", {
            borderRadius: "0 20px 20px 0",
            duration: 0.5,
            ease: "power3.out",
          });

          isGapAnimationCompleted = false;
        }

        if (progress >= 0.7 && !isFlipAnimationCompleted) {
          gsap.to(".card", {
            rotationY: 180,
            duration: 0.75,
            ease: "power3.inOut",
            stagger: 0.1,
          });

          gsap.to(["#card-1", "#card-3"], {
            y: 30,
            rotationZ: (i) => [-15, 15][i],
            duration: 0.75,
            ease: "power3.inOut",
          });

          isFlipAnimationCompleted = true;
        } else if (progress < 0.7 && isFlipAnimationCompleted) {
          gsap.to(".card", {
            rotationY: 0,
            duration: 0.75,
            ease: "power3.inOut",
            stagger: -0.1,
          });

          gsap.to(["#card-1", "#card-3"], {
            y: 0,
            rotationZ: 0,
            duration: 0.75,
            ease: "power3.inOut",
          });

          isFlipAnimationCompleted = false;
        }
      },
    });

    return () => trigger.kill();
  });

  return mm;
}