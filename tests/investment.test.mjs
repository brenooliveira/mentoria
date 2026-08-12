import assert from "node:assert/strict";
import test from "node:test";
import { siteConfig } from "../content/site.ts";
import { getInvestmentOptions, getInvestmentPresentation } from "../lib/investment.ts";

test("usa faixas configuráveis quando o preço não é publicado", () => {
  const options = getInvestmentOptions(siteConfig.investment);

  assert.deepEqual(options.map(({ id }) => id), [
    "private_up_to_2500",
    "private_2500_to_5000",
    "private_above_5000",
    "private_planning",
  ]);
  assert.equal(options[1].label, "De R$ 2.500 a R$ 5.000.");
  assert.equal(options[1].minAmountInCents, 250_000);
  assert.equal(options[1].maxAmountInCents, 500_000);
});

test("deriva as opções do mesmo preço no modo público", () => {
  const publicConfig = {
    ...siteConfig.investment,
    mode: "initial-price",
    price: { amountInCents: 480_000, formatted: "R$ 4.800" },
  };
  const options = getInvestmentOptions(publicConfig);
  const presentation = getInvestmentPresentation(publicConfig);

  assert.equal(options[0].id, "public_full_amount");
  assert.equal(options[0].label, "Tenho disponibilidade para investir R$ 4.800.");
  assert.equal(options[1].label, "Tenho disponibilidade, mas preciso de parcelamento.");
  assert.equal(presentation.heading, "Investimento do ciclo fundador");
  assert.equal(presentation.primary, "R$ 4.800");
  assert.equal(presentation.secondary, "Condições de parcelamento apresentadas durante a conversa de alinhamento.");
});

test("impede ativar preço público sem um valor real configurado", () => {
  const invalidPublicConfig = {
    ...siteConfig.investment,
    mode: "initial-price",
  };

  assert.throws(
    () => getInvestmentOptions(invalidPublicConfig),
    /modo de preço público exige preço formatado/i,
  );
});
