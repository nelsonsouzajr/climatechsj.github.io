# Trafego Pago - Documentacao Tecnica e Comercial (Fase 4)

## Objetivo
Este documento centraliza as informacoes de estrutura, funil, rastreamento e copy das paginas voltadas para aquisicao ativa de clientes por marketing digital.

## Paginas de destino (landings)
- Home: index.html
- Instalacao: pages/instalacao.html
- Manutencao: pages/manutencao.html
- Higienizacao: pages/higienizacao.html
- PMOC: pages/pmoc.html
- Conteudo de apoio: pages/dicas.html

## Estrategia de campanha (por intencao)
- Campanha 1: Instalacao de split (fundo de funil)
  - URL base: /pages/instalacao.html
  - Dor principal: necessidade de instalar com seguranca e desempenho
  - CTA principal: WhatsApp com mensagem pre-preenchida

- Campanha 2: Manutencao preventiva/corretiva
  - URL base: /pages/manutencao.html
  - Dor principal: aparelho sem rendimento, ruido, vazamento, congelamento
  - CTA principal: agendamento rapido via WhatsApp

- Campanha 3: Higienizacao
  - URL base: /pages/higienizacao.html
  - Dor principal: mau cheiro, alergia, baixa qualidade do ar
  - CTA principal: solicitacao de higienizacao via WhatsApp

- Campanha 4: PMOC/rotina empresarial
  - URL base: /pages/pmoc.html
  - Dor principal: continuidade operacional e menor risco de parada
  - CTA principal: proposta para empresa

## Estrutura de rastreamento implementada
### Captura de atribuicao
Arquivo: js/marketing.js

Parametros rastreados:
- utm_source
- utm_medium
- utm_campaign
- utm_term
- utm_content
- gclid
- fbclid

Persistencia local:
- Chave: ntech-attribution
- Campos adicionais salvos:
  - landing_page
  - first_seen_at
  - last_seen_at
  - referrer

Fallback sem UTM:
- utm_source = direct
- utm_medium = none
- utm_campaign = organic

### Eventos de conversao
Arquivo: js/marketing.js

Eventos enviados:
- page_view_custom
- whatsapp_click
- lead_submit

Destinos de evento:
- dataLayer (sempre)
- gtag (quando disponivel)
- fbq (quando disponivel)

Observacao Meta:
- Em whatsapp_click e lead_submit, o evento Lead e disparado no fbq quando instalado.

### Conversao de formulario
Arquivo: js/forms.js

No submit com sucesso:
- envia dados de atribuicao no FormData
- adiciona lead_page
- adiciona lead_timestamp
- dispara trackLeadSubmit com:
  - conversion_type = form_submit
  - form_action

## Padronizacao de mensagem de WhatsApp
Arquivo: js/marketing.js

A mensagem final recebe sufixo automatico:
[origem:utm_source/utm_campaign]

Exemplo:
- Mensagem base: "Quero orcamento de instalacao de split."
- Mensagem final: "Quero orcamento de instalacao de split. [origem:google/instalacao_split]"

## Copy comercial local aplicada nas landings
- Inclusao de prova local (Aguai e regiao) no hero.
- Inclusao de bloco "Oferta local da semana" em cada landing.
- CTA direto para WhatsApp com foco em resposta rapida.

## SEO local ja aplicado na home
Arquivo: index.html
- Canonical
- Open Graph
- Twitter Card
- LocalBusiness JSON-LD
- FAQPage JSON-LD
- Secao Area de Atendimento
- Secao FAQ

## URLs de campanha recomendadas (exemplos)
- Instalacao:
  /pages/instalacao.html?utm_source=google&utm_medium=cpc&utm_campaign=instalacao_split_aguai&utm_content=anuncio_a
- Manutencao:
  /pages/manutencao.html?utm_source=google&utm_medium=cpc&utm_campaign=manutencao_split_aguai&utm_content=anuncio_b
- Higienizacao:
  /pages/higienizacao.html?utm_source=meta&utm_medium=paid_social&utm_campaign=higienizacao_residencial&utm_content=criativo_1
- PMOC:
  /pages/pmoc.html?utm_source=google&utm_medium=cpc&utm_campaign=pmoc_empresas_regiao&utm_content=anuncio_c

## Checklist operacional para anuncios
- Padronizar nome de campanhas e grupos por servico/cidade.
- Garantir UTM em 100% dos links de anuncio.
- Validar disparo de page_view_custom, whatsapp_click e lead_submit no navegador.
- Revisar semanalmente mensagens com origem no WhatsApp para otimizar copy e publico.

## Proximos ganhos recomendados
- Instalar IDs reais do GA4 e Meta Pixel no site.
- Criar dashboard simples de conversao por campanha.
- Executar teste A/B de headline nas 4 landings.
- Criar extensoes de anuncio com prova local (cidade + horario + WhatsApp).
