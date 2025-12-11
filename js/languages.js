// assets/js/language.js
import { $ } from "./utils.js";

const translations = {
  pt: {
    nav_home: "Início",
    nav_hardware: "Assistência Técnica",
    nav_software: "Desenvolvimento",
    nav_contact: "Falar Agora",
    hero_tag: "Tecnologia & Inovação",
    hero_desc: "A ponte entre o mundo físico e o digital. Especialista em manutenção de alto nível e desenvolvimento de sistemas complexos.",
    card_hard_title: "Assistência Técnica",
    card_hard_desc: "Manutenção & Redes",
    card_soft_title: "Soluções Digitais",
    card_soft_desc: "Dev & Apps"
  },
  en: {
    nav_home: "Home",
    nav_hardware: "Techinical Support",
    nav_software: "Development",
    nav_contact: "Let's Talk",
    hero_tag: "Technology & Innovation",
    hero_desc: "The bridge between physical and digital worlds. Specialist in high-level maintenance and complex system development.",
    card_hard_title: "Technical Support",
    card_hard_desc: "Maintenance & Networking",
    card_soft_title: "Digital Solutions",
    card_soft_desc: "Dev & Apps"
  }
};

export function initLanguage() {
  const btn = $("#lang-toggle");
  const html = document.documentElement;

  // Carrega idioma salvo ou padrão
  const savedLang = localStorage.getItem("ntech-lang") || "pt";
  updateTexts(savedLang);
  updateIcon(btn, savedLang);

  if (btn) {
    btn.addEventListener("click", () => {
      const current = localStorage.getItem("ntech-lang") || "pt";
      const next = current === "pt" ? "en" : "pt";
      
      localStorage.setItem("ntech-lang", next);
      updateTexts(next);
      updateIcon(btn, next);
    });
  }
}

function updateTexts(lang) {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

function updateIcon(btn, lang) {
  if(!btn) return;
  // Muda o texto do botão para a sigla oposta (se estou em PT, mostro EN para clicar)
  btn.querySelector("span").textContent = lang === "pt" ? "EN" : "PT";
}