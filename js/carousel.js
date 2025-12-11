// carousel.js – Carrossel Interativo
import { $ } from "./utils.js";

export function initCarousel() {
  const carousel = $(".testimonials-carousel");
  if (!carousel) return; // Se não houver carrossel na página, sai.

  let isDown = false;
  let startX;
  let scrollLeft;
  let autoScroll;

  const startAuto = () => {
    // Limpa anterior para garantir
    clearInterval(autoScroll); 
    autoScroll = setInterval(() => {
      carousel.scrollLeft += 1;
      // Reinicia ao chegar no fim (loop infinito simples)
      if (carousel.scrollLeft >= (carousel.scrollWidth - carousel.clientWidth - 1)) {
        carousel.scrollLeft = 0;
      }
    }, 20);
  };

  const stopAuto = () => clearInterval(autoScroll);

  // Inicia
  startAuto();

  // Pausa no hover
  carousel.addEventListener("mouseenter", stopAuto);
  carousel.addEventListener("mouseleave", startAuto);

  // Lógica de arrastar (Drag)
  carousel.addEventListener("mousedown", (e) => {
    stopAuto();
    isDown = true;
    carousel.classList.add("dragging");
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("mouseleave", () => {
    isDown = false;
    carousel.classList.remove("dragging");
    startAuto();
  });

  carousel.addEventListener("mouseup", () => {
    isDown = false;
    carousel.classList.remove("dragging");
    startAuto();
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Velocidade do scroll
    carousel.scrollLeft = scrollLeft - walk;
  });

  // Suporte a Touch
  carousel.addEventListener("touchstart", (e) => {
    stopAuto();
    isDown = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("touchend", () => {
    isDown = false;
    startAuto();
  });

  carousel.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });
}