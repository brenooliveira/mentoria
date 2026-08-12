import type { InvestmentMode, InvestmentOption } from "../content/site";

export type InvestmentConfig = {
  mode: InvestmentMode;
  price: {
    amountInCents: number | null;
    formatted: string | null;
  };
  installmentDetails: string;
  readinessOptions: Record<InvestmentMode, readonly InvestmentOption[]>;
};

export type ResolvedInvestmentOption = InvestmentOption & {
  label: string;
};

export function getInvestmentPresentation(config: InvestmentConfig) {
  if (config.mode === "initial-price") {
    assertPublicPrice(config);
    return {
      heading: "Investimento do ciclo fundador",
      primary: config.price.formatted as string,
      secondary: config.installmentDetails,
    };
  }

  return {
    heading: "Investimento",
    primary: "Os valores e as condições são apresentados após a análise da candidatura.",
    secondary: "A candidatura não gera cobrança nem compromisso de contratação.",
  };
}

export function getInvestmentOptions(config: InvestmentConfig): ResolvedInvestmentOption[] {
  const priceLabel = config.price.formatted;

  if (config.mode === "initial-price") assertPublicPrice(config);

  return config.readinessOptions[config.mode].map((option) => ({
    ...option,
    label: option.label.replace("{price}", priceLabel ?? ""),
  }));
}

function assertPublicPrice(config: InvestmentConfig) {
  if (!config.price.formatted || !config.price.amountInCents) {
    throw new Error("O modo de preço público exige preço formatado e valor em centavos.");
  }
}

export function findInvestmentOption(
  config: InvestmentConfig,
  optionId: string,
): ResolvedInvestmentOption | undefined {
  return getInvestmentOptions(config).find((option) => option.id === optionId);
}
