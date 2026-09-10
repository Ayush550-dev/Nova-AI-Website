export function initHamBurger() {
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");

    hamburger.addEventListener("click", () => {
        const isOpen = hamburger.classList.toggle("open");

        mobileMenu.classList.toggle("open");

        hamburger.setAttribute("aria-expanded", isOpen);
    });
}