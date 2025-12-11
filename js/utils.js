// utils.js – Funções auxiliares
export const $ = (sel) => document.querySelector(sel);
export const $$ = (sel) => document.querySelectorAll(sel);

export function showToast(message, type = "success") {
  // Remove toast anterior se houver, para não empilhar demais
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = type === 'success' 
    ? `<i class="fas fa-check-circle"></i> ${message}` 
    : `<i class="fas fa-exclamation-circle"></i> ${message}`;

  document.body.appendChild(toast);
  
  // Força reflow para animação funcionar
  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}