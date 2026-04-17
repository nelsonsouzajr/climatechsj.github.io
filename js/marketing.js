// marketing.js - Captura de origem de campanha e eventos de conversao
import { $$ } from "./utils.js";

const STORAGE_KEY = "ntech-attribution";
const TRACK_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid"
];

export function initMarketing() {
  persistAttribution();
  enhanceWhatsAppLinks();
  bindWhatsAppTracking();
}

export function getAttribution() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function persistAttribution() {
  const params = new URLSearchParams(window.location.search);
  const found = {};

  TRACK_PARAMS.forEach((key) => {
    const value = params.get(key);
    if (value) found[key] = value;
  });

  const hasCampaignData = Object.keys(found).length > 0;
  const existing = getAttribution();

  if (hasCampaignData) {
    const payload = {
      ...existing,
      ...found,
      landing_page: window.location.pathname,
      first_seen_at: existing.first_seen_at || new Date().toISOString(),
      last_seen_at: new Date().toISOString(),
      referrer: document.referrer || existing.referrer || "direct"
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return;
  }

  if (!existing.first_seen_at) {
    const fallback = {
      utm_source: "direct",
      utm_medium: "none",
      utm_campaign: "organic",
      landing_page: window.location.pathname,
      first_seen_at: new Date().toISOString(),
      last_seen_at: new Date().toISOString(),
      referrer: document.referrer || "direct"
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
  }
}

function bindWhatsAppTracking() {
  const links = $$("a[href*='wa.me']");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      const attribution = getAttribution();
      const eventPayload = {
        event: "whatsapp_click",
        page_path: window.location.pathname,
        link_text: (link.textContent || "").trim(),
        ...attribution
      };

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(eventPayload);
    });
  });
}

function enhanceWhatsAppLinks() {
  const links = $$("a[href*='wa.me']");
  const attribution = getAttribution();

  links.forEach((link) => {
    try {
      const url = new URL(link.href);
      const raw = url.searchParams.get("text") || "Ola, gostaria de um orcamento para ar-condicionado.";
      const source = attribution.utm_source || "direct";
      const campaign = attribution.utm_campaign || "organic";

      const cleanMessage = raw
        .replace(/\s*\[origem:.*$/i, "")
        .trim();

      const fullMessage = `${cleanMessage} [origem:${source}/${campaign}]`;
      url.searchParams.set("text", fullMessage);
      link.href = url.toString();
    } catch {
      // Mantem o link original em caso de URL invalida
    }
  });
}
