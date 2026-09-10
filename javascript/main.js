import { initSmoothScroll } from "./smooth-scroll.js";
import { initNavbar } from "./navbar.js";
import { initHowItWorks } from "./howitworks.js";
import { initShowcaseCarousel } from "./showcase.js";
import { initHamBurger } from "./hamburger.js";


document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  initSmoothScroll();
  initNavbar();
  initHowItWorks();
  initShowcaseCarousel();
  initHamBurger();

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
  });
});