import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renderiza a landing page da mentoria com conteúdo essencial", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="pt-BR">/i);
  assert.match(html, /<title>Mentoria de Tecnologia e Negócios \| Coders Zoom<\/title>/i);
  assert.match(html, /Transforme sua capacidade técnica em um/);
  assert.match(html, /Mentoria Tech que Vira Negócio/);
  assert.match(html, /Breno Oliveira/);
  assert.match(html, /\/breno-oliveira\.jpeg/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/brenooliveira\//);
  assert.match(html, /id="candidatura"/);
  assert.match(html, /name="consent"/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("mantém uma única heading principal", async () => {
  const html = await (await render()).text();
  const h1Matches = html.match(/<h1\b/gi) ?? [];
  assert.equal(h1Matches.length, 1);
});

test("publica o formulário com o endpoint de candidatura ativo", async () => {
  const html = await (await render()).text();
  assert.doesNotMatch(html, /Formulário em modo de revisão/);

  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("api-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/api/candidatura", { method: "GET" }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 405);
});

test("encaminha uma candidatura válida ao provedor de e-mail", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("email-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const originalFetch = globalThis.fetch;
  let emailRequest;

  globalThis.fetch = async (url, init) => {
    emailRequest = { url: String(url), init };
    return Response.json({ id: "email_teste" }, { status: 200 });
  };

  try {
    const response = await worker.fetch(
      new Request("https://mentoria.example/api/candidatura", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://mentoria.example",
        },
        body: JSON.stringify({
          name: "Pessoa Candidata",
          email: "pessoa@example.com",
          whatsapp: "(11) 99999-9999",
          linkedin: "https://linkedin.com/in/pessoa",
          role: "Fundadora",
          company: "Projeto Exemplo",
          stage: "Já existe um produto inicial",
          challenge: "Validar a oferta com os primeiros clientes.",
          goal90Days: "Conquistar clientes e organizar o processo comercial.",
          investmentReadiness: "Preciso entender valores e condições",
          source: "LinkedIn",
          consent: true,
          website: "",
          startedAt: Date.now() - 2_000,
        }),
      }),
      {
        ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
        RESEND_API_KEY: "re_teste",
      },
      { waitUntil() {}, passThroughOnException() {} },
    );

    assert.equal(response.status, 201);
    assert.equal(emailRequest.url, "https://api.resend.com/emails");
    const emailPayload = JSON.parse(emailRequest.init.body);
    assert.deepEqual(emailPayload.to, ["breno26@gmail.com"]);
    assert.equal(emailPayload.reply_to, "pessoa@example.com");
    assert.match(emailPayload.subject, /Pessoa Candidata/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("publica a política de privacidade com identificação e direitos LGPD", async () => {
  const response = await render("/politica-de-privacidade");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Política de Privacidade/);
  assert.match(html, /30\.980\.097\/0001-07/);
  assert.match(html, /contato@coderszoom\.com\.br/);
  assert.match(html, /até 6 meses/);
  assert.match(html, /Seus direitos/);
});

test("publica os termos com as condições informadas da mentoria", async () => {
  const response = await render("/termos-de-uso");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Termos de Uso e da Mentoria/);
  assert.match(html, /Google Meet/);
  assert.match(html, /1h15 a 1h30/);
  assert.match(html, /24 horas/);
  assert.match(html, /prazo legal de 7 dias/);
  assert.match(html, /pessoal e intransferível/);
  assert.match(html, /não serão gravados/);
  assert.match(html, /href="\/#inicio"[^>]*>← Voltar para a mentoria<\/a>/);
});
