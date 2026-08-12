# Landing page — Coders Zoom

Landing page da **Mentoria Tech que Vira Negócio**, construída com a stack do projeto (React, Vinext, TypeScript e CSS).

## Configurações pendentes

Todo conteúdo substituível está centralizado em `content/site.ts`:

- nome, foto, LinkedIn e experiências reais do mentor;
- redação jurídica final sobre a negociação anterior;
- preço/condições ou modo de exibição após candidatura;
- quantidade de vagas;
- WhatsApp e e-mail;
- URLs definitivas da Política de Privacidade e dos Termos;
- destino do formulário.

## Envio do formulário

O formulário está em `preview`: valida os campos, protege com honeypot e tempo mínimo, e simula o estado de carregamento/sucesso sem transmitir dados.

Para ativar um serviço próprio:

1. Em `content/site.ts`, altere `form.mode` para `endpoint`.
2. Substitua `form.destination` por uma rota de backend HTTPS.
3. Implemente nesse backend validação, rate limiting, armazenamento seguro e notificações. Segredos devem existir apenas no servidor.

A interface desacoplada está em `lib/application.ts`. O navegador envia JSON somente quando o modo `endpoint` e um destino real estiverem configurados.

## Depoimentos

O array `testimonials` em `content/site.ts` começa vazio. A página mostra o bloco “Primeiro ciclo da mentoria” até que relatos reais com `displayAuthorized: true` sejam cadastrados.
