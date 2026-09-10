document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close all
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("open");

        const otherQuestion =
          otherItem.querySelector(".faq-question");

        otherQuestion.setAttribute("aria-expanded", "false");
      });

      // Open clicked item
      if (!isOpen) {
        item.classList.add("open");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });
});