// nav.js - Renderizacao centralizada da topbar em todas as paginas
const NAV_ITEMS = [
  { label: "Início", href: "#hero" },
  { label: "Serviços", href: "#serviços" },
  { label: "Instalação", href: "pages/instalação.html" },
  { label: "Manutenção", href: "pages/manutenção.html" },
  { label: "Higienização", href: "pages/higienização.html" },
  { label: "PMOC", href: "pages/pmoc.html" },
  { label: "Dicas", href: "pages/dicas.html" },
  { label: "Contato", href: "#contato" }
];

export function renderTopbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const currentPath = window.location.pathname.replace(/\\/g, "/");
  const isHome = isHomePage(currentPath);
  const rootPath = isHome ? "" : "../";

  navbar.innerHTML = `
    <div class="nav-wrapper">
      <a href="${rootPath}index.html" class="imglogo"><img src="${rootPath}assets/logo.png" alt="ClimatEch Climatizacao" /></a>

      <div class="menu" id="mainMenu">
        ${NAV_ITEMS.map((item) => buildLink(item, rootPath, currentPath)).join("")}
      </div>

      <div class="actions">
        <a
          href="https://wa.me/5519993063260?text=Ola%2C%20quero%20um%20orcamento%20para%20ar-condicionado."
          class="btn btn-primary"
          style="padding: 8px 16px"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fab fa-whatsapp"></i>
          <span>Falar Agora</span>
        </a>

        <button class="btn-icon" id="theme-toggle" aria-label="Alternar tema">
          <i class="fas fa-sun"></i>
        </button>

        <button class="hamburger" id="menuToggle" aria-label="Abrir menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  `;
}

function buildLink(item, rootPath, currentPath) {
  const resolvedHref = resolveHref(item.href, rootPath);
  const active = isActiveLink(item.href, currentPath);
  const aria = active ? ' aria-current="page"' : '';
  return `<a href="${resolvedHref}"${aria}>${item.label}</a>`;
}

function resolveHref(href, rootPath) {
  if (href.startsWith("#")) {
    return rootPath ? `${rootPath}index.html${href}` : href;
  }
  return `${rootPath}${href}`;
}

function isHomePage(currentPath) {
  const normalized = currentPath.toLowerCase();
  return normalized.endsWith("/index.html") || normalized.endsWith("/") || normalized === "";
}

function isActiveLink(href, currentPath) {
  const normalized = currentPath.toLowerCase();
  if (href === "#hero") return isHomePage(normalized);
  if (href.includes("instalação.html")) return normalized.includes("instalação.html");
  if (href.includes("manutenção.html")) return normalized.includes("manutenção.html") || normalized.includes("assistencia.html");
  if (href.includes("higienização.html")) return normalized.includes("higienização.html");
  if (href.includes("pmoc.html")) return normalized.includes("pmoc.html");
  if (href.includes("dicas.html")) return normalized.includes("dicas.html");
  if (href.includes("relatorio.html")) return normalized.includes("relatorio.html");
  if (href === "#serviços") return isHomePage(normalized);
  if (href === "#contato") return isHomePage(normalized);
  return false;
}
