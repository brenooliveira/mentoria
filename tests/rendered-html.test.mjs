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
