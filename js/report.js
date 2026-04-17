// report.js - Relatorio local de performance por landing
const EVENT_STATS_KEY = "ntech-event-stats-v1";

document.addEventListener("DOMContentLoaded", () => {
  renderReport();
});

function renderReport() {
  const rows = loadRows();
  const tableBody = document.getElementById("reportBody");
  const summary = document.getElementById("reportSummary");

  if (!tableBody || !summary) return;

  if (!rows.length) {
    summary.textContent = "Sem dados locais ainda. Navegue pelo funil e gere eventos para visualizar o relatorio.";
    return;
  }

  const grouped = groupByLanding(rows);
  const lines = [];

  Object.keys(grouped)
    .sort()
    .forEach((landing) => {
      const metrics = grouped[landing];
      const views = metrics.view_content || 0;
      const contacts = (metrics.initiate_contact || 0) + (metrics.whatsapp_click || 0);
      const leads = metrics.lead_submit || 0;

      const contactRate = views > 0 ? ((contacts / views) * 100).toFixed(1) : "0.0";
      const leadRate = views > 0 ? ((leads / views) * 100).toFixed(1) : "0.0";

      lines.push({
        landing,
        views,
        contacts,
        leads,
        contactRate,
        leadRate
      });
    });

  tableBody.innerHTML = lines
    .map(
      (line) => `
      <tr>
        <td>${escapeHtml(line.landing)}</td>
        <td>${line.views}</td>
        <td>${line.contacts}</td>
        <td>${line.leads}</td>
        <td>${line.contactRate}%</td>
        <td>${line.leadRate}%</td>
      </tr>`
    )
    .join("");

  summary.textContent = `Dados agregados localmente em ${rows.length} registros de eventos.`;
}

function loadRows() {
  try {
    const raw = localStorage.getItem(EVENT_STATS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Object.values(parsed);
  } catch {
    return [];
  }
}

function groupByLanding(rows) {
  const acc = {};
  rows.forEach((row) => {
    const page = row.page || "(desconhecido)";
    if (!acc[page]) acc[page] = {};
    acc[page][row.event] = (acc[page][row.event] || 0) + (row.count || 0);
  });
  return acc;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
