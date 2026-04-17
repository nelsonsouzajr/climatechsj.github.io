// forms.js – Formulários e Máscaras
import { $, $$, showToast } from "./utils.js";
import { getAttribution } from "./marketing.js";

export function initForms() {
  // 1. Máscara de Telefone
  const phoneInput = $("#telephone");
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "");
      if (v.length > 11) v = v.slice(0, 11);

      if (v.length <= 10) {
        v = v.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d)(\d{4})$/, "$1-$2");
      } else {
        v = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      }
      e.target.value = v;
    });
  }

  // 2. Envio de Formulário (AJAX)
  const forms = $$("form[data-formsubmit]");
  
  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : "Enviar";

      if(submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner"></span> Enviando...`;
      }

      try {
        const formData = new FormData(form);

        // Anexa dados de campanha/origem para rastrear de onde o lead veio
        const attribution = getAttribution();
        Object.entries(attribution).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            formData.append(key, String(value));
          }
        });
        formData.append("lead_page", window.location.pathname);
        formData.append("lead_timestamp", new Date().toISOString());

        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          showToast("Mensagem enviada com sucesso!", "success");
          form.reset();
        } else {
          showToast("Erro ao enviar. Tente novamente.", "error");
        }
      } catch (error) {
        console.error(error);
        showToast("Erro de conexão.", "error");
      } finally {
        if(submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    });
  });
}