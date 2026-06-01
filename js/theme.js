// assets/js/theme.js
import { $ } from "./utils.js";

export function initTheme() {
  // Busca pelo ID específico
  const btn = document.getElementById("theme-toggle");
  const html = document.documentElement;
  
  // Ícone dentro do botão
  const icon = btn ? btn.querySelector("i") : null;

  function updateIcon(theme) {
    if (!icon) return;
    // Remove classes antigas
    icon.classList.remove("fa-moon", "fa-sun");
    // Adiciona nova (Lua no light para ir pro dark, Sol no dark para ir pro light)
    if (theme === "dark") {
        icon.classList.add("fa-sun"); 
    } else {
        icon.classList.add("fa-moon");
    }
  }

  // 1. Carregar Estado Inicial
  const saved = localStorage.getItem("climatech-theme") || "dark"; // Padrão Dark
  html.setAttribute("data-theme", saved);
  updateIcon(saved);

  // 2. Evento de Clique
  if (btn) {
    btn.addEventListener("click", () => {
      const current = html.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";

      html.setAttribute("data-theme", next);
      localStorage.setItem("climatech-theme", next);
      updateIcon(next);

      // Animaçãozinha de rotação
      icon.style.transform = "rotate(360deg)";
      setTimeout(() => icon.style.transform = "none", 400);
    });
  }
}