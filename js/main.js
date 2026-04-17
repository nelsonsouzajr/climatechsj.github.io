// main.js – Entrypoint otimizado
import { initTheme } from "./theme.js";
import { initLanguage } from "./languages.js";
import { initMobileMenu } from "./menu.js";
import { initAnimations } from "./animations.js";
import { initForms } from "./forms.js";
import { initCarousel } from "./carousel.js";
import { initMarketing } from "./marketing.js";
import { initAbTesting } from "./ab-testing.js";
import { renderTopbar } from "./nav.js";

// Aguarda o DOM estar pronto para evitar erros de "element not found"
document.addEventListener('DOMContentLoaded', () => {
  console.log("%cNTech System: Inicializando...", "color:#6366f1; font-weight:bold;");

  // 1. Inicializa o Tema (Dark/Light)
  initTheme();

  // 1.1. Normaliza a topbar em todas as paginas
  renderTopbar();

  // 2. Inicializa o Idioma
  initLanguage();

  // 3. Inicializa o Menu Mobile
  initMobileMenu();

  // 4. Inicializa Animações (Scroll, Parallax, Cursor)
  initAnimations();

  // 5. Inicializa Formulários e Máscaras
  initForms();

  // 6. Inicializa Carrossel (se houver na página)
  initCarousel();

  // 7. Inicializa rastreio de marketing e origem de lead
  initMarketing();

  // 8. Inicializa testes A/B de copy por campanha/cidade
  initAbTesting();
});