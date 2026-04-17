# Trafego Pago - Documentacao Tecnica e Comercial

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

## Fase 5 - Implementacao concluida
### Configuracao central de analytics
Arquivo: js/analytics-config.js

Campos disponiveis:
- ga4MeasurementId
- metaPixelId

Como ativar:
1. Abrir js/analytics-config.js
2. Preencher ga4MeasurementId com seu ID GA4 (exemplo: G-XXXXXXXXXX)
3. Preencher metaPixelId com seu Pixel ID Meta

### Inicializacao automatica de providers
Arquivo: js/marketing.js

Ao iniciar o site:
- inicializa GA4 dinamicamente quando ga4MeasurementId estiver preenchido
- inicializa Meta Pixel dinamicamente quando metaPixelId estiver preenchido
- mantem funcionamento com fallback seguro quando IDs nao estiverem configurados

### Eventos de funil padronizados
Eventos atuais:
- page_view_custom
- view_content
- whatsapp_click
- initiate_contact
- lead_submit

Mapeamento Meta Pixel:
- view_content -> ViewContent
- initiate_contact / whatsapp_click -> Contact
- lead_submit -> Lead

Mapeamento GA4:
- envio via gtag quando disponivel

### Classificacao da pagina para analise
Campo enviado:
- service_page_type

Valores:
- home
- instalacao
- manutencao
- higienizacao
- pmoc
- conteudo

### Resultado esperado para mídia paga
- Melhor leitura de etapa de funil por campanha
- Acompanhamento de contato iniciado vs lead confirmado
- Segmentacao mais precisa para remarketing

## Fase 6 - Teste A/B e relatorio por landing
### Teste A/B de headline/CTA
Arquivos:
- js/ab-testing.js
- pages/instalacao.html
- pages/manutencao.html
- pages/higienizacao.html
- pages/pmoc.html

Como funciona:
- Elementos com data-ab-test, data-ab-a e data-ab-b recebem variacao A/B automaticamente.
- Variante e estavel por campanha/cidade (persistida no localStorage).
- Evento ab_variant_assigned e enviado para analise.

Segmentacao de cidade:
- Parametro city na URL (quando informado)
- fallback por utm_term
- fallback final para regiao

### Relatorio local por landing
Arquivos:
- pages/relatorio.html
- js/report.js

Fonte de dados:
- agregado local no navegador via chave ntech-event-stats-v1

Metricas exibidas:
- View Content
- Contatos
- Leads
- Taxa de contato por landing
- Taxa de lead por landing

Observacao:
- O relatorio e local (navegador atual), ideal para validacao rapida durante testes de campanha.
