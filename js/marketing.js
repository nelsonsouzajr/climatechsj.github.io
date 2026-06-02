// marketing.js - Captura de origem de campanha e eventos de conversao
import { $$ } from "./utils.js";
import { ANALYTICS_CONFIG } from "./analytics-config.js";

const STORAGE_KEY = "climatech-attribution";
const EVENT_STATS_KEY = "climatech-event-stats-v1";
const SITE_ORIGIN_LABEL = "www.climatechsj.com.br";
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
  initAnalyticsProviders();
  persistAttribution();
  enhanceWhatsAppLinks();
  trackPageView();
  trackViewContent();
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
        page_path: window.location.pathname,
        link_text: (link.textContent || "").trim(),
        ...attribution
      };
      pushTrackingEvent("whatsapp_click", eventPayload);
      pushTrackingEvent("initiate_contact", eventPayload);
    });
  });
}

function enhanceWhatsAppLinks() {
  const links = $$("a[href*='wa.me']");
  const attribution = getAttribution();

  links.forEach((link) => {
    try {
      const url = new URL(link.href);
      const raw = url.searchParams.get("text") || "Ola, gostaria de um orçamento para ar-condicionado.";

      const cleanMessage = raw
        .replace(/\s*\[origem:.*$/i, "")
        .trim();

      const source = attribution.utm_source || "site";
      const campaign = attribution.utm_campaign || "";
      const normalizedSource = source === "direct" ? SITE_ORIGIN_LABEL : source;
      const normalizedCampaign = campaign === "organic" ? "" : campaign;
      const originScope = normalizedCampaign ? `${normalizedSource}/${normalizedCampaign}` : normalizedSource;
      const fullMessage = `${cleanMessage} [origem:${originScope}]`;
      url.searchParams.set("text", fullMessage);
      link.href = url.toString();
    } catch {
      // Mantem o link original em caso de URL invalida
    }
  });
}

export function trackLeadSubmit(metadata = {}) {
  const attribution = getAttribution();
  pushTrackingEvent("lead_submit", {
    page_path: window.location.pathname,
    ...attribution,
    ...metadata
  });
}

export function trackCustomEvent(eventName, metadata = {}) {
  const attribution = getAttribution();
  pushTrackingEvent(eventName, {
    page_path: window.location.pathname,
    ...attribution,
    ...metadata
  });
}

function trackPageView() {
  const attribution = getAttribution();
  pushTrackingEvent("page_view_custom", {
    page_path: window.location.pathname,
    page_title: document.title,
    ...attribution
  });
}

function trackViewContent() {
  const attribution = getAttribution();
  pushTrackingEvent("view_content", {
    page_path: window.location.pathname,
    page_title: document.title,
    service_page_type: getServicePageType(),
    ...attribution
  });
}

function getServicePageType() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes("instalação")) return "instalação";
  if (path.includes("manutenção")) return "manutenção";
  if (path.includes("higienização")) return "higienização";
  if (path.includes("pmoc")) return "pmoc";
  if (path.includes("dicas")) return "conteudo";
  return "home";
}

function initAnalyticsProviders() {
  initGa4();
  initMetaPixel();
}

function initGa4() {
  const measurementId = ANALYTICS_CONFIG.ga4MeasurementId;
  if (!measurementId) return;
  if (document.getElementById("climatech-ga4-script")) return;

  const script = document.createElement("script");
  script.id = "climatech-ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });
}

function initMetaPixel() {
  const pixelId = ANALYTICS_CONFIG.metaPixelId;
  if (!pixelId) return;
  if (window.fbq) return;

  // Snippet padrao Meta Pixel com protecao para inicializacao única
  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      if (n.callMethod) {
        n.callMethod.apply(n, arguments);
      } else {
        n.queue.push(arguments);
      }
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  window.fbq("init", pixelId);
  window.fbq("track", "PageView");
}

function pushTrackingEvent(eventName, payload) {
  const eventPayload = {
    event: eventName,
    ...payload
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventPayload);
  persistEventStats(eventName, payload);

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }

  if (typeof window.fbq === "function") {
    const isLead = eventName === "lead_submit";
    const isContact = eventName === "whatsapp_click" || eventName === "initiate_contact";
    const isViewContent = eventName === "view_content";

    if (isLead) {
      window.fbq("track", "Lead", {
        content_name: payload.page_path || window.location.pathname,
        source: payload.utm_source || "direct",
        campaign: payload.utm_campaign || "organic"
      });
    }

    if (isContact) {
      window.fbq("track", "Contact", {
        content_name: payload.page_path || window.location.pathname,
        source: payload.utm_source || "direct",
        campaign: payload.utm_campaign || "organic"
      });
    }

    if (isViewContent) {
      window.fbq("track", "ViewContent", {
        content_name: payload.service_page_type || payload.page_path || window.location.pathname,
        source: payload.utm_source || "direct"
      });
    }
  }
}

function persistEventStats(eventName, payload) {
  try {
    const raw = localStorage.getItem(EVENT_STATS_KEY);
    const state = raw ? JSON.parse(raw) : {};

    const campaign = payload.utm_campaign || "organic";
    const page = payload.page_path || window.location.pathname;
    const variant = payload.ab_variant || "-";
    const testName = payload.ab_test || "-";
    const key = `${eventName}|${page}|${campaign}|${testName}|${variant}`;

    const current = state[key] || {
      event: eventName,
      page,
      campaign,
      test: testName,
      variant,
      count: 0,
      firstSeenAt: new Date().toISOString(),
      lastSeenAt: new Date().toISOString()
    };

    current.count += 1;
    current.lastSeenAt = new Date().toISOString();
    state[key] = current;

    localStorage.setItem(EVENT_STATS_KEY, JSON.stringify(state));
  } catch {
    // Não bloquear fluxo de conversao por falha de localStorage
  }
}
