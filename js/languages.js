// assets/js/language.js
import { $ } from "./utils.js";

const translations = {
  pt: {
    // NAVEGAÇÃO
    nav_home: "Início",
    nav_about: "Sobre",
    nav_hardware: "Assistência Técnica",
    nav_software: "Desenvolvimento",
    nav_contact: "Falar Agora",
    // SEÇÃO HERO
    hero_tag: "Tecnologia & Inovação",
    hero_title: "Do <span class=\"text-hardware\">Reparo</span> ao <span class=\"text-software\">Código</span>",
    hero_desc: "A ponte entre o mundo físico e o digital. Especialista em manutenção de alto nível e desenvolvimento de sistemas complexos.",
    card_hard_title: "Assistência Técnica",
    card_hard_desc: "Manutenção & Redes",
    card_soft_title: "Soluções Digitais",
    card_soft_desc: "Dev & Apps",
    // SEÇÃO SOBRE
    about_tag: "Engenharia Computacional",
    about_title: "A Diferença entre consertar <br />e Solucionar.",
    about_p1: "Muitos olham para o computador e veem apenas peças. Outros olham para o código e veem apenas linhas. <strong>Na nTech, nós vemos o sistema completo.</strong>",
    about_p2: "Como Engenheiro de Computação, unifico o conhecimento profundo de hardware com a lógica avançada de software. Isso significa diagnósticos precisos que economizam seu dinheiro e sistemas robustos que impulsionam seu negócio.",
    about_quote: "\"Não entregamos apenas o serviço, entregamos a tranquilidade de saber que foi feito por um especialista.\"",
    // ESTATÍSTICAS (STATS)
    stat_exp_label: "Anos de Experiência",
    stat_commit_label: "Comprometimento",
    stat_qualif_label: "Profissional Altamente Qualificado",
    stat_qualif_subtitle: "Técnico e Engenheiro da computação",
    stat_guarantee_label: "Garantia Total",
    //RODAPE
    footer_slogan: "Onde a tecnologia encontra a excelência em serviço. Seu parceiro confiável em hardware e software.",
    footer_copyright: "&copy; 2025 Nelson Pereira de Souza Junior. Todos os direitos reservados.",
  
    },
  en: {
    // NAVIGATION
    nav_home: "Home",
    nav_about: "About",
    nav_hardware: "Techinical Support",
    nav_software: "Development",
    nav_contact: "Let's Talk",
    // HERO SECTION
    hero_tag: "Technology & Innovation",
    hero_title: "From <span class=\"text-hardware\">Repair</span> to <span class=\"text-software\">Code</span>",
    hero_desc: "The bridge between physical and digital worlds. Specialist in high-level maintenance and complex system development.",
    card_hard_title: "Technical Support",
    card_hard_desc: "Maintenance & Networking",
    card_soft_title: "Digital Solutions",
    card_soft_desc: "Dev & Apps",
    about_tab: "Computer Engineering",
    // ABOUT SECTION
    about_tag: "Computational Engineering",
    about_title: "The Difference Between Fixing <br />and Solving.",
    about_p1: "Many look at the computer and see only parts. Others look at the code and see only lines. <strong>At nTech, we see the complete system.</strong>",
    about_p2: "As a Computer Engineer, I unify deep hardware knowledge with advanced software logic. This means precise diagnostics that save you money and robust systems that boost your business.",
    about_quote: "\"We don't just deliver the service, we deliver the peace of mind of knowing it was done by a specialist.\"",
    // STATS
    stat_exp_label: "Years of Experience",
    stat_commit_label: "Commitment",
    stat_qualif_label: "Highly Qualified Professional",
    stat_qualif_subtitle: "Technician and Computer Engineer",
    stat_guarantee_label: "Total Warranty",
    //FOOTER
    footer_slogan: "Where technology meets service excellence. Your reliable partner in hardware and software.",
    footer_copyright: "&copy; 2025 Nelson Pereira de Souza Junior. All rights reserved.",
  
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
      el.innerHTML = translations[lang][key];
    }
  });
}

function updateIcon(btn, lang) {
  if(!btn) return;
  // Muda o texto do botão para a sigla oposta (se estou em PT, mostro EN para clicar)
  btn.querySelector("span").textContent = lang === "pt" ? "EN" : "PT";
}