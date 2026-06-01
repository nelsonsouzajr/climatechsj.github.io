// ab-testing.js - Teste A/B simples para headlines por campanha/cidade
import { getAttribution, trackCustomEvent } from "./marketing.js";

const AB_STORAGE_PREFIX = "climatech-ab-variant";

export function initAbTesting() {
  const nodes = document.querySelectorAll("[data-ab-test]");
  if (!nodes.length) return;

  const attribution = getAttribution();
  const campaign = attribution.utm_campaign || "organic";
  const city = resolveCityHint(attribution.utm_term || "");

  nodes.forEach((node) => {
    const testName = node.getAttribute("data-ab-test");
    const variantA = node.getAttribute("data-ab-a");
    const variantB = node.getAttribute("data-ab-b");

    if (!testName || !variantA || !variantB) return;

    const variant = getStableVariant(testName, campaign, city);
    const text = variant === "A" ? variantA : variantB;
    node.textContent = text;

    trackCustomEvent("ab_variant_assigned", {
      ab_test: testName,
      ab_variant: variant,
      ab_city: city,
      ab_campaign: campaign
    });
  });
}

function getStableVariant(testName, campaign, city) {
  const scope = `${testName}|${campaign}|${city}`;
  const storageKey = `${AB_STORAGE_PREFIX}:${scope}`;
  const saved = localStorage.getItem(storageKey);
  if (saved === "A" || saved === "B") return saved;

  const hash = simpleHash(scope);
  const variant = hash % 2 === 0 ? "A" : "B";
  localStorage.setItem(storageKey, variant);
  return variant;
}

function resolveCityHint(utmTerm) {
  const fromUrl = new URLSearchParams(window.location.search).get("city");
  const seed = (fromUrl || utmTerm || "").toLowerCase();

  if (seed.includes("aguai")) return "aguai";
  if (seed.includes("sao joao") || seed.includes("boa vista")) return "sao_joao_da_boa_vista";
  if (seed.includes("mogi guacu")) return "mogi_guacu";
  if (seed.includes("mogi mirim")) return "mogi_mirim";
  if (seed.includes("pinhal")) return "espirito_santo_do_pinhal";
  return "regiao";
}

function simpleHash(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
