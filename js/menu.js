// menu.js – Menu Mobile
import { $, $$ } from "./utils.js";

export function initMobileMenu() {
  const hamburger = $(".hamburger");
  const menu = $(".menu"); // Conforme definido no layout.css
  const links = $$(".menu a");

  if (!hamburger || !menu) return;

  // Toggle Abrir/Fechar
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // Impede que o click feche o menu imediatamente
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
  });

  // Fechar ao clicar em um link
  links.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      menu.classList.remove("active");
    });
  });

  // Fechar ao clicar fora
  document.addEventListener("click", (e) => {
    const isClickInside = menu.contains(e.target) || hamburger.contains(e.target);
    
    if (!isClickInside && menu.classList.contains("active")) {
      hamburger.classList.remove("active");
      menu.classList.remove("active");
    }
  });
}