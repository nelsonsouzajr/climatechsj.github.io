// animations.js – Efeitos Visuais
import { $, $$ } from "./utils.js";

export function initAnimations() {
  initScrollReveal();
  initHeroParallax();
  initCursorGlow();
}

/* --- Scroll Reveal --- */
function initScrollReveal() {
  const revealElems = $$("[data-reveal]");
  if (revealElems.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target); // Para de observar após revelar
      }
    });
  }, { threshold: 0.1 });

  revealElems.forEach((el) => observer.observe(el));
}

/* --- Micro Parallax no Hero --- */
function initHeroParallax() {
  const hero = $(".index-hero");
  if (!hero) return;

  hero.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20; // Movimento sutil
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    // Move o background ou elementos filhos levemente
    hero.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
  });
}

/* --- Cursor Glow --- */
function initCursorGlow() {
  const glow = $(".cursor-glow");
  if (!glow) return;

  // Usa requestAnimationFrame para performance
  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    // Interpolação linear para suavidade (lerp)
    const speed = 0.15;
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;

    glow.style.transform = `translate(${currentX}px, ${currentY}px)`;
    // Ajuste para centralizar o glow no mouse (assumindo translate(-50%, -50%) no CSS)
    glow.style.left = "0px"; 
    glow.style.top = "0px"; 
    // Nota: Como o CSS já tem transform translate(-50%), usamos o JS para mover o top/left 
    // ou sobrescrevemos o transform. A melhor forma com o CSS atual é:
    glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(animate);
  }
  animate();
}